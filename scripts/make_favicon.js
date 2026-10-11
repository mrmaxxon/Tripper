const sharp = require('sharp');

async function generateFavicons() {
  const input = 'public/favicon-source.jpg';

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  let minX = width, minY = height, maxX = 0, maxY = 0;

  // Make near-white pixels transparent with soft alpha thresholding
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // If near white
      if (r > 248 && g > 248 && b > 248) {
        data[idx + 3] = 0;
      } else if (r > 235 && g > 235 && b > 235) {
        // Soft edge antialiasing
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

  console.log(`Bounding box: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);

  const cropWidth = maxX - minX;
  const cropHeight = maxY - minY;
  const size = Math.max(cropWidth, cropHeight);
  const padX = Math.round((size - cropWidth) / 2);
  const padY = Math.round((size - cropHeight) / 2);

  // 1. High-res transparent emblem
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

  // Save high-res emblem
  await sharp(cropped).png().toFile('public/logo-icon.png');
  console.log('Saved public/logo-icon.png');

  // Save 32x32 standard favicon.png
  await sharp(cropped)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/favicon.png');
  console.log('Saved public/favicon.png');

  // Save 32x32 to public/favicon.ico
  await sharp(cropped)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/favicon.ico');
  console.log('Saved public/favicon.ico');

  // Next.js App Router root icon: src/app/icon.png (64x64)
  await sharp(cropped)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('src/app/icon.png');
  console.log('Saved src/app/icon.png');

  // Next.js Apple touch icon: src/app/apple-icon.png (180x180)
  await sharp(cropped)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('src/app/apple-icon.png');
  console.log('Saved src/app/apple-icon.png');
}

generateFavicons().catch(console.error);
