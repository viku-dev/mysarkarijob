# Phase 1 — Project Audit + Foundation Plan

## Audit Date

- 2026-08-14

## Executive Summary

The repository is effectively empty and currently contains only Git metadata plus a `.gitkeep` placeholder. No runnable application framework, Firebase setup, authentication layer, routes, components, styling system, database rules, indexes, environment example, or package metadata exists yet.

Because the requested first task is an audit and foundation plan only, no application implementation has been added in this phase. This document records the current state and provides a concrete phased implementation plan for a production-ready Government Jobs & Exams Information Platform.

## Repository Audit

### Current Framework

- No frontend or backend framework is currently installed.
- No `package.json`, Next.js app, React source files, Vite app, Firebase project files, or build configuration files were found.
- Recommended foundation for Phase 2: Next.js App Router + TypeScript + Tailwind CSS, unless the product owner chooses a different stack before implementation begins.

### Current Folder Structure

Current tracked working-tree content is minimal:

```text
/workspace/mysarkarijob
├── .git/
└── .gitkeep
```

This phase adds:

```text
docs/
└── phase-1-audit-and-foundation-plan.md
```

### Existing Firebase Configuration

- No Firebase client configuration files were found.
- No Firebase Admin SDK configuration was found.
- No `firebase.json`, `.firebaserc`, `firestore.rules`, `firestore.indexes.json`, or storage rules were found.
- No environment variable examples for Firebase public client config were found.

### Existing Authentication

- No authentication implementation exists.
- No Firebase Authentication integration exists.
- No admin role model, session handling, or protected routes exist.

### Existing Routes

- No application routes exist.
- No public routes such as `/`, `/jobs`, `/exams`, `/results`, `/admit-card`, `/answer-key`, `/universities`, `/states`, `/organizations`, or `/search` exist.
- No admin routes such as `/admin`, `/admin/jobs`, `/admin/jobs/new`, `/admin/exams`, `/admin/settings`, or `/admin/audit-logs` exist.

### Existing UI Components

- No UI component library or local reusable components exist.
- No header, footer, card, table, badge, form, search, pagination, breadcrumb, ad slot, or admin dashboard components exist.

### Existing Styling System

- No CSS framework is configured.
- No Tailwind CSS, CSS modules, global CSS, design tokens, theme variables, or component styling conventions exist.

### Existing Database Structure

- No database schema exists in code.
- No Firestore collections, indexes, security rules, seed scripts, or type definitions exist.

### Existing Environment Variables

- No `.env.example` file exists.
- No environment variable contract has been defined.
- No secrets were found in the repository during this audit.

### Existing Errors / Risks

- There is currently no app to build, lint, type-check, or run.
- The project cannot satisfy any public or admin product requirements until an application foundation is created.
- Security rules and authentication must be implemented before any real admin workflow is used.
- Demo content must be clearly marked as demo data if added later.
- No real Firebase credentials or service account secrets should be committed.

## Recommended Implementation Plan

### 1. Public Website Plan

Build a mobile-first public site using Next.js App Router with server-rendered pages where practical.

Recommended routes:

- `/` — homepage with hero search, latest jobs, latest exams, admit cards, results, answer keys, university links, and state-wise jobs.
- `/jobs` — searchable and filterable job listing.
- `/jobs/[slug]` — structured job detail page.
- `/exams` and `/exams/[slug]` — evergreen exam information pages.
- `/results` and `/results/[slug]` — result listings and details.
- `/admit-card` and `/admit-card/[slug]` — admit card listings and details.
- `/answer-key` and `/answer-key/[slug]` — answer key listings and details.
- `/universities` and `/universities/[slug]` — university listing and detail pages.
- `/states/[slug]/jobs` — state-specific jobs.
- `/categories/[slug]` — category-specific content.
- `/organizations/[slug]` — organization-specific content.
- `/search` — central search page with filters, sorting, and pagination.
- `/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer` — trust, legal, and AdSense-readiness pages.

Public UX priorities:

