# BMR Forensic Lab - Owner Terminal

## 🏛️ Project Overview
High-integrity forensic auditing platform for AI implementation cycles. This terminal provides leadership with a "Radiology View" of systemic drift, adoption friction, and ROI leakage.

## 📡 Core Architecture
- **Framework:** Next.js 14 (App Router)
- **Database:** MongoDB Atlas (Forensic Audit Logs)
- **Styling:** Tailwind CSS (High-Contrast Clinical UI)
- **Infrastructure:** Vercel (Edge-Native Deployment)

## 🏗️ Folder Protocol
- `src/app/owner`: Admin Gateway and Clinical Dashboard.
- `src/app/api/owner`: Secure data pipelines for audit management.
- `src/lib/mongodb.ts`: Authoritative database connection utility.
- `src/components/diagnostic`: 12-question intake and Tri-Lens scanning logic.

## 🛠️ Local Development
1. Clone the repository.
2. Create `.env.local` with `MONGODB_URI`, `ADMIN_USER`, and `ADMIN_PASS`.
3. Run `npm install`.
4. Run `npm run dev`.

## 🛡️ Security Note
Authentication is handled via secure HTTP-only cookies. Environment variables are set as Sensitive in Vercel to prevent credential leaks.
