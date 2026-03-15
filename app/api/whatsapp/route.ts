// ── SafeStop WhatsApp Bot ─────────────────────────────────────────────────
//
// How it works:
// 1. User messages the SafeStop WhatsApp number (via Twilio)
// 2. Twilio sends that message as a POST request to this endpoint
// 3. We extract a location from the message ("near Kotputli", "in Rewari", etc.)
// 4. We reply with a SafeStop deep link centered on that location
// 5. User taps the link → map opens at their area → they find clean washrooms
//
// Setup: see TWILIO_SETUP.md in the project root

import { NextRequest, NextResponse } from 'next/server'

// GET handler — lets us confirm the route is live by visiting it in a browser
export async function GET() {
  return NextResponse.json({ status: 'SafeStop WhatsApp bot is running' })
}

// ── Known towns on NH48 Delhi–Jaipur with their coordinates ──────────────
// Keeps the bot fast — no geocoding API needed for the most common queries.
const NH48_TOWNS: Record<string, [number, number]> = {
  'delhi':     [28.6300, 77.2200],
  'gurugram':  [28.4595, 77.0266],
  'gurgaon':   [28.4595, 77.0266],
  'manesar':   [28.3563, 76.9345],
  'dharuhera': [28.2134, 76.8123],
  'rewari':    [28.1923, 76.6234],
  'behror':    [27.8934, 76.3245],
  'kotputli':  [27.7023, 76.1934],
  'shahpura':  [27.3923, 75.9634],
  'jaipur':    [26.9234, 75.7823],
}

// ── Extract a place name from the user's message ──────────────────────────
// Handles: "near Kotputli", "in Rewari", "around Manesar", direct town names
function extractLocation(message: string): string | null {
  const lower = message.toLowerCase()

  // Check for preposition patterns first
  const patterns = [
    /near\s+([a-zA-Z\s]+?)(?:\s+on|\s+highway|\s*$)/i,
    /in\s+([a-zA-Z\s]+?)(?:\s+on|\s+highway|\s*$)/i,
    /around\s+([a-zA-Z\s]+?)(?:\s+on|\s+highway|\s*$)/i,
    /at\s+([a-zA-Z\s]+?)(?:\s+on|\s+highway|\s*$)/i,
  ]

  for (const pattern of patterns) {
    const match = lower.match(pattern)
    if (match) return match[1].trim()
  }

  // Fall back to checking if any known town name appears directly
  for (const town of Object.keys(NH48_TOWNS)) {
    if (lower.includes(town)) return town
  }

  return null
}

// ── Match extracted location to coordinates ───────────────────────────────
function findCoords(location: string): [number, number] | null {
  const lower = location.toLowerCase().trim()
  for (const [town, coords] of Object.entries(NH48_TOWNS)) {
    if (lower.includes(town)) return coords
  }
  return null
}

// ── Build a TwiML XML response (this is what Twilio expects) ──────────────
// TwiML = Twilio Markup Language — it's just XML that tells Twilio what to reply
// We must escape & < > in the message — raw & in XML breaks the response silently
function twiml(message: string): NextResponse {
  const safe = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${safe}</Message></Response>`
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'text/xml' },
  })
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://safestop.vercel.app'

// ── Main webhook handler ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Twilio sends messages as URL-encoded form data
  const body = await req.text()
  const params = new URLSearchParams(body)
  const message = (params.get('Body') ?? '').trim()

  // Empty message — send a welcome/help response
  if (!message) {
    return twiml(
      `Hi! 👋 I'm SafeStop — a free map of clean washrooms on Indian highways.\n\nTell me where you are on NH48, e.g. *"near Kotputli"* and I'll send you a map link right away.`
    )
  }

  const location = extractLocation(message)

  // No location found — send the full NH48 map with a prompt
  if (!location) {
    return twiml(
      `Hi! 👋 Here's the full NH48 Delhi–Jaipur washroom map:\n\n📍 ${BASE_URL}\n\nFor a closer view, tell me a town on your route — like *Kotputli*, *Rewari*, or *Manesar*.`
    )
  }

  const coords = findCoords(location)

  // Location mentioned but not on NH48 yet
  if (!coords) {
    return twiml(
      `Hi! 👋 SafeStop currently covers NH48 Delhi–Jaipur. Here's the map:\n\n📍 ${BASE_URL}\n\nTry a town on this route like *Kotputli*, *Dharuhera* or *Behror*.`
    )
  }

  // Found a match — build the deep link and reply
  const [lat, lng] = coords
  const link = `${BASE_URL}?lat=${lat}&lng=${lng}&zoom=12`
  const name = location.charAt(0).toUpperCase() + location.slice(1)

  return twiml(
    `Here are washrooms near *${name}* on NH48:\n\n📍 ${link}\n\nTap the link to see cleanliness ratings, amenities & get directions.\n\nRate a washroom to help fellow travelers! 🙏`
  )
}
