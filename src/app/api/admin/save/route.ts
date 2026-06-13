import { NextResponse } from 'next/server';

const GITHUB_REPO = process.env.GITHUB_REPO || 'willevs1/furniture_site';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

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

export async function POST(request: Request) {
  if (!GITHUB_TOKEN || !ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }

  const data = await request.json();
  const { password, products, images } = data;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // images: [{ path: 'public/images/products/foo.jpg', content: '<base64 string>' }, ...]
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

  // Update products JSON
  const jsonPath = 'src/data/products.json';
  const jsonSha = await getFileSha(jsonPath).catch(() => null);
  const contentBase64 = Buffer.from(JSON.stringify(products, null, 2)).toString('base64');
  const res = await putFile(jsonPath, contentBase64, 'Update products.json (admin)', jsonSha);
  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: 'Failed to update products', details: text }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
