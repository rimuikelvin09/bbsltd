/**
 * HOME HERO
 *
 * ON THE HEADLINE. "Making Construction Accessible & Simple" is the
 * company positioning line, not a page headline, and it is deliberate.
 * It is the one sentence that describes all six products at once:
 * Jenga Stress Free is the simple one, Jenga Kwako and Diaspora are the
 * accessible ones, Labour Only and Consultancy lower the entry point.
 * A tagline that actually maps onto the whole product architecture is
 * worth keeping, so do not replace it with a page-specific hook.
 *
 * The reader-facing hook lives in the FIRST SENTENCE of the description
 * instead. That split is the point: the h1 says what the company is for,
 * the lede names the situation the visitor arrived in, and the rest of
 * the lede lists the five routes through it. Keep that order.
 */
export const heroDetails = {
  eyebrow: "Building in Kenya since 2012",
  heading: "Making Construction Accessible & Simple.",
  description:
    "You’ve got the plot. The rest shouldn’t be your job. Design, approvals and construction on one contract, whether you’re paying as you go, using a mortgage, building from abroad, buying your own materials, or you only need the drawings.",
  /**
   * A first-time visitor is top of funnel. Per Creative & Marketing SOP
   * 1.2, "See how it works" outperforms a commitment CTA there. The
   * page's one conversion action lives further down, in the CTA section.
   */
  ctaLabel: "See How It Works",
  ctaHref: "#process",
  /** Background video, as on the original hero. */
  backgroundVideo: "/videos/hero-bg.mp4",
};
