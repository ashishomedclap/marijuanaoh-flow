# Marijuana Card OH — Patient Booking & Telehealth Flow

A production-ready, fully responsive 4-step medical marijuana telehealth appointment booking and payment flow built for **marijuanacardOH.com** using Next.js 16 (App Router), TypeScript, and custom CSS design tokens matching the brand system.

---

## 🌿 Journey Flow

1. **Step 1: Select Service**
   - Choose between **New Ohio Medical Card ($149)** or **Annual Card Renewal ($129)**.
   - Includes real-time assurances: Ohio-licensed physicians, 100% money-back guarantee, and no state fee.

2. **Step 2: Meet Your Physician**
   - Browse certified Ohio State Medical Board physicians (Dr. Johnathan Miller, MD · Dr. Kevin Kargman, DO).
   - Shows OSMB license numbers, Certified to Recommend (CTR) credentials, verified patient reviews, and next-availability badges.

3. **Step 3: Choose Date & Time**
   - Interactive calendar day selector (Eastern Time).
   - Morning, Afternoon, and Evening time slots.
   - Selected summary bar updating in real time.

4. **Step 4: Secure Checkout**
   - Order summary with breakdown.
   - **Promo Code field & Apply button** with instant validation, dynamic recalculation, and removal toggle (e.g., `OHIO20` for $20 off, `SAVE10` for $10 off).
   - Pre-filled patient contact preview badge ("✓ Contact Shared").
   - 256-bit SSL encrypted card details form (Number, Expiry, CVC, Zip) with one-click test auto-fill.
   - HIPAA and Telehealth consent agreement.
   - Clean, full-width **Pay & Confirm Appointment** button.

5. **Confirmation (`/confirmation`)**
   - Booking confirmation badge and unique appointment ID.
   - Verified payment receipt reflecting any applied discount.
   - Single primary action: **"Go to the portal"**.
   - Clear 3-step "What happens next" patient guidance.

---

## 📂 Architecture & Directory Structure

```
marijuanacardoh-flow/
├── src/
│   ├── app/
│   │   ├── page.tsx                      # Flow coordinator orchestrating steps 1–4
│   │   ├── layout.tsx                    # Global HTML shell & Google Fonts (Bricolage Grotesque, Figtree)
│   │   ├── globals.css                   # Brand design tokens (--teal-*, --sun-*), layouts & animations
│   │   ├── favicon.ico
│   │   └── confirmation/
│   │       └── page.tsx                  # Confirmation screen with "Go to the portal"
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx                # Brand logo & countdown timer
│   │   │   ├── Footer.tsx                # Legal links & 988 Crisis hotline
│   │   │   └── StepProgressBar.tsx       # 4-step progress tracker
│   │   └── steps/
│   │       ├── ServiceSelectionStep.tsx  # Step 1: Service selection cards
│   │       ├── PhysicianSelectionStep.tsx# Step 2: Physician profiles
│   │       ├── ScheduleStep.tsx          # Step 3: Date & time slot picker
│   │       └── CheckoutStep.tsx          # Step 4: Checkout form with promo code & payment
│   │
│   └── lib/
│       └── bookingData.ts                # Physicians catalog, service pricing, appointment schedule
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── README.md
└── .gitignore
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.18+ or 20+

### Installation & Run

```bash
# Navigate to project folder
cd marijuanacardoh-flow

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build

```bash
npm run build
npm run start
```
