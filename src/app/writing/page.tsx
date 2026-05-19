import type { Metadata } from "next";
import { Section } from "@/components/section";
import { HeroManifesto } from "@/components/hero/hero-manifesto";
import { WritingList } from "@/components/writing-list";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on AI-native delivery, judgment-priced software, and the long shadows of engineering decisions.",
};

export default function WritingIndexPage() {
  return (
    <>
      <HeroManifesto
        num="02"
        numLabel={"Writing · since 2024"}
        statement={{
          before: "Notes from the ",
          italic: "trenches",
          after:
            ". Mostly on AI-native delivery and how agencies should price judgment.",
        }}
      />

      <Section variant="sm" hairline container="medium">
        <WritingList showMedium />
      </Section>
    </>
  );
}
