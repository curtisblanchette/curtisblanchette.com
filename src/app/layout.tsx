import type { Metadata, Viewport } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PRE_HYDRATION_SCRIPT } from "@/lib/themes";
import { basis, eiko, plex } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://curtisblanchette.com",
  ),
  title: {
    default: "Curtis Blanchette — Lead Software Engineer",
    template: "%s · Curtis Blanchette",
  },
  description:
    "Curtis Blanchette. Lead Software Engineer at Metalab. Building judgment-priced software with the best tools in the industry to amplify it.",
  applicationName: "curtisblanchette.com",
  authors: [{ name: "Curtis Blanchette" }],
  creator: "Curtis Blanchette",
  openGraph: {
    title: "Curtis Blanchette",
    description:
      "Lead Software Engineer at Metalab. AI tooling, IoT, and agency-grade systems.",
    url: "/",
    siteName: "curtisblanchette.com",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curtis Blanchette",
    description:
      "Lead Software Engineer at Metalab. AI tooling, IoT, and agency-grade systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${basis.variable} ${eiko.variable} ${plex.variable}`}
    >
      <head>
        {/* Pre-hydration: migrate legacy theme ids, then apply the kit
            theme className to <html> before React mounts. Eliminates
            FOUC and hydration mismatch. */}
        <script
          dangerouslySetInnerHTML={{ __html: PRE_HYDRATION_SCRIPT }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
