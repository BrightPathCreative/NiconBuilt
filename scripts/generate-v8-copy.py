#!/usr/bin/env python3
"""Generate docs/copy/*.md and reference export from the v8 Word document."""

from __future__ import annotations

import re
import zipfile
import xml.etree.ElementTree as ET
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT.parent / "Nicon Built - Website Copy v8 (BrightPath Creative).docx"
COPY_DIR = ROOT / "docs" / "copy"
REFERENCE_DIR = ROOT / "reference"
REFERENCE_OUT = REFERENCE_DIR / "Nicon_Built_Copy_v8_Approved.md"
TODAY = date.today().isoformat()

W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

SKIP_LINE_PATTERNS = [
    re.compile(r"^NICON BUILT - Website Copy"),
    re.compile(r"^Prepared by BrightPath"),
    re.compile(r"^Version 8 - Full rewrite"),
    re.compile(r"^Written for mobile-first"),
    re.compile(r"^Directory page\."),
    re.compile(r"^Not the main focus\."),
    re.compile(r"^Confirmed from v7"),
    re.compile(r"^Approved in v7"),
    re.compile(r"^Retained from v7"),
    re.compile(r"^Nick's v7 copy retained"),
    re.compile(r"^Nick's approved v7 copy retained"),
    re.compile(r"^Nick, please check"),
    re.compile(r"^8 reviews confirmed"),
    re.compile(r"^Photos still needed\. Send via WhatsApp"),
    re.compile(r"^\[IMAGE GRID:"),
    re.compile(r"^All common questions in one place"),
    re.compile(r"^12 tiles\."),
    re.compile(r"^What We Do$"),
    re.compile(r"^SEO targets:"),
    re.compile(r"^Phone number to be added"),
]

PAGE_MARKERS = {
    1: "home",
    2: "about",
    3: "services-overview",
    4: "kitchen-renovations",
    5: "bathroom-renovations",
    6: "carpentry-and-joinery",
    7: "painting-and-plastering",
    8: "tiling",
    9: "plumbing",
    10: "electrical",
    11: "property-maintenance",
    12: "heritage-renovations-restorations",
    13: "heritage-home-extensions",
    14: "home-renovations-extensions",
    15: "new-builds",
    16: "our-work",
    17: "testimonials",
    18: "contact",
    19: "faq",
}

PAGE_META: dict[str, dict[str, str]] = {
    "home": {"page": "Home", "slug": "/"},
    "about": {"page": "About", "slug": "/about/"},
    "services-overview": {"page": "Services Overview", "slug": "/services/"},
    "kitchen-renovations": {
        "page": "Kitchen Renovations",
        "slug": "/kitchen-renovations-melbourne/",
        "seo": "kitchen renovations Melbourne, kitchen renovation builder Melbourne, kitchen reno inner south Melbourne",
    },
    "bathroom-renovations": {
        "page": "Bathroom Renovations",
        "slug": "/bathroom-renovations-melbourne/",
        "seo": "bathroom renovations Melbourne, bathroom renovation builder Melbourne",
    },
    "carpentry-and-joinery": {
        "page": "Carpentry and Joinery",
        "slug": "/carpentry-and-joinery-melbourne/",
        "seo": "carpentry Melbourne, carpenter Melbourne inner south, decking Melbourne, custom joinery Melbourne",
    },
    "painting-and-plastering": {
        "page": "Painting and Plastering",
        "slug": "/painting-and-plastering-melbourne/",
        "seo": "painter Melbourne, painting and plastering Melbourne, interior painter Melbourne inner south",
    },
    "tiling": {
        "page": "Tiling",
        "slug": "/tiling-melbourne/",
        "seo": "tiler Melbourne, tiling Melbourne, bathroom tiling Melbourne inner south, kitchen tiling Melbourne",
    },
    "plumbing": {
        "page": "Plumbing",
        "slug": "/plumbing-melbourne/",
        "seo": "plumber Melbourne, plumbing Melbourne, residential plumber inner south Melbourne",
    },
    "electrical": {
        "page": "Electrical",
        "slug": "/electrical-melbourne/",
        "seo": "electrician Melbourne, electrical services Melbourne, residential electrician inner south Melbourne",
    },
    "property-maintenance": {
        "page": "Property Maintenance",
        "slug": "/home-maintenance-melbourne/",
        "seo": "property maintenance Melbourne, home maintenance Melbourne, trade coordination Melbourne",
    },
    "heritage-renovations-restorations": {
        "page": "Heritage Renovations and Restorations",
        "slug": "/heritage-renovations-melbourne/",
        "seo": "heritage renovation builder Melbourne, Victorian home renovation Melbourne",
    },
    "heritage-home-extensions": {
        "page": "Heritage Home Extensions",
        "slug": "/heritage-home-extensions-melbourne/",
        "seo": "heritage home extensions Melbourne, period home extensions Melbourne inner south",
    },
    "home-renovations-extensions": {
        "page": "Home Renovations and Extensions",
        "slug": "/home-renovations-melbourne/",
        "seo": "home renovations Melbourne, home extensions Melbourne, renovation builder Melbourne inner south",
    },
    "new-builds": {
        "page": "New Builds",
        "slug": "/new-builds-melbourne/",
        "seo": "custom home builder Melbourne, new home builder Melbourne inner south, dual occupancy builder Melbourne",
    },
    "our-work": {"page": "Our Work", "slug": "/our-work/"},
    "testimonials": {"page": "Testimonials", "slug": "/testimonials/"},
    "contact": {"page": "Contact", "slug": "/contact/"},
    "faq": {"page": "FAQ", "slug": "/faq/"},
}

