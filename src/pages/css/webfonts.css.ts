import fonts from '../../collections/fonts.json';

export function GET() {
  let cssContent = fonts
    .map(font => {
      return `
@font-face {
  font-family: '${font.FontName}';
  src: url('/fonts/${font.FontPath}/${font.FontPath}-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;
    })
    .join('');

  return new Response(cssContent, {
    headers: { 'Content-Type': 'text/css' },
  });
}
