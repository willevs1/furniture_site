import { NextResponse } from 'next/server';

const GITHUB_REPO = process.env.GITHUB_REPO || 'willevs1/furniture_site';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchFromGit(path: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  });
  if (!res.ok) {
    return null;
  }
  const text = await res.text();
  return text;
}

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  const content = await fetchFromGit('src/data/products.json');
  if (!content) {
    return NextResponse.json({ error: 'Could not fetch products.json' }, { status: 500 });
  }

  try {
    const data = JSON.parse(content);
    return NextResponse.json({ products: data });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 500 });
  }
}
