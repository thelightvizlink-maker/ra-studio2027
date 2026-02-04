# RS Form Guide (Contact Form on the Website)

This is the fastest safe path to make the contact form work **and** stay hardened.

## 1) Where the Form Lives
- Main file: `src/pages/Contact.tsx`
- It renders at route: `/contact`

## 2) Set the Form Endpoint (FlexSubmit)
Use a Vite env var so you can change it without editing code.

1. Create `.env.local` in the repo root:

```env
VITE_FLEXSUBMIT_API=https://api.flexsubmit.com/api/forms/REPLACE_ME/submit
```

2. In Vercel:
- Project Settings -> Environment Variables
- Add `VITE_FLEXSUBMIT_API` with the same value
- Redeploy

## 3) Map FlexSubmit Field IDs
In `src/pages/Contact.tsx`, update the `payload` keys:

- Example:
  - `'field_1763358633479_og0gmx0iz': validatedData.fullName`

These keys must match the FlexSubmit dashboard field IDs exactly.

## 4) Keep the Hardening That Is Now in Place
The form now includes basic anti-spam and reliability defenses:
- Honeypot field (`website`) for bots
- Minimum fill time check
- Submit cooldown
- Request timeout via `AbortController`
- Zod validation before sending

## 5) Run Locally (Required Before Deploy)
```bash
npm i
npm run lint
npm run build
npm run dev
```

Then open: `http://localhost:5173/contact`

## 6) Production Test Checklist
1. Submit once with real data
2. Confirm it arrives in FlexSubmit
3. Try a second rapid submit (should be rate-limited)
4. Verify the thank-you screen appears

## 7) Important Security Note
Client-side hardening helps, but real security (rate limits, CAPTCHA, blocking, auditing) must be enforced by FlexSubmit or a backend function.

