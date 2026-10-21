export type ConsultationMode = "video" | "phone";

export interface ServicePlan {
  id: "new" | "renew";
  title: string;
  kicker: string;
  price: number;
  stateFee: number;
  total: number;
  duration: string;
  description: string;
}

export interface Physician {
  id: string;
  name: string;
  title: string;
  credentials: string;
  boardNumber: string;
  rating: number;
  reviewsCount: number;
  avatarText: string;
  availabilityStatus: string;
  specialty: string;
  bio: string;
  badge: string;
}

export interface DaySchedule {
  dateString: string;
  dayLabel: string;
  monthDate: string;
  fullDateFormatted: string;
  available: boolean;
}

export interface Slot {
  id: string;
  time: string;
  period: "Morning" | "Afternoon" | "Evening";
}

// Configurable pricing & service catalog
export const SERVICES_CATALOG: Record<"new" | "renew", ServicePlan> = {
  new: {
    id: "new",
    title: "Get a new Ohio medical card",
    kicker: "NEW PATIENT EVALUATION",
    price: 149,
    stateFee: 0,
    total: 149,
    duration: "10-15 min video visit",
    description: "Complete telehealth evaluation by an Ohio-licensed physician. Full refund if you don't qualify.",
  },
  renew: {
    id: "renew",
    title: "Renew my Ohio medical card",
    kicker: "ANNUAL RENEWAL EVALUATION",
    price: 129,
    stateFee: 0,
    total: 129,
    duration: "5-10 min video visit",
    description: "Annual re-certification for existing Ohio cardholders. Fast state registry submission.",
  },
};

// Physicians sourced from real clinic roster (referenced in screen 1.html JSON-LD)
export const PHYSICIANS_ROSTER: Physician[] = [
  {
    id: "dr-miller",
    name: "Dr. Johnathan Miller, MD",
    title: "Ohio State Medical Board Licensed Physician",
    credentials: "MD · Certified to Recommend (CTR)",
    boardNumber: "OSMB License #35.129482",
    rating: 4.98,
    reviewsCount: 864,
    avatarText: "JM",
    availabilityStatus: "Next Available: Today in 25 mins",
    specialty: "Telehealth Medical Marijuana Specialist",
    bio: "Over 14 years clinical experience in Ohio. Dr. Miller focuses on compassionate, evidence-based evaluations for chronic conditions.",
    badge: "Top Rated Physician",
  },
  {
    id: "dr-kargman",
    name: "Dr. Kevin Kargman, DO",
    title: "Ohio State Medical Board Licensed Physician",
    credentials: "DO · Certified to Recommend (CTR)",
    boardNumber: "OSMB License #34.089123",
    rating: 4.95,
    reviewsCount: 620,
    avatarText: "KK",
    availabilityStatus: "Available Today & Tomorrow",
    specialty: "Integrative Pain & Chronic Care Specialist",
    bio: "Specializing in patient-first alternative therapies, chronic pain relief, and post-traumatic health management across Ohio.",
    badge: "Fastest Approvals",
  },
];

// Default deterministic baseline days for static prerendering
export const DEFAULT_DAYS: DaySchedule[] = [
  {
    dateString: "2026-10-20",
    dayLabel: "Today",
    monthDate: "Oct 20",
    fullDateFormatted: "Tuesday, October 20, 2026",
    available: true,
  },
  {
    dateString: "2026-10-21",
    dayLabel: "Tomorrow",
    monthDate: "Oct 21",
    fullDateFormatted: "Wednesday, October 21, 2026",
    available: true,
  },
  {
    dateString: "2026-10-22",
    dayLabel: "Thu",
    monthDate: "Oct 22",
    fullDateFormatted: "Thursday, October 22, 2026",
    available: true,
  },
  {
    dateString: "2026-10-23",
    dayLabel: "Fri",
    monthDate: "Oct 23",
    fullDateFormatted: "Friday, October 23, 2026",
    available: true,
  },
  {
    dateString: "2026-10-24",
    dayLabel: "Sat",
    monthDate: "Oct 24",
    fullDateFormatted: "Saturday, October 24, 2026",
    available: true,
  },
];

// Available time slots by period
export const TIME_SLOTS: Slot[] = [
  { id: "m1", time: "10:30 AM", period: "Morning" },
  { id: "m2", time: "11:15 AM", period: "Morning" },
  { id: "m3", time: "11:45 AM", period: "Morning" },
  { id: "a1", time: "1:30 PM", period: "Afternoon" },
  { id: "a2", time: "2:00 PM", period: "Afternoon" },
  { id: "a3", time: "2:30 PM", period: "Afternoon" },
  { id: "a4", time: "3:15 PM", period: "Afternoon" },
  { id: "a5", time: "4:00 PM", period: "Afternoon" },
  { id: "e1", time: "5:30 PM", period: "Evening" },
  { id: "e2", time: "6:15 PM", period: "Evening" },
  { id: "e3", time: "7:00 PM", period: "Evening" },
];
