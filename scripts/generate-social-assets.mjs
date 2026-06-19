import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const assetsDir = path.join(publicDir, "brand-assets");
const logoPath = path.join(assetsDir, "logo.png");

const iconSource = await sharp(logoPath)
  .extract({ left: 0, top: 42, width: 78, height: 210 })
  .png()
  .toBuffer();

await Promise.all([
  sharp(iconSource)
    .resize({ width: 32, height: 32, fit: "contain", background: "#fffaf1" })
    .png()
    .toFile(path.join(publicDir, "favicon-32x32.png")),
  sharp(iconSource)
    .resize({ width: 180, height: 180, fit: "contain", background: "#fffaf1" })
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png")),
]);

const logo = await sharp(logoPath).resize({ width: 410 }).png().toBuffer();
const overlay = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#130d0b" stop-opacity="0.98"/>
        <stop offset="0.5" stop-color="#241715" stop-opacity="0.94"/>
        <stop offset="0.78" stop-color="#241715" stop-opacity="0.34"/>
        <stop offset="1" stop-color="#241715" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <rect x="58" y="52" width="452" height="226" rx="12" fill="#fff"/>
    <rect x="58" y="318" width="72" height="7" fill="#e4072d"/>
    <text x="58" y="382" fill="#fff4df" font-family="Arial, sans-serif" font-size="48" font-weight="800">
      LEBANON'S CHARCOAL
    </text>
    <text x="58" y="438" fill="#fff4df" font-family="Arial, sans-serif" font-size="48" font-weight="800">
      CHICKEN.
    </text>
    <text x="58" y="500" fill="#f5b84d" font-family="Arial, sans-serif" font-size="28" font-weight="700">
      Fired since 1987 · Order 1535
    </text>
  </svg>
`);

await sharp(path.join(assetsDir, "food-1.webp"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: 60, left: 78 },
  ])
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile(path.join(publicDir, "og-image.jpg"));

console.log("Generated favicon, Apple touch icon, and Open Graph image.");
