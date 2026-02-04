# Make.com Automation Cheat Sheet (Triggers + Webhooks)

This is a quick reference for building an AI agent workflow in Make.com. Each idea is a separate scenario with its own trigger, AI step, and CRM update.

## Scenario 1: Website Chat Intake
Trigger: Custom Webhook (chat_started)
- Modules:
  1. Webhooks -> Custom webhook
  2. AI/LLM -> classify intent + extract fields
  3. Router -> hot / warm / cold
  4. CRM -> create or update lead
  5. Slack/Email -> notify team (hot only)
- Outputs:
  - lead_score
  - lead_status
  - extracted fields (name, email, company, timeline, budget)

## Scenario 2: Contact Form Submission
Trigger: Webhook or Form Provider (submit)
- Modules:
  1. Webhook/Form -> parse payload
  2. AI/LLM -> enrich notes + score
  3. CRM -> create lead
  4. Calendar -> propose time slots
  5. Email -> send confirmation + scheduler link

## Scenario 3: Voice Call Summary (Anita)
Trigger: Webhook (call_completed)
- Modules:
  1. Webhook -> receive transcript
  2. AI/LLM -> summarize + score
  3. CRM -> append call notes + score
  4. Slack -> notify decision maker if hot

## Scenario 4: Lead Nurture Follow-Up
Trigger: Scheduler (daily)
- Modules:
  1. CRM -> fetch leads with status = warm
  2. AI/LLM -> draft follow-up
  3. Email -> send follow-up
  4. CRM -> log activity

## Common Webhook Payload (Example)
```
{
  "event": "chat_started",
  "session_id": "abc-123",
  "language": "en",
  "message": "We need a landing page with AI automation.",
  "contact": {
    "name": "Alex Rivera",
    "email": "alex@company.com"
  }
}
```

## CRM Update Keys (Suggested)
- contact.name
- contact.email
- contact.phone
- company.name
- company.website
- project.category
- project.timeline
- project.budget
- lead_score
- lead_status
- notes

## Routing Rules (Quick)
- Hot lead: lead_score >= 70
- Warm lead: lead_score 40-69
- Cold lead: lead_score <= 39

## Recommended Triggers
- Chat started -> webhook
- Chat message -> webhook
- Form submit -> webhook
- Calendar booked -> webhook
- Call completed -> webhook
- Daily nurture -> scheduled trigger
