import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const assetsDir = path.join(root, "public", "brand-assets");

const images = [
  { input: "archive.jpg", output: "archive.webp", width: 900, quality: 78 },
  { input: "food-1.jpg", output: "food-1.webp", width: 1400, quality: 80 },
  { input: "food-2.jpg", output: "food-2.webp", width: 1200, quality: 80 },
  { input: "food-3.jpg", output: "food-3.webp", width: 1100, quality: 80 },
];

await mkdir(assetsDir, { recursive: true });

await Promise.all(
  images.map(async (image) => {
    await sharp(path.join(assetsDir, image.input))
      .resize({ width: image.width, withoutEnlargement: true })
      .webp({ quality: image.quality, effort: 6 })
      .toFile(path.join(assetsDir, image.output));
  }),
);

console.log(`Optimized ${images.length} brand images.`);
