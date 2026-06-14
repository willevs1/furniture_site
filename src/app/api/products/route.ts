import { NextResponse } from 'next/server';
import { fetchProductsFromSanity, SANITY_PROJECT_ID } from '@/lib/sanity';

export async function GET() {
  // If Sanity is configured, use it as the primary source of truth
  if (SANITY_PROJECT_ID) {
    try {
      const items = await fetchProductsFromSanity();
      return NextResponse.json({ ok: true, products: items });
    } catch (err: any) {
      // Fall through to local JSON fallback
      console.error('Sanity fetch error:', err?.message || err);
    }
  }

  // Local fallback: read the products JSON bundled with the app
  let products: any[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    products = require('@/data/products.json');
  } catch (err) {
    products = [];
  }

  return NextResponse.json({ ok: true, products });
}
