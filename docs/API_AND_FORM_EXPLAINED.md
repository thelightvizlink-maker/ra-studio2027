# 🔌 API & STATE MANAGEMENT EXPLAINED

**Last Updated:** 27-JAN-2026 (Sweden Time)  
**Context Update:** The contact form submits to FlexSubmit in `src/pages/Contact.tsx`.

---

## 1️⃣ WHAT IS API?

**API = Application Programming Interface**

### Simple Definition:
A way for your website (frontend) to talk to a server (backend).

### Real-World Analogy:
- **Your React App** = Customer at a restaurant
- **API** = Waiter
- **Server/Backend** = Kitchen

Customer (React) tells Waiter (API): "I want pasta"  
Waiter (API) tells Kitchen (Server): "Order: pasta"  
Kitchen (Server) cooks and sends pasta back through Waiter (API)  
Customer (React) receives and displays pasta

---

## 2️⃣ CURRENT CONTACT FORM: FLEXSUBMIT API (WORKING)

### Contact Form Flow (Current):
```
User fills form
  → Zod validates + sanitizes
  → Field IDs mapped in Contact.tsx
  → POST to FlexSubmit API
  → FlexSubmit handles delivery/automation
```

**Endpoint in code:** `https://api.flexsubmit.com/api/forms/afa94b93-130a-4bb5-b9fd-54dd01fe0f03/submit`

### What You Still Need:
1. Confirm FlexSubmit routing rules (email, CRM, webhooks)
2. Test submissions from production (Vercel) after each deploy

---

## 3️⃣ REACT QUERY - "SERVER STATE READY FOR API"

### What React Query Does:

**Manages data from APIs:**
- ✅ Fetches data from server
- ✅ Caches responses
- ✅ Handles loading/error states
- ✅ Auto-refetches when stale
- ✅ Manages server synchronization

### Example (Future Use):

```typescript
// When you have an API endpoint
const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: () => fetch('https://api.example.com/projects').then(r => r.json())
});

// React Query automatically:
// - Shows loading state while fetching
// - Caches the result
// - Re-fetches if data is stale
// - Handles errors gracefully
```

### "Ready for API" Means:
✅ Library installed  
✅ Provider configured in App.tsx  
❌ **NOT actually using it yet** (no API calls exist)

---

## 4️⃣ REACT HOOK FORM - "FORM STATE MANAGEMENT"

### What "Form State" Means:

**State** = Data that changes over time

**Form State** = All the data in your form:
- What user typed in "Name" field
- What user typed in "Email" field
- Is form valid or has errors?
- Is form submitting?
- Was form successfully submitted?

### Without React Hook Form:
```typescript
// You'd have to manually track EVERYTHING:
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);

// Lots of boilerplate code!
```

### With React Hook Form:
```typescript
// It handles everything automatically:
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

<input {...register('name', { required: true })} />
// React Hook Form tracks value, validates, shows errors automatically!
```

### What It Does:
- ✅ Tracks form field values
- ✅ Validates inputs (email format, required fields)
- ✅ Shows error messages
- ✅ Handles form submission
- ✅ Prevents duplicate submits
- ✅ Resets form after submit

---

## 5️⃣ ZOD - "SCHEMA VALIDATION"

### What "Schema Validation" Means:

**Schema** = Rules for what data should look like

**Validation** = Checking if data follows the rules

### Example Schema:
```typescript
const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

### What Zod Does:
```typescript
// User submits form with:
{ fullName: 'A', email: 'notanemail', message: 'hi' }

// Zod checks and returns errors:
{
  fullName: 'Name must be at least 2 characters',
  email: 'Invalid email address',
  message: 'Message must be at least 10 characters'
}
```

### Why Use Zod?
- ✅ Type-safe validation (works with TypeScript)
- ✅ Clear error messages
- ✅ Reusable schemas
- ✅ Catches bad data before sending to API

---

## 6️⃣ SENDING FORM TO YOUR EMAIL

### ❌ You CANNOT configure Zod to send emails
**Zod only validates data, it does NOT send anything anywhere!**

### ✅ You Need ONE of These Solutions:

---

### **OPTION 1: Email Service API** (Recommended - Easiest)

Use a service that sends emails for you:

#### **A) EmailJS** (Free tier: 200 emails/month)
```typescript
// 1. Install EmailJS
npm install @emailjs/browser

// 2. Configure in Contact.tsx
import emailjs from '@emailjs/browser';

const sendEmail = async (formData) => {
  await emailjs.send(
    'service_id',      // Get from EmailJS dashboard
    'template_id',     // Get from EmailJS dashboard
    formData,
    'public_key'       // Get from EmailJS dashboard
  );
};
```

**Steps:**
1. Sign up: https://www.emailjs.com
2. Create email template
3. Get API keys
4. Add to your contact form
5. **Done! Emails sent directly from browser**

**Pros:**
- ✅ No backend needed
- ✅ Free tier sufficient
- ✅ 5 minutes to set up

**Cons:**
- ⚠️ API key visible in frontend (but rate-limited by EmailJS)

---

#### **B) Formspree** (Free tier: 50 submissions/month)
```typescript
// Even easier - just change form action!
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" />
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

