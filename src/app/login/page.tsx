import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { LoginForm } from "@/components/LoginForm";
import loginHero from "../../../public/images/login-hero.webp";

export const metadata: Metadata = {
  title: "Client login",
  description: "Sign in to the Blackroid client portal.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        title="Client login."
        compact
        background={
          <>
            <Image
              src={loginHero}
              alt=""
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/45 to-navy-950/35" />
          </>
        }
      />
      <section className="bg-white py-16 lg:py-24">
        <div className="container-site">
          <p className="mb-10 text-center text-lg text-ink-soft">For Blackroid clients.</p>
          <LoginForm />
        </div>
      </section>
    </>
  );
}
