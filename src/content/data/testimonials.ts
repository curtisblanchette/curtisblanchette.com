/**
 * Pull-quote source. The home page renders the first
 * `visibility === "public"` entry via `getPullQuote()`. The kit allows
 * one pull-quote per page, so rotating the home quote means reordering
 * this array (move the desired entry to the top) or flipping
 * `visibility` flags.
 *
 * Voice rules:
 *   - Real attribution (name + role + org at the time of the recommendation).
 *   - Em dash for the byline (added by the component).
 *   - Curly quotes added by the component; store plain straight quotes here.
 *   - The kit's `.cb-quote` is set in 48–72px italic Eiko — a single
 *     paragraph reads best. The `quote` field below is the trimmed
 *     pull-quote excerpt; the original full recommendation lives in the
 *     comment block immediately above each entry for reference.
 *
 * Sources: real LinkedIn recommendations on
 *   https://www.linkedin.com/in/curtisblanchette/details/recommendations/
 */

export type Testimonial = {
  /** Quote body, plain straight quotes. Curly quotes added by the component. */
  quote: string;
  name: string;
  role: string;
  org?: string;
  source: "linkedin" | "email" | "other";
  /** Optional permalink to the source recommendation. */
  url?: string;
  visibility: "public" | "internal";
};

export const TESTIMONIALS: Testimonial[] = [
  /*
   * ── Rusty Speedy · CTO · 4iiz Software · 2023-01-17 ──────────────────────
   * Full text (LinkedIn):
   *
   *   Curt is the best problem-solver I have ever worked with. We could get
   *   the outline of a business problem, sit on a meeting for two hours, and
   *   he'd have the technical requirements, scope, architecture diagrams, an
   *   ERD, and a low-fidelity design by the next day.
   *
   *   He was involved at the highest level in business decisions regarding
   *   our company, including recommendations on large-scale initiatives and
   *   then owning those initiatives until completion. He also managed a team
   *   of 10 remote developers and QA while also still being elbow-deep in
   *   the code & infrastructure. He is a great teacher, and our junior/
   *   intermediate developers improved exponentially due to his mentorship.
   *   He even taught me a bunch of new tricks and I appreciate his help
   *   immensely.
   *
   *   On a personal level, he was a pleasure to work with and I consider him
   *   a friend. We were in the trenches together and his sense of humor
   *   helped get us through some tight deadlines and wild escalations.
   */
  {
    quote:
      "Curt is the best problem-solver I have ever worked with. We could get the outline of a business problem, sit on a meeting for two hours, and he'd have the technical requirements, scope, architecture diagrams, an ERD, and a low-fidelity design by the next day.",
    name: "Rusty Speedy",
    role: "CTO",
    org: "4iiz Software",
    source: "linkedin",
    url: "https://www.linkedin.com/in/curtisblanchette/details/recommendations/",
    visibility: "public",
  },

  /*
   * ── Simon Roscoe · Staff Software Engineer · 4iiz Software · 2023-02-26 ──
   * Full text (LinkedIn):
   *
   *   Superstar. Curt leads his teams with expert technical knowledge and
   *   expert intrapersonal skills.
   *
   *   He was the source of solution for difficult challenges our team was
   *   facing, and did so with speed and precision. Curt genuinely cares
   *   about his team both personally and professionally, and it shows in
   *   his team's performance. I was consistently impressed with Curt's
   *   ability to be proactive and enthusiastic in solving difficult problems.
   *
   *   I am happy to recommend Curt to any company looking for a great
   *   addition to their roster.
   */
  {
    quote:
      "Curt leads his teams with expert technical knowledge and expert intrapersonal skills. He was the source of solution for difficult challenges our team was facing, and did so with speed and precision.",
    name: "Simon Roscoe",
    role: "Staff Software Engineer",
    org: "4iiz Software",
    source: "linkedin",
    url: "https://www.linkedin.com/in/curtisblanchette/details/recommendations/",
    visibility: "public",
  },

  /*
   * ── Troy Zirbes · Head of Delivery (at Feeld now; worked w/ Curt at
   *    MetaLab) · 2024-02-20 ────────────────────────────────────────────────
   * Full text (LinkedIn):
   *
   *   I've had the pleasure of working closely with Curt at MetaLab, and I
   *   must say, he's an absolute rockstar.
   *
   *   Curt is not just your typical lead engineer; he's a visionary problem
   *   solver with an uncanny ability to turn complex challenges into
   *   elegant solutions. Whether it's architecting robust systems or
   *   leading a team through a tight deadline, he's always delivered with
   *   finesse.
   *
   *   His technical prowess is matched only by his knack for fostering a
   *   positive team culture. Curt is not just a leader by title; he's a
   *   mentor, a collaborator, and a true team player. Working alongside
   *   him was easy, and he didn't forget his sense of humor.
   *
   *   Curt showed up, advocated for the client and our team, and led
   *   cross-functional, global delivery. He has my highest recommendation
   *   without a doubt!
   */
  {
    quote:
      "Curt showed up, advocated for the client and our team, and led cross-functional, global delivery. His technical prowess is matched only by his knack for fostering a positive team culture.",
    name: "Troy Zirbes",
    role: "Head of Delivery",
    org: "Metalab",
    source: "linkedin",
    url: "https://www.linkedin.com/in/curtisblanchette/details/recommendations/",
    visibility: "public",
  },
];

/** Picks the first public testimonial for the home pull-quote. */
export function getPullQuote(): Testimonial | null {
  return TESTIMONIALS.find((t) => t.visibility === "public") ?? null;
}