**Steps:**
1. Sign up: https://formspree.io
2. Get your form endpoint
3. Update form to submit to that URL
4. **Done! Emails sent to your inbox**

**Pros:**
- ✅ Easiest (no code changes needed)
- ✅ Free tier sufficient

**Cons:**
- ⚠️ Form submits cause page reload (not SPA-friendly)

---

#### **C) Web3Forms** (Free tier: Unlimited)
```typescript
const sendForm = async (data) => {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: 'YOUR_ACCESS_KEY',
      ...data
    })
  });
  return response.json();
};
```

**Steps:**
1. Sign up: https://web3forms.com
2. Get access key
3. Add fetch call to contact form
4. **Done!**

**Pros:**
- ✅ Free unlimited submissions
- ✅ No page reload (SPA-friendly)
- ✅ Simple API

---

### **OPTION 2: Build Your Own Backend API**

#### **A) Vercel Serverless Functions** (Recommended if you want control)

Create an API route in your project:

```typescript
// api/contact.ts (new file)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, message } = req.body;

  // Send email using nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  await transporter.sendMail({
    from: email,
    to: 'your@email.com',
    subject: `Contact Form: ${fullName}`,
    text: message,
  });

  res.status(200).json({ success: true });
}
```

**Then call it from React:**
```typescript
const { handleSubmit } = useForm();

const onSubmit = async (data) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (response.ok) {
    toast.success('Message sent!');
  }
};
```

**Pros:**
- ✅ Full control
- ✅ Free on Vercel
- ✅ Email credentials hidden in environment variables

**Cons:**
- ⚠️ Requires backend knowledge
- ⚠️ More setup time

---

### **OPTION 3: n8n Workflow (AI Agent)** 

You could use n8n (workflow automation) to receive webhooks and send emails.

**Steps:**
1. Set up n8n instance (self-hosted or cloud)
2. Create workflow: Webhook → Email
3. Send form data to n8n webhook URL
4. n8n sends email to you

**Pros:**
- ✅ Visual workflow builder
- ✅ Can integrate with CRM, Slack, etc.
- ✅ No code needed

**Cons:**
- ⚠️ Requires separate n8n instance
- ⚠️ Overkill for simple contact form

---

## 7️⃣ RECOMMENDATION FOR YOUR SITE

### **Best Solution Right Now: FlexSubmit** ✅

**Why:**
1. ✅ Already implemented in `src/pages/Contact.tsx`
2. ✅ No backend needed in this repo
3. ✅ Works with the current Zod validation and toast UX
4. ✅ Routing rules can be changed outside the codebase
5. ✅ SPA-friendly (no page reload)

### **Implementation:**

```typescript
const response = await fetch(FLEXSUBMIT_API, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
```

**Note:** The EmailJS and other alternatives above are still valid options, but they are not the current implementation.

---

## 8️⃣ CURRENT FORM STATUS

### What Happens Now When User Submits:
```
User fills form
  ↓
Zod validates data
  ↓
Payload maps to FlexSubmit field IDs
  ↓
fetch(FLEXSUBMIT_API, { method: 'POST', ... })
  ↓
Success / error toast shown to user
```

**File:** `src/pages/Contact.tsx`

**What to verify after deploys:**
1. FlexSubmit receives submissions from production.
2. FlexSubmit routing (email/webhooks) still fires.

---

## 9️⃣ SUMMARY

### **Terms Explained:**

| Term | What It Means |
|------|---------------|
| **API** | Way to send/receive data from server |
| **Server State** | Data that comes from external server/API |
| **Form State** | Data user types in form fields |
| **Schema Validation** | Rules to check if data is correct |
| **React Query** | Library to manage API calls (not used yet) |
| **React Hook Form** | Library to manage form inputs |
| **Zod** | Library to validate data format |

### **Current Status:**

| Component | Status | Function |
|-----------|--------|----------|
| **React Hook Form** | ✅ Working | Manages form fields |
| **Zod** | ✅ Working | Validates email format, required fields |
| **Email Sending** | ✅ WORKING (FlexSubmit) | Form data POSTs to FlexSubmit API |
| **React Query** | ⚠️ Installed but unused | Ready for future API calls |

### **Next Step:**

1. Validate FlexSubmit notifications/webhooks in production.
2. If you want vendor independence later, implement one of the alternatives above.

---

**Document Created:** 4-JAN-2026 00:15 (Sweden Time) by RovoDev  
**Status:** Updated to reflect current FlexSubmit integration in code
