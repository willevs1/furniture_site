'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-light text-stone-900 tracking-wide">
            INTERIORS
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-5 h-px bg-stone-900 block"></span>
            <span className="w-5 h-px bg-stone-900 block"></span>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-12 items-center">
            <Link href="/" className="text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide">
              HOME
            </Link>
            <Link href="/products" className="text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide">
              SHOP
            </Link>
            <Link href="/portfolio" className="text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide">
              PROJECTS
            </Link>
            <Link href="/contact" className="text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide">
              CONTACT
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-6 flex flex-col gap-6 border-t border-stone-200 pt-6">
            <Link href="/" className="text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide">
              HOME
            </Link>
            <Link href="/products" className="text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide">
              SHOP
            </Link>
            <Link href="/portfolio" className="text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide">
              PROJECTS
            </Link>
            <Link href="/contact" className="text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide">
              CONTACT
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
