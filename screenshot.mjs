import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:8082';
const label = process.argv[3] || '';

const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

let n = 1;
while (
  fs.existsSync(path.join(screenshotsDir, `screenshot-${n}${label ? '-' + label : ''}.png`))
) n++;

const filepath = path.join(screenshotsDir, `screenshot-${n}${label ? '-' + label : ''}.png`);

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Users/Admin/.cache/puppeteer/chrome/win64-145.0.7632.77/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
await new Promise((r) => setTimeout(r, 600));

// Scroll through to trigger all IntersectionObserver animations
await page.evaluate(async () => {
  await new Promise((resolve) => {
    const step = 300;
    let pos = 0;
    const timer = setInterval(() => {
      pos += step;
      window.scrollTo(0, pos);
      if (pos >= document.body.scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, 60);
  });
});

// Let animations settle, hide sticky navbar to avoid artifact, scroll back to top
await new Promise((r) => setTimeout(r, 800));
await page.evaluate(() => {
  const nav = document.querySelector('header');
  if (nav) nav.style.display = 'none';
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 200));

await page.screenshot({ path: filepath, fullPage: true });
await browser.close();
console.log('Saved: ' + filepath);
