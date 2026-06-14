// Migration fallback: write Sanity-shaped documents to a local JSON file
// Usage: node ./scripts/migrate-products-to-local.js

const fs = require('fs');
const path = require('path');

const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');
const outPath = path.join(process.cwd(), 'scripts', 'migrated-products.json');

if (!fs.existsSync(productsPath)) {
  console.error('src/data/products.json not found');
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const docs = products.map((p) => {
  const id = p.id ? `product.${p.id}` : undefined;
  const obj = {
    _id: id,
    _type: 'product',
    name: p.name,
    price: p.price,
    description: p.description,
    category: p.category,
  };

  if (p.image && typeof p.image === 'string') {
    if (p.image.startsWith('http')) obj.imageUrl = p.image;
    else if (p.image.startsWith('data:')) obj.imageDataUrl = p.image;
    else obj.imagePath = p.image; // local path in repo, e.g. /images/products/...
  }

  return obj;
});

const payload = {
  migratedAt: new Date().toISOString(),
  source: 'src/data/products.json',
  count: docs.length,
  documents: docs,
};

fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');
console.log(`Wrote ${docs.length} documents to ${outPath}`);
console.log('Sample doc:', JSON.stringify(docs[0], null, 2));