SERVICE_TILES = [
    (
        "Kitchen Renovations",
        "A kitchen renovation done properly needs a licensed builder coordinating every trade, in the right order. That's exactly what we do.",
        "Full kitchen renovations · Layout reconfigurations · Structural alterations · Period home kitchens",
    ),
    (
        "Bathroom Renovations",
        "Waterproofing before tiling. Plumbing before fixtures. Every trade in the right sequence, held to the right standard. Nick manages the whole job.",
        "Full bathroom renovations · Ensuite upgrades · Waterproofing · Tiling and fixtures · Period home bathrooms",
    ),
    (
        "Carpentry and Joinery",
        "Decking, doors, cabinetry, custom shelving, pergolas, and period joinery. Built to last and finished properly.",
        "Decking and pergolas · Doors and frames · Custom cabinetry · Skirting and architraves · Period joinery",
    ),
    (
        "Painting and Plastering",
        "The finish depends on what's underneath it. We repair the plaster properly first, then paint. Interior and exterior, across Melbourne's inner south.",
        "Interior and exterior painting · Plaster repairs · Cornice work · Heritage plasterwork · Full replasters",
    ),
    (
        "Tiling",
        "Kitchens, bathrooms, laundries, alfresco areas. Every tile laid properly, every joint consistent, waterproofed where required.",
        "Kitchen tiling · Bathroom tiling · Outdoor and alfresco · Feature walls · Period tile matching",
    ),
    (
        "Plumbing",
        "New installations, hot water systems, repairs, and plumbing coordination across renovation projects. Done to code, signed off properly.",
        "Kitchen and bathroom plumbing · Hot water systems · Tap and fixture installation · Pipe repairs · Drainage",
    ),
    (
        "Electrical",
        "Lighting, power points, switchboard upgrades, and electrical coordination within renovations. Carried out by licensed electricians.",
        "Lighting installation · Power points · Switchboard upgrades · Outdoor electrical · Renovation coordination",
    ),
    (
        "Property Maintenance",
        "Whatever needs doing around the home, we coordinate every trade so you don't have to. One call, one team, everything managed.",
        "General repairs · Trade coordination · Planned maintenance · Emergency repairs · End-to-end management",
    ),
    (
        "Heritage Renovations and Restorations",
        "Victorian, Edwardian, and Federation homes restored properly, with period materials and 30 years of heritage experience.",
        "Victorian restorations · Edwardian renovation · Federation conservation · Heritage overlay compliance · Period material matching",
    ),
    (
        "Heritage Home Extensions",
        "Extending a period home the right way. Heritage overlay compliant, period materials, new work that looks like it was always there.",
        "Period-accurate additions · Heritage compliant design · Council permit management · Material matching",
    ),
    (
        "Home Renovations and Extensions",
        "Plans approved, permits sorted. One builder manages every trade, every stage, and every detail through to handover.",
        "Home extensions · Room additions · Open-plan conversions · Structural alterations · Dual-occupancy additions",
    ),
    (
        "New Builds",
        "Custom homes and dual-occupancy builds across Melbourne's inner south since 1990. The person who quotes the job runs the build.",
        "Architect-designed homes · Dual-occupancy builds · Design and build · Boutique builder packages",
    ),
]

