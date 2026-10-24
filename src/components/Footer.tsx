import Image from "next/image";
import Link from "next/link";
import { Logo } from "./ui/Logo";
import { BbbeeBadge } from "./ui/BbbeeBadge";
import { SocialLinks } from "./SocialLinks";
import { navigation, site } from "@/lib/site";
import { services } from "@/lib/services";
import wordmark from "../../public/brand/wordmark-light.png";

const link = "text-[0.9375rem] leading-snug text-white/70 transition-colors hover:text-white focus-visible:text-white";
const heading = "mb-5 text-sm font-medium text-white";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden bg-navy-950 text-white">
      <div className="container-site pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo tone="light" />
            <BbbeeBadge className="mt-10 h-28 w-auto" />
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-9 lg:col-start-4 lg:gap-x-10"
          >
            <div className="order-1">
              <h2 className={heading}>Company</h2>
              <ul className="space-y-3.5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={site.clientPortalUrl} className={link}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className={link}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="order-3 col-span-2 sm:order-2 sm:col-span-1">
              <h2 className={heading}>Services</h2>
              <ul className="space-y-3.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={link}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-2 sm:order-3">
              <h2 className={heading}>Contact</h2>
              <ul className="space-y-3.5">
                <li>
                  <a href={`mailto:${site.publicEmail}`} className={`${link} break-all`}>
                    {site.publicEmail}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phone}`} className={link}>
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" className={link}>
                    Chat on WhatsApp
                  </a>
                </li>
                <li>
                  <Link href="/contact" className={link}>
                    Start a project
                  </Link>
                </li>
                <li className="pt-2 text-white/70">
                  <SocialLinks className="gap-5 [&_svg]:size-5" />
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>{site.country}</p>
        </div>
      </div>

      {/* A large, faint wordmark closes the page. */}
      <div aria-hidden="true" className="container-site select-none pt-10 pb-6">
        <Image src={wordmark} alt="" className="h-auto w-full opacity-[0.07]" />
      </div>
    </footer>
  );
}
