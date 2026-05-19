import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DEFAULT_THEME, PRE_HYDRATION_SCRIPT } from "@/lib/themes";
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
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        {/* Pre-hydration: read the stored theme and set data-theme before
            React mounts. Eliminates FOUC and hydration mismatch. */}
        <script
          dangerouslySetInnerHTML={{ __html: PRE_HYDRATION_SCRIPT }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