SERVICE_AREAS = (
    "Port Melbourne · Albert Park · Middle Park · South Melbourne · Elwood · St Kilda · "
    "Brighton · Hampton · Sandringham · Beaumaris · Armadale · Malvern · South Yarra · "
    "Williamstown · Moorabbin · Bentleigh · Caulfield · Elsternwick · Camberwell · Hawthorn · Kew"
)

EXCLUDED_REVIEWS = {"Johnny Andrianakis"}


def extract_paragraphs(docx_path: Path) -> list[str]:
    with zipfile.ZipFile(docx_path) as zf:
        root = ET.fromstring(zf.read("word/document.xml"))
    paragraphs: list[str] = []
    for node in root.iter(f"{W_NS}p"):
        parts: list[str] = []
        for text_node in node.iter(f"{W_NS}t"):
            if text_node.text:
                parts.append(text_node.text)
            if text_node.tail:
                parts.append(text_node.tail)
        line = "".join(parts).strip()
        if line:
            paragraphs.append(line)
    return paragraphs


def split_pages(paragraphs: list[str]) -> dict[str, list[str]]:
    pages: dict[str, list[str]] = {}
    current_key: str | None = None
    for line in paragraphs:
        match = re.match(r"^Page (\d+) \| ", line)
        if match:
            page_num = int(match.group(1))
            current_key = PAGE_MARKERS.get(page_num)
            if current_key:
                pages[current_key] = []
            continue
        if current_key:
            pages[current_key].append(line)
    return pages


def should_skip(line: str) -> bool:
    return any(pattern.search(line) for pattern in SKIP_LINE_PATTERNS)


def clean_lines(lines: list[str]) -> list[str]:
    return [line for line in lines if line.strip() and not should_skip(line)]


def dots_to_bullets(text: str) -> str:
    return re.sub(r"\s\.\s", " · ", text)


def normalize_stats(text: str) -> str:
    cleaned = text.replace("\u00a0", " ")
    parts = [part.strip() for part in re.split(r"\s{2,}", cleaned) if part.strip()]
    if len(parts) > 1:
        return " — ".join(parts)
    return cleaned.strip()


def clean_image_detail(detail: str) -> tuple[str, str | None]:
    label_match = re.search(r"Label:\s*([^.]+)", detail, re.I)
    label = label_match.group(1).strip() if label_match else None
    cleaned = re.sub(r"\.\s*To be supplied[^.]*\.?", "", detail, flags=re.I)
    cleaned = re.sub(r"(\.\s*)?Label:\s*[^.]+\.?", "", cleaned, flags=re.I)
    cleaned = cleaned.strip().rstrip(".")
    return cleaned, label


def image_note(line: str) -> str | None:
    if not line.startswith("["):
        return None
    inner = line.strip("[]")
    if re.match(r"HERO IMAGE\s*:", inner, re.I):
        detail, label = clean_image_detail(inner.split(":", 1)[1].strip())
        label = label or "hero-bg"
        return f"⚠️ Hero image: {detail} — to be supplied by Nick via WhatsApp (label: {label})."
    if re.match(r"PAGE IMAGE\s*:", inner, re.I):
        detail, _ = clean_image_detail(inner.split(":", 1)[1].strip())
        return f"⚠️ Image: {detail} — to be supplied by Nick."
    if re.match(r"^IMAGE\s*:", inner, re.I):
        detail, label = clean_image_detail(inner.split(":", 1)[1].strip())
        if label:
            return f"⚠️ Image: {detail} — to be supplied (label: {label})."
        return f"⚠️ Image: {detail} — to be supplied by Nick."
    return None


def frontmatter(slug: str, status_note: str = "verbatim from Nicon_Built_Copy_v8_Approved.md") -> str:
    meta = PAGE_META[slug]
    return "\n".join(
        [
            "---",
            f"File: docs/copy/{slug}.md",
            f"Status: DRAFT — {status_note}",
            f"Page: {meta['page']}",
            f"URL slug: {meta['slug']}",
            "Word count target: N/A — fixed approved copy",
            f"Last updated: {TODAY}",
            "---",
            "",
        ]
    )


