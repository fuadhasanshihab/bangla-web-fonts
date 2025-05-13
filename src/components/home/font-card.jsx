/** @jsxImportSource preact */
import { h } from 'preact';

const FontCard = ({ FontName, TotalStyles, FontFamily, FontPath }) => {
  return (
    <div class="p-4 border rounded">
      <h2 class="font-bold">{FontName}</h2>
      <p>{TotalStyles} styles</p>
      <p style={{ fontFamily: FontFamily }}>Example text</p>
      <a href={FontPath} class="text-blue-600">Download</a>
    </div>
  );
};

export default FontCard;
