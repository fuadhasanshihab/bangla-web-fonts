import fonts from '../collections/fonts.json';

export function GET() {
  const siteUrl = "https://banglawebfonts.pages.dev";

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
  </url>
`;

  xmlContent += fonts
    .map(font => {
      return `  <url>
    <loc>${siteUrl}/${font.FontPath}/</loc>
  </url>`;
    })
    .join('\n');

  xmlContent += `\n</urlset>`;

  return new Response(xmlContent, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
