# C&F / Logistics Marketing Site — Build Brief

Distilled from building **Star Ship International** (`D:\StarShipWebsite`), a bilingual
EN/BN marketing site for a Bangladesh customs clearing & forwarding company.

Paste this into a new Claude Code session as the starting context for the next site.
Everything below is either a decision that worked or a trap that cost time.

---

## 1. What the site was

Bilingual (EN default + BN, locale-prefixed) marketing site. **34 pages across both
locales.** No database, no backend, no CMS, no login. Goal: inform + convert visitors
into leads via contact/quote forms that email the company.

Routes (per locale): Home · Services index · 6 service detail pages · About · Clients ·
Road Transportation · Gallery · Contact · Quote · localized 404.

---

## 2. Stack (this combination worked — reuse it)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.2** (App Router, TS) | Static-exportable; deploys to Vercel with zero config |
| UI | **React 19.2** | |
| Styling | **Tailwind v4** | CSS-first `@theme` in `app/globals.css`. **There is no `tailwind.config`** |
| Components | **shadcn/ui `base-nova` style** | Built on **`@base-ui/react`, NOT Radix** — API differs, see §4 |
| i18n | **next-intl v4** | `/en` + `/bn` prefixed routes |
| Icons | lucide-react | |
| Forms | react-hook-form + zod | |
| Email | **Web3Forms** | Free, no backend, public key. Alternative: Resend + a route handler |
| Images | `next/image` + a `sharp` compression script | |
| Host | Vercel | |

**Total dependency count stayed small.** No animation library, no state manager, no
component kitchen sink. Motion was pure CSS + one `IntersectionObserver` component.

---

## 3. Environment quirks (Windows + Claude Code)

These cost real time. Front-load them.

- **Node may not be on PATH for spawned shells.** Prefix commands:
  `$env:Path = "$env:ProgramFiles\nodejs;" + $env:Path`
- **`.claude/launch.json` should invoke Next via Node's absolute path**, otherwise
  `next` can't find `node`.
- **The in-app Browser pane runs with `document.hidden === true`.** Consequences:
  - `IntersectionObserver` never fires → reveal animations look broken but aren't
  - CSS animations/transitions are suspended
  - **Screenshots fail**
  - → Verify via **DOM reads and `fetch()` in `javascript_tool`**, not visuals.
- **`npm run build` is the reliable full-project verifier.** Use it as the gate.
- **Dev-server logs are append-only** — stale parse errors persist after you fix them.
  Don't trust the log buffer; re-run the build.
- **Editing `messages/*.json` requires a dev-server restart** — Turbopack caches the
  server-side messages import. HMR will not pick it up.

---

## 4. Framework gotchas (things that differ from training data)

**Next.js 16**
- `middleware.ts` is renamed → **`proxy.ts`**
- A localized 404 needs **both** `app/[locale]/not-found.tsx` **and** a catch-all
  `app/[locale]/[...rest]/page.tsx`. Without the catch-all, unmatched URLs fall through
  to Next's bare default page.
- Read `node_modules/next/dist/docs/` before writing code — the version in the repo is
  the source of truth, not memory.

**Base UI (not Radix)**
- Accordion prop is **`multiple`**, not `openMultiple`
- Button/Sheet/Accordion use a **`render` prop**, not `asChild`
- Link-styled-as-button via `buttonVariants()`

**Tailwind v4**
- Tokens live in `@theme` inside `globals.css`. Don't create `tailwind.config.ts`.

---

## 5. Architecture decisions worth copying

**Put every localizable string in `messages/{en,bn}.json` — including data.**
The single biggest structural lesson. Client names, office addresses, team members,
stat values, fleet capacities, even the brand name went into the message files.
`lib/site-data.ts` holds **only structure**: keys, icons, image paths, phone numbers,
emails, slugs.

> Consequence: adding a client or team member = editing BOTH message files.
> This is the right trade — it's what makes the second language real rather than a
> half-translated shell.

**One `SOCIAL` / `CONTACT` / `SERVICES` constant object.** Header, footer, top bar and
contact page all read from it. Changing a phone number is a one-line edit.

**Motion without a library.** CSS classes in `@layer components` (`.ssi-reveal`,
`.ssi-stagger`, `.ssi-lift`) plus one small client component running an
`IntersectionObserver` that self-disconnects. Safety nets: `<noscript>` style block,
`prefers-reduced-motion` forcing `opacity: 1 !important`, and a bail-out if
`IntersectionObserver` is undefined.

**A signature visual motif.** One small repeated element (a colored rule + glyph before
every section heading) did more for brand coherence than any amount of extra styling.

---

## 6. Traps that bit us — don't repeat them

**Dependency pruning: grep CSS, not just TS/TSX.**
`shadcn` looked like an unused CLI tool sitting in `dependencies`. It isn't — it's
imported by `app/globals.css` as `@import "shadcn/tailwind.css"`. Removing it broke the
build. **Always grep `.css` files before pruning a dependency.**

**Nested transitive vulnerabilities need `overrides`.**
Next bundles its own nested copies of `postcss`/`sharp`; `shadcn` pulls `hono` via
`@modelcontextprotocol/sdk`. Top-level installs don't fix these. Use:
```json
"overrides": { "postcss": "^8.5.25", "sharp": "^0.35.3", "hono": "^4.12.34" }
```
**NEVER run `npm audit fix --force`** — it "fixed" the tree by downgrading Next to 9.3.3.

