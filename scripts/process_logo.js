const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const input = 'public/logo.jpg';
  
  // 1. Get raw pixel data
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  // Find bounding box of non-white pixels
  let minX = width, minY = height, maxX = 0, maxY = 0;
  
  // Make near-white background transparent
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // If very close to white (background), make transparent
      if (r > 248 && g > 248 && b > 248) {
        data[idx + 3] = 0; // alpha = 0
      } else {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Content bounding box: [${minX}, ${minY}, ${maxX}, ${maxY}]`);

  // Save full transparent logo
  const transparentLogo = await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
    .extract({
      left: Math.max(0, minX - 10),
      top: Math.max(0, minY - 10),
      width: Math.min(width - minX, maxX - minX + 20),
      height: Math.min(height - minY, maxY - minY + 20)
    })
    .png()
    .toFile('public/logo.png');

  console.log('Saved public/logo.png');

  // Also crop the icon (the pin + airplane on the left: roughly left half of content)
  const iconWidth = Math.round((maxX - minX) * 0.42);
  await sharp('public/logo.png')
    .extract({
      left: 0,
      top: 0,
      width: iconWidth,
      height: maxY - minY + 20
    })
    .png()
    .toFile('public/logo-icon.png');

  console.log('Saved public/logo-icon.png');

  // Also create a 64x64 and 32x32 favicon/app icon
  await sharp('public/logo-icon.png')
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('src/app/icon.png');

  console.log('Saved src/app/icon.png (Favicon)');
}

processLogo().catch(console.error);
