import Link from 'next/link'

export const metadata = {
  title: 'Why SafeStop?',
  description: 'A community-built map of clean washrooms on Indian highways.',
}

export default function WhyPage() {
  return (
    <main style={{
      minHeight: '100dvh',
      background: '#FFFBF5',
      fontFamily: 'var(--font-poppins), sans-serif',
      color: '#1A0E05',
      paddingBottom: '100px', // space for sticky button
    }}>

      {/* ── Hero — compact ────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg, #B54400 0%, #7A2C00 100%)',
        padding: '36px 24px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', left: '50%',
          transform: 'translateX(-50%)',
          width: '240px', height: '240px', borderRadius: '50%',
          background: 'rgba(255,251,245,0.06)', pointerEvents: 'none',
        }} />
        <div style={{ marginBottom: '14px' }}>
          <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
            <path d="M26 3C14.402 3 5 12.402 5 24c0 16 21 25 21 25s21-9 21-25C47 12.402 37.598 3 26 3z" fill="#FFFBF5" opacity="0.9"/>
            <circle cx="26" cy="23" r="8" fill="#B54400"/>
          </svg>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#FFFBF5', lineHeight: '1.3', marginBottom: '10px' }}>
          Every highway has washrooms.<br/>Most are unusable.
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,251,245,0.78)', lineHeight: '1.6', maxWidth: '300px', margin: '0 auto' }}>
          SafeStop is a free community map so you always know what&apos;s ahead.
        </p>
      </section>

      {/* ── Visual stat strip ─────────────────────────── */}
      <section style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid rgba(26,14,5,0.08)',
      }}>
        {[
          { stat: '100K+', label: 'km of highways in India' },
          { stat: '3 taps', label: 'to rate a washroom' },
          { stat: '0 ₹', label: 'free forever' },
        ].map(({ stat, label }, i) => (
          <div key={i} style={{
            padding: '20px 12px',
            textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(26,14,5,0.08)' : 'none',
          }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#B54400', marginBottom: '4px' }}>{stat}</div>
            <div style={{ fontSize: '11px', color: '#5C3D1E', lineHeight: '1.4' }}>{label}</div>
          </div>
        ))}
      </section>

      {/* ── The problem ───────────────────────────────── */}
      <section style={{ padding: '40px 24px 0' }}>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
          The problem
        </p>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '16px' }}>
          Millions travel India&apos;s highways with no way to plan a clean stop.
        </h2>

        {/* Visual problem cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '0' }}>
          {[
            { icon: '🚻', title: 'Washrooms exist', body: 'Toll plazas, dhabas, petrol stations — infrastructure is there on every route.' },
            { icon: '❓', title: 'But you never know', body: 'No ratings, no photos, no way to check before you stop and walk in.' },
            { icon: '🚺', title: 'Worst for women', body: 'A bad stop means skipping water for hours — or not travelling at all.' },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              background: 'rgba(181,68,0,0.04)',
              border: '1.5px solid rgba(181,68,0,0.09)',
              borderRadius: '16px',
              padding: '16px',
            }}>
              <span style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A0E05', marginBottom: '4px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: '#5C3D1E', lineHeight: '1.6' }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────── */}
      <section style={{ padding: '40px 24px 0' }}>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
          How it works
        </p>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '20px' }}>
          WhatsApp → map link → done.
        </h2>

        {/* Visual flow */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '19px', top: '20px', bottom: '20px', width: '2px',
            background: 'linear-gradient(to bottom, #B54400, rgba(181,68,0,0.1))',
          }} />

          {[
            { icon: '💬', title: 'Message the bot', body: '"washrooms near Kotputli" → instant reply with a map link' },
            { icon: '📍', title: 'Tap the link', body: 'Map opens at your location — colour-coded washrooms nearby' },
            { icon: '👍', title: 'Rate what you find', body: 'Clean · Usable · Avoid — 3 taps, live immediately' },
            { icon: '📌', title: 'Add what\'s missing', body: 'Drop a pin for any washroom not on the map yet' },
          ].map(({ icon, title, body }, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', position: 'relative' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: '#B54400',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '18px', zIndex: 1,
              }}>
                {icon}
              </div>
              <div style={{ paddingTop: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A0E05', marginBottom: '3px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: '#5C3D1E', lineHeight: '1.5' }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature pills ─────────────────────────────── */}
      <section style={{ padding: '40px 24px 0' }}>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
          Built for the road
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            '📶 Works on 3G',
            '📲 No app download',
            '🆓 Always free',
            '🤝 Community data',
            '🚺 Menstrual facilities filter',
            '🗺️ Any highway',
            '💬 WhatsApp first',
            '⚡ Live ratings',
          ].map((pill) => (
            <span key={pill} style={{
              padding: '8px 14px',
              background: 'rgba(181,68,0,0.06)',
              border: '1.5px solid rgba(181,68,0,0.12)',
              borderRadius: '100px',
              fontSize: '13px', fontWeight: '500', color: '#1A0E05',
            }}>
              {pill}
            </span>
          ))}
        </div>
      </section>

      {/* ── Vision ────────────────────────────────────── */}
      <section style={{
        margin: '40px 24px 0',
        background: 'linear-gradient(135deg, #B54400 0%, #7A2C00 100%)',
        borderRadius: '20px',
        padding: '28px 24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛣️</div>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFBF5', marginBottom: '10px', lineHeight: '1.4' }}>
          Starting with NH48.<br/>Built for every highway in India.
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,251,245,0.78)', lineHeight: '1.7' }}>
          The same model — WhatsApp bot, community ratings, open map — works on any route. As more travellers contribute, the map grows.
        </p>
      </section>

      {/* ── Sticky CTA ────────────────────────────────── */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '390px',
        padding: '16px 24px 32px',
        background: 'linear-gradient(to top, #FFFBF5 70%, rgba(255,251,245,0))',
        zIndex: 100,
      }}>
        <Link
          href="/"
          style={{
            display: 'block',
            padding: '16px',
            background: '#B54400',
            color: '#FFFBF5',
            borderRadius: '100px',
            fontSize: '16px', fontWeight: '600',
            textDecoration: 'none',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(181,68,0,0.35)',
          }}
        >
          Open the map
        </Link>
      </div>

    </main>
  )
}
