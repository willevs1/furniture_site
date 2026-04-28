'use client';

import { useState } from 'react';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    // Seating
    { id: 1, name: 'Modern Sofa', category: 'seating', price: 1299, image: '🛋️', description: 'Contemporary design with premium upholstery' },
    { id: 2, name: 'Accent Chair', category: 'seating', price: 599, image: '🪑', description: 'Stylish accent piece for any room' },
    { id: 3, name: 'Lounge Chaise', category: 'seating', price: 899, image: '🛋️', description: 'Comfortable and elegant seating solution' },
    { id: 4, name: 'Ottoman Bench', category: 'seating', price: 449, image: '🪑', description: 'Versatile storage and seating combo' },

    // Tables
    { id: 5, name: 'Minimalist Dining Table', category: 'tables', price: 799, image: '🪑', description: 'Clean lines with ample seating' },
    { id: 6, name: 'Coffee Table', category: 'tables', price: 399, image: '⬜', description: 'Modern center piece for your living room' },
    { id: 7, name: 'Console Table', category: 'tables', price: 549, image: '⬜', description: 'Perfect for entryways or hallways' },
    { id: 8, name: 'Side Table', category: 'tables', price: 299, image: '⬜', description: 'Compact elegance for any corner' },

    // Lighting
    { id: 9, name: 'Pendant Lights', category: 'lighting', price: 349, image: '💡', description: 'Ambient lighting with modern aesthetic' },
    { id: 10, name: 'Floor Lamp', category: 'lighting', price: 279, image: '💡', description: 'Adjustable illumination for reading' },
    { id: 11, name: 'Wall Sconces', category: 'lighting', price: 199, image: '💡', description: 'Elegant accent lighting solution' },
    { id: 12, name: 'Chandelier', category: 'lighting', price: 599, image: '💡', description: 'Statement piece for grand spaces' },

    // Decor
    { id: 13, name: 'Artwork Set', category: 'decor', price: 249, image: '🖼️', description: 'Curated art for wall decoration' },
    { id: 14, name: 'Throw Pillows', category: 'decor', price: 89, image: '🎁', description: 'Add texture and color to your space' },
    { id: 15, name: 'Rugs', category: 'decor', price: 399, image: '🟫', description: 'Comfortable underfoot and stylish' },
    { id: 16, name: 'Plant Stands', category: 'decor', price: 179, image: '🌿', description: 'Display your greenery in style' },
  ];

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
            <div 
              key={product.id} 
              className="group"
            >
              <div className="aspect-square bg-gradient-to-br from-stone-300 to-stone-200 flex items-center justify-center text-5xl overflow-hidden mb-6">
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </span>
              </div>
              <div className="">
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
                    ${product.price}
                  </p>
                </div>
                <button className="w-full mt-6 px-4 py-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors font-light text-sm tracking-wide">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
