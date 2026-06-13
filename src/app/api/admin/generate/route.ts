import { NextResponse } from 'next/server';

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

async function callOpenAI(prompt: string) {
  // Use a configurable model and tight limits to reduce token usage/costs.
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a concise product copywriter. Return JSON only.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.0,
      max_tokens: 200,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI error: ${txt}`);
  }

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content;
  return { content, usage: json.usage };
}

function extractJSON(text: string) {
  // Try to find the first {...} block and parse it
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  const candidate = text.slice(start, end + 1);
  try {
    return JSON.parse(candidate);
  } catch (err) {
    return null;
  }
}

export async function POST(req: Request) {
  if (!OPENAI_KEY) {
    return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 });
  }
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD not configured' }, { status: 500 });
  }

  const body = await req.json();
  const { password, product } = body;
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prompt = `Create concise product copy and SEO meta for the following product.

Product name: ${product.name}
Category: ${product.category}
Existing description: ${product.description || ''}

Return a JSON object only (no surrounding text) with these keys:
- description: a 1-2 sentence polished product description (UK tone)
- alt: a short descriptive alt text for the product image (<=125 chars)
- metaTitle: a page title (<=60 chars)
- metaDescription: a meta description (<=160 chars)

Ensure valid JSON output.`;

  try {
    const { content: text, usage } = await callOpenAI(prompt);
    let parsed = null;
    if (text) parsed = extractJSON(text);
    if (!parsed && text) {
      // fallback: try parsing the whole text
      try {
        parsed = JSON.parse(text as string);
      } catch (_) {
        parsed = null;
      }
    }
    return NextResponse.json({ result: parsed, usage });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
