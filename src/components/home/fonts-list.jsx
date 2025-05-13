/** @jsxImportSource preact */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const FontsList = () => {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    import('../../collections/fonts.json').then((mod) => setFonts(mod.default));
  }, []);

  const FontCard = ({ FontName, TotalStyles, FontFamily, FontPath }) => (
    <div class="p-4 border rounded shadow-sm">
      <h2 class="text-lg font-semibold">{FontName}</h2>
      <p class="text-sm text-gray-600">{TotalStyles} styles</p>
      <p style={{ fontFamily: FontFamily }} class="mt-2">
        The quick brown fox jumps over the lazy dog.
      </p>
      <a href={FontPath} class="text-blue-600 text-sm mt-2 inline-block">Download</a>
    </div>
  );

  return (
    <section class="max-w-3xl my-12 mx-auto px-7 lg:px-0">
      <div class="grid items-stretch w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-7 mt-7">
        {fonts.map((font) => (
          <FontCard
            key={font.FontName}
            FontName={font.FontName}
            TotalStyles={font.TotalStyles}
            FontFamily={font.FontFamily}
            FontPath={font.FontPath}
          />
        ))}
      </div>
    </section>
  );
};

export default FontsList;
