const sharp = require('sharp');
const fs = require('fs');

async function fixFavicons() {
  const input = 'public/favicon-source.jpg';

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      if (r > 248 && g > 248 && b > 248) {
        data[idx + 3] = 0;
      } else if (r > 235 && g > 235 && b > 235) {
        const avg = (r + g + b) / 3;
        data[idx + 3] = Math.round(255 * (1 - (avg - 235) / (255 - 235)));
        if (data[idx + 3] > 30) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      } else {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cropWidth = maxX - minX;
  const cropHeight = maxY - minY;
  const size = Math.max(cropWidth, cropHeight);
  const padX = Math.round((size - cropWidth) / 2);
  const padY = Math.round((size - cropHeight) / 2);

  const cropped = await sharp(data, {
    raw: { width, height, channels: 4 }
  })
    .extract({
      left: Math.max(0, minX),
      top: Math.max(0, minY),
      width: cropWidth,
      height: cropHeight
    })
    .extend({
      top: padY + 16,
      bottom: padY + 16,
      left: padX + 16,
      right: padX + 16,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  // 1. Overwrite OLD src/app/favicon.ico with new 32x32 PNG-based icon
  const ico32 = await sharp(cropped)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync('src/app/favicon.ico', ico32);
  fs.writeFileSync('public/favicon.ico', ico32);
  fs.writeFileSync('public/favicon.png', ico32);
  console.log('Updated src/app/favicon.ico, public/favicon.ico, public/favicon.png');

  // 2. 64x64 icon.png
  const icon64 = await sharp(cropped)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync('src/app/icon.png', icon64);
  fs.writeFileSync('src/app/[locale]/icon.png', icon64);
  fs.writeFileSync('public/icon.png', icon64);
  console.log('Updated src/app/icon.png, src/app/[locale]/icon.png, public/icon.png');

  // 3. 180x180 apple-icon.png
  const apple180 = await sharp(cropped)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync('src/app/apple-icon.png', apple180);
  fs.writeFileSync('src/app/[locale]/apple-icon.png', apple180);
  fs.writeFileSync('public/apple-icon.png', apple180);
  console.log('Updated apple-icon.png files');
}

fixFavicons().catch(console.error);
