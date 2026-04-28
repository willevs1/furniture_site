import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section - Full Width Image */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-stone-200 via-stone-100 to-stone-50 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="text-9xl mb-8">🏛️</div>
            <h1 className="text-5xl md:text-7xl font-light text-stone-900 mb-4 tracking-tight">
              Interior Design & Furniture
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Thoughtfully curated pieces for spaces of quiet beauty and enduring quality.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Collection 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-stone-300 to-stone-200 overflow-hidden mb-6 flex items-center justify-center text-8xl">
                <span className="group-hover:scale-105 transition-transform duration-300">🛋️</span>
              </div>
              <h3 className="text-3xl font-light text-stone-900 mb-2">Seating</h3>
              <p className="text-stone-600 font-light mb-4 leading-relaxed">
                Furniture designed for comfort and longevity. Each piece combines thoughtful proportion with refined materials.
              </p>
              <Link href="/products?category=seating" className="text-stone-700 font-light text-sm tracking-wide hover:text-stone-900 transition-colors">
                DISCOVER MORE
              </Link>
            </div>

            {/* Collection 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-stone-300 to-stone-200 overflow-hidden mb-6 flex items-center justify-center text-8xl">
                <span className="group-hover:scale-105 transition-transform duration-300">🪑</span>
              </div>
              <h3 className="text-3xl font-light text-stone-900 mb-2">Dining & Tables</h3>
              <p className="text-stone-600 font-light mb-4 leading-relaxed">
                Tables and chairs designed for everyday use. Made from natural materials with an emphasis on craftsmanship.
              </p>
              <Link href="/products?category=tables" className="text-stone-700 font-light text-sm tracking-wide hover:text-stone-900 transition-colors">
                DISCOVER MORE
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Collection 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-stone-300 to-stone-200 overflow-hidden mb-6 flex items-center justify-center text-8xl">
                <span className="group-hover:scale-105 transition-transform duration-300">💡</span>
              </div>
              <h3 className="text-3xl font-light text-stone-900 mb-2">Lighting</h3>
              <p className="text-stone-600 font-light mb-4 leading-relaxed">
                Carefully considered lighting solutions that shape space and mood with elegance and simplicity.
              </p>
              <Link href="/products?category=lighting" className="text-stone-700 font-light text-sm tracking-wide hover:text-stone-900 transition-colors">
                DISCOVER MORE
              </Link>
            </div>

            {/* Collection 4 */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-stone-300 to-stone-200 overflow-hidden mb-6 flex items-center justify-center text-8xl">
                <span className="group-hover:scale-105 transition-transform duration-300">🎨</span>
              </div>
              <h3 className="text-3xl font-light text-stone-900 mb-2">Objects & Decor</h3>
              <p className="text-stone-600 font-light mb-4 leading-relaxed">
                Beautiful belongings and objects that bring warmth and personality to any interior.
              </p>
              <Link href="/products?category=decor" className="text-stone-700 font-light text-sm tracking-wide hover:text-stone-900 transition-colors">
                DISCOVER MORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8 tracking-tight">
            Our Design Philosophy
          </h2>
          <p className="text-xl text-stone-600 font-light leading-relaxed mb-8">
            We believe in the power of thoughtfully designed spaces. Each piece in our collection is selected for its ability to endure—in quality, proportion, and beauty. Nothing is superfluous. Comfort is considered. The feeling is one of calm, enveloping simplicity.
          </p>
          <p className="text-lg text-stone-500 font-light italic">
            "Good design is not about trends. It's about creating spaces where life unfolds gracefully."
          </p>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 px-6 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-4 tracking-tight">
              Recent Interiors
            </h2>
            <p className="text-lg text-stone-600 font-light">
              A selection of completed interior projects
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { image: '🏡', title: 'Residential', location: 'California' },
              { image: '🏨', title: 'Hospitality', location: 'New York' },
              { image: '🏢', title: 'Commercial', location: 'London' }
            ].map((project, idx) => (
              <Link key={idx} href="/portfolio" className="group cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-stone-300 to-stone-200 overflow-hidden mb-4 flex items-center justify-center text-7xl">
                  <span className="group-hover:scale-110 transition-transform duration-300">{project.image}</span>
                </div>
                <h3 className="text-xl font-light text-stone-900 mb-1">{project.title}</h3>
                <p className="text-sm text-stone-500 font-light">{project.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-stone-900 text-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Start Your Journey
          </h2>
          <p className="text-xl text-stone-300 font-light mb-12 leading-relaxed">
            Schedule a consultation with our design team to discuss your project.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 border border-stone-50 text-stone-50 hover:bg-stone-50 hover:text-stone-900 transition-colors font-light tracking-wide">
            GET IN TOUCH
          </Link>
        </div>
      </section>
    </main>
  );
}
