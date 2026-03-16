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
        {/* Ambient circle */}
        <div style={{
          position: 'absolute', top: '-60px', left: '50%',
          transform: 'translateX(-50%)',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'rgba(255,251,245,0.06)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
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
          270 km between Delhi and Jaipur. No reliable way to find a clean stop.
        </h2>
        <p style={{ fontSize: '15px', color: '#5C3D1E', lineHeight: '1.8', marginBottom: '16px' }}>
          India&apos;s national highways carry millions of families every day. Dhaba clusters, toll plazas, petrol stations — washrooms exist. But until you stop and walk in, you don&apos;t know if it&apos;s clean, if there&apos;s running water, or if it&apos;s even safe.
        </p>
        <p style={{ fontSize: '15px', color: '#5C3D1E', lineHeight: '1.8' }}>
          For women, the calculation is different. Avoiding a bad stop isn&apos;t just inconvenient — it&apos;s a reason to not travel at all, or to not drink water for hours. That&apos;s the gap SafeStop exists to close.
        </p>
      </section>

      {/* ── Divider */}
      <div style={{ height: '1px', background: 'rgba(26,14,5,0.08)', margin: '0 24px' }} />

      {/* ── How it works ──────────────────────────────── */}
      <section style={{ padding: '52px 24px', maxWidth: '560px', margin: '0 auto' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          How it works
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '32px' }}>
          Built for a 3G signal and a moving vehicle.
        </h2>

        {[
          {
            num: '01',
            title: 'WhatsApp the bot',
            body: 'Message "washrooms near Kotputli" to the SafeStop number. Instant reply with a map link — no app download needed.',
          },
          {
            num: '02',
            title: 'Tap the link',
            body: 'The map opens directly at your location on the route, showing every rated washroom nearby with colour-coded cleanliness.',
          },
          {
            num: '03',
            title: 'Rate what you find',
            body: 'Took 30 seconds — three taps to say if it\'s clean, usable, or to avoid. Your rating helps the next traveller immediately.',
          },
          {
            num: '04',
            title: 'Add what\'s missing',
            body: 'Spotted a washroom that isn\'t on the map? Drop a pin, name it, and rate it. It\'s visible to everyone on that route.',
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

      {/* ── Divider */}
      <div style={{ height: '1px', background: 'rgba(26,14,5,0.08)', margin: '0 24px' }} />

      {/* ── Design principles ─────────────────────────── */}
      <section style={{ padding: '52px 24px', maxWidth: '560px', margin: '0 auto' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Design principles
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '32px' }}>
          Every decision was made for the user on the road.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { icon: '📶', title: 'Works on slow data', body: 'No images in the critical path. OpenStreetMap tiles load fast on 3G.' },
            { icon: '📲', title: 'No app download', body: 'A WhatsApp message is the entry point. The web app is the destination.' },
            { icon: '🤝', title: 'Community first', body: 'Ratings decay without new data. The freshest voices carry the most weight.' },
            { icon: '🚺', title: 'Menstrual facilities', body: 'A single filter surfaces stops with disposal bins and clean changing space.' },
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

      {/* ── Divider */}
      <div style={{ height: '1px', background: 'rgba(26,14,5,0.08)', margin: '0 24px' }} />

      {/* ── The ask ───────────────────────────────────── */}
      <section style={{ padding: '52px 24px 32px', maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          The ask
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '16px' }}>
          Rate one washroom on your next trip.
        </h2>
        <p style={{ fontSize: '15px', color: '#5C3D1E', lineHeight: '1.8', marginBottom: '36px', maxWidth: '360px', margin: '0 auto 36px' }}>
          SafeStop is only as useful as its latest data. Three taps from you makes the route better for everyone behind you.
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
          SafeStop · NH48 Delhi–Jaipur · Community data
        </p>
      </footer>
    </main>
  )
}
