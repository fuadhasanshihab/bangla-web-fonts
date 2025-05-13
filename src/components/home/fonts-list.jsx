/** @jsxImportSource preact */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import FontCard from './font-card.jsx'; // Ensure this is also a Preact component

const FontsList = () => {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    import('../../collections/fonts.json').then((mod) => setFonts(mod.default));
  }, []);

  return (
    <section class="max-w-3xl my-12 mx-auto px-7 lg:px-0">
      <div class="grid items-stretch w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-7 mt-7">
        {fonts.map((font) => (
          <FontCard
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
