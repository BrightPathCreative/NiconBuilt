import type { FaqItem } from "@/lib/copy";

export type TradeService = {
  title: string;
  shortTitle: string;
  slug: string;
  metaKey: string;
  breadcrumbName: string;
  headline: string;
  subheadline: string;
  paragraphs: string[];
  bullets: string[];
  faqs: FaqItem[];
};

const sharedAreas =
  "Port Melbourne, Albert Park, Middle Park, South Melbourne, Elwood, Brighton, Hampton, Sandringham, Armadale, Malvern, South Yarra, Williamstown, Moorabbin, Bentleigh, Caulfield, Elsternwick, Camberwell, Hawthorn, Kew, and surrounding suburbs.";

const sharedIntro =
  "You brief us once. Nicon Built coordinates the right trade from a network built over 30 years, manages scheduling and quality, and makes sure the work is done properly. No chasing individual tradies.";

export const tradeServices: TradeService[] = [
  {
    title: "Painting Melbourne",
    shortTitle: "Painting",
    slug: "/painting-melbourne/",
    metaKey: "painting-melbourne",
    breadcrumbName: "Painting Melbourne",
    headline: "Painting Melbourne | Interior & Exterior | Nicon Built",
    subheadline: "Interior and exterior painting, fully managed by a licensed builder.",
    paragraphs: [
      "A quality paint job is more than rolling colour onto a wall. Preparation, product selection, and timing all matter — especially in period homes where surfaces need the right approach before a brush touches them.",
      sharedIntro,
      "Whether it's a single room refresh, a full interior repaint, or exterior work on a heritage home, every painting job is held to the same standard.",
    ],
    bullets: [
      "Interior painting — walls, ceilings, trim, and feature areas",
      "Exterior painting — facades, eaves, and period detailing",
      "Surface preparation and repairs before painting",
      "Heritage-appropriate finishes where required",
      "Coordinated with plastering, carpentry, and other trades",
    ],
    faqs: [
      {
        question: "Do you handle both interior and exterior painting?",
        answer:
          "Yes. Interior and exterior painting across Melbourne's inner south and bayside suburbs, from single rooms through to full home repaints.",
      },
      {
        question: "Can painting be combined with other trade work?",
        answer:
          "Absolutely. Painting is often part of a larger maintenance or renovation scope. Nicon Built sequences all trades in the right order so you're not repainting before plastering is finished, for example.",
      },
      {
        question: "What areas do you cover?",
        answer: sharedAreas,
      },
    ],
  },
  {
    title: "Plastering Melbourne",
    shortTitle: "Plastering",
    slug: "/plastering-melbourne/",
    metaKey: "plastering-melbourne",
    breadcrumbName: "Plastering Melbourne",
    headline: "Plastering Melbourne | Repairs & Finishing | Nicon Built",
    subheadline: "Plaster repairs and finishing, coordinated by a licensed builder.",
    paragraphs: [
      "Cracks, water damage, patchy finishes, or walls that need to be brought back to a clean surface before painting — plastering work needs to be done right the first time.",
      sharedIntro,
      "From small patch repairs through to full room replastering, every job is managed and quality-checked before the next trade steps in.",
    ],
    bullets: [
      "Patch repairs and crack remediation",
      "Full room replastering",
      "Cornice and decorative plasterwork repairs",
      "Water-damage remediation",
      "Sequenced with painting and other finishing trades",
    ],
    faqs: [
      {
        question: "Do you handle small plaster repairs?",
        answer:
          "Yes. No minimum job size. A single patch repair is handled with the same care as a full room.",
      },
      {
        question: "Can you work on period homes?",
        answer:
          "Yes. Nicon Built has 30+ years working inside Melbourne's Victorian, Edwardian, and Federation housing stock and understands the quirks of older wall constructions.",
      },
      {
        question: "What areas do you cover?",
        answer: sharedAreas,
      },
    ],
  },
  {
    title: "Tiling and Caulking Melbourne",
    shortTitle: "Tiling & Caulking",
    slug: "/tiling-and-caulking-melbourne/",
    metaKey: "tiling-and-caulking-melbourne",
    breadcrumbName: "Tiling and Caulking Melbourne",
    headline: "Tiling and Caulking Melbourne | Bathrooms, Kitchens & Floors | Nicon Built",
    subheadline: "Wall and floor tiling plus professional caulking and sealing, fully coordinated in the right sequence.",
    paragraphs: [
      "Tiling done in the wrong order — or on surfaces that aren't properly prepared — causes problems that take years to show. Waterproofing before wall tiles. Substrate prep before floor tiles. Fresh silicone where wet areas meet fixtures. The sequence matters.",
      sharedIntro,
      "From a single bathroom retile through to kitchen splashbacks, floor tiling, and re-caulking showers and benchtops, every job is sequenced and quality-checked.",
    ],
    bullets: [
      "Bathroom wall and floor tiling",
      "Kitchen splashbacks and floor tiling",
      "Waterproofing coordination before tiling",
      "Tile removal and substrate preparation",
      "Ensuite and laundry tiling",
      "Bathroom and kitchen caulking and sealing",
      "Window and door frame re-caulking",
    ],
    faqs: [
      {
        question: "Do you handle bathroom retiling only?",
        answer:
          "Yes. A single bathroom retile is a common job. Nicon Built manages waterproofing, tiling, caulking, and any plumbing or fixture work in the correct sequence.",
      },
      {
        question: "Is caulking a standalone job?",
        answer:
          "Yes. Re-caulking a shower, bath, or kitchen benchtop is a common standalone maintenance job. No minimum size.",
      },
      {
        question: "Do I need to arrange waterproofing separately?",
        answer:
          "No. Nicon Built coordinates waterproofing as part of the job where required, ensuring it's completed to building code standards before tiles go on.",
      },
      {
        question: "What areas do you cover?",
        answer: sharedAreas,
      },
    ],
  },
  {
    title: "Plumbing Maintenance Melbourne",
    shortTitle: "Plumbing",
    slug: "/plumbing-maintenance-melbourne/",
    metaKey: "plumbing-maintenance-melbourne",
    breadcrumbName: "Plumbing Maintenance Melbourne",
    headline: "Plumbing Maintenance Melbourne | Repairs & Upgrades | Nicon Built",
    subheadline: "Plumbing maintenance and repairs. Carried out by licensed plumbers, coordinated by Nicon Built.",
    paragraphs: [
      "Leaking taps, slow drains, fixture upgrades, or plumbing that needs attention before other trades can start — plumbing maintenance needs someone who understands how it fits into the bigger picture.",
      sharedIntro,
      "Nicon Built coordinates licensed plumbers from a trusted network and sequences their work with tiling, painting, and structural trades as needed.",
    ],
    bullets: [
      "Tap and fixture replacements",
      "Leak detection and repair",
      "Drain clearing and maintenance",
      "Pre-renovation plumbing rough-in coordination",
      "Bathroom and kitchen plumbing upgrades",
    ],
    faqs: [
      {
        question: "Is this for emergency plumbing?",
        answer:
          "For urgent issues, call us directly. We can assess the situation and coordinate the right licensed plumber from our network promptly.",
      },
      {
        question: "Can plumbing be part of a larger renovation?",
        answer:
          "Yes. Plumbing relocation and new connections are coordinated as part of kitchen, bathroom, and home renovation projects.",
      },
      {
        question: "What areas do you cover?",
        answer: sharedAreas,
      },
    ],
  },
  {
    title: "Brickwork Repairs Melbourne",
    shortTitle: "Brickwork",
    slug: "/brickwork-repairs-melbourne/",
    metaKey: "brickwork-repairs-melbourne",
    breadcrumbName: "Brickwork Repairs Melbourne",
    headline: "Brickwork Repairs Melbourne | Heritage & Modern | Nicon Built",
    subheadline: "Brick repairs and repointing, including period-accurate materials.",
    paragraphs: [
      "Cracked mortar, damaged bricks, rising damp, or sections that need to be matched to original clinker or period brickwork — brick repairs in Melbourne's older homes need specialist knowledge.",
      sharedIntro,
      "Nicon Built sources period-matched materials through a specialist supplier network built across 30 years of heritage work in Melbourne.",
    ],
    bullets: [
      "Mortar repointing and brick replacement",
      "Period-matched brickwork repairs",
      "Lime mortar work for heritage homes",
      "Minor structural brick repairs",
      "Chimney and facade repairs",
    ],
    faqs: [
      {
        question: "Can you match heritage brickwork?",
        answer:
          "Yes. Through a specialist supplier network, Nicon Built sources lime mortars and period-matched brickwork materials that complement original construction.",
      },
      {
        question: "Do brick repairs require a building permit?",
        answer:
          "Some structural brick repairs do. As a VBA licensed builder, Nicon Built can manage permit-required work that a handyman isn't qualified to undertake.",
      },
      {
        question: "What areas do you cover?",
        answer: sharedAreas,
      },
    ],
  },
  {
    title: "Caulking Melbourne",
    shortTitle: "Caulking",
    slug: "/caulking-melbourne/",
    metaKey: "caulking-melbourne",
    breadcrumbName: "Caulking Melbourne",
    headline: "Caulking Melbourne | Bathrooms, Kitchens & Windows | Nicon Built",
    subheadline: "Professional caulking and sealing, done properly.",
    paragraphs: [
      "Failed caulking around showers, baths, windows, and benchtops lets water in behind surfaces — often causing damage that takes years to become visible.",
      sharedIntro,
      "Proper caulking is a small job done right, or part of a larger bathroom, kitchen, or maintenance scope.",
    ],
    bullets: [
      "Bathroom and ensuite sealing",
      "Kitchen benchtop and splashback caulking",
      "Window and door frame sealing",
      "Expansion joint sealing",
      "Re-caulking as part of bathroom renovations",
    ],
    faqs: [
      {
        question: "Is caulking a standalone job?",
        answer:
          "Yes. Re-caulking a shower or kitchen is a common standalone maintenance job. No minimum size.",
      },
      {
        question: "When should caulking be redone?",
        answer:
          "If caulking is cracked, peeling, or discoloured — especially in wet areas — it should be replaced before water gets behind tiles or benchtops.",
      },
      {
        question: "What areas do you cover?",
        answer: sharedAreas,
      },
    ],
  },
  {
    title: "Fixture Replacements Melbourne",
    shortTitle: "Fixtures",
    slug: "/fixture-replacements-melbourne/",
    metaKey: "fixture-replacements-melbourne",
    breadcrumbName: "Fixture Replacements Melbourne",
    headline: "Fixture Replacements Melbourne | Bathrooms & Kitchens | Nicon Built",
    subheadline: "Bathroom and kitchen fixture upgrades, fully managed.",
    paragraphs: [
      "New tapware, toilets, vanities, or kitchen fixtures — replacing fixtures often involves plumbing, tiling, and sometimes electrical work that needs to happen in the right order.",
      sharedIntro,
      "Nicon Built coordinates every trade required so your fixture upgrade is completed efficiently without you managing multiple contractors.",
    ],
    bullets: [
      "Tapware and showerhead replacements",
      "Toilet and vanity upgrades",
      "Kitchen sink and tap replacements",
      "Plumbing and tiling coordination",
      "Electrical coordination where required",
    ],
    faqs: [
      {
        question: "Can I supply my own fixtures?",
        answer:
          "Yes. Supply your own fixtures or ask us for guidance. Either way, installation and coordination are managed for you.",
      },
      {
        question: "Is this different from a full bathroom renovation?",
        answer:
          "Yes. Fixture replacements are targeted upgrades — new tapware, a toilet, or a vanity — without a full bathroom strip-out. Nicon Built also manages full bathroom renovations if that's what you need.",
      },
      {
        question: "What areas do you cover?",
        answer: sharedAreas,
      },
    ],
  },
  {
    title: "Minor Structural Repairs Melbourne",
    shortTitle: "Structural Repairs",
    slug: "/minor-structural-repairs-melbourne/",
    metaKey: "minor-structural-repairs-melbourne",
    breadcrumbName: "Minor Structural Repairs Melbourne",
    headline: "Minor Structural Repairs Melbourne | Licensed Builder | Nicon Built",
    subheadline: "Permit-required repairs that a handyman can't legally do.",
    paragraphs: [
      "Some repairs go beyond what a handyman is legally qualified to undertake. Minor structural work, certain alterations, and repairs requiring a building permit need a licensed builder.",
      sharedIntro,
      "Nicon Built is a VBA licensed builder with public liability insurance, able to manage permit-required work and coordinate structural trades properly.",
    ],
    bullets: [
      "Minor structural repairs and alterations",
      "Building permit-required work",
      "Subfloor and framing repairs",
      "Load-bearing wall modifications",
      "Coordination with engineers where required",
    ],
    faqs: [
      {
        question: "What's the difference between this and a handyman?",
        answer:
          "Licensing and legal scope. Nicon Built is a VBA licensed builder who can manage permit-required structural work that a general handyman isn't qualified to undertake.",
      },
      {
        question: "Do minor structural repairs need a permit?",
        answer:
          "Some do. Nicon Built assesses each job and manages permits where required, so the work is done legally and to standard.",
      },
      {
        question: "What areas do you cover?",
        answer: sharedAreas,
      },
    ],
  },
  {
    title: "General Repairs Melbourne",
    shortTitle: "General Repairs",
    slug: "/general-repairs-melbourne/",
    metaKey: "general-repairs-melbourne",
    breadcrumbName: "General Repairs Melbourne",
    headline: "General Repairs Melbourne | Home Maintenance | Nicon Built",
    subheadline: "Reactive repairs and planned maintenance, one call.",
    paragraphs: [
      "The list of small jobs around the house adds up fast. A door that won't close, damaged skirting, a loose railing, or wear and tear that's been on the list for months.",
      sharedIntro,
      "No job is too small. Every repair is handled properly, with the right trade for each task.",
    ],
    bullets: [
      "Doors, windows, and hardware repairs",
      "Skirting, architraves, and trim repairs",
      "General carpentry and handyman-scale work",
      "Reactive maintenance and emergency repairs",
      "Planned maintenance schedules for investment properties",
    ],
    faqs: [
      {
        question: "Is there a minimum job size?",
        answer:
          "No minimum. A single repair is handled with the same care as a larger maintenance scope.",
      },
      {
        question: "How quickly can you respond?",
        answer:
          "For straightforward jobs, we usually get back with a quote and timeline within a day or two. Call or send a message via the Contact page.",
      },
      {
        question: "What areas do you cover?",
        answer: sharedAreas,
      },
    ],
  },
];
