export type CareerEntry = {
  company: string;
  role: string;
  start: string;
  end: string | "present";
  location: string;
  href?: string;
  bullets: string[];
};

export const CAREER: CareerEntry[] = [
  {
    company: "Metalab",
    role: "Lead Software Engineer",
    start: "2024",
    end: "present",
    location: "Remote · CA",
    href: "https://metalab.com",
    bullets: [
      "Leads engineering on AI-native client engagements spanning editorial recommendation, longevity-risk platforms, and enterprise workflow orchestration.",
      "Drives internal AI tooling: MCP servers, AI-assisted coding workflows, and skill systems that encode delivery practice for the wider team.",
      "Publishes industry analysis on how agencies should adapt to AI-native execution — judgment, not velocity, as the priced layer.",
    ],
  },
  {
    company: "4iiz Software",
    role: "Full Stack Software Engineer",
    start: "2021",
    end: "2024",
    location: "Wilmington, NC · remote",
    href: "https://www.4iiz.com",
    bullets: [
      "Owned architecture and delivery of flagship legal software on Angular, Node, Express, PostgreSQL, and AWS.",
      "Translated business intent into scoped, estimated, documented engineering plans for technical and non-technical stakeholders.",
      "Led cross-functional teams of engineers, QA, and support in a fast-paced remote environment.",
    ],
  },
  {
    company: "4iiz Software",
    role: "Senior Software Engineer",
    start: "2019",
    end: "2021",
    location: "Wilmington, NC · remote",
    href: "https://www.4iiz.com",
    bullets: [
      "Authored complex SQL surfacing reports across marketing, client lifecycle, budget, and staff compliance.",
      "Engineered VoIP integrations into customer-facing web applications supporting large North-American call centres.",
      "Hardened the design, engineering, and QA loop into a continuous-delivery cadence.",
    ],
  },
  {
    company: "QHR Technologies",
    role: "Lead Software Engineer",
    start: "2017",
    end: "2019",
    location: "Kelowna, BC",
    href: "https://www.qhrtechnologies.com",
    bullets: [
      "Bridged Shoppers Drug Mart and QHR healthcare platforms in an Agile environment with Angular, Java Spring Boot, and MSSQL.",
      "Owned the hiring process and scaled cross-functional remote teams across Canada.",
      "Coached individual contributors on personal and professional development.",
    ],
  },
  {
    company: "JBF Sports",
    role: "Lead Frontend Engineer",
    start: "2016",
    end: "2017",
    location: "Kelowna, BC",
    href: "https://www.jbfsports.com",
    bullets: [
      "Distributed Ionic / Apache Cordova hybrid-mobile apps to NHL and NFL franchises on the Google Play and iTunes stores.",
      "Engineered white-labelled real-time chat applications for kids using WebSockets.",
      "Researched and shipped mobile UX patterns that drove durable in-app engagement.",
    ],
  },
  {
    company: "JBF Sports",
    role: "Frontend Software Engineer",
    start: "2015",
    end: "2016",
    location: "Kelowna, BC",
    href: "https://www.jbfsports.com",
    bullets: [
      "Designed and shipped an engaging mobile-app onboarding experience.",
      "Engineered a proprietary marketing-campaign builder enabling sports marketers to reach audiences through branded, templated campaigns.",
    ],
  },
];
