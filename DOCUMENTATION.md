# Abucore Enterprises — Website Documentation

Full documentation of everything contained in this website: the company it represents, the technology it's built with, every page and section, all the content/data, the design system, and known gaps.

---

## 1. What the site is

A **corporate marketing website** (online brochure) for **Abucore Enterprises Limited**, a Nigerian general **contracting, procurement, and supply company** based in **Katsina State, Nigeria**.

- **Purpose:** present the company as a trustworthy contractor/supplier and convert visitors into leads via "Request a Quote" / call / WhatsApp.
- **Audience:** government agencies, ministries, hospitals, schools, NGOs, and private companies.
- **Founder & Managing Director:** Abubakar Muktar.
- **Tagline:** *"Reliable Procurement. Precision Execution."*
- **Headline stats:** 34+ LGAs covered · 10+ service categories · 100% delivery commitment.

There is **no user login, no e-commerce, and no live backend** — it is a static front-end marketing site.

---

## 2. Technology stack

| Area | Technology |
|------|-----------|
| Build tool | **Vite 8** (`npm run dev` / `build` / `preview`) |
| Framework | **React 18** + **TypeScript** |
| Routing | **react-router-dom 6** |
| Styling | **Tailwind CSS 3** (custom navy/gold theme) |
| UI components | **shadcn/ui** (~50 Radix-based primitives in `src/components/ui/`) |
| Animation | **framer-motion** |
| Icons | **lucide-react** |
| Forms | **react-hook-form** + **zod** (available; contact form currently uses local state) |
| Data layer | **@tanstack/react-query** (installed, not yet used for real data) |
| Toasts | **sonner** + shadcn toaster |
| Fonts | **Outfit** (display) + **Inter** (body), loaded via Google Fonts |
| Testing | **Vitest** + Testing Library; **Playwright** installed |
| Origin | Scaffolded via Lovable (`vite_react_shadcn_ts`) |

### Scripts (`package.json`)
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run build:dev` — development-mode build
- `npm run preview` — preview built site
- `npm run lint` — ESLint
- `npm run test` / `test:watch` — Vitest

---

## 3. Routing map (`src/App.tsx`)

| Path | Page component | Notes |
|------|----------------|-------|
| `/` | `Index` | Homepage |
| `/about` | `About` | |
| `/about-us` | `About` | Alias of `/about` |
| `/services` | `Services` | |
| `/who-we-serve` | `WhoWeServe` | |
| `/contact` | `Contact` | |
| `*` | `NotFound` | 404 page |

> Note: `App.tsx` wraps everything in a `TooltipWrap` component that is currently a **no-op passthrough** (leftover from a removed `TooltipProvider`).

---

## 4. Pages

### 4.1 Home — `src/pages/Index.tsx`
Composed of the following sections in order:

1. **Header** — fixed nav
2. **Hero**
3. **ProjectTracker**
4. **ClientsStrip**
5. **ServicesGrid**
6. **ProjectsShowcase**
7. **WhyChoose**
8. **HowWeWork**
9. **AboutPreview**
10. **PartnershipCTA**
11. **Testimonials**
12. **CTABanner**
13. **Footer**

### 4.2 About — `src/pages/About.tsx`
- **PageHero:** "The Company Behind the Contracts"
- **Mission:** eliminate delays/inefficiencies in procurement & project execution across Nigeria.
- **Vision:** become a leading government and institutional contracting partner in Nigeria.
- **Our Story:** Nigerian-based general contracting & procurement company; based in Katsina; 34+ LGAs; 10+ categories; 100% completion.
- **Values (4):** Integrity · Reliability · Excellence · Partnership.
- **Timeline:** 2025 founded → 2025 first government contracts → 2026 expanded to 34+ LGAs.
- **Compliance:** CAC registered · TIN available · eligible for government/institutional procurement · structured for nationwide contract execution.
- **Founder:** Abubakar Muktar — Founder & Managing Director (bio + photo).

### 4.3 Services — `src/pages/Services.tsx`
- **PageHero:** "Contract-Based Solutions"
- **Three service categories:**
  1. **Procurement & Supply Contracts** — Office Equipment & Stationery · Furniture Supply · Medical Consumables & Equipment · Agricultural Inputs · Uniforms & Textiles
  2. **Civil Works & Infrastructure** — Building Construction · Renovation & Maintenance · Facility Upgrades
  3. **Operational Supply Contracts** — Diesel & Fuel Supply · Printing & Branding · Bulk Supply Agreements
  
  Each service has a description and feature tags.
- **Capabilities (5):** 34+ LGA coverage · rapid procurement/fulfillment · dedicated logistics network · skilled workforce · strong vendor network.
- **Operations highlights (3):** Warehousing & Inventory · Logistics Fleet · On-Site Operations (each with image).

### 4.4 Who We Serve — `src/pages/WhoWeServe.tsx`
- **PageHero:** "Who We Serve"
- **Six client segments:** Government Agencies · Ministries & Departments · Healthcare Institutions · Educational Institutions · NGOs & Development Orgs · Private Sector Companies (each with description + tags).

### 4.5 Contact — `src/pages/Contact.tsx`
- **PageHero:** "Contact Abucore"
- **Quote form fields:** Full Name* · Email* · Phone · Service Needed (dropdown of 11 options) · Message*.
- **Contact info:** Phone/WhatsApp **07079462587** · Email **abucoreenterprises@gmail.com** · Location **Katsina State, Nigeria** · Response time **within 24 hours**.
- **WhatsApp button:** links to `https://wa.me/2347079462587`.
- ⚠️ **Form is front-end only** — `handleSubmit` shows a success toast and resets the form; it does **not** send data anywhere (no API/email integration).

