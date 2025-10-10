const FontCard = ({ FontName, TotalStyles, FontFamily, FontPath }) => (
  <div class="border p-4 rounded-lg shadow hover:shadow-md transition">
    <h2 class="text-lg font-semibold">{FontName}</h2>
    <p class="text-sm">Total Styles: {TotalStyles}</p>
    <p class="text-sm">Font Family: {FontFamily}</p>
    <p class="text-sm truncate">{FontPath}</p>
  </div>
);

export default FontCard;
