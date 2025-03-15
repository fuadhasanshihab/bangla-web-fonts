import fonts from '../../collections/fonts.json';

const weightNames = {
  100: 'thin',
  200: 'extralight',
  300: 'light',
  400: 'regular',
  500: 'medium',
  600: 'semibold',
  700: 'bold',
  800: 'extrabold',
  900: 'black'
};

export function getStaticPaths() {
  return fonts.map(font => ({
    params: { font: font.FontPath },
    props: font
  }));
}

export function GET({ params }) {
  const font = fonts.find(f => f.FontPath === params.font);

  if (!font) {
    return new Response('Font not found', { status: 404 });
  }

  let cssContent = font.FontWeights
    .map(weight => {
      const weightName = weightNames[weight] || `w${weight}`;
      return `@font-face {
  font-family: '${font.FontName}';
  src: url('/fonts/${font.FontPath}/${font.FontPath}-${weightName}.woff2') format('woff2');
  font-weight: ${weight};
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
