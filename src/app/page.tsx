import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CallButton } from "@/components/CallButton";
import { StatsStrip } from "@/components/StatsStrip";
import { QuoteCTA } from "@/components/QuoteCTA";
import { RecentArticles } from "@/components/RecentArticles";
import { Reveal } from "@/components/Reveal";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { buildMetadata, pageMeta } from "@/lib/metadata";
import { loadCopy, formatReviewMeta, getSectionParagraphs } from "@/lib/copy";
import { homeServices, projectServices } from "@/lib/navigation";
import { images } from "@/lib/images";
import { getServiceCarouselSlides } from "@/lib/service-carousel";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  ...pageMeta.home,
  path: "/",
});

export default function HomePage() {
  const copy = loadCopy("home");
  const heroParagraphs = copy.sections
    .find((s) => s.title === "Hero")
    ?.content.split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("**H1:**") && !l.startsWith("*")) ?? [];

  const aboutParagraphs = copy.sections
    .find((s) => s.title === "About snapshot")
    ?.content.split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean) ?? [];

  // copy.serviceTiles order matches SERVICE_PAGES order (see service-page-config.ts):
  // first `homeServices.length` tiles are everyday trades, remainder are the big builds.
  const tradeTiles = copy.serviceTiles.slice(0, homeServices.length);
  const featuredTiles = copy.serviceTiles.slice(homeServices.length);
  const emergencyNote = getSectionParagraphs(copy, "Emergency make safe")[0];

  const reviewSlides = copy.reviews.map((review) => ({
    stars: formatReviewMeta(review.meta),
    quote: review.quote,
    author: review.author,
  }));

  return (
    <>
      <link rel="preload" as="image" href={images.homeHero} />

      <Hero
        eyebrow="Building Quality, Maintaining Excellence"
        title={copy.headline ?? ""}
        description={heroParagraphs}
        image={images.homeHero}
        imageAlt="Home services and renovations in Melbourne by Nicon Built"
        showForm
        priority
      />

      <StatsStrip />

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">What we do</p>
              <h2>Home services &amp; maintenance</h2>
            </div>
            <Link href="/services/" className={styles.viewAll}>
              View all services →
            </Link>
          </div>
          <div className={styles.serviceGrid}>
            {tradeTiles.map((tile, i) => {
              const trade = homeServices[i];
              const homepageSlide = getServiceCarouselSlides(trade.metaKey)[0];
              return (
                <Reveal key={tile.title} index={i} className={styles.serviceCardWrap}>
                  <Link href={trade.slug} className={`card ${styles.serviceCard}`}>
                    <div className={styles.serviceImage}>
                      <Image
                        src={homepageSlide?.src ?? images[trade.imageKey]}
                        alt={homepageSlide?.alt ?? trade.imageAlt}
                        fill
                        sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.serviceImg}
                      />
                      <div className={styles.serviceImageOverlay} aria-hidden="true" />
                      <h3 className={styles.serviceTitleOnImage}>{tile.title}</h3>
                    </div>
                    <div className={styles.serviceBody}>
                      <p>{tile.description}</p>
                      <span className={styles.learnMore}>Learn more →</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          {emergencyNote ? (
            <aside className={styles.emergencyNote}>
              <p>
                <strong>Emergency make safe &amp; insurance work.</strong> {emergencyNote}
              </p>
              <Link href="/property-maintenance-melbourne/" className={styles.emergencyLink}>
                Property maintenance →
              </Link>
            </aside>
          ) : null}
          <div className={styles.inlineCta}>
            <Link href="/contact/" className="btn btn-accent">
              Request a quote
            </Link>
            <CallButton />
          </div>
        </div>
      </section>

      <section className="section section--tone">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Why homeowners choose us</p>
          </Reveal>
          <Reveal index={1}>
            <h2>What our clients say</h2>
          </Reveal>
          <Reveal index={2}>
            <ReviewsCarousel reviews={reviewSlides} />
          </Reveal>
          <Link href="/testimonials/" className={styles.viewAll}>
            Read all reviews →
          </Link>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <p className="eyebrow">Why clients choose us</p>
          <h2>{copy.tagline}</h2>
          <div className={styles.aboutGrid}>
            <Reveal>
              <div className="prose">
                {aboutParagraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal index={1} className={styles.portrait}>
              <Image
                src={images.nickPortrait}
                alt="Nicon Built team on site in Melbourne"
                width={400}
                height={500}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Renovations &amp; builds</p>
              <h2>Bigger projects, managed start to finish</h2>
            </div>
          </div>
          <div className={styles.featuredGrid}>
            {featuredTiles.map((tile, i) => {
              const project = projectServices[i];
              return (
                <Reveal key={tile.title} index={i} className={styles.featuredCardWrap}>
                  <Link href={project.slug} className={`card ${styles.featuredCard}`}>
                    <div className={styles.featuredImage}>
                      <Image
                        src={images[project.imageKey]}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 900px) 100vw, 50vw"
                        className={styles.featuredImg}
                      />
                    </div>
                    <div className={styles.featuredBody}>
                      <h3>{tile.title}</h3>
                      <p>{tile.description}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--tone">
        <div className="container">
          <h2>Where we work</h2>
          <p className={styles.areasIntro}>
            Nicon Built services Melbourne&rsquo;s inner south and bayside suburbs, from
            Port Melbourne and Albert Park through to Brighton, Malvern, and Hawthorn.
            If your suburb isn&rsquo;t listed below, get in touch anyway, chances are
            we cover it.
          </p>
          <p className={styles.areasCompact}>{copy.serviceAreas}</p>
        </div>
      </section>

      <RecentArticles />

      <QuoteCTA />
    </>
  );
}
