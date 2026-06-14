import { NextResponse } from 'next/server';

const GITHUB_REPO = process.env.GITHUB_REPO || 'willevs1/furniture_site';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN; // optional: when present, save to Sanity

async function getFileSha(path: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha;
}

async function putFile(path: string, contentBase64: string, message: string, sha?: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
  const body: any = { message, content: contentBase64, branch: 'main' };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res;
}

function decodeBase64Data(data: string) {
  // Accept either data URLs `data:<mime>;base64,....` or raw base64 strings
  const match = data.match(/^data:(.+);base64,(.*)$/);
  if (match) {
    return { mime: match[1], base64: match[2] };
  }
  return { mime: 'image/jpeg', base64: data };
}

async function uploadImageToSanity(base64Data: string, filename = 'upload.jpg') {
  if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) throw new Error('Sanity not configured for writes');

  const { mime, base64 } = decodeBase64Data(base64Data);
  const buffer = Buffer.from(base64, 'base64');

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/assets/images/${SANITY_DATASET}?filename=${encodeURIComponent(filename)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
      'Content-Type': mime,
    },
    body: buffer,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity image upload failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  // response may include the document id in multiple places; try common keys
  const assetId = json?.document?._id || json?._id || json?.asset?._id || json?.id;
  const urlOut = json?.document?.url || json?.url || json?.asset?.url || json?.document?.asset?.url;
  return { assetId, url: urlOut, raw: json };
}

async function upsertProductsToSanity(products: any[], images: any[] = []) {
  if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) throw new Error('Sanity not configured for writes');

  // Map uploaded images by original path to asset id
  const imageMap: Record<string, string> = {};
  if (Array.isArray(images)) {
    for (const img of images) {
      const filename = img.path ? img.path.split('/').pop() : `img-${Date.now()}.jpg`;
      const { assetId } = await uploadImageToSanity(img.content, filename).catch((e) => {
        console.error('Image upload error', e?.message || e);
        return {} as any;
      });
      if (assetId) imageMap[img.path] = assetId;
    }
  }

  // Build mutations for mutate endpoint
  const mutations = products.map((p: any) => {
    const docId = p.id ? `product.${p.id}` : undefined;
    const productDoc: any = {
      _type: 'product',
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
    };
    if (p.image) {
      const ref = imageMap[p.image] || p.image; // if p.image is already a Sanity ref/url
      if (ref && String(ref).startsWith('image-')) {
        productDoc.image = { _type: 'image', asset: { _type: 'reference', _ref: ref } };
      } else if (typeof ref === 'string' && ref.startsWith('http')) {
        // If it's a URL, set as plain url in a custom field
        productDoc.imageUrl = ref;
      } else if (ref) {
        productDoc.imageUrl = ref;
      }
    }

    if (docId) productDoc._id = docId;
    return { createOrReplace: productDoc };
  });

  const mutateUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${SANITY_DATASET}?returnIds=true`;
  const res = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity mutate failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  return json;
}

export async function POST(request: Request) {
  if (!GITHUB_TOKEN && !SANITY_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Server not configured for any write target' }, { status: 500 });
  }

  const data = await request.json();
  const { password, products, images, projects } = data;

  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
  }
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // If SANITY_WRITE_TOKEN is present, prefer writing to Sanity
  if (SANITY_WRITE_TOKEN && SANITY_PROJECT_ID) {
    try {
      const result = await upsertProductsToSanity(products || [], images || []);
      // If projects were provided and we have a GITHUB_TOKEN, persist them to the repo as well
      let projectsCommit: any = null;
      if (projects && GITHUB_TOKEN) {
        const projectsPath = 'src/data/projects.json';
        const projectsSha = await getFileSha(projectsPath).catch(() => null);
        const projectsBase64 = Buffer.from(JSON.stringify(projects, null, 2)).toString('base64');
        const pRes = await putFile(projectsPath, projectsBase64, 'Update projects.json (admin)', projectsSha);
        projectsCommit = pRes.ok ? { ok: true } : { ok: false };
      }
      return NextResponse.json({ ok: true, sanity: result, projectsCommit });
    } catch (err: any) {
      console.error('Sanity write error', err?.message || err);
      // fall through to GitHub fallback if possible
    }
  }

  // Fallback: commit images and products JSON to GitHub repo
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'No writable backend available' }, { status: 500 });
  }

  if (Array.isArray(images)) {
    for (const img of images) {
      const targetPath = img.path.replace(/^\//, '');
      const contentBase64 = img.content; // expected base64 string
      const sha = await getFileSha(targetPath).catch(() => null);
      const res = await putFile(targetPath, contentBase64, `Add/Update image ${targetPath}`, sha);
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json({ error: `Failed to upload ${targetPath}`, details: text }, { status: 500 });
      }
    }
  }

  // Update products JSON in repo
  const jsonPath = 'src/data/products.json';
  const jsonSha = await getFileSha(jsonPath).catch(() => null);
  const contentBase64 = Buffer.from(JSON.stringify(products, null, 2)).toString('base64');
  const res = await putFile(jsonPath, contentBase64, 'Update products.json (admin)', jsonSha);
  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: 'Failed to update products', details: text }, { status: 500 });
  }

  // If projects are provided, also update projects.json
  if (projects) {
    const projectsPath = 'src/data/projects.json';
    const projectsSha = await getFileSha(projectsPath).catch(() => null);
    const projectsBase64 = Buffer.from(JSON.stringify(projects, null, 2)).toString('base64');
    const pres = await putFile(projectsPath, projectsBase64, 'Update projects.json (admin)', projectsSha);
    if (!pres.ok) {
      const text = await pres.text();
      return NextResponse.json({ error: 'Failed to update projects', details: text }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
