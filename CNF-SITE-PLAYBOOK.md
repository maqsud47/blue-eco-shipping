# Building a C&F / Logistics Company Website — Reusable Playbook

## What was built (the template)
A bilingual (English/Bangla) marketing site for a Bangladesh customs clearing & forwarding company, deployed to Vercel. ~34 static pages across two locales. Goal was lead-gen (contact + quote forms), not e-commerce.

**The fastest path for site #2: copy the whole `D:\StarShipWebsite` repo, rename it, and swap the content** — because 90% of the work lives in data/message files, not in code (that was a deliberate design choice). See "How to clone it" below.

## Tech stack (all locked, all worked well)
- **Next.js 16** (App Router) + TypeScript
- **Tailwind v4** — CSS-first, tokens in `app/globals.css` via `@theme` (no `tailwind.config`)
- **shadcn/ui "base-nova"** — built on `@base-ui/react`, NOT Radix. API differences: uses `render` prop (not `asChild`), accordion prop is `multiple` (not `openMultiple`)
- **next-intl v4** — locale-prefixed routes `/en`, `/bn`
- **react-hook-form + zod** forms → **Web3Forms** (email delivery, no backend/database)
- Deploy: **Vercel**, zero-config

## Page structure
Home · Services (index + one detail page per service) · About · Clients · Road Transportation (fleet) · Gallery · Contact · Quote (modal + page) · localized 404

Home sections: Hero (photo + ink-navy overlay) → trust strip → services grid → gateways (with photos) → stats counter → why-us → clients → transport-wing teaser → FAQ accordion → closing CTA.

## The single most important architectural decision
**All localizable/company-specific content lives in `messages/en.json` + `messages/bn.json`, NOT in the code.** That includes client names, office addresses, team members, stat numbers, fleet capacities, service copy, and the brand name.

`lib/site-data.ts` holds only *structure* — keys, lucide icon references, image paths, phone/email. Everything else is a translation key.

➡️ **This is why cloning for a new company is mostly editing two JSON files.** For site #2 you rewrite `messages/*.json` + `site-data.ts` + swap images, and barely touch components.

## How to clone it for the new C&F company
1. Copy the repo to a new folder, `rm -rf .git .next node_modules`, `git init`.
2. Rename in `package.json`, `README.md`, `app/manifest.ts`, and the `brand.{name,first,rest}` keys in both message files.
3. Rewrite `messages/en.json` with the new company's real copy; regenerate/translate `bn.json` (keep identical key structure — I used a Node script to mirror keys).
4. Edit `lib/site-data.ts`: services list, gateways, offices (phones/emails), fleet, social URLs, `CLIENT_COUNT`/`TEAM_COUNT`.
5. Drop new images into `public/photos/{services,fleet,gallery}` + `public/brand/logo.png`, then run `node scripts/compress-images.mjs`.
6. Adjust design tokens in `app/globals.css` if the new brand isn't navy (this one was navy + signal-blue, Sora/Inter/Noto Sans Bengali).
7. `npm install && npm run build` to verify.

## Workflow that worked well
- **Plan-first**: I read spec files (`AGENTS.md`, `project-details.md`, `design.md`) and produced a full implementation plan before coding. Having a content spec + a design spec as separate documents was very effective — do the same for the new company.
- **Build in phases with review checkpoints**: design system → i18n plumbing → layout shell → home → inner pages → forms → SEO → security. Each verified with `npm run build`.
- Used the **`frontend-design` skill** for design direction (distinctive palette/type, a signature motif — here a ship-star "heading rule").

## Gotchas to tell Claude Code up front (these cost time)
1. **Node isn't on PATH** for spawned shells on this machine → prefix: `$env:Path = "$env:ProgramFiles\nodejs;" + $env:Path`. The dev server must launch Next via Node's absolute path.
2. **The in-app Browser pane runs hidden** (`document.hidden === true`) → screenshots fail, scroll animations/IntersectionObserver don't fire, `getComputedStyle` shows animated elements as invisible. **Don't trust visual verification there — use `npm run build` and DOM reads.**
3. **Editing `messages/*.json` needs a dev-server restart** (Turbopack caches server messages). Dev logs are append-only so old errors linger after fixes.
4. **Next 16 renamed `middleware.ts` → `proxy.ts`.**
5. **base-nova shadcn ≠ classic shadcn** — different component APIs (see stack note above).
6. **`npm audit`**: Next bundles nested `postcss`/`sharp`; fix via `"overrides"` in package.json. **Never `npm audit fix --force`** — it downgrades Next to 9.3.3.
7. next-intl + all-content-in-messages means a **custom 404 needs a `[...rest]` catch-all** route inside `[locale]` to trigger.

## What's included beyond basic pages (worth keeping)
- Scroll-reveal animations (pure CSS + one small IntersectionObserver component, no animation library; respects reduced-motion + noscript)
- Back-to-top button, skip-to-content link
- SEO: per-locale metadata, `sitemap.ts`, `robots.ts`, hreflang alternates, JSON-LD `LocalBusiness` per office
- Security headers in `next.config.ts` (CSP, HSTS, X-Frame-Options, nosniff, Permissions-Policy, no `x-powered-by`)
- PWA manifest, image compression script

## Pre-launch checklist (applies to any client)
- **Web3Forms key** in env — without it forms silently don't send (they show "not configured")
- Real client **logos** (this build used text placeholders)
- **Native-speaker review** of Bangla copy (customs/trade jargon)
- Social URLs (LinkedIn was left as a dead `#`)
- Live domain via `NEXT_PUBLIC_SITE_URL` env var (no code change needed)
- `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_WEB3FORMS_KEY` set in Vercel (env var **names must be exact**)

## Two Vercel deploy traps (hit both this session)
- **Application Preset defaults to "Other" → set it to "Next.js"** or the build serves your `public/` folder as a broken static site.
- Env var **Key** field = the variable name (`NEXT_PUBLIC_SITE_URL`), not the value. Easy to fill in backwards.

---

**Recommendation for the new site:** prepare the same three source docs first — a **content spec** (company facts, services, offices, clients, team), a **design spec** (palette, fonts, tone), and an **`AGENTS.md`** with the locked stack decisions. Hand those to Claude Code, point it at this repo as the reference implementation, and say "clone this structure for [new company]." That'll be dramatically faster than starting fresh.
