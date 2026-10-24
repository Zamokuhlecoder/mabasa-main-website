# Blackroid - Website

Marketing and lead-generation website for **Blackroid**, a South African technology consulting and software engineering company.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion for React and Lucide icons. Ready to deploy on Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script              | Purpose                        |
| ------------------- | ------------------------------ |
| `npm run dev`       | Development server             |
| `npm run build`     | Production build               |
| `npm run start`     | Serve the production build     |
| `npm run lint`      | ESLint (Next.js + React rules) |
| `npm run typecheck` | TypeScript, no emit            |
| `npm run format`    | Prettier                       |

## Environment variables

See [`.env.example`](.env.example) for the full list.

| Variable                                                                       | Required        | Notes                                                                                             |
| ------------------------------------------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                                         | Yes (prod)      | Canonical URL used in metadata, sitemap, Open Graph, structured data.                             |
| `CONTACT_TO_EMAIL`                                                             | No              | Enquiry destination. Defaults to `Scofield@blackroid.com`.                                        |
| `CONTACT_FROM_EMAIL`                                                           | Yes (for email) | Sender address on a domain verified with your provider.                                           |
| `RESEND_API_KEY`                                                               | One of these    | Uses [Resend](https://resend.com) when set.                                                       |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_SECURE`      | One of these    | Any SMTP provider, used when no Resend key is set.                                                |
| `NEXT_PUBLIC_CONTACT_EMAIL`                                                    | No              | Public address shown on the site. Defaults to `Scofield@blackroid.com`.                           |
| `NEXT_PUBLIC_CLIENT_PORTAL_URL`                                                | No              | Address of the client portal login. Until set, the Login links open the built-in `/login` page.   |
| `NEXT_PUBLIC_LINKEDIN_URL` / `NEXT_PUBLIC_INSTAGRAM_URL` / `NEXT_PUBLIC_X_URL` | No              | Profile addresses for the top-bar icons. WhatsApp uses the phone number; unset icons link to `#`. |

If email delivery is not configured, the contact API responds with `503` and the form shows a clear "temporarily unavailable" message - it never pretends a submission succeeded.

## Contact workflow

`POST /api/contact` (`src/app/api/contact/route.ts`):

- **Validation** - shared Zod schema (`src/lib/contact-schema.ts`) on both client and server.
- **Spam protection** - hidden honeypot field plus a minimum fill-time check; caught submissions are discarded silently.
- **Rate limiting** - 5 submissions per IP per 10 minutes (`src/lib/rate-limit.ts`). This is in-memory and per serverless instance; for a strict global limit, back it with Vercel KV / Upstash Redis.
- **Origin check** - cross-site POSTs are rejected.
- **Delivery** - Resend or SMTP (`src/lib/mail.ts`); user input is HTML-escaped and the enquirer's address is set as `Reply-To`.
- **Failure handling** - `422` validation, `429` rate limit, `502` provider failure, `503` not configured, each surfaced to the user.

## Content

All copy lives in typed data files so it can be edited without touching layout code:

- `src/lib/services.ts` - the six services (also drives `/services/[slug]` pages, footer, form options).
- `src/lib/industries.ts` - industry challenges and illustrative solutions.
- `src/lib/process.ts` - the four-stage engagement model.
- `src/lib/case-studies.ts` - **empty by design.** Add only verified, client-approved case studies; when present, the homepage "Selected Work" section lists them automatically. Until then it shows a problem-led, services-to-contact section.
- `src/lib/clients.ts` - client names shown on the homepage. Add each client's `feedback` (their own approved quote, the person's name and role) and a testimonial card appears automatically.
- `src/lib/site.ts` - brand name, legal name, navigation.

## Search visibility & content protection

**Discoverability**

- `sitemap.xml`, `robots.txt`, Open Graph image and `/llms.txt` (a plain summary for AI assistants) are generated automatically.
- Structured data (schema.org `ProfessionalService`, `WebSite`, `Service`, `FAQPage`, breadcrumbs) is on every relevant page.
- **Set `NEXT_PUBLIC_SITE_URL`** to the live domain, or every canonical URL, sitemap entry and llms.txt link will point at localhost.
- After launch: verify the domain in Google Search Console and Bing Webmaster Tools (`GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`) and submit `/sitemap.xml`.

**Protection** (`src/app/robots.ts`, `next.config.ts`, `public/.well-known/tdmrep.json`)

- AI _training_ crawlers (GPTBot, ClaudeBot, CCBot, Bytespider, Meta, Cohere, …) are disallowed.
- Search engines and AI _assistants_ that answer users and link back (Google, Bing, ChatGPT search, Claude search, Perplexity) are allowed, so the site can be found and recommended. `Google-Extended` is allowed because it powers Gemini's cited answers; move it to the blocked list if you'd rather opt out of Gemini entirely.
- Text-and-data-mining rights are reserved via the W3C TDMRep header, meta tag and `.well-known/tdmrep.json`.
- No source maps are shipped to browsers.

**Limits - read this.** A public website must send its HTML, CSS and text to every visitor, so it cannot be made uncopyable; robots.txt and TDMRep are honoured by reputable operators, not enforced. For stronger protection: keep this repository **private**, turn on Vercel's Firewall / Bot Protection to rate-limit and challenge scrapers, and rely on the copyright notice for legal recourse.

## Before going live

- [ ] **Privacy policy** (`/privacy`) is marked **draft**. Have it reviewed by a legal adviser and complete every highlighted "To be confirmed" item (registration number, Information Officer, address, providers, retention period, PAIA manual). Then remove the draft banner.
- [ ] Confirm the legal entity name in `src/lib/site.ts` (`legalName`, currently `Blackroid (Pty) Ltd`).
- [ ] Set `NEXT_PUBLIC_SITE_URL` and email variables in Vercel → Project → Settings → Environment Variables.
- [ ] Verify the sender domain with your email provider and send a test enquiry.
- [ ] Optionally replace the Unsplash photography (free licence, served via `next/image`) with Blackroid's own imagery.

## Deploying to Vercel

1. Push this folder to a Git repository and import it in Vercel (framework preset: Next.js; no extra config needed).
2. Add the environment variables above.
3. Deploy. `sitemap.xml`, `robots.txt`, the Open Graph image and the favicon are generated automatically.
