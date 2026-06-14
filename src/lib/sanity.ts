export const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
export const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
export const SANITY_READ_TOKEN = process.env.SANITY_READ_TOKEN; // optional for private datasets

export async function fetchProductsFromSanity() {
  if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
    throw new Error('Sanity not configured');
  }

  // GROQ query to select product fields and resolve image url
  const query = encodeURIComponent(`*[_type == "product"]{_id, name, price, description, category, "imageUrl": image.asset->url}`);
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${SANITY_DATASET}?query=${query}`;

  const headers: Record<string, string> = {};
  if (SANITY_READ_TOKEN) headers.Authorization = `Bearer ${SANITY_READ_TOKEN}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity fetch failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  // Sanity returns { result: [ ... ] }
  const items = Array.isArray(json?.result) ? json.result : [];

  // Map Sanity shape to product shape expected by the site
  return items.map((it: any) => ({
    id: it._id,
    name: it.name,
    price: it.price,
    description: it.description,
    category: it.category,
    image: it.imageUrl || null,
  }));
}
