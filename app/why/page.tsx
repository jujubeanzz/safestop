import Link from 'next/link'

export const metadata = {
  title: 'Why SafeStop?',
  description: 'The story behind SafeStop — a community-built map of clean washrooms on Indian highways.',
}

export default function WhyPage() {
  return (
    <main style={{
      minHeight: '100dvh',
      background: '#FFFBF5',
      fontFamily: 'var(--font-poppins), sans-serif',
      color: '#1A0E05',
    }}>

      {/* ── Hero ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg, #B54400 0%, #7A2C00 100%)',
        padding: '60px 24px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-60px', left: '50%',
          transform: 'translateX(-50%)',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'rgba(255,251,245,0.06)',
          pointerEvents: 'none',
        }} />

        <div style={{ marginBottom: '20px' }}>
          <svg width="56" height="56" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 3C14.402 3 5 12.402 5 24c0 16 21 25 21 25s21-9 21-25C47 12.402 37.598 3 26 3z" fill="#FFFBF5" opacity="0.9"/>
            <circle cx="26" cy="23" r="8" fill="#B54400"/>
          </svg>
        </div>

        <p style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,251,245,0.65)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
          SafeStop
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#FFFBF5', lineHeight: '1.25', marginBottom: '16px', maxWidth: '480px', margin: '0 auto 16px' }}>
          Every highway has washrooms. Most are unusable.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,251,245,0.80)', lineHeight: '1.7', maxWidth: '380px', margin: '0 auto' }}>
          SafeStop is a free, community-built map so you always know what&apos;s ahead.
        </p>
      </section>

      {/* ── The problem ───────────────────────────────── */}
      <section style={{ padding: '52px 24px', maxWidth: '560px', margin: '0 auto' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          The problem
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '20px' }}>
          Millions travel India&apos;s highways every day with no way to plan a clean stop.
        </h2>
        <p style={{ fontSize: '15px', color: '#5C3D1E', lineHeight: '1.8', marginBottom: '16px' }}>
          Dhaba clusters, toll plazas, petrol stations — washrooms exist on every route. But until you stop and walk in, you have no idea if it&apos;s clean, if there&apos;s running water, or if it&apos;s safe to use.
        </p>
        <p style={{ fontSize: '15px', color: '#5C3D1E', lineHeight: '1.8' }}>
          For women, elderly travellers, and families with children, a bad stop isn&apos;t just an inconvenience — it&apos;s a reason to avoid drinking water for hours, or to not travel at all. SafeStop exists to close that gap.
        </p>
      </section>

      <div style={{ height: '1px', background: 'rgba(26,14,5,0.08)', margin: '0 24px' }} />

      {/* ── How it works ──────────────────────────────── */}
      <section style={{ padding: '52px 24px', maxWidth: '560px', margin: '0 auto' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          How it works
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '32px' }}>
          Built for a moving vehicle on a patchy signal.
        </h2>

        {[
          {
            num: '01',
            title: 'WhatsApp the bot',
            body: 'Message "washrooms near [your town]" to the SafeStop number. Instant reply with a map link — no app download, no sign-up.',
          },
          {
            num: '02',
            title: 'Tap the link',
            body: 'The map opens at your location on the route, showing every nearby washroom with colour-coded cleanliness ratings.',
          },
          {
            num: '03',
            title: 'Rate what you find',
            body: 'Three taps — clean, usable, or avoid. Your rating is live immediately and helps every traveller behind you on that route.',
          },
          {
            num: '04',
            title: 'Add what\'s missing',
            body: 'Spotted a washroom not on the map? Drop a pin, name it, rate it. It becomes part of the community data instantly.',
          },
        ].map(({ num, title, body }) => (
          <div key={num} style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'rgba(181,68,0,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#B54400' }}>{num}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1A0E05', marginBottom: '6px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: '#5C3D1E', lineHeight: '1.7' }}>{body}</p>
            </div>
          </div>
        ))}
      </section>

      <div style={{ height: '1px', background: 'rgba(26,14,5,0.08)', margin: '0 24px' }} />

      {/* ── Design principles ─────────────────────────── */}
      <section style={{ padding: '52px 24px', maxWidth: '560px', margin: '0 auto' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Built differently
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '32px' }}>
          Every decision was made for the traveller on the road.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { icon: '📶', title: 'Works on slow data', body: 'No heavy images in the critical path. Loads fast on 3G across any highway.' },
            { icon: '📲', title: 'No app download', body: 'A WhatsApp message is the entry point. The web app opens in any browser.' },
            { icon: '🤝', title: 'Community-powered', body: 'Every rating makes the map better for the next person on that route.' },
            { icon: '🚺', title: 'Menstrual facilities', body: 'One filter to surface stops with disposal bins and clean changing space.' },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{
              background: 'rgba(181,68,0,0.04)',
              border: '1.5px solid rgba(181,68,0,0.10)',
              borderRadius: '16px',
              padding: '20px 16px',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1A0E05', marginBottom: '6px' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: '#5C3D1E', lineHeight: '1.6' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: '1px', background: 'rgba(26,14,5,0.08)', margin: '0 24px' }} />

      {/* ── The vision ────────────────────────────────── */}
      <section style={{ padding: '52px 24px', maxWidth: '560px', margin: '0 auto' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          The vision
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '20px' }}>
          Starting with one highway. Built to cover every route in India.
        </h2>
        <p style={{ fontSize: '15px', color: '#5C3D1E', lineHeight: '1.8' }}>
          SafeStop began on NH48 Delhi–Jaipur as a pilot. The same model — WhatsApp bot, community ratings, open map — works on any highway. As more travellers rate what they find, the map grows. The goal is a single, trusted source for clean stops across India&apos;s national highway network.
        </p>
      </section>

      <div style={{ height: '1px', background: 'rgba(26,14,5,0.08)', margin: '0 24px' }} />

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ padding: '52px 24px 32px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '16px' }}>
          Rate one washroom on your next trip.
        </h2>
        <p style={{ fontSize: '15px', color: '#5C3D1E', lineHeight: '1.8', marginBottom: '36px', maxWidth: '360px', margin: '0 auto 36px' }}>
          Three taps from you makes the route better for every traveller behind you.
        </p>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '15px 36px',
            background: '#B54400',
            color: '#FFFBF5',
            borderRadius: '100px',
            fontSize: '15px', fontWeight: '600',
            textDecoration: 'none',
            marginBottom: '16px',
          }}
        >
          Open the map
        </Link>

        <p style={{ fontSize: '13px', color: '#5C3D1E', opacity: 0.7 }}>
          Free. No sign-up. No app download.
        </p>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer style={{
        padding: '28px 24px 48px',
        textAlign: 'center',
        borderTop: '1px solid rgba(26,14,5,0.08)',
        marginTop: '48px',
      }}>
        <p style={{ fontSize: '13px', color: '#5C3D1E', opacity: 0.6 }}>
          SafeStop · Community data · Free to use
        </p>
      </footer>
    </main>
  )
}
