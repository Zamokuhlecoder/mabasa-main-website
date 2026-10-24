import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { team } from "@/lib/team";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Blackroid | Engineering Better Businesses",
    template: "%s | Blackroid",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "technology consulting South Africa",
    "business and technology partner",
    "operational improvement",
    "systems modernisation",
    "systems integration",
    "enterprise software engineering",
    "AI and automation for business",
    "strategic technology consulting",
    "technology-enabled transformation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
    title: "Blackroid | Engineering Better Businesses",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  // Text-and-data-mining rights reserved (W3C TDMRep); does not affect search indexing.
  other: { "tdm-reservation": "1" },
};

export const viewport: Viewport = {
  themeColor: "#00142f",
  width: "device-width",
  initialScale: 1,
};

const toPerson = (m: (typeof team)[number]) => ({
  "@type": "Person",
  name: m.name,
  ...(m.alias ? { alternateName: m.alias } : {}),
  jobTitle: m.role,
  image: `${site.url}${m.image}`,
  worksFor: { "@id": `${site.url}/#organization` },
});
const founders = team.filter((m) => m.name && m.founder).map(toPerson);
const staff = team.filter((m) => m.name && !m.founder).map(toPerson);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}/brand/logo-dark.png`,
      image: `${site.url}/opengraph-image`,
      description: site.description,
      slogan: "Engineering better businesses.",
      areaServed: { "@type": "Country", name: site.country },
      audience: { "@type": "BusinessAudience", audienceType: "Startups, SMEs and growing organisations" },
      knowsAbout: [
        "Custom software development",
        "Web applications",
        "Artificial intelligence and automation",
        "Cloud infrastructure",
        "Data engineering and analytics",
        "Systems integration",
        "Technology consulting",
      ],
      ...(site.publicEmail ? { email: site.publicEmail } : {}),
      // Only named people are published as structured data; nothing is invented.
      ...(founders.length ? { founder: founders } : {}),
      ...(staff.length ? { employee: staff } : {}),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Technology consulting and engineering services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.short,
            url: `${site.url}/services/${s.slug}`,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en-ZA",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${interTight.variable} ${plexMono.variable}`}>
      <body>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
        <JsonLd data={structuredData} />
      </body>
    </html>
  );
}