def section_index(lines: list[str], marker: str) -> int | None:
    marker_upper = marker.upper()
    for index, line in enumerate(lines):
        if line.upper() == marker_upper or line.upper().startswith(marker_upper):
            return index
    return None


def slice_section(lines: list[str], start_marker: str, end_markers: list[str]) -> list[str]:
    start = section_index(lines, start_marker)
    if start is None:
        return []
    start += 1
    end = len(lines)
    end_upper = [m.upper() for m in end_markers]
    for index in range(start, len(lines)):
        upper = lines[index].upper()
        if any(upper == marker for marker in end_upper):
            end = index
            break
    return clean_lines(lines[start:end])


def parse_review_block(lines: list[str]) -> list[tuple[str, str]]:
    reviews: list[tuple[str, str]] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        match = re.match(r"^5 stars \| (.+)$", line, re.I)
        if match:
            parts = [part.strip() for part in match.group(1).split("|")]
            author = parts[0]
            if author in EXCLUDED_REVIEWS:
                index += 2
                continue
            timing = parts[1] if len(parts) > 1 else ""
            if timing.lower() == "client review":
                meta = f"5★ {author}"
            else:
                meta = f"5★ {author} ({timing})"
            quote = ""
            if index + 1 < len(lines) and lines[index + 1].startswith('"'):
                quote = lines[index + 1].strip('"')
                index += 1
            reviews.append((meta, quote))
        index += 1
    return reviews


def crm_placeholder(text: str) -> str:
    return text.replace("[CRM NUMBER]", "<!-- PLACEHOLDER: [CRM NUMBER] -->")


def format_faqs(lines: list[str]) -> str:
    output: list[str] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        if line.endswith("?"):
            answer = lines[index + 1] if index + 1 < len(lines) else ""
            output.append(f"**{line}** {crm_placeholder(answer)}".rstrip())
            index += 2
            continue
        index += 1
    return "\n\n".join(output)


def join_paragraphs(lines: list[str]) -> list[str]:
    return lines if not lines else ["\n\n".join(lines)]


def parse_service_headline(lines: list[str]) -> tuple[str, str | None, str | None]:
    start = section_index(lines, "PAGE HEADLINE")
    if start is None:
        return "", None, None
    chunk = lines[start + 1 : start + 6]
    image = None
    headline = ""
    subheadline = None
    for line in chunk:
        note = image_note(line)
        if note:
            image = note
            continue
        if should_skip(line):
            continue
        if not headline:
            headline = line
            continue
        subheadline = line
        break
    return headline, subheadline, image


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n", encoding="utf-8")


def generate_home(pages: dict[str, list[str]]) -> str:
    lines = pages["home"]
    body = [frontmatter("home")]
    body.append("## Tagline")
    body.append("Building Quality, Maintaining Excellence")
    body.append("")
    body.append("## Hero")
    hero_note = next((image_note(line) for line in lines if image_note(line)), None)
    if hero_note:
        body.append(hero_note)
        body.append("")
    body.append("**H1:** Everyday Trades, Done Right.")
    body.append("")
    body.append("One reliable Melbourne team for the everyday trades around the home.")
    body.append("")
    body.append(
        "Plumbing, electrical, tiling, painting, carpentry. Kitchen and bathroom renovations. "
        "Extensions and new builds. Whatever your home needs, Nick Kafkalas and his team handle it "
        "properly, start to finish. VBA licensed. Fully insured. Based in Port Melbourne since 1990."
    )
    body.append("")
    body.append("*5.0 Stars | 9 Google Reviews | 30+ Years Experience | VBA Licensed Builder*")
    body.append("")
    body.append("## Stats strip")
    stats = slice_section(lines, "STATS STRIP", ["ABOUT SNAPSHOT"])
    body.append(normalize_stats(stats[0] if stats else ""))
    body.append("")
    body.append("## About snapshot")
    about = slice_section(lines, "ABOUT SNAPSHOT", ["SERVICE TILES"])
    body.extend(join_paragraphs(about))
    body.append("")
    body.append("## Service tiles (12 — each links to its own page)")
    body.append("")
    for index, (title, description, sub) in enumerate(SERVICE_TILES, start=1):
        body.append(f"{index}. **{title}** — {description}")
        body.append(f"   Sub: {sub}")
        body.append("")
    body.append("## Top 3 Google reviews (homepage)")
    body.append("")
    review_lines = slice_section(lines, "TOP 3 GOOGLE REVIEWS", ["SERVICE AREAS"])
    for meta, quote in parse_review_block(review_lines):
        body.append(f'- {meta}: "{quote}"')
    body.append("")
    body.append("## Service areas")
    body.append(SERVICE_AREAS)
    return "\n".join(body)


