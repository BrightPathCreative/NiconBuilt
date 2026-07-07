import fs from "fs";
import path from "path";
import sharp from "sharp";

const BLOG_IMAGES_DIR = "/Volumes/LaCieDrive/NiconBuilt/Blogs/Blog Images";
const LIBRARY_DIR = path.resolve(process.cwd(), "../05 Assets & Branding/Images");
const OUT_DIR = path.resolve(process.cwd(), "public/images/blog");

const MAP = {
  "build-your-home-efficiently-and-affordably-with-nicon-built": {
    dir: BLOG_IMAGES_DIR,
    file: "Build Your Home Efficiently and Affordably with Nicon Built.jpg",
  },
  "how-to-keep-your-build-within-budget": {
    dir: BLOG_IMAGES_DIR,
    file: "How to Keep Your Build Within Budget.jpg",
  },
  "the-keys-to-a-successful-modern-heritage-extension": {
    dir: BLOG_IMAGES_DIR,
    file: "The Keys to a Successful Modern Heritage Extension.jpg",
  },
  "top-building-tips-from-an-architectural-builder": {
    dir: BLOG_IMAGES_DIR,
    file: "Top Building Tips From An Architectural Builder.jpg",
  },
  "the-importance-of-collaboration-in-building": {
    dir: BLOG_IMAGES_DIR,
    file: "The Importance of Collaboration in Building.jpg",
  },
  "how-to-design-for-a-narrow-block": {
    dir: BLOG_IMAGES_DIR,
    file: "How to Design for a Narrow Block.png",
  },
  "fabulous-at-40-why-experience-matters-in-building": {
    dir: LIBRARY_DIR,
    file: "nicon-built-modern-kitchen-marble-benchtop-timber-staircase-heritage.jpg",
  },
  "understanding-prime-cost-and-provisional-sum": {
    dir: LIBRARY_DIR,
    file: "nicon-built-open-plan-kitchen-gable-window-wall-natural-light.jpg",
  },
};

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const [slug, { dir, file }] of Object.entries(MAP)) {
    const src = path.join(dir, file);
    if (!fs.existsSync(src)) {
      console.warn(`✗ Missing source for ${slug}: ${src}`);
      continue;
    }
    const dest = path.join(OUT_DIR, `${slug}.webp`);
    await sharp(src)
      .rotate()
      .resize(1600, undefined, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    console.log(`✓ ${slug}.webp (from ${dir === LIBRARY_DIR ? "library" : "supplied"}: ${file})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
