export function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-light text-stone-900 mb-6 tracking-wide">INTERIORS</h3>
            <p className="text-stone-600 font-light text-sm leading-relaxed">
              Thoughtfully curated interiors and furniture for spaces of lasting beauty and quality.
            </p>
          </div>

          <div>
            <h4 className="font-light text-stone-900 mb-6 text-sm tracking-wide">SHOP</h4>
            <ul className="space-y-3">
              <li><a href="/products" className="text-stone-600 hover:text-stone-900 transition-colors font-light text-sm">All Products</a></li>
              <li><a href="/products?category=seating" className="text-stone-600 hover:text-stone-900 transition-colors font-light text-sm">Seating</a></li>
              <li><a href="/products?category=tables" className="text-stone-600 hover:text-stone-900 transition-colors font-light text-sm">Dining</a></li>
              <li><a href="/products?category=lighting" className="text-stone-600 hover:text-stone-900 transition-colors font-light text-sm">Lighting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-light text-stone-900 mb-6 text-sm tracking-wide">COMPANY</h4>
            <ul className="space-y-3">
              <li><a href="/portfolio" className="text-stone-600 hover:text-stone-900 transition-colors font-light text-sm">Projects</a></li>
              <li><a href="/contact" className="text-stone-600 hover:text-stone-900 transition-colors font-light text-sm">Contact</a></li>
              <li><a href="#" className="text-stone-600 hover:text-stone-900 transition-colors font-light text-sm">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-light text-stone-900 mb-6 text-sm tracking-wide">CONTACT</h4>
            <p className="text-stone-600 font-light text-sm mb-2">hello@interiors.co</p>
            <p className="text-stone-600 font-light text-sm mb-2">+44 20 7123 4567</p>
            <p className="text-stone-600 font-light text-sm">12 Design Street<br />London, WC1 2AB</p>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8 text-center">
          <p className="text-stone-500 font-light text-sm">
            &copy; 2026 Interiors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
