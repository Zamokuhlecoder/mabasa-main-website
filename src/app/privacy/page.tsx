import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Blackroid collects, uses and protects personal information in line with the Protection of Personal Information Act (POPIA).",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "22 October 2026";

/** Placeholder that must be completed before this policy is published as final. */
function ToConfirm({ children }: { children: React.ReactNode }) {
  return <mark className="rounded-sm bg-amber-100 px-1 py-0.5 text-amber-900">[To be confirmed: {children}]</mark>;
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero compact title="Privacy Policy" />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-muted">Last updated</p>
              <p className="mt-2 text-ink">{LAST_UPDATED}</p>
            </div>
          </aside>

          <article className="prose-mst lg:col-span-8">
            <div
              role="note"
              className="mb-12 flex gap-4 rounded-[4px] border border-amber-300 bg-amber-50 p-5 text-[0.9375rem] leading-relaxed text-amber-900"
            >
              <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <p>
                <strong className="font-semibold">Draft: subject to legal review.</strong> This policy has been prepared
                as a working draft and has not yet been approved by a legal adviser. Items marked &ldquo;To be
                confirmed&rdquo; must be completed before this policy is treated as final.
              </p>
            </div>

            <h2>1. Who we are</h2>
            <p>
              This website is operated by {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;), a company registered in South Africa (registration number{" "}
              <ToConfirm>company registration number</ToConfirm>). For the purposes of the Protection of Personal
              Information Act 4 of 2013 (&ldquo;POPIA&rdquo;), {site.name} is the responsible party for personal
              information collected through this website.
            </p>
            <p>
              Our Information Officer can be contacted at{" "}
              <ToConfirm>Information Officer name and email address</ToConfirm>. Our physical address is{" "}
              <ToConfirm>registered business address</ToConfirm>.
            </p>

            <h2>2. Personal information we collect</h2>
            <h3>Information you provide</h3>
            <p>When you submit an enquiry through our contact form, we collect:</p>
            <ul>
              <li>your full name, work email address and company name;</li>
              <li>the service you are interested in and, optionally, an estimated project budget; and</li>
              <li>the project description and any other information you choose to include in your message.</li>
            </ul>
            <p>
              Please do not include special personal information (such as health information) or information about other
              individuals in your enquiry unless it is necessary.
            </p>
            <h3>Information collected automatically</h3>
            <p>
              Like most websites, our hosting infrastructure processes technical information such as your IP address,
              browser type and the pages requested. We use this information to deliver the website, keep it secure and
              prevent abuse (for example, limiting repeated form submissions). We do not use advertising or analytics
              cookies on this website.
            </p>

            <h2>3. How we use your information</h2>
            <p>We process personal information only for specific, lawful purposes, namely to:</p>
            <ul>
              <li>respond to your enquiry and communicate with you about it;</li>
              <li>assess and prepare proposals for services you have asked about;</li>
              <li>maintain records of business correspondence; and</li>
              <li>protect the security and integrity of our website and systems.</li>
            </ul>
            <p>
              We rely on your consent (given when you submit the form), on the need to take steps at your request before
              concluding a contract, and on our legitimate interests in operating our business securely, as permitted by
              section 11 of POPIA. We will not use your information for direct marketing unless you have separately
              agreed to receive it, and you may opt out at any time.
            </p>

            <h2>4. Sharing your information</h2>
            <p>
              We do not sell personal information. We share it only with service providers (&ldquo;operators&rdquo;)
              that process it on our behalf to run this website and deliver email, such as our website hosting and email
              delivery providers. These providers are bound by contractual obligations to keep the information
              confidential and secure, as required by sections 20 and 21 of POPIA. We may also disclose information
              where required by law.
            </p>

            <h2>5. Transfers outside South Africa</h2>
            <p>
              Some of our service providers may store or process information on servers located outside South Africa.
              Where this happens, we take steps to ensure the recipient is subject to laws, binding rules or agreements
              that provide an adequate level of protection, in accordance with section 72 of POPIA.{" "}
              <ToConfirm>list of hosting and email providers and their data locations</ToConfirm>
            </p>

            <h2>6. How long we keep information</h2>
            <p>
              We keep enquiry information only for as long as needed for the purposes described above, including any
              resulting business relationship, and thereafter for as long as required by law or for legitimate record
              keeping. Enquiries that do not lead to an engagement are deleted or de-identified within{" "}
              <ToConfirm>retention period</ToConfirm>.
            </p>

            <h2>7. Security</h2>
            <p>
              We apply appropriate, reasonable technical and organisational measures to protect personal information
              against loss, damage and unauthorised access, including encrypted connections (HTTPS), access controls and
              restricting access to people who need it. If we become aware of a security compromise affecting your
              personal information, we will notify you and the Information Regulator as required by section 22 of POPIA.
            </p>

            <h2>8. Your rights</h2>
            <p>Subject to POPIA, you have the right to:</p>
            <ul>
              <li>ask whether we hold personal information about you and request access to it;</li>
              <li>
                request the correction or deletion of personal information that is inaccurate, irrelevant, excessive,
                out of date, incomplete, misleading or unlawfully obtained;
              </li>
              <li>object to the processing of your personal information on reasonable grounds;</li>
              <li>withdraw your consent at any time, without affecting processing that took place beforehand; and</li>
              <li>lodge a complaint with the Information Regulator.</li>
            </ul>
            <p>
              To exercise these rights, contact our Information Officer using the details in section 1. We may need to
              verify your identity before responding. Requests for access to records may also be made in terms of our
              manual under the Promotion of Access to Information Act (PAIA).{" "}
              <ToConfirm>PAIA manual availability</ToConfirm>
            </p>

            <h2>9. Cookies</h2>
            <p>
              This website does not set advertising, tracking or analytics cookies. Any cookies or similar storage used
              are strictly necessary for the website to function. If this changes, we will update this policy and, where
              required, ask for your consent first.
            </p>

            <h2>10. Children</h2>
            <p>
              Our website and services are intended for businesses. We do not knowingly collect personal information
              from children under the age of 18.
            </p>

            <h2>11. Complaints</h2>
            <p>
              If you are concerned about how we have handled your personal information, please contact us first so we
              can try to resolve it. You also have the right to lodge a complaint with the Information Regulator (South
              Africa). Its current contact details are published at{" "}
              <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">
                inforegulator.org.za
              </a>
              .
            </p>

            <h2>12. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The latest version will always be available on this page,
              with the date it was last updated.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
