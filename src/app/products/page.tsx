'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams?.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  });

  // Load products from JSON file so they can be edited via the admin UI.
  // The admin UI will update `src/data/products.json` in the repository.
  // Importing JSON allows Next to include this at build time; the admin API reads and writes
  // the same file via the GitHub API so changes are reflected after deploy.
  // We keep a local import as a fallback.
  let products: any[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    products = require('@/data/products.json');
  } catch (err) {
    products = [];
  }

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'seating', label: 'Seating' },
    { id: 'tables', label: 'Tables' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'decor', label: 'Decor' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-light text-stone-900 mb-4 tracking-tight">Shop</h1>
          <p className="text-lg text-stone-600 font-light">
            A curated selection of furniture and objects
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 text-sm font-light tracking-wide transition-all ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-900 border border-stone-300 hover:border-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow transform hover:-translate-y-1">
                <div className="aspect-square relative bg-gradient-to-br from-stone-300 to-stone-200 flex items-center justify-center overflow-hidden mb-4 rounded-t-lg">
                {product.image ? (
                  <div className="absolute inset-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </span>
                )}
                </div>
                <div className="px-6 pb-6">
                <p className="text-xs text-stone-500 font-light mb-2 tracking-wide uppercase">
                  {product.category}
                </p>
                <h3 className="text-lg font-light text-stone-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-stone-600 font-light mb-4 h-10 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-light text-stone-900">
                      {formatter.format(product.price)}
                    </p>
                </div>
                  <button className="w-full mt-6 px-4 py-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors font-light text-sm tracking-wide">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