### 4.6 Not Found — `src/pages/NotFound.tsx`
Simple 404 page with a link back home; logs the bad path to the console.

---

## 5. Components (`src/components/`)

### Layout / shared
| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Fixed top nav, logo, desktop links + "Get a Quote", mobile hamburger menu, active-link animation, shadow on scroll. |
| `Footer.tsx` | Brand blurb, quick links, services list, contact details, dynamic copyright year. |
| `PageHero.tsx` | Reusable gradient hero for interior pages (label + title + optional description). |
| `NavLink.tsx` | Nav link helper. |

### Homepage sections
| Component | Content |
|-----------|---------|
| `Hero.tsx` | Main headline, subtext, "Request a Quote" + "Call Us Today" buttons, 3 stat counters, background image. |
| `ProjectTracker.tsx` | **Interactive** "Track Your Execution Pulse" — search a project ID; opens a modal with a milestone progress tracker. Uses **mock data** for 3 IDs: `ABU-2024-X1`, `ABU-2024-X2`, `ABU-2024-X3`. |
| `ClientsStrip.tsx` | "Trusted by organizations across Nigeria" — 6 client-type labels. |
| `ServicesGrid.tsx` | 4 featured services with images → links to `/services`. |
| `ProjectsShowcase.tsx` | 3 capability cards (Procurement, Logistics, Infrastructure). |
| `WhyChoose.tsx` | 4 reasons: Execution-Focused · Reliable & Time-Bound · Transparent Processes · End-to-End Control. |
| `HowWeWork.tsx` | 4-step process: Consultation → Quotation → Execution → Delivery. |
| `AboutPreview.tsx` | Short about blurb + founder card → links to `/about`. |
| `PartnershipCTA.tsx` | "Let's Execute Your Next Contract Together" with bullet benefits + meeting image. |
| `Testimonials.tsx` | 3 client testimonials (Ibrahim Bello, Fatima Abdullahi, Yusuf Garba). |
| `CTABanner.tsx` | Final call-to-action band ("Ready to Execute Your Next Contract?"). |

### UI library — `src/components/ui/`
~50 shadcn/ui components (accordion, alert, avatar, badge, button, card, carousel, dialog, dropdown-menu, form, input, select, table, tabs, toast, tooltip, sidebar, etc.). These are reusable primitives; only a subset (dialog, toast/toaster) is currently used.

---

## 6. Hooks & utilities
- `src/hooks/use-mobile.tsx` — mobile breakpoint detection.
- `src/hooks/use-toast.ts` (and `ui/use-toast.ts`) — toast state.
- `src/lib/utils.ts` — `cn()` class-merging helper (clsx + tailwind-merge).

---

## 7. Design system

### Theme (`tailwind.config.ts` + CSS variables)
- **Brand colors:** `navy` (dark base) and `gold` (accent), each with light/dark/pale variants.
- **Semantic tokens:** background, foreground, primary, secondary, muted, accent, card, border, etc. (HSL CSS variables, dark-mode ready via `class`).
- **Fonts:** `font-display` = Outfit, `font-sans` = Inter.
- **Custom shadows:** `soft`, `glow`, `card`, `elevated`.
- **Animations:** accordion, `fade-in`, `float`, `shimmer`; framer-motion easing `[0.16, 1, 0.3, 1]` used site-wide.
- **Container:** centered, max width `1280px`, padding `1.25rem`.

### Assets (`src/assets/`)
Logo (`logo.png`), founder photo (`founder.png/.jpg`), and themed imagery for hero, procurement, logistics, construction, warehouse, and meetings (mix of `.png` and `.jpg`).

---

## 8. SEO / meta (`index.html`)
- Title: **Abucore Enterprises**
- Description + Open Graph + Twitter card meta tags configured.
- OG/Twitter share image hosted on Google Cloud Storage (Lovable upload).
- Google Fonts preconnect + Inter/Outfit stylesheet.

---

## 9. Known gaps / things to be aware of

1. **Contact form does nothing on submit** — no backend, email, or storage. Needs an integration (e.g. email service, form API, or backend endpoint).
2. **Project Tracker is mock data only** — only 3 hardcoded IDs work; not connected to any real tracking system.
3. **Testimonials, timeline, and compliance claims** are static placeholder/marketing content.
4. **`TooltipWrap` in `App.tsx`** is a dead no-op wrapper — safe to remove or replace with a real `TooltipProvider`.
5. **react-query and most `ui/` components are unused** — installed but not wired to anything yet.
6. **Two image formats** for some assets (e.g. `founder.png` + `founder.jpg`) — duplicates that could be cleaned up.

---

## 10. Quick start

```bash
npm install      # install dependencies
npm run dev      # start local dev server (Vite)
npm run build    # production build
npm run preview  # preview the production build
```

---

*Generated from a full read of the source on 2026-06-06.*
