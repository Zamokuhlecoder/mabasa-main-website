export const site = {
  name: "Blackroid",
  legalName: "Blackroid (Pty) Ltd",
  tagline: "Engineering better businesses.",
  description:
    "Blackroid partners with organisations to solve complex business challenges, strengthen operations, and create lasting value through technology, engineering, and strategic execution.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_ZA",
  country: "South Africa",
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "blackroid@gmail.com",
  /** Where the client portal login lives. Until it is set the Client Portal links point to "#". */
  clientPortalUrl: process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || "#",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Builds a remote Unsplash URL (images are free-licence, served via next/image). */
export function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=75`;
}