- Clear blue/white government-information theme.
- Strong search box on the homepage.
- Structured cards for jobs, exams, admit cards, results, and answer keys.
- Detail pages that answer eligibility, vacancy, dates, fees, selection process, syllabus, documents, how to apply, and official links without forcing users to parse long paragraphs.
- Obvious independent-portal disclaimer on footer and detail pages.
- Safe external links using `target="_blank"` and `rel="noopener noreferrer"`.

### 2. Admin Panel Plan

Build a separate `/admin` area protected by Firebase Authentication and role-based authorization.

Recommended admin routes:

- `/admin/login`
- `/admin`
- `/admin/jobs`
- `/admin/jobs/new`
- `/admin/jobs/[id]/edit`
- `/admin/jobs/[id]/preview`
- `/admin/exams`
- `/admin/results`
- `/admin/admit-cards`
- `/admin/answer-keys`
- `/admin/universities`
- `/admin/organizations`
- `/admin/categories`
- `/admin/states`
- `/admin/ads`
- `/admin/site-settings`
- `/admin/admin-users`
- `/admin/audit-logs`

Admin UX priorities:

- Multi-step job form instead of one giant form.
- Draft, preview, publish, unpublish, and archive workflow.
- Validation for required fields, dates, URLs, numbers, slugs, and duplicate notifications.
- Repeatable editors for vacancy rows, important dates, fees, selection stages, exam pattern rows, syllabus sections, documents, how-to-apply steps, and official links.
- Permission-aware UI for SUPER_ADMIN, EDITOR, CONTENT_MANAGER, and VIEWER.
- Audit log entries for major content and security actions.

### 3. Firebase Architecture Plan

Use Firebase services only where they fit the product requirements:

- Firebase Authentication for admin login.
- Cloud Firestore for structured content.
- Firebase Storage only for future uploads such as logos, images, or PDFs if required.
- Firebase App Check when the deployment target and Firebase project are ready.
- Cloud Functions only if server-side privileged tasks become necessary.

Client-side Firebase config should use only public Firebase web config values. Private service account credentials must never be exposed in frontend code or committed.

### 4. Firestore Collections Plan

Recommended top-level collections:

- `users` — optional future public user profiles.
- `admins` — admin profiles and roles keyed by Firebase Auth UID.
- `jobs` — structured recruitment/job notifications.
- `exams` — evergreen exam information.
- `results` — result notifications.
- `admitCards` — admit card notifications.
- `answerKeys` — answer key notifications.
- `universities` — government/private university profiles.
- `organizations` — recruiting/exam/admission organizations.
- `categories` — job and content categories.
- `states` — Indian states/UTs plus Central.
- `notifications` — optional unified feed for cross-content discovery.
- `siteSettings` — site identity, announcement bar, contact, SEO defaults, and ad configuration.
- `auditLogs` — immutable admin activity logs.

Query/index considerations:

- Use paginated Firestore queries; do not fetch entire collections for public pages.
- Add composite indexes for combinations of `published`, `status`, `categoryId`, `organizationId`, `stateIds`, `featured`, `createdAt`, `updatedAt`, and important last-date fields as queries are implemented.
- Avoid real-time listeners for public listing pages unless there is a clear need.

### 5. Security Rules Plan

Firestore rules should enforce least privilege:

- Public users can read only documents where `published == true` and `visibility == "PUBLIC"` where applicable.
- Public users cannot create, update, or delete job/exam/result/admit-card/answer-key/university/admin/settings documents.
- Authenticated admins can read admin data only if an active admin profile exists.
- Role-specific permissions:
  - `SUPER_ADMIN`: full administrative access, including admin user management and permanent delete if implemented.
  - `EDITOR`: create, edit, publish, unpublish, and archive content.
  - `CONTENT_MANAGER`: create and edit drafts, but publishing can be restricted if desired.
  - `VIEWER`: read-only admin dashboard access.
- Audit logs should be append-only from trusted admin flows.
- Security rules must never include broad `allow read, write: if true` production access.

### 6. Job Data Model Plan

Recommended `jobs/{jobId}` shape:

