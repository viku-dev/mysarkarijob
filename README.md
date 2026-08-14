# Government Career Portal

A Next.js, TypeScript, Tailwind CSS and Firebase foundation for an independent government jobs, exams, results and university information platform.

## Phase 2 Scope

This repository currently contains the public UI foundation, route shells, Firebase client architecture, core TypeScript models, secure-by-default Firestore rule architecture, SEO foundations and admin dashboard shell. It does **not** include full CMS CRUD, complete role enforcement, real recruitment data or production AdSense configuration yet.

## Development

```bash
npm install
npm run dev
npm run lint
npm run type-check
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and fill in Firebase web client configuration values. Do not commit real secrets or Firebase service-account credentials.

## Disclaimer

This project is for an independent information portal. Users must always verify recruitment, examination and admission information from the official notification and official website of the concerned organization.
