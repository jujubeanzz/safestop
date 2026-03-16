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
      paddingBottom: '88px',
    }}>

      {/* ── Hero ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg, #B54400 0%, #7A2C00 100%)',
        padding: '32px 24px 36px',
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

        {/* Logo inline with name */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          <svg width="32" height="32" viewBox="0 0 52 52" fill="none">
            <path d="M26 3C14.402 3 5 12.402 5 24c0 16 21 25 21 25s21-9 21-25C47 12.402 37.598 3 26 3z" fill="#FFFBF5" opacity="0.9"/>
            <circle cx="26" cy="23" r="8" fill="#B54400"/>
          </svg>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#FFFBF5', letterSpacing: '-0.3px' }}>SafeStop</span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#FFFBF5', lineHeight: '1.3', marginBottom: '10px' }}>
          We built SafeStop because nobody should have to dehydrate before a road trip.
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,251,245,0.80)', lineHeight: '1.6', maxWidth: '300px', margin: '0 auto' }}>
          A free, community-built map of clean washrooms on Indian highways — so you always know before you stop.
        </p>
      </section>

      {/* ── Stat strip ────────────────────────────────── */}
      <section style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid rgba(26,14,5,0.08)',
      }}>
        {[
          { stat: '83%', label: 'stop randomly and hope for the best' },
          { stat: '39%', label: 'of women avoid travel during their period' },
          { stat: '3%', label: 'of women use any digital tool' },
        ].map(({ stat, label }, i) => (
          <div key={i} style={{
            padding: '18px 10px',
            textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(26,14,5,0.08)' : 'none',
          }}>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#B54400', marginBottom: '4px' }}>{stat}</div>
            <div style={{ fontSize: '11px', color: '#5C3D1E', lineHeight: '1.4' }}>{label}</div>
          </div>
        ))}
      </section>

      {/* ── The problem ───────────────────────────────── */}
      <section style={{ padding: '36px 24px 0' }}>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
          The problem
        </p>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '16px' }}>
          The infrastructure exists. The information doesn&apos;t.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { icon: '🚻', title: 'Washrooms are everywhere', body: 'Toll plazas, dhabas, petrol stations — every highway has them.' },
            { icon: '🤷', title: 'But no one knows what to expect', body: '83% randomly stop and hope. There\'s no way to check before you walk in.' },
            { icon: '🚺', title: 'Women pay the highest price', body: '66% hold it. 39% skip travel during their period. Only 3% use any digital tool.' },
            { icon: '💸', title: 'Paid doesn\'t mean clean', body: '50% of non-menstruating travellers said washrooms were paid but still filthy.' },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              background: 'rgba(181,68,0,0.04)',
              border: '1.5px solid rgba(181,68,0,0.09)',
              borderRadius: '14px',
              padding: '14px',
            }}>
              <span style={{ fontSize: '24px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{icon}</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A0E05', marginBottom: '3px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: '#5C3D1E', lineHeight: '1.5' }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What people actually need ─────────────────── */}
      <section style={{ padding: '36px 24px 0' }}>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
          What travellers need
        </p>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '16px' }}>
          We asked 58 people. Here&apos;s what they said.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { pct: '79%', label: 'need a clean space to change', icon: '🪣' },
            { pct: '85%', label: 'cite general filth as the main issue', icon: '🧹' },
            { pct: '55%', label: 'need running water', icon: '💧' },
            { pct: '65%', label: 'find no soap or water', icon: '🚿' },
          ].map(({ pct, label, icon }) => (
            <div key={label} style={{
              background: '#FFFBF5',
              border: '1.5px solid rgba(26,14,5,0.10)',
              borderRadius: '14px',
              padding: '16px 14px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{icon}</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#B54400', marginBottom: '4px' }}>{pct}</div>
              <div style={{ fontSize: '12px', color: '#5C3D1E', lineHeight: '1.4' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How SafeStop works ────────────────────────── */}
      <section style={{ padding: '36px 24px 0' }}>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#B54400', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
          The solution
        </p>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1A0E05', lineHeight: '1.35', marginBottom: '20px' }}>
          Know before you stop.
        </h2>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: '19px', top: '20px', bottom: '20px', width: '2px',
            background: 'linear-gradient(to bottom, #B54400, rgba(181,68,0,0.1))',
          }} />
          {[
            { icon: '💬', title: 'WhatsApp the bot', body: 'Message your location → instant reply with a map link. No app, no sign-up.' },
            { icon: '📍', title: 'See what\'s ahead', body: 'Community-rated washrooms on your route — colour-coded clean, usable, or avoid.' },
            { icon: '👍', title: 'Rate in 3 taps', body: '95% of travellers said they\'d rate. We built it to take under 15 seconds.' },
            { icon: '📌', title: 'Add what\'s missing', body: 'Drop a pin, name it, rate it. Every new stop helps everyone after you.' },
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

      {/* ── Community proof ───────────────────────────── */}
      <section style={{
        margin: '36px 24px 0',
        background: 'linear-gradient(135deg, #B54400 0%, #7A2C00 100%)',
        borderRadius: '20px',
        padding: '24px 20px',
      }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#FFFBF5' }}>95%</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,251,245,0.75)', lineHeight: '1.4', marginTop: '4px' }}>willing to rate washrooms</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,251,245,0.15)' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#FFFBF5' }}>17</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,251,245,0.75)', lineHeight: '1.4', marginTop: '4px' }}>volunteers already signed up to rate</div>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,251,245,0.80)', lineHeight: '1.6', textAlign: 'center' }}>
          &ldquo;Washroom options are there but most of it is not managed.&rdquo;<br/>
          <span style={{ opacity: 0.65 }}>— Survey respondent, March 2026</span>
        </p>
      </section>

      {/* ── Feature pills ─────────────────────────────── */}
      <section style={{ padding: '36px 24px 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            '📲 No app download',
            '🆓 Always free',
            '📶 Works on 3G',
            '🚺 Menstrual facilities filter',
            '🤝 Community data',
            '⚡ Live ratings',
            '💬 WhatsApp first',
            '🗺️ Any highway',
          ].map((pill) => (
            <span key={pill} style={{
              padding: '7px 13px',
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

      {/* ── Sticky CTA ────────────────────────────────── */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '390px',
        padding: '12px 24px 20px',
        background: 'linear-gradient(to top, #FFFBF5 75%, rgba(255,251,245,0))',
        zIndex: 100,
      }}>
        <Link
          href="/"
          style={{
            display: 'block',
            padding: '15px',
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
