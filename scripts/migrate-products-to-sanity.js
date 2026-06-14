// One-off migration script (JS) to upsert src/data/products.json into Sanity
// Usage:
// SANITY_PROJECT_ID=... SANITY_DATASET=production SANITY_WRITE_TOKEN=sk_... node ./scripts/migrate-products-to-sanity.js

const fs = require('fs');
const path = require('path');

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) {
  console.error('Please set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in the environment');
  process.exit(1);
}

const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');
if (!fs.existsSync(productsPath)) {
  console.error('src/data/products.json not found');
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

(async function upsert(){
  const mutations = products.map((p) => {
    const docId = p.id ? `product.${p.id}` : undefined;
    const doc = { _type: 'product', name: p.name, price: p.price, description: p.description, category: p.category };
    if (p.image && typeof p.image === 'string' && p.image.startsWith('http')) doc.imageUrl = p.image;
    if (docId) doc._id = docId;
    return { createOrReplace: doc };
  });

  const mutateUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${SANITY_DATASET}?returnIds=true`;
  const res = await fetch(mutateUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${SANITY_WRITE_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity mutate failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  console.log('Migration result:', JSON.stringify(json, null, 2));
})().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