def generate_about(pages: dict[str, list[str]]) -> str:
    lines = pages["about"]
    body = [frontmatter("about")]
    image = next((image_note(line) for line in lines if image_note(line)), None)
    if image:
        body.append(image)
        body.append("")
    headline = slice_section(lines, "PAGE HEADLINE", ["ABOUT NICON BUILT"])
    body.append("## Headline")
    if headline:
        body.append(headline[0])
        if len(headline) > 1:
            body.append("")
            body.append(headline[1])
    body.append("")
    sections = [
        ("Built on Experience. Driven by Quality.", ["HOW WE WORK", "HOW IT WORKS"]),
        ("How We Work", ["A BUSINESS BUILT ON RELATIONSHIPS"]),
        ("A Business Built on Relationships", ["HOW IT WORKS", "OUR PROCESS"]),
        ("Our Process", ["WHO WE WORK WITH"]),
        ("Who We Work With", ["OUR PROMISE"]),
    ]
    for title, end_markers in sections:
        chunk = slice_section(lines, title, end_markers)
        if not chunk and title == "Built on Experience. Driven by Quality.":
            chunk = slice_section(lines, "ABOUT NICON BUILT", ["HOW WE WORK", "HOW IT WORKS"])
            chunk = [line for line in chunk if line != "Built on Experience. Driven by Quality."]
        if not chunk:
            continue
        body.append(f"## {title}")
        if title == "Built on Experience. Driven by Quality.":
            body.extend(join_paragraphs(chunk))
        else:
            body.extend(chunk)
        body.append("")
    promise_intro = slice_section(lines, "OUR PROMISE", ["CREDENTIALS"])
    body.append("## Our Promise")
    body.extend(promise_intro)
    body.append("")
    credentials = slice_section(lines, "CREDENTIALS", [])
    body.append("## Credentials")
    for item in credentials:
        body.append(f"- {item}")
    return "\n".join(body)


def generate_services_overview(pages: dict[str, list[str]]) -> str:
    lines = pages["services-overview"]
    body = [frontmatter("services-overview")]
    headline = slice_section(lines, "PAGE HEADLINE", ["PAGE INTRO"])
    body.append("## Headline")
    if headline:
        body.append(headline[0])
        if len(headline) > 1:
            body.append("")
            body.append(headline[1])
    body.append("")
    intro = slice_section(lines, "PAGE INTRO", ["SERVICE SUMMARIES"])
    body.append("## Intro")
    body.extend(join_paragraphs(intro))
    body.append("")
    summaries = slice_section(lines, "SERVICE SUMMARIES", [])
    service_names = [tile[0] for tile in SERVICE_TILES]
    index = 0
    while index < len(summaries):
        name = summaries[index]
        if name not in service_names:
            index += 1
            continue
        paragraphs: list[str] = []
        index += 1
        while index < len(summaries) and summaries[index] not in service_names:
            if should_skip(summaries[index]):
                index += 1
                continue
            paragraphs.append(summaries[index])
            index += 1
        body.append(f"### {name}")
        body.extend(paragraphs)
        body.append("")
    return "\n".join(body)


def generate_service_page(slug: str, pages: dict[str, list[str]]) -> str:
    lines = pages[slug]
    meta = PAGE_META[slug]
    body = [frontmatter(slug)]
    if "seo" in meta:
        body.append(f"SEO targets: {meta['seo']}")
        body.append("")
    headline, subheadline, image = parse_service_headline(lines)
    if image:
        body.append(image)
        body.append("")
    body.append("## Headline")
    body.append(headline)
    if subheadline:
        body.append("")
        body.append(subheadline)
    body.append("")
    copy_lines = slice_section(lines, "PAGE COPY", ["WHAT'S INCLUDED", "FAQS"])
    body.append("## Page copy")
    body.extend(join_paragraphs(copy_lines))
    body.append("")
    included = slice_section(lines, "WHAT'S INCLUDED", ["FAQS"])
    if included:
        body.append("## What's included")
        body.append("")
        for item in included:
            body.append(f"- {item}")
        body.append("")
    faq_lines = slice_section(lines, "FAQS", [])
    if faq_lines:
        body.append("## FAQs")
        body.append("")
        body.append(format_faqs(faq_lines))
    return "\n".join(body)


