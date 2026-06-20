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

const { data: logoPixels, info: logoInfo } = await sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let index = 0; index < logoPixels.length; index += 4) {
  if (logoPixels[index + 3] === 0) continue;
  logoPixels[index] = 255;
  logoPixels[index + 1] = 244;
  logoPixels[index + 2] = 223;
}

const socialLogo = await sharp(logoPixels, { raw: logoInfo })
  .resize({ width: 650 })
  .png()
  .toBuffer();
const socialLogoMetadata = await sharp(socialLogo).metadata();
const socialBackground = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="red" cx="50%" cy="42%" r="78%">
        <stop offset="0" stop-color="#ed1238"/>
        <stop offset="0.68" stop-color="#e4072d"/>
        <stop offset="1" stop-color="#bd061f"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#red)"/>
  </svg>
`);

const socialPreview = await sharp(socialBackground)
  .composite([
    {
      input: socialLogo,
      left: Math.round((1200 - (socialLogoMetadata.width ?? 650)) / 2),
      top: Math.round((630 - (socialLogoMetadata.height ?? 0)) / 2),
    },
  ])
  .jpeg({ quality: 94, chromaSubsampling: "4:4:4", progressive: true })
  .toBuffer();

await Promise.all([
  sharp(socialPreview).toFile(path.join(publicDir, "og-image.jpg")),
  sharp(socialPreview).toFile(path.join(publicDir, "social-preview-1200x630.jpg")),
  sharp(socialPreview).toFile(path.join(publicDir, "social-preview-minimal-red-1200x630.jpg")),
]);

console.log("Generated favicon set, Apple touch icon, and social preview images.");
