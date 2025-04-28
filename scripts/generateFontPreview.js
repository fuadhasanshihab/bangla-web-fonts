const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Converts folder-name to font family readable name
function toFontFamily(name) {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function generateFontPreview(fontDir) {
    const fontFolder = path.basename(fontDir);
    const fontFamily = toFontFamily(fontFolder);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const html = `
    <html>
      <head>
        <link href="https://banglawebfonts.pages.dev/css/webfonts.min.css" rel="stylesheet">
        <style>
          body {
            margin: 0;
            width: 1280px;
            height: 720px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
            font-family: "${fontFamily}", sans-serif;
            font-size: 64px;
          }
        </style>
      </head>
      <body>
        ${fontFamily}
      </body>
    </html>
    `;

    await page.setContent(html);
    const outputPath = path.join(fontDir, 'font-preview.png');
    await page.screenshot({ path: outputPath, clip: { x: 0, y: 0, width: 1280, height: 720 } });

    await browser.close();
}

async function main() {
    const baseDir = path.join(__dirname, '../public/fonts');
    const folders = fs.readdirSync(baseDir).filter(file => fs.statSync(path.join(baseDir, file)).isDirectory());

    for (const folder of folders) {
        const fontDir = path.join(baseDir, folder);
        console.log(`Generating preview for ${folder}`);
        await generateFontPreview(fontDir);
    }
}

main();
