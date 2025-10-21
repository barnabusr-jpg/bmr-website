# BMR Solutions Website (Next.js + Tailwind, Vercel-ready)

Responsible AI & Delivery Systems website for BMR Solutions.
Tech: Next.js App Router, TailwindCSS, Resend email, lucide-react.

## Quick start (local)
```bash
npm install
cp .env.example .env.local
# Fill .env.local (use your Resend API key; FROM must be on a verified domain)
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel
1) Create a new Vercel project and import this repo.
2) Add env vars in **Project → Settings → Environment Variables**:
   - `RESEND_API_KEY`
   - `CONTACT_TO` = barnabusr@outlook.com
   - `CONTACT_FROM` = web@your-verified-domain.com (on a Resend-verified domain)
3) Deploy. Your site and `/api/contact` will be live.

## Customize
- **Brand tokens:** `lib/theme.ts`
- **Home content:** `app/page.tsx`
- **Insights pages:** add files under `app/insights/*` or expand `[slug]/page.tsx`
- **Email handling:** `app/api/contact/route.ts`
- **SEO:** `app/layout.tsx` (metadata), `app/robots.ts`, `app/sitemap.ts`

## Notes
- This project ships minimal UI components (`components/ui/*`) so you don't need shadcn setup.
- If Outlook filters mail, keep `CONTACT_FROM` stable and ensure DKIM is verified in Resend.
