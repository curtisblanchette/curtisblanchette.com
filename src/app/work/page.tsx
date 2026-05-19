import type { Metadata } from "next";
import { Section } from "@/components/section";
import { HeroManifesto } from "@/components/hero/hero-manifesto";
import { ProjectGrid } from "@/components/project-grid";
import { WORK } from "@/content/data/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies and open-source work — Curtis Blanchette.",
};

export default function WorkIndexPage() {
  return (
    <>
      <HeroManifesto
        num="01"
        numLabel={"Selected work · 2024 – 2025"}
        statement={{
          before: "A short, honest list of ",
          italic: "things I'm proud of",
          after: " shipping.",
        }}
      />

      <Section variant="sm" hairline container="wide">
        <ProjectGrid items={WORK} />
      </Section>
    </>
  );
}
