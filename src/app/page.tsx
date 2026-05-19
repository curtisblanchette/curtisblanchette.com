import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { HeroEditorial } from "@/components/hero/hero-editorial";
import { ProjectList } from "@/components/project-list";
import { LearningCentre } from "@/components/learning-centre";
import { PullQuote } from "@/components/pull-quote";
import { WritingList } from "@/components/writing-list";
import { Stack } from "@/components/stack";
import { Marquee } from "@/components/marquee";
import { NowBlock } from "@/components/now-block";
import { Cta } from "@/components/cta";
import { WORK } from "@/content/data/work";

/**
 * Home page. Composition follows
 * `docs/cb-site-kit/templates/home.html` exactly.
 *
 *   01 intro lede
 *   — hero (editorial)
 *   02 selected work — ProjectList (compact)
 *   — pull-quote (one per page)
 *   03 learning centre — VHS-styled video showcase
 *   04 writing — top 4 + "All writing →"
 *   05 stack & tools (cb-invert)
 *   — marquee
 *   06 now (lede + terminal)
 *   — CTA (final section before footer)
 *
 * Career and Off-hours intentionally do NOT appear on home (kit
 * composition rule; future homes for them are tracked separately).
 */
export default function HomePage() {
  return (
    <>
      <HeroEditorial
        nameLines={[
          { text: "Curtis" },
          { text: "Blanchette", italic: "," },
          { text: "ships systems." },
        ]}
        role="Lead Software Engineer"
        based="Salmon Arm, BC — UTC−8"
        focus="AI-native delivery · secure AI · engineer workflows"
        status={{
          live: true,
          text: "Open to staff & principal conversations",
        }}
      />

      <Section variant="sm" container="bleed">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
            borderTop: "1px solid var(--border-1)",
            paddingTop: 32,
          }}
        >
          <p
            className="cb-display-sm"
            style={{ maxWidth: "30ch", fontWeight: 500 }}
          >
            I lead engineering at <em className="cb-eiko-i">Metalab</em>.
            Right now: AI-native client work, secure AI enablement, and
            the workflows that accelerate how engineers ship.
          </p>
        </div>
      </Section>

      <Section id="work" variant="sm" container="wide">
        <SectionHeader
          num="02"
          label="Selected work"
          title="Eleven projects I'd be happy to be remembered for."
          sub="Each one shipped. Some are still in production; some were closed-source and are summarised. The full list is longer than is interesting to read."
        />
        <ProjectList items={WORK} />
      </Section>

      <Section container="medium">
        <PullQuote />
      </Section>

      <Section id="learn" variant="sm" container="wide">
        <SectionHeader
          num="03"
          label="Learning Centre"
          title="Talking-head explainers from the workshop."
          sub="Short transmissions on the systems behind AI delivery — memory, retrieval, agent loops, the un-fun parts. Cross-posted from LinkedIn."
        />
        <LearningCentre />
      </Section>

      <Section id="writing" variant="sm" container="wide">
        <SectionHeader
          num="04"
          label="Writing"
          title="Notes from the trenches."
          sub="Mostly on AI-native delivery, judgment as a priced layer, and what changes when execution gets cheap."
        />
        <WritingList limit={4} />
        <div style={{ marginTop: 32 }}>
          <Link href="/writing" className="cb-btn cb-btn--ghost">
            All writing <span className="cb-arrow">→</span>
          </Link>
        </div>
      </Section>

      <Section
        id="stack"
        variant="sm"
        invert
        container="wide"
      >
        <SectionHeader
          num="05"
          label="Stack & tools"
          title="The tools I trust, more or less in order."
          sub="Software is a craft. These are mine. None of them are dogma."
        />
        <Stack />
      </Section>

      <Marquee />

      <Section id="now" variant="sm" container="wide">
        <SectionHeader
          num="06"
          label="Now"
          title="What I'm working on this month."
          sub="A /now page in the Derek-Sivers tradition. Updated when it stops being true."
        />
        <NowBlock />
      </Section>

      <Section id="contact" hairline container="bleed">
        <Cta
          heading={{
            before: "Got something that ",
            italic: "shouldn't",
            after: " break? Let's talk.",
          }}
          lede="Open to staff & principal-level conversations. I read every note; expect a reply within a day or two."
          primary={{
            label: "hello@curtisblanchette.com",
            href: "mailto:hello@curtisblanchette.com",
          }}
          ghost={{
            label: "github.com/curtisblanchette",
            href: "https://github.com/curtisblanchette",
          }}
        />
      </Section>
    </>
  );
}
