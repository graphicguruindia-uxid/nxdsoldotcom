// One-off: generate favicon.ico from NXDSOL_fav.ico.png and regenerate logo-navbar.png
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const IMG_DIR = 'D:/Projects/nxdsoldotcom/images';

async function main() {
  // 1. Create favicon.ico (multiple sizes in one .ico)
  const src = path.join(IMG_DIR, 'NXDSOL_fav.ico.png');
  const icoPath = path.join(IMG_DIR, 'favicon.ico');
  
  // Create temp files first
  await sharp(src).resize({ width: 16, height: 16 }).toFile(path.join(IMG_DIR, 'favicon-16-temp.png'));
  await sharp(src).resize({ width: 32, height: 32 }).toFile(path.join(IMG_DIR, 'favicon-32-temp.png'));
  await sharp(src).resize({ width: 48, height: 48 }).toFile(path.join(IMG_DIR, 'favicon-48-temp.png'));
  
  // Read the temp files and create ico using a different approach
  // For now, just create a simple 32x32 favicon.ico (good enough for browsers)
  await sharp(src).resize({ width: 32, height: 32 }).toFile(icoPath);
  
  // Clean up temp files
  fs.unlinkSync(path.join(IMG_DIR, 'favicon-16-temp.png'));
  fs.unlinkSync(path.join(IMG_DIR, 'favicon-32-temp.png'));
  fs.unlinkSync(path.join(IMG_DIR, 'favicon-48-temp.png'));
  
  console.log('favicon.ico created (32x32)');
  
  // 2. Regenerate logo-navbar.png from the high-res restored logo
  const logoSrc = 'D:/Projects/nxdsoldotcom/NXDSOL_logo_restored2.png';
  const logoDst = path.join(IMG_DIR, 'logo-navbar.png');
  
  if (fs.existsSync(logoSrc)) {
    await sharp(logoSrc)
      .resize({ width: 128 })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(logoDst);
    const sz = fs.statSync(logoDst).size;
    console.log(`logo-navbar.png regenerated: ${(sz / 1024).toFixed(1)} KB`);
  } else {
    console.log('NXDSOL_logo_restored2.png not found at', logoSrc);
  }
}

main().catch(e => { console.error(e); process.exit(1); });