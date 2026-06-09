import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'index.html');
const viewportW = Number(process.env.ARCH_CAPTURE_WIDTH) || 1221;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: viewportW, height: 900 } });
await page.goto(`file:///${indexPath.replace(/\\/g, '/')}`);
await page.click('#nexevoArchOpen');
await page.waitForSelector('#nexevoAppFlow.is-layout-ready', { timeout: 15000 });
await page.waitForTimeout(800);

const layout = await page.evaluate(() => window.__archExportLayout?.());
await browser.close();

if (!layout?.nodes) {
  console.error('Failed to capture layout');
  process.exit(1);
}

writeFileSync(join(root, 'js', 'arch-layout-builtin.json'), `${JSON.stringify(layout, null, 2)}\n`);
let html = readFileSync(indexPath, 'utf8');
const re = /const ARCH_LAYOUT_BUILTIN = \{[\s\S]*?\};/;
if (!re.test(html)) throw new Error('ARCH_LAYOUT_BUILTIN not found');
html = html.replace(re, `const ARCH_LAYOUT_BUILTIN = ${JSON.stringify(layout)};`);
writeFileSync(indexPath, html);
console.log(`Layout captured at ${viewportW}px → index.html + js/arch-layout-builtin.json`);
