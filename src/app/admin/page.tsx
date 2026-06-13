"use client";

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  alt?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [newImages, setNewImages] = useState<Record<number, { filename: string; content: string }>>({});

  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      });
  }, []);

  function updateField(idx: number, key: keyof Product, value: any) {
    setProducts((prev) => {
      const clone = [...prev];
      // @ts-ignore
      clone[idx][key] = value;
      return clone;
    });
  }

  function slugify(str: string) {
    return str
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/\-+/g, '-')
      .replace(/^\-+|\-+$/g, '');
  }

  function handleFileChange(idx: number, file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is data:[mime];base64,XXXXX
      const match = result.match(/^data:(.+);base64,(.+)$/);
      if (!match) return;
      const mime = match[1];
      const b64 = match[2];
      const ext = mime.split('/')[1] || 'jpg';
      const filename = `${slugify(products[idx].name || 'product')}-${products[idx].id}.${ext}`;

      setNewImages((prev) => ({ ...prev, [products[idx].id]: { filename, content: b64 } }));

      // update product image path to the public URL we'll write to
      updateField(idx, 'image', `/images/products/${filename}`);
    };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    setLoading(true);
    setMessage(null);

    // Include any newly uploaded images (base64) in payload so the server can commit them.
    const images = Object.values(newImages).map((img) => ({ path: `/public/images/products/${img.filename}`, content: img.content }));
    const payload = { password, products, images };

    const res = await fetch('/api/admin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMessage('Saved successfully — the site will redeploy shortly.');
    } else {
      setMessage(`Error: ${data.error || 'unknown'}`);
    }
  }

  const [generating, setGenerating] = useState<Record<number, boolean>>({});

  async function handleGenerate(idx: number) {
    const p = products[idx];
    if (!p) return;
    setGenerating((s) => ({ ...s, [p.id]: true }));
    try {
      const res = await fetch('/api/admin/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, product: p }),
      });
      const data = await res.json();
      if (res.ok && data.result) {
        const r = data.result;
        if (r.description) updateField(idx, 'description', r.description);
        if (r.alt) updateField(idx, 'alt', r.alt);
        if (r.metaTitle) updateField(idx, 'metaTitle', r.metaTitle);
        if (r.metaDescription) updateField(idx, 'metaDescription', r.metaDescription);
        const tokens = data.usage ? `${data.usage.total_tokens} tokens` : 'unknown tokens';
        setMessage(`Generated content updated for product (${tokens}). Review and Save to commit.`);
      } else {
        setMessage(`Generation error: ${data.error || 'unknown'}`);
      }
    } catch (err: any) {
      setMessage(`Generation failed: ${err.message || String(err)}`);
    }
    setGenerating((s) => ({ ...s, [p.id]: false }));
  }

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light mb-6">Admin: Manage Products</h1>

        <div className="mb-6">
          <label className="block text-sm mb-2">Admin Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border" />
          <p className="text-xs text-stone-500 mt-2">This password is checked server-side. Set `ADMIN_PASSWORD` in your Vercel project settings.</p>
        </div>

        {products.map((p, idx) => (
          <div key={p.id} className="mb-6 p-4 border bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs">Name</label>
                <input value={p.name} onChange={(e) => updateField(idx, 'name', e.target.value)} className="w-full px-2 py-2 border" />
              </div>
              <div>
                <label className="block text-xs">Category</label>
                <input value={p.category} onChange={(e) => updateField(idx, 'category', e.target.value)} className="w-full px-2 py-2 border" />
              </div>
              <div>
                <label className="block text-xs">Price (GBP)</label>
                <input type="number" value={p.price} onChange={(e) => updateField(idx, 'price', Number(e.target.value))} className="w-full px-2 py-2 border" />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs">Image path or URL</label>
              <input value={p.image} onChange={(e) => updateField(idx, 'image', e.target.value)} className="w-full px-2 py-2 border" />
            </div>

            <div className="mt-4">
              <label className="block text-xs">Description</label>
              <textarea value={p.description} onChange={(e) => updateField(idx, 'description', e.target.value)} className="w-full px-2 py-2 border" />
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleGenerate(idx)} disabled={generating[p.id]} className="px-3 py-2 text-sm border bg-stone-100">
                  {generating[p.id] ? 'Generating...' : 'Generate copy & SEO'}
                </button>
                <p className="text-xs text-stone-500 mt-2">Use this to auto-create description, alt text and meta. Review before saving.</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs">Image alt text</label>
                <input value={p.alt || ''} onChange={(e) => updateField(idx, 'alt', e.target.value)} className="w-full px-2 py-2 border" />
              </div>
              <div>
                <label className="block text-xs">Meta title</label>
                <input value={p.metaTitle || ''} onChange={(e) => updateField(idx, 'metaTitle', e.target.value)} className="w-full px-2 py-2 border" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs">Meta description</label>
              <textarea value={p.metaDescription || ''} onChange={(e) => updateField(idx, 'metaDescription', e.target.value)} className="w-full px-2 py-2 border" />
            </div>
          </div>
        ))}

        <div className="mt-6 flex items-center gap-4">
          <button onClick={handleSave} disabled={loading} className="px-6 py-3 border bg-stone-900 text-white">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          {message && <p className="text-sm text-stone-700">{message}</p>}
        </div>
      </div>
    </main>
  );
}
