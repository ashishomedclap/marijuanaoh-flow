# Marijuana Card OH — Patient Booking & Telehealth Flow

A modern, responsive, 4-step medical marijuana telehealth appointment booking and payment flow built for **marijuanacardOH.com** using Next.js (App Router), TypeScript, and custom CSS design tokens matching the brand system.

## 🌿 Journey Flow

1. **Step 1: Select Service** — Choose between New Ohio Medical Card ($149) or Annual Card Renewal ($129).
2. **Step 2: Meet Your Physician** — Browse Ohio State Medical Board certified doctors with OSMB license numbers, patient reviews, and next-availability indicators.
3. **Step 3: Choose Date & Time** — Interactive calendar day selector and morning/afternoon time slot picker in Eastern Time (EDT).
4. **Step 4: Secure Checkout** — Review appointment summary, apply promotional discount codes (e.g. `OHIO20`), and complete 256-bit SSL encrypted card payment.
5. **Confirmation (`/confirmation`)** — Instant booking confirmation badge, appointment summary, direct link to patient portal, and clear next steps.

---

## 🛠️ Tech Stack & Setup

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Vanilla CSS Design Tokens (`--teal-*`, `--sun-*`, Bricolage Grotesque, Figtree)
- **Quality**: 100% Mobile & Desktop Responsive, Accessible (WCAG compliant)

### Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
