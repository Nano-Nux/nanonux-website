import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const origin = new URL(req.url).origin;
    const routes = ['/', '/en', '/mm'];
    const urls = routes
      .map((r) => {
        return `<url><loc>${origin.replace(/\/$/, '') + r}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
      })
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
  </urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (e) {
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