```ts
type JobStatus =
  | "UPCOMING"
  | "APPLICATION_OPEN"
  | "APPLICATION_CLOSED"
  | "EXAM_SCHEDULED"
  | "ADMIT_CARD_RELEASED"
  | "RESULT_RELEASED"
  | "COMPLETED"
  | "CANCELLED"
  | "POSTPONED";

type JobDocument = {
  id: string;
  title: string;
  slug: string;
  organizationId: string;
  categoryId: string;
  stateIds: string[];
  description?: string;
  advertisementNumber?: string;
  postNames: string[];
  vacancy?: number;
  vacancyDetails?: Array<Record<string, string | number | null>>;
  qualification?: {
    summary?: string;
    details?: string;
  };
  ageLimit?: {
    minimum?: number;
    maximum?: number;
    calculationDate?: string;
    relaxation?: string;
  };
  applicationFee?: {
    general?: number | string;
    obc?: number | string;
    ews?: number | string;
    sc?: number | string;
    st?: number | string;
    female?: number | string;
    pwd?: number | string;
    other?: string;
    paymentMode?: string;
    refundInfo?: string;
  };
  importantDates?: {
    applicationStart?: string;
    applicationLast?: string;
    feePaymentLast?: string;
    correctionLast?: string;
    examDate?: string;
    admitCardDate?: string;
    resultDate?: string;
  };
  selectionProcess?: Array<{ order: number; title: string; description?: string }>;
  examPattern?: Array<{
    subject: string;
    questions?: number;
    marks?: number;
    duration?: string;
    negativeMarking?: string;
    examMode?: string;
  }>;
  syllabus?: Array<{ subject: string; topics: Array<{ title: string; subtopics?: string[] }> }>;
  documentsRequired?: string[];
  howToApply?: Array<{ order: number; instruction: string }>;
  officialLinks?: Array<{
    label: string;
    url: string;
    type: "APPLY_ONLINE" | "OFFICIAL_NOTIFICATION" | "OFFICIAL_WEBSITE" | "ADMIT_CARD" | "RESULT" | "ANSWER_KEY" | "CORRECTION" | "OTHER";
    active: boolean;
  }>;
  jobLocation?: string;
  applicationMode?: "ONLINE" | "OFFLINE" | "BOTH";
  status: JobStatus;
  workflowStatus: "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "UNPUBLISHED" | "ARCHIVED";
  published: boolean;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  createdAt: unknown;
  updatedAt: unknown;
  publishedAt?: unknown;
  createdBy: string;
  updatedBy: string;
  archivedAt?: unknown;
  archivedBy?: string;
};
```

Important data-quality rules:

- Unknown dates should render as “To be announced,” not fabricated values.
- Reservation, age relaxation, fees, and document requirements should only display values entered by admins.
- Official links should be clearly labeled and visually distinct from ads.

### 7. UI Component System Plan

