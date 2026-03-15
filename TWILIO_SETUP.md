# Setting up the SafeStop WhatsApp Bot (Twilio)

## What this does
When a user messages the SafeStop WhatsApp number asking about washrooms,
the bot automatically replies with a deep link to the SafeStop map centered
on their location.

---

## Step 1 — Create a free Twilio account
1. Go to https://www.twilio.com and sign up (free)
2. Verify your email and phone number

## Step 2 — Activate the WhatsApp Sandbox
1. In the Twilio console, go to **Messaging → Try it out → Send a WhatsApp message**
2. Follow the instructions to join the sandbox
   (you'll send a code like "join <word-word>" to a Twilio number)
3. Note down the sandbox WhatsApp number — it looks like +1 415 523 8886

## Step 3 — Get your credentials
In the Twilio console homepage, copy:
- **Account SID** (starts with AC...)
- **Auth Token**

## Step 4 — Add them to your project
Create a file called `.env.local` in your project root (next to package.json):

```
NEXT_PUBLIC_BASE_URL=https://your-vercel-url.vercel.app
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
```

Note: NEXT_PUBLIC_BASE_URL should be your deployed Vercel URL (not localhost),
because Twilio needs to reach your server over the internet.

## Step 5 — Deploy to Vercel first
The bot only works once your app is deployed publicly.
See VERCEL_DEPLOY.md for deployment instructions (coming soon).

## Step 6 — Point Twilio to your webhook
1. In Twilio console → Messaging → Settings → WhatsApp Sandbox Settings
2. Set "When a message comes in" to:
   `https://your-vercel-url.vercel.app/api/whatsapp`
3. Method: HTTP POST
4. Save

## Step 7 — Test it
Send a WhatsApp message to the Twilio sandbox number:
- "washrooms near Kotputli"
- "in Rewari"
- "near Jaipur"

You should get a reply with a SafeStop deep link within seconds.

---

## How the bot works (plain English)
1. User sends a message to the WhatsApp number
2. Twilio receives it and forwards it to /api/whatsapp on your server
3. The server reads the message, looks for a town name
4. If found → replies with safestop.vercel.app?lat=X&lng=Y&zoom=12
5. User taps the link → SafeStop map opens centered on their area
