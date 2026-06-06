# Abucore — Backend Setup & Run Guide

This site is now a **Vite/React frontend + Vercel Serverless API (`/api`) + MongoDB Atlas**.
The plain `npm run dev` only serves the frontend — the `/api/*` routes (tracker, contact, admin)
need `vercel dev` or a deployment.

---

## 1. One-time setup

### a. Install the Vercel CLI (for local API testing)
```bash
npm i -g vercel
```

### b. Fill in `.env` (already created, gitignored)
Open `.env` and set the remaining values:

| Variable | What to put |
|----------|-------------|
| `MONGODB_URI` | ✅ already set (your Atlas cluster) |
| `JWT_SECRET` | ✅ already generated |
| `ADMIN_EMAIL` | the email you'll log into `/admin` with |
| `ADMIN_PASSWORD` | **change `ChangeMe123!` to a strong password** before seeding |
| `GMAIL_USER` | ✅ set (`saytuneorg@gmail.com`) — Gmail account that sends alerts |
| `GMAIL_PASS` | ✅ set (Gmail **App Password**, not the login password) |
| `NOTIFY_EMAIL` | where new-quote email alerts land (`abucoreenterprises@gmail.com`) |

> **Atlas:** in Atlas → Network Access, make sure your IP (or `0.0.0.0/0` for Vercel) is allowed.

### c. Seed the database (creates admin login, settings, indexes, 1 sample project)
```bash
npm run seed
```
Expected output ends with `Done.` and `sample project: ABU-2026-001`.

---

## 2. Run locally (no Vercel account needed)
```bash
npm run dev:local
```
This starts **both** servers together:
- **API** (Express, runs the `/api` handlers) on `http://localhost:3001`
- **Web** (Vite) on `http://localhost:8080` — it proxies `/api/*` to the API server

Wait until the terminal prints **`✓ API ready on http://localhost:3001`**, then open
**http://localhost:8080**.

> `npm run dev` alone serves only the frontend — the tracker/contact/admin will return
> **502** because nothing is answering `/api`. Always use `npm run dev:local`.

(`vercel dev` also works if you prefer the real Vercel runtime, but it requires logging in
and linking the project.)

---

## 3. Deploy (Vercel)
Add the **same `.env` variables** in Vercel → Project → Settings → Environment Variables,
then push to your connected branch (or `vercel --prod`). The `/api` folder deploys automatically.

---

## What's live after Phase 1 + Submissions

| Area | URL | Notes |
|------|-----|-------|
| Public tracker | `/track` | Client enters Project ID → live milestone progress. Linked in nav + footer. |
| Contact form | `/contact` | Saves to DB **and** opens WhatsApp **and** emails you via Gmail (if `GMAIL_USER`/`GMAIL_PASS` set). |
| Admin login | `/admin/login` | Email + password from the seed. 24h session (httpOnly cookie). |
| Submissions | `/admin` | View / filter / search quote requests; mark Read/Responded; reply on WhatsApp; delete. Unread badge in nav. |

### Email notes (Gmail SMTP)
- Uses `nodemailer` with Gmail. `GMAIL_PASS` must be a **Gmail App Password** (16 chars), created at
  https://myaccount.google.com/apppasswords — your normal Gmail password will be rejected. Requires 2-Step Verification on the account.
- Alerts are sent from `GMAIL_USER` to `NOTIFY_EMAIL` with the visitor's email as reply-to, so you can reply directly.
- No domain verification needed — unlike Resend, Gmail sends to any inbox.
- Email sending is **best-effort**: if it fails, the submission is still saved to the dashboard and WhatsApp still opens.

---

## API reference (current)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/api/track?id=ABU-2026-001` | public | Safe project status (no value/notes/contact leaked) |
| POST | `/api/contact` | public | Save submission + email alert |
| POST | `/api/auth/login` | public | Sign in (sets session cookie) |
| GET | `/api/auth/me` | cookie | Current admin |
| POST | `/api/auth/logout` | cookie | Sign out |
| GET | `/api/admin/submissions` | admin | List submissions + unread count |
| PATCH | `/api/admin/submissions/:id` | admin | Set status (New/Read/Responded) |
| DELETE | `/api/admin/submissions/:id` | admin | Delete submission |

Still to come (Phase 2): Overview, Projects list, Add Project (auto ID), Project Detail with milestone updates, Settings.