Recommended directories after app scaffolding:

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── public/
│   ├── admin/
│   └── ui/
├── config/
├── lib/
│   ├── firebase/
│   ├── firestore/
│   ├── auth/
│   ├── seo/
│   └── validation/
├── types/
└── utils/
```

Base UI components:

- `Button`
- `Input`
- `Select`
- `Textarea`
- `Badge`
- `Card`
- `Table`
- `Alert`
- `Tabs`
- `Accordion`
- `Modal`
- `Pagination`
- `Breadcrumb`

Public components:

- `SiteHeader`
- `SiteFooter`
- `SearchBar`
- `JobCard`
- `NotificationList`
- `StatusBadge`
- `JobOverview`
- `ImportantDates`
- `VacancyTable`
- `EligibilitySection`
- `FeeSection`
- `SelectionProcess`
- `ExamPattern`
- `SyllabusSection`
- `DocumentsSection`
- `HowToApply`
- `OfficialLinks`
- `AdSlot`

Admin components:

- `AdminSidebar`
- `AdminHeader`
- `PermissionGuard`
- `DashboardCard`
- `JobFormStepper`
- `VacancyEditor`
- `DateEditor`
- `FeeEditor`
- `SelectionProcessEditor`
- `ExamPatternEditor`
- `SyllabusEditor`
- `LinkEditor`
- `JobPreview`
- `AuditLogTable`

Design tokens:

- Primary blue
- Secondary blue
- Background white/light gray
- Surface white
- Border gray
- Dark text
- Muted text
- Success
- Warning
- Error
- Focus ring

### 8. SEO Structure Plan

Implement SEO in phases:

- Central site config for app name, tagline, base URL, default description, Open Graph defaults, and contact details.
- Next.js metadata for all static pages.
- Dynamic metadata for jobs, exams, results, admit cards, answer keys, organizations, categories, states, and universities.
- Canonical URLs based on configured production base URL.
- `sitemap.ts` and `robots.ts` using only published public content.
- Breadcrumbs on detail and filtered listing pages.
- Schema.org JSON-LD where appropriate:
  - `WebSite`
  - `BreadcrumbList`
  - `Organization` for the site brand, not falsely as a government body.
  - Content-specific structured data where accurate and not misleading.

SEO guardrails:

- Do not generate spammy duplicate pages.
- Do not index drafts, previews, admin pages, or archived content.
- Avoid claiming official government affiliation.

### 9. AdSense Architecture Plan

AdSense should be configuration-driven and safe:

- Use `NEXT_PUBLIC_ADSENSE_CLIENT_ID` only for the public AdSense client ID.
- Use predefined ad placements instead of arbitrary script injection.
- Recommended placements:
  - `top-banner`
  - `in-content`
  - `sidebar`
  - `between-list-items`
  - `bottom-banner`
- Admin settings can enable/disable slots and set slot IDs.
- Ads must be visually separated from official links and must not look like application buttons.
- Ads must not cover content, navigation, sticky controls, or important mobile actions.
- Legal pages should be present before monetization rollout.

### 10. Development Phases

#### Phase 1 — Audit + Foundation Plan

- Completed by this document.
- No app implementation yet.

#### Phase 2 — Application Foundation

- Scaffold Next.js + TypeScript + Tailwind CSS.
- Add central site config and `.env.example`.
- Add base theme tokens and global CSS.
- Add public layout with header/footer and independent-portal disclaimer.
- Add homepage shell with demo-free empty states.
- Add legal placeholder pages.
- Add Firebase client initialization with env validation but no secrets.
- Run lint/build/type checks.

#### Phase 3 — Public Content Models + Pages

- Add TypeScript models for jobs, exams, results, admit cards, answer keys, universities, organizations, categories, states, notifications, and site settings.
- Add Firestore query helpers with pagination.
- Add job listing and detail pages.
- Add reusable public content components.
- Add search route with filters and URL query params.
- Add empty/loading/error states.

#### Phase 4 — Admin CMS

- Add Firebase Auth admin login.
- Add admin layout and dashboard.
- Add role-aware permission guards.
- Add multi-step job creation/editing workflow.
- Add preview/publish/archive actions.
- Add CRUD management for organizations, categories, states, exams, results, admit cards, answer keys, universities, ads, and site settings.

#### Phase 5 — Security + Auditability

- Add production Firestore security rules.
- Add Firestore indexes for implemented queries.
- Add audit logging for admin actions.
- Add authorization tests or emulator-based verification where practical.
- Add safe rich-text strategy and XSS controls.

#### Phase 6 — SEO + Performance

- Add dynamic metadata.
- Add sitemap and robots generation.
- Add canonical URLs and breadcrumbs.
- Add JSON-LD structured data.
- Optimize Firestore reads, loading states, and route-level rendering.

#### Phase 7 — Ads + Compliance

- Add reusable ad components.
- Add configurable ad slots.
- Finalize legal pages and disclaimer content.
- Ensure ad placements do not harm mobile UX or confuse official links.

## Immediate Next Step

Wait for explicit approval/instruction to begin Phase 2. The recommended next action is to scaffold the Next.js + TypeScript + Tailwind foundation and add the base public layout, theme, site config, Firebase env contract, and legal/static route shells.
