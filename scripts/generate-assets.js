// One-off asset helper: favicon variants + navbar logo using sharp (globally installed)
const path = require('path');
const fs = require('fs');

const sharpPath = 'C:/Users/vinodd/AppData/Roaming/npm/node_modules/paperclipai/node_modules/sharp';
const sharp = require(sharpPath);

const imgDir = path.join(__dirname, '..', 'images');

async function main() {
  const src = path.join(imgDir, 'NXDSOL_fav.ico.png');
  const logoSrc = path.join(imgDir, 'NXDSOL_logo.png');

  // Favicon variants from the icon source
  await sharp(src).resize(16, 16).toFile(path.join(imgDir, 'favicon-16.png'));
  await sharp(src).resize(32, 32).toFile(path.join(imgDir, 'favicon-32.png'));
  await sharp(src).resize(180, 180).toFile(path.join(imgDir, 'apple-touch-icon.png'));
  console.log('favicon-16.png, favicon-32.png, apple-touch-icon.png created');

  // Navbar/footer logo: compress + downscale to 96px wide target, keep transparency
  const meta = await sharp(logoSrc).metadata();
  console.log(`source logo: ${meta.width}x${meta.height} ${path.join(imgDir, 'NXDSOL_logo.png')}`);
  await sharp(logoSrc).resize({ width: 96 }).toFile(path.join(imgDir, 'logo-navbar.png'));
  const sz = fs.statSync(path.join(imgDir, 'logo-navbar.png')).size;
  console.log(`logo-navbar.png created: ${(sz / 1024).toFixed(1)} KB`);
}

main().catch(e => { console.error(e); process.exit(1); });