**Meta descriptions: never reuse body copy.**
All 6 service pages fed their long body paragraph into `description`, producing
209–392 char descriptions that Google truncates mid-sentence. Write dedicated
`meta` keys, 120–160 chars, one per page per locale.

**A `generateMetadata` that returns only `{ title }` silently inherits the parent
description.** That gave two pages identical meta descriptions. Always set both.

**`setState` synchronously inside a `useEffect` body** trips
`react-hooks/set-state-in-effect` in React 19. For DOM-sync fallbacks, use
`el.classList.add(...)` instead — that's the "update external system" pattern the rule
actually wants.

**External links need `target="_blank"` AND `rel="noopener noreferrer"`.**
Ours had neither, so social links navigated visitors *away* from the site in the same tab.

**`.gitignore` needs `.env*` followed by `!.env.example`** — otherwise the template is
ignored too and nobody knows what vars exist.

**Verify translation coverage with visible text only** (`header`/`main`/`footer`
`innerText`). `document.body.textContent` in dev includes the Next RSC payload and gives
false "untranslated English" hits.

---

## 7. Pre-launch checklist

Run these as gates, in order:

```bash
npm run build          # type-check + all pages. The real verifier.
```
```bash
npx eslint .           # must be silent
```
```bash
npm audit              # must be 0
```

Then verify by fetching pages and reading the DOM:

- [ ] Every route returns 200; a bad URL returns **404 status** (not 200) and shows the
      localized 404
- [ ] `/` redirects to default locale; the other locale renders in its own script/font
- [ ] **Every page has a unique meta description, all ≤160 chars**
- [ ] `sitemap.xml` + `robots.txt` show the **real domain**, not `localhost:3000`
      (this is your proof the env var took)
- [ ] Security headers live: CSP, HSTS, `X-Frame-Options`, `nosniff`,
      Referrer-Policy, Permissions-Policy; `poweredByHeader: false`
- [ ] Exactly one `<h1>` per page; no dead `href="#"` links; no link without an
      accessible name
- [ ] **Submit both forms for real** and confirm the email arrives
- [ ] No console errors, no server errors

---

## 8. Deployment (Vercel) — the two things that go wrong

1. **Framework Preset defaults to "Other".** It MUST be set to **Next.js**, or you get a
   static-file deploy with no server and every route 404s.
2. **Env var names must be exact**, and the *value* goes in the value box (easy to paste
   a URL into the Key field).

```
NEXT_PUBLIC_SITE_URL        = https://<project>.vercel.app   (no trailing slash)
NEXT_PUBLIC_WEB3FORMS_KEY   = <key from web3forms.com>
```

**`NEXT_PUBLIC_*` vars are inlined into the JS bundle at build time, not read at
runtime.** Changing one does nothing until you **redeploy with build cache off**.
Get the form key BEFORE the first deploy to avoid a wasted cycle.

Guard against an empty (vs absent) `SITE_URL`: `process.env.X ?? fallback` returns `""`
for an empty string, silently producing broken canonical/OG/sitemap URLs. Check for
falsy, not nullish.

---

## 9. Web3Forms setup

No account, no password. Enter the destination email at web3forms.com → they email you a
UUID access key → verify via the link. The **first real submission** triggers a
confirmation email that must be clicked or delivery stalls.

The key is public by design (it ships in the client bundle). Mitigations: honeypot field
(`botcheck`, bail if non-empty), plus their captcha option if spam appears.

**Add a second recipient email.** Single-inbox delivery with no database means one spam
filter event = a permanently lost lead you never learn about.

---

## 10. Do these differently next time

Ranked by how much they'd have helped:

1. **Get the domain and the form key on day one.** Both blocked launch at the very end,
   and both are pure waiting-on-client items. Ask for them in the first conversation.
2. **Add analytics from the start.** We shipped with none — meaning the site's own stated
   success metric (form submissions) was unmeasurable. Vercel Analytics is ~5 minutes.
3. **Get real client logos early.** Text chips on a page naming major brands read as
   unfinished or unverified. This is the single biggest perceived-professionalism gap.
4. **Collect 2–4 testimonials during content gathering,** not after. We built a
   placeholder section and ended up deleting it, leaving zero social proof.
5. **Budget a native-speaker review of the second language.** Machine-assisted
   translation goes subtly wrong exactly on domain terminology (customs, tariff, LC) —
   which is what the target reader notices first.
6. **Sanity-check every factual claim before it ships.** Founding year vs "X+ years",
   volume counts, client relationships. Do the arithmetic: a number that doesn't survive
   division by days-in-business damages trust with exactly the buyer you want.

---

## 11. Reusable content skeleton for a C&F company

Sections that earned their place on the homepage, in order:
Hero → trust strip → services grid → gateways/ports served → stats → why-partner-with-us
→ client logos → FAQ → closing CTA.

Standard C&F service taxonomy (adapt names to the client's own copy):
Customs Clearance · Freight & Shipping · Specialized/DG Cargo · Logistics Solutions ·
Trade Consultancy (LC advisory + duty/tax) · Warehouse Management.

Info to gather from the client up front:
legal status & founding year · authorizations/licences · ports & gateways served ·
office addresses + phones + emails · management team · client list (**with permission to
name them publicly**) · cargo types handled · fleet inventory · photo rights · social
accounts · destination inbox for forms · domain.
