'use client'

import { useState } from 'react'

type CleanlinessValue = 'good' | 'okay' | 'bad'
type Step = 'cleanliness' | 'amenities' | 'thanks'

type Props = {
  washroomName: string
  onClose: () => void
}

// ── Glassmorphism style for this sheet ────────
const sheetGlass: React.CSSProperties = {
  background: 'rgba(255, 251, 245, 0.94)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1.5px solid rgba(255, 255, 255, 0.85)',
  boxShadow: '0 -10px 48px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,1)',
}

const CLEANLINESS_OPTIONS = [
  { value: 'good'  as CleanlinessValue, emoji: '👍', label: 'Clean',  color: '#1E7C34', bg: '#1E7C3412' },
  { value: 'okay'  as CleanlinessValue, emoji: '😐', label: 'Usable', color: '#B87800', bg: '#B8780012' },
  { value: 'bad'   as CleanlinessValue, emoji: '👎', label: 'Avoid',  color: '#C0392B', bg: '#C0392B12' },
]

const AMENITIES = [
  { key: 'water', emoji: '💧', label: 'Running water' },
  { key: 'space', emoji: '🪣', label: 'Clean space to change' },
  { key: 'bin',   emoji: '🗑️', label: 'Disposal bin' },
]

export default function RatingSheet({ washroomName, onClose }: Props) {
  const [step, setStep]             = useState<Step>('cleanliness')
  const [cleanliness, setCleanliness] = useState<CleanlinessValue | null>(null)
  const [amenities, setAmenities]   = useState({ water: false, space: false, bin: false })

  const handleCleanliness = (val: CleanlinessValue) => {
    setCleanliness(val)
    setStep('amenities')
  }

  const toggleAmenity = (key: keyof typeof amenities) => {
    setAmenities(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = () => {
    // Supabase write will go here in a later step
    setStep('thanks')
  }

  // ── WhatsApp share ──────────────────────────
  const shareText = `I just rated a washroom on SafeStop — a free community map for clean highway washrooms. Check it out!`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  return (
    <div
      className="detail-card"
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        zIndex: 1002,
        ...sheetGlass,
        borderRadius: '22px 22px 0 0',
        padding: '14px 20px 48px',
        fontFamily: 'var(--font-poppins), sans-serif',
      }}
    >
      {/* Drag handle */}
      <div style={{
        width: '40px', height: '4px',
        background: 'rgba(26,14,5,0.12)',
        borderRadius: '2px', margin: '0 auto 18px',
      }} />

      {/* Back / close */}
      <button
        onClick={step === 'cleanliness' ? onClose : () => setStep('cleanliness')}
        aria-label={step === 'cleanliness' ? 'Close' : 'Back'}
        style={{
          position: 'absolute', top: '14px', right: '16px',
          background: 'rgba(26,14,5,0.07)', border: 'none',
          borderRadius: '50%', width: '32px', height: '32px',
          cursor: 'pointer', fontSize: '14px', color: '#1A0E05',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {step === 'cleanliness' ? '✕' : '←'}
      </button>

      {/* ── Step 1: Cleanliness ─────────────────── */}
      {step === 'cleanliness' && (
        <>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Rating
          </p>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1A0E05', marginBottom: '4px', paddingRight: '40px' }}>
            How clean is it?
          </h2>
          <p style={{ fontSize: '13px', color: '#5C3D1E', marginBottom: '24px' }}>
            {washroomName}
          </p>

          {/* Three cleanliness buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {CLEANLINESS_OPTIONS.map(({ value, emoji, label, color, bg }) => (
              <button
                key={value}
                onClick={() => handleCleanliness(value)}
                style={{
                  flex: 1,
                  padding: '18px 8px',
                  borderRadius: '16px',
                  border: `1.5px solid ${color}30`,
                  background: bg,
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '8px',
                  transition: 'transform 0.1s',
                }}
                onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.96)')}
                onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <span style={{ fontSize: '28px', lineHeight: 1 }}>{emoji}</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color }}>{label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* ── Step 2: Amenities ───────────────────── */}
      {step === 'amenities' && (
        <>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Almost done
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1A0E05' }}>
              What's available?
            </h2>
            <span style={{
              fontSize: '11px', fontWeight: '600', color: '#5C3D1E',
              background: 'rgba(92,61,30,0.08)', borderRadius: '100px',
              padding: '2px 8px',
            }}>
              optional
            </span>
          </div>

          {/* Amenity toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {AMENITIES.map(({ key, emoji, label }) => {
              const active = amenities[key as keyof typeof amenities]
              return (
                <button
                  key={key}
                  onClick={() => toggleAmenity(key as keyof typeof amenities)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: `1.5px solid ${active ? '#B5440040' : 'rgba(26,14,5,0.10)'}`,
                    background: active ? 'rgba(181,68,0,0.07)' : 'rgba(255,251,245,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{emoji}</span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A0E05' }}>{label}</span>
                  </div>
                  {/* Toggle indicator */}
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    border: `2px solid ${active ? '#B54400' : 'rgba(26,14,5,0.20)'}`,
                    background: active ? '#B54400' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {active && <span style={{ color: '#FFFBF5', fontSize: '12px', fontWeight: '700' }}>✓</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%', padding: '15px',
              background: '#B54400', color: '#FFFBF5',
              border: 'none', borderRadius: '100px',
              fontSize: '15px', fontWeight: '600',
              cursor: 'pointer', marginBottom: '14px',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            Submit rating
          </button>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleSubmit}
              style={{
                background: 'none', border: 'none',
                color: '#5C3D1E', fontSize: '13px', fontWeight: '500',
                cursor: 'pointer', textDecoration: 'underline',
                fontFamily: 'var(--font-poppins), sans-serif',
              }}
            >
              Skip amenities
            </button>
          </div>
        </>
      )}

      {/* ── Step 3: Thank you ───────────────────── */}
      {step === 'thanks' && (
        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          <div className="thank-you-emoji" style={{ fontSize: '48px', marginBottom: '12px' }}>🙏</div>
          <h2 className="thank-you-text" style={{ fontSize: '22px', fontWeight: '700', color: '#1A0E05', marginBottom: '8px' }}>
            Thank you!
          </h2>
          <p className="thank-you-text" style={{ fontSize: '14px', color: '#5C3D1E', lineHeight: '1.6', marginBottom: '28px', maxWidth: '260px', margin: '0 auto 28px', animationDelay: '0.4s' }}>
            Your rating helps fellow travelers on this route find clean stops.
          </p>

          {/* WhatsApp share */}
          <a
            href={whatsappUrl}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '15px',
              background: '#25D366', color: '#fff',
              borderRadius: '100px', marginBottom: '14px',
              fontSize: '15px', fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: '18px' }}>💬</span>
            Share on WhatsApp
          </a>

          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: '#5C3D1E', fontSize: '14px', fontWeight: '500',
              cursor: 'pointer', textDecoration: 'underline',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}
