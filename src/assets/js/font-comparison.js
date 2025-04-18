const fontJsonUrl = "https://cdn.jsdelivr.net/gh/fuadhasanshihab/bangla-web-fonts@main/src/collections/fonts.json";
const fontASelect = document.getElementById("fontA");
const fontBSelect = document.getElementById("fontB");
const sampleTextArea = document.getElementById("sampleText");
const comparisonDiv = document.getElementById("comparison");

let fonts = [];

function loadFontCSS(fontPath) {
  if (document.getElementById("font-css-" + fontPath)) return;
  const link = document.createElement("link");
  link.id = "font-css-" + fontPath;
  link.rel = "stylesheet";
  link.href = `https://banglawebfonts.pages.dev/css/${fontPath}.css`;
  document.head.appendChild(link);
}

function getWeightLabel(weight) {
  const map = {
    100: "Thin 100",
    200: "ExtraLight 200",
    300: "Light 300",
    400: "Regular 400",
    500: "Medium 500",
    600: "SemiBold 600",
    700: "Bold 700",
    800: "ExtraBold 800",
    900: "Black 900",
  };
  return map[weight] || `Weight ${weight}`;
}

function renderFontCard(font, text) {
  return `
    <div class="bg-white dark:bg-gray-800 px-5 py-5 rounded-xl border border-gray-200 dark:border-gray-700">
      <h2 class="text-2xl font-semibold mb-1">
        <a href="https://banglawebfonts.pages.dev/${font.FontPath}" class="text-blue-600 dark:text-blue-400 hover:underline">
          ${font.FontName}
        </a>
      </h2>
      <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">${font.TotalStyles} Styles</p>
      <div class="space-y-3">
        ${font.FontTesterWeights.map(weight => `
          <div class="flex flex-col gap-0">
            <span class="text-sm text-gray-600 dark:text-gray-400">${getWeightLabel(weight)}</span>
            <p style="font-family: ${font.FontFamily};font-weight: ${weight};" class="text-xl leading-relaxed">${text}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function updateComparison() {
  const text = sampleTextArea.value.trim() || 'মোদের গরব, মোদের আশা, আ-মরি বাংলা ভাষা!';
  const fontA = fonts.find(f => f.FontPath === fontASelect.value);
  const fontB = fonts.find(f => f.FontPath === fontBSelect.value);
  if (!fontA || !fontB) return;
  comparisonDiv.innerHTML = renderFontCard(fontA, text) + renderFontCard(fontB, text);
}

function populateSelectors() {
  fontASelect.innerHTML = fonts.map(font =>
    `<option value="${font.FontPath}">${font.FontName}</option>`
  ).join('');
  fontBSelect.innerHTML = fonts.map((font, i) =>
    `<option value="${font.FontPath}" ${i === 1 ? 'selected' : ''}>${font.FontName}</option>`
  ).join('');
}

fetch(fontJsonUrl)
  .then(res => res.json())
  .then(data => {
    fonts = data;
    populateSelectors();
    loadFontCSS(fonts[0].FontPath);
    loadFontCSS(fonts[1].FontPath);
    updateComparison();

    fontASelect.addEventListener("change", () => {
      loadFontCSS(fontASelect.value);
      updateComparison();
    });
    fontBSelect.addEventListener("change", () => {
      loadFontCSS(fontBSelect.value);
      updateComparison();
    });
    sampleTextArea.addEventListener("input", updateComparison);
  })
  .catch(err => {
    comparisonDiv.innerHTML = `<p class="text-red-600">Error loading fonts. Please refresh this page!</p>`;
    console.error("Error fetching fonts:", err);
  });
