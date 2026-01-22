import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const origin = new URL(req.url).origin;
    const sitemap = `${origin.replace(/\/$/, '')}/sitemap.xml`;
    const txt = `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`;
    return new NextResponse(txt, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  } catch (e) {
    return new NextResponse('User-agent: *\nAllow: /\n', { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
}
