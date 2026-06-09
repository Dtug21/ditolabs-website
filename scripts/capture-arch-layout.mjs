import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'index.html');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`file:///${indexPath.replace(/\\/g, '/')}`);
await page.click('#nexevoArchOpen');
await page.waitForFunction(() => document.querySelector('.arch-flow-track.is-free-layout'));
await page.waitForTimeout(1200);

const data = await page.evaluate(() => window.__archExportLayout?.());
await browser.close();

if (!data?.nodes) {
  console.error('Failed to capture layout');
  process.exit(1);
}

const out = join(root, 'js', 'arch-layout-builtin.json');
writeFileSync(out, JSON.stringify(data, null, 2));
console.log('Saved', out);