def generate_our_work(pages: dict[str, list[str]]) -> str:
    lines = pages["our-work"]
    body = [frontmatter("our-work")]
    body.append(
        "⚠️ Photos still needed — Nick to send via WhatsApp to Sara, labelled per batch "
        '(e.g. "Brighton kitchen reno 2024"). **No photos featuring Callum or John.** '
        "This page currently has zero images and cannot go live without them."
    )
    body.append("")
    intro = slice_section(lines, "INTRO TEXT", ["MID-GALLERY REVIEW", "MID-GALLERY"])
    body.append("## Intro")
    body.extend(intro[:2])
    body.append("")
    review_lines = slice_section(lines, "MID-GALLERY REVIEW", [])
    body.append("## Mid-gallery review")
    for meta, quote in parse_review_block(review_lines):
        body.append(f'{meta}: "{quote}"')
    return "\n".join(body)


def generate_testimonials(pages: dict[str, list[str]]) -> str:
    lines = pages["testimonials"]
    body = [frontmatter("testimonials")]
    headline = slice_section(lines, "PAGE HEADLINE", ["ALL REVIEWS"])
    body.append("## Headline")
    if headline:
        body.append(headline[0])
        if len(headline) > 1:
            body.append("")
            body.extend(headline[1:])
    body.append("")
    body.append("## Reviews to publish (8)")
    body.append("")
    review_lines = slice_section(lines, "ALL REVIEWS", [])
    for index, (meta, quote) in enumerate(parse_review_block(review_lines), start=1):
        body.append(f'{index}. {meta}: "{quote}"')
        body.append("")
    return "\n".join(body)


def generate_contact(pages: dict[str, list[str]]) -> str:
    lines = pages["contact"]
    body = [frontmatter("contact")]
    headline = slice_section(lines, "PAGE HEADLINE", ["CONTACT DETAILS"])
    body.append("## Headline")
    body.extend(headline)
    body.append("")
    body.append("## Contact details")
    body.append("⚠️ Phone number gets added once the CRM (GHL) lead-gen number is confirmed.")
    body.append("")
    body.append("- Phone: <!-- PLACEHOLDER: [CRM NUMBER] -->")
    body.append("- Email: nick@niconbuilt.com.au")
    body.append("- Based in Port Melbourne, VIC")
    body.append("- Monday to Saturday, 7:00am to 7:00pm")
    body.append("")
    body.append("## Service areas")
    areas_intro = slice_section(lines, "SERVICE AREAS", [])
    body.append(areas_intro[0] if areas_intro else "We work with homeowners across Melbourne's inner south and bayside suburbs.")
    body.append("")
    body.append(dots_to_bullets(areas_intro[1] if len(areas_intro) > 1 else SERVICE_AREAS.replace(" · ", " . ")))
    if len(areas_intro) > 2:
        body.append("")
        body.append(areas_intro[2])
    return "\n".join(body)


def generate_faq(pages: dict[str, list[str]]) -> str:
    lines = pages["faq"]
    body = [frontmatter("faq")]
    body.append("All common questions in one place. Helps Google and AI tools surface Nicon Built. Apply FAQPage schema per docs/seo.md.")
    body.append("")
    headline = slice_section(lines, "PAGE HEADLINE", ["ABOUT NICON BUILT"])
    body.append("## Headline")
    body.append(headline[0] if headline else "Frequently Asked Questions | Nicon Built Melbourne")
    body.append("")
    if len(headline) > 1:
        body.append(headline[1].replace("[CRM NUMBER]", "<!-- PLACEHOLDER: [CRM NUMBER] -->"))
        body.append("")
    sections = [
        ("About Nicon Built", ["HOME SERVICES AND TRADES"]),
        ("Home services and trades", ["RENOVATIONS AND EXTENSIONS"]),
        ("Renovations, kitchens and bathrooms", ["HERITAGE"]),
        ("Heritage", ["NEW BUILDS"]),
        ("New builds", []),
    ]
    for title, end_markers in sections:
        marker = title.upper()
        if title == "Home services and trades":
            marker = "HOME SERVICES AND TRADES"
        if title == "Renovations, kitchens and bathrooms":
            marker = "RENOVATIONS AND EXTENSIONS"
        chunk = slice_section(lines, marker, end_markers)
        if not chunk:
            continue
        body.append(f"## {title}")
        body.append("")
        body.append(format_faqs(chunk))
        body.append("")
    return "\n".join(body)


