import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const file = path.join(process.cwd(), 'src', 'data', 'projects.json');
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const projects = JSON.parse(raw);
    return NextResponse.json({ ok: true, projects });
  } catch (err) {
    return NextResponse.json({ ok: true, projects: [] });
  }
}
