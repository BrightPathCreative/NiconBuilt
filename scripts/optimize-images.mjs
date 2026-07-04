import fs from "fs";
import path from "path";
import sharp from "sharp";

const ASSETS_DIR = path.resolve(
  process.cwd(),
  "../05 Assets & Branding/Images"
);
const LOGO_DIR = path.resolve(
  process.cwd(),
  "../05 Assets & Branding/Logo & Branding information"
);
const OUT_DIR = path.resolve(process.cwd(), "public/images");

/** Image slot → source filename mapping */
const IMAGE_MAP = {
  "home-hero-bg":
    "nicon-built-heritage-renovation-facade-white-picket-fence-entry-path.jpg",
  "about-nick-portrait":
    "nicon-built-nick-kafkalas-director-portrait-melbourne-builder.jpg",
  "heritage-renovations-page-01":
    "nicon-built-red-brick-heritage-home-arched-entry-manicured-lawn.jpg",
  "heritage-extensions-page-01":
    "nicon-built-heritage-home-extension-verandah-fretwork-dusk.jpg",
  "kitchen-renovations-page-01":
    "nicon-built-white-shaker-kitchen-island-vaulted-ceiling-heritage.jpg",
  "bathroom-renovations-page-01":
    "nicon-built-luxury-bathroom-freestanding-bath-skylight-gold-tapware.jpg",
  "home-renovations-page-01":
    "nicon-built-rear-extension-bifold-doors-deck-heritage-renovation.jpg",
  "trades-maintenance-page-01":
    "nicon-built-builder-on-site-pergola-construction-weatherboard.jpeg",
  "new-builds-page-01":
    "nicon-built-modern-two-storey-new-home-white-render-landscaped.jpg",
  "service-area-map":
    "nicon-built-service-area-map-melbourne-inner-south-bayside.png",
};

const GALLERY_SOURCES = [
  "nicon-built-heritage-weatherboard-cottage-white-picket-fence-melbourne.jpg",
  "nicon-built-open-plan-kitchen-dining-outdoor-deck-heritage.jpg",
  "nicon-built-modern-bathroom-marble-tiles-freestanding-bath-timber-vanity.jpg",
  "nicon-built-navy-kitchen-marble-benchtop-gold-tapware-pendants.jpg",
  "nicon-built-two-storey-extension-pergola-outdoor-dining-dusk.jpg",
  "nicon-built-heritage-brick-home-courtyard-bluestone-paving-bifold-doors.jpg",
  "nicon-built-modern-extension-pool-glass-fence-timber-deck.jpg",
  "nicon-built-white-galley-kitchen-gold-tapware-timber-floors.jpg",
  "nicon-built-luxury-kitchen-navy-cabinetry-marble-benchtop-pool-view.webp",
  "nicon-built-indoor-outdoor-entertaining-bifold-doors-fireplace-dusk.jpg",
  "nicon-built-victorian-terrace-verandah-checkerboard-tiles-entry.jpg",
  "nicon-built-heritage-cottage-facade-gabled-roof-restored-melbourne.jpg",
];

async function optimizeImage(srcPath, destPath, options = {}) {
  const { width = 1920, quality = 82 } = options;
  await sharp(srcPath)
    .rotate()
    .resize(width, undefined, { withoutEnlargement: true })
    .webp({ quality })
    .toFile(destPath);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), "public"), { recursive: true });

  for (const [slot, filename] of Object.entries(IMAGE_MAP)) {
    const src = path.join(ASSETS_DIR, filename);
    if (!fs.existsSync(src)) {
      console.warn(`Missing source for ${slot}: ${filename}`);
      continue;
    }
    const maxWidth = slot.includes("portrait") ? 800 : slot.includes("map") ? 1200 : 1920;
    await optimizeImage(src, path.join(OUT_DIR, `${slot}.webp`), {
      width: maxWidth,
      quality: slot === "home-hero-bg" ? 78 : 82,
    });
    console.log(`✓ ${slot}.webp`);
  }

  let i = 1;
  for (const filename of GALLERY_SOURCES) {
    const src = path.join(ASSETS_DIR, filename);
    if (!fs.existsSync(src)) continue;
    const slot = `our-work-gallery-${String(i).padStart(2, "0")}`;
    await optimizeImage(src, path.join(OUT_DIR, `${slot}.webp`), {
      width: 1200,
      quality: 80,
    });
    console.log(`✓ ${slot}.webp`);
    i++;
  }

  const heroSrc = path.join(ASSETS_DIR, IMAGE_MAP["home-hero-bg"]);
  if (fs.existsSync(heroSrc)) {
    await sharp(heroSrc)
      .rotate()
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(path.join(OUT_DIR, "og-image.webp"));
    console.log("✓ og-image.webp");
  }

  const logoSvg = path.join(LOGO_DIR, "logo-nicon.svg");
  if (fs.existsSync(logoSvg)) {
    fs.copyFileSync(logoSvg, path.join(process.cwd(), "public/logo.svg"));
  }

  const faviconSrc = path.join(LOGO_DIR, "nicon-built-favicon.png");
  if (fs.existsSync(faviconSrc)) {
    await sharp(faviconSrc).resize(512, 512).png().toFile(path.join(process.cwd(), "public/icon.png"));
    await sharp(faviconSrc).resize(180, 180).png().toFile(path.join(process.cwd(), "public/apple-icon.png"));
    await sharp(faviconSrc).resize(32, 32).png().toFile(path.join(process.cwd(), "public/favicon.png"));
    console.log("✓ favicons");
  }
}

main().catch(console.error);