def generate_reference(files: dict[str, str]) -> str:
    lines = [
        "# Nicon Built — Website Copy | Version 8 (Approved)",
        "Prepared by BrightPath Creative | July 2026",
        "",
        "> Generated from Nicon Built - Website Copy v8 (BrightPath Creative).docx",
        "",
    ]
    order = [
        ("home", "Page 1 | Home"),
        ("about", "Page 2 | About"),
        ("services-overview", "Page 3 | Services Overview"),
        ("kitchen-renovations", "Page 4 | Kitchen Renovations"),
        ("bathroom-renovations", "Page 5 | Bathroom Renovations"),
        ("carpentry-and-joinery", "Page 6 | Carpentry and Joinery"),
        ("painting-and-plastering", "Page 7 | Painting and Plastering"),
        ("tiling", "Page 8 | Tiling"),
        ("plumbing", "Page 9 | Plumbing"),
        ("electrical", "Page 10 | Electrical"),
        ("property-maintenance", "Page 11 | Property Maintenance"),
        ("heritage-renovations-restorations", "Page 12 | Heritage Renovations and Restorations"),
        ("heritage-home-extensions", "Page 13 | Heritage Home Extensions"),
        ("home-renovations-extensions", "Page 14 | Home Renovations and Extensions"),
        ("new-builds", "Page 15 | New Builds"),
        ("our-work", "Page 16 | Our Work"),
        ("testimonials", "Page 17 | Testimonials"),
        ("contact", "Page 18 | Contact"),
        ("faq", "Page 19 | FAQ"),
    ]
    for slug, title in order:
        content = files[slug]
        body = content.split("---", 2)[-1].strip() if content.startswith("---") else content
        lines.extend(["---", "", f"## {title}", "", body, ""])
    return "\n".join(lines).rstrip() + "\n"


def main() -> list[Path]:
    if not DOCX.exists():
        raise FileNotFoundError(f"Missing source document: {DOCX}")

    paragraphs = extract_paragraphs(DOCX)
    pages = split_pages(paragraphs)

    missing = [slug for slug in PAGE_MARKERS.values() if slug not in pages]
    if missing:
        raise RuntimeError(f"Could not parse pages: {', '.join(missing)}")

    generators = {
        "home": generate_home,
        "about": generate_about,
        "services-overview": generate_services_overview,
        "our-work": generate_our_work,
        "testimonials": generate_testimonials,
        "contact": generate_contact,
        "faq": generate_faq,
    }
    service_slugs = [
        "kitchen-renovations",
        "bathroom-renovations",
        "carpentry-and-joinery",
        "painting-and-plastering",
        "tiling",
        "plumbing",
        "electrical",
        "property-maintenance",
        "heritage-renovations-restorations",
        "heritage-home-extensions",
        "home-renovations-extensions",
        "new-builds",
    ]

    written: list[Path] = []
    file_contents: dict[str, str] = {}

    for slug, generator in generators.items():
        content = generator(pages)
        path = COPY_DIR / f"{slug}.md"
        write_file(path, content)
        file_contents[slug] = content
        written.append(path)

    for slug in service_slugs:
        content = generate_service_page(slug, pages)
        path = COPY_DIR / f"{slug}.md"
        write_file(path, content)
        file_contents[slug] = content
        written.append(path)

    legacy = COPY_DIR / "trades-and-maintenance.md"
    if legacy.exists():
        legacy.unlink()
        print(f"Removed legacy file: {legacy}")

    reference_content = generate_reference(file_contents)
    write_file(REFERENCE_OUT, reference_content)
    written.append(REFERENCE_OUT)

    return written


if __name__ == "__main__":
    paths = main()
    print(f"Wrote {len(paths)} files:")
    for path in paths:
        print(f"  - {path.relative_to(ROOT)}")
