import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const assetsDir = path.join(publicDir, "brand-assets");
const logoPath = path.join(assetsDir, "logo.png");

const flameMark = await sharp(logoPath)
  .extract({ left: 0, top: 0, width: 80, height: 110 })
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .resize({ height: 270 })
  .png()
  .toBuffer();
const flameMetadata = await sharp(flameMark).metadata();

const iconBadge = await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: "#15100d",
  },
})
  .composite([
    {
      input: Buffer.from(`
        <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
          <rect x="44" y="44" width="424" height="424" rx="116" fill="#fffaf1"/>
        </svg>
      `),
    },
    {
      input: flameMark,
      top: 121,
      left: Math.round((512 - (flameMetadata.width ?? 0)) / 2),
    },
  ])
  .png()
  .toBuffer();

const iconSizes = [32, 48, 192, 512];
await Promise.all([
  ...iconSizes.map((size) =>
    sharp(iconBadge)
      .resize(size, size, { fit: "fill" })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, `favicon-${size}x${size}.png`)),
  ),
  sharp(iconBadge)
    .resize(180, 180, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "apple-touch-icon.png")),
]);

const logo = await sharp(logoPath).resize({ width: 410 }).png().toBuffer();
const overlay = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#130d0b" stop-opacity="1"/>
        <stop offset="0.54" stop-color="#241715" stop-opacity="0.96"/>
        <stop offset="0.79" stop-color="#241715" stop-opacity="0.24"/>
        <stop offset="1" stop-color="#241715" stop-opacity="0.04"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <rect x="58" y="48" width="452" height="226" rx="18" fill="#fffaf1"/>
    <rect x="58" y="310" width="88" height="8" rx="4" fill="#e4072d"/>
    <text x="58" y="382" fill="#fff4df" font-family="Arial, sans-serif" font-size="50" font-weight="800">
      LEBANON'S CHARCOAL
    </text>
    <text x="58" y="441" fill="#fff4df" font-family="Arial, sans-serif" font-size="50" font-weight="800">
      CHICKEN.
    </text>
    <text x="58" y="505" fill="#f5b84d" font-family="Arial, sans-serif" font-size="29" font-weight="700">
      Fired since 1987 · Order 1535
    </text>
    <text x="58" y="564" fill="#fff4df" fill-opacity="0.7" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="3">
      AHMAD AL ABDALLA · LEBANON
    </text>
  </svg>
`);

const socialPreview = await sharp(path.join(assetsDir, "food-1.webp"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: 60, left: 78 },
  ])
  .jpeg({ quality: 90, chromaSubsampling: "4:4:4", progressive: true })
  .toBuffer();

await Promise.all([
  sharp(socialPreview).toFile(path.join(publicDir, "og-image.jpg")),
  sharp(socialPreview).toFile(path.join(publicDir, "social-preview-1200x630.jpg")),
]);

console.log("Generated favicon set, Apple touch icon, and social preview images.");
