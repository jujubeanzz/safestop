'use client'

// This component is imported with dynamic + ssr:false in page.tsx
// because it uses Leaflet (which needs the browser's window object).

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Step = 'name' | 'location' | 'cleanliness' | 'amenities' | 'thanks'
type CleanlinessValue = 'good' | 'okay' | 'bad'
type GpsStatus = 'loading' | 'acquired' | 'denied'

type Props = {
  onClose: () => void
  onAdd: (washroom: {
    name: string
    latitude: number
    longitude: number
    cleanliness: CleanlinessValue
    has_running_water: boolean
    has_clean_space: boolean
    has_disposal_bin: boolean
  }) => void
}

// ── Shared glass style ─────────────────────────
const sheetGlass: React.CSSProperties = {
  background: 'rgba(255, 251, 245, 0.94)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1.5px solid rgba(255, 255, 255, 0.85)',
  boxShadow: '0 -10px 48px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,1)',
}

// ── Draggable pin icon for the location picker ─
function createDragPin(): L.DivIcon {
  const svg = `
    <svg width="34" height="46" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
      <filter id="s"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/></filter>
      <path d="M15 1C7.268 1 1 7.268 1 15c0 9.5 13.1 22.6 13.65 23.18a.9.9 0 001.3 0C16.5 37.6 29 24.5 29 15 29 7.268 22.732 1 15 1z"
        fill="#B54400" filter="url(#s)"/>
      <circle cx="15" cy="15" r="6" fill="white" opacity="0.95"/>
    </svg>
  `.trim()
  return L.divIcon({ html: svg, className: '', iconSize: [34, 46], iconAnchor: [17, 46] })
}

// ── Listens for map taps so user can relocate pin by tapping ──
function TapToMove({ onTap }: { onTap: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) { onTap(e.latlng.lat, e.latlng.lng) },
  })
  return null
}

// ── Amenity & cleanliness config ──────────────
const CLEANLINESS_OPTIONS = [
  { value: 'good'  as CleanlinessValue, emoji: '👍', label: 'Clean',  color: '#1E7C34', bg: '#1E7C3412' },
  { value: 'okay'  as CleanlinessValue, emoji: '😐', label: 'Usable', color: '#B87800', bg: '#B8780012' },
  { value: 'bad'   as CleanlinessValue, emoji: '👎', label: 'Avoid',  color: '#C0392B', bg: '#C0392B12' },
]

const AMENITIES: { key: 'water' | 'space' | 'bin'; emoji: string; label: string }[] = [
  { key: 'water', emoji: '💧', label: 'Running water' },
  { key: 'space', emoji: '🪣', label: 'Clean space to change' },
  { key: 'bin',   emoji: '🗑️', label: 'Disposal bin' },
]

// ─────────────────────────────────────────────
export default function AddWashroomSheet({ onClose, onAdd }: Props) {
  const [step, setStep]       = useState<Step>('name')
  const [name, setName]       = useState('')
  const [coords, setCoords]   = useState<[number, number] | null>(null)
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>('loading')
  const [cleanliness, setCleanliness] = useState<CleanlinessValue | null>(null)
  const [amenities, setAmenities] = useState({ water: false, space: false, bin: false })

  // ── Request GPS when user reaches the location step ──
  useEffect(() => {
    if (step !== 'location') return
    setGpsStatus('loading')
    if (!navigator.geolocation) { setGpsStatus('denied'); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords([pos.coords.latitude, pos.coords.longitude])
        setGpsStatus('acquired')
      },
      () => setGpsStatus('denied'),
      { timeout: 12000, enableHighAccuracy: true }
    )
  }, [step])

  const handleCleanliness = (val: CleanlinessValue) => {
    setCleanliness(val)
    setStep('amenities')
  }

  const handleSubmit = () => {
    if (!coords || !cleanliness) return
    onAdd({
      name,
      latitude: coords[0],
      longitude: coords[1],
      cleanliness,
      has_running_water: amenities.water,
      has_clean_space: amenities.space,
      has_disposal_bin: amenities.bin,
    })
    setStep('thanks')
  }

  const shareText = `I just added a washroom on SafeStop — a free community map for clean highway stops. Check it out!`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  // ── Back button target per step ───────────
  const handleBack = () => {
    if (step === 'name')       onClose()
    if (step === 'location')   setStep('name')
    if (step === 'cleanliness') setStep('location')
    if (step === 'amenities')  setStep('cleanliness')
  }

  // ── Step label for progress indicator ────
  const stepIndex = ['name', 'location', 'cleanliness', 'amenities'].indexOf(step)

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
      <div style={{ width: '40px', height: '4px', background: 'rgba(26,14,5,0.12)', borderRadius: '2px', margin: '0 auto 16px' }} />

      {/* Back / close */}
      {step !== 'thanks' && (
        <button
          onClick={handleBack}
          aria-label="Back"
          style={{
            position: 'absolute', top: '14px', right: '16px',
            background: 'rgba(26,14,5,0.07)', border: 'none',
            borderRadius: '50%', width: '32px', height: '32px',
            cursor: 'pointer', fontSize: '14px', color: '#1A0E05',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {step === 'name' ? '✕' : '←'}
        </button>
      )}

      {/* Progress dots (hidden on thanks) */}
      {step !== 'thanks' && (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '18px' }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              height: '4px', flex: 1, borderRadius: '2px',
              background: i <= stepIndex ? '#B54400' : 'rgba(26,14,5,0.10)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      )}

      {/* ── Step 1: Name ───────────────────────── */}
      {step === 'name' && (
        <>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Add washroom
          </p>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1A0E05', marginBottom: '20px', paddingRight: '40px' }}>
            What is this place called?
          </h2>
          <input
            type="text"
            placeholder="e.g. HP Petrol Pump, Neemrana"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            style={{
              width: '100%', padding: '14px 16px',
              borderRadius: '14px',
              border: '1.5px solid rgba(26,14,5,0.15)',
              background: 'rgba(255,251,245,0.8)',
              fontSize: '15px', color: '#1A0E05',
              fontFamily: 'var(--font-poppins), sans-serif',
              outline: 'none', marginBottom: '16px',
            }}
          />
          <button
            onClick={() => setStep('location')}
            disabled={name.trim().length < 2}
            style={{
              width: '100%', padding: '14px',
              background: name.trim().length < 2 ? 'rgba(26,14,5,0.08)' : '#B54400',
              color: name.trim().length < 2 ? 'rgba(26,14,5,0.3)' : '#FFFBF5',
              border: 'none', borderRadius: '100px',
              fontSize: '15px', fontWeight: '600',
              cursor: name.trim().length < 2 ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            Continue
          </button>
        </>
      )}

      {/* ── Step 2: Location ────────────────────── */}
      {step === 'location' && (
        <>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Confirm location
          </p>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1A0E05', marginBottom: '6px', paddingRight: '40px' }}>
            Are you at the washroom?
          </h2>
          <p style={{ fontSize: '13px', color: '#5C3D1E', marginBottom: '16px' }}>
            Tap the map to move the pin if it's slightly off.
          </p>

          {/* GPS loading state */}
          {gpsStatus === 'loading' && (
            <div style={{
              height: '180px', borderRadius: '14px',
              background: 'rgba(26,14,5,0.04)',
              border: '1.5px solid rgba(26,14,5,0.08)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '10px', marginBottom: '16px',
            }}>
              <div style={{ fontSize: '24px' }}>📍</div>
              <p style={{ fontSize: '13px', color: '#5C3D1E', fontWeight: '500' }}>Getting your location…</p>
              <p style={{ fontSize: '12px', color: '#5C3D1E', opacity: 0.6 }}>This may take a few seconds</p>
            </div>
          )}

          {/* GPS denied state — block the user from continuing */}
          {gpsStatus === 'denied' && (
            <div style={{
              height: '180px', borderRadius: '14px',
              background: '#C0392B08',
              border: '1.5px solid #C0392B20',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '8px', marginBottom: '16px', padding: '20px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px' }}>🚫</div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#C0392B' }}>Location access needed</p>
              <p style={{ fontSize: '12px', color: '#5C3D1E', lineHeight: '1.5' }}>
                We need your location to place the washroom accurately. Please enable location in your browser settings and try again.
              </p>
            </div>
          )}

          {/* Mini map with draggable pin */}
          {gpsStatus === 'acquired' && coords && (
            <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '16px', height: '180px' }}>
              <MapContainer
                center={coords}
                zoom={16}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <TapToMove onTap={(lat, lng) => setCoords([lat, lng])} />
                <Marker
                  position={coords}
                  icon={createDragPin()}
                  draggable={true}
                  eventHandlers={{
                    dragend(e) {
                      const pos = e.target.getLatLng()
                      setCoords([pos.lat, pos.lng])
                    },
                  }}
                />
              </MapContainer>
            </div>
          )}

          {gpsStatus === 'acquired' && (
            <p style={{ fontSize: '12px', color: '#5C3D1E', marginBottom: '14px', textAlign: 'center' }}>
              {coords ? `${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}` : ''}
            </p>
          )}

          <button
            onClick={() => setStep('cleanliness')}
            disabled={gpsStatus !== 'acquired'}
            style={{
              width: '100%', padding: '14px',
              background: gpsStatus !== 'acquired' ? 'rgba(26,14,5,0.08)' : '#B54400',
              color: gpsStatus !== 'acquired' ? 'rgba(26,14,5,0.3)' : '#FFFBF5',
              border: 'none', borderRadius: '100px',
              fontSize: '15px', fontWeight: '600',
              cursor: gpsStatus !== 'acquired' ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            {gpsStatus === 'loading' ? 'Waiting for location…' : gpsStatus === 'denied' ? 'Location required' : 'Looks right, continue'}
          </button>
        </>
      )}

      {/* ── Step 3: Cleanliness ─────────────────── */}
      {step === 'cleanliness' && (
        <>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Rating
          </p>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1A0E05', marginBottom: '4px', paddingRight: '40px' }}>
            How clean is it?
          </h2>
          <p style={{ fontSize: '13px', color: '#5C3D1E', marginBottom: '24px' }}>{name}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {CLEANLINESS_OPTIONS.map(({ value, emoji, label, color, bg }) => (
              <button
                key={value}
                onClick={() => handleCleanliness(value)}
                style={{
                  flex: 1, padding: '18px 8px', borderRadius: '16px',
                  border: `1.5px solid ${color}30`, background: bg,
                  cursor: 'pointer', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '8px', transition: 'transform 0.1s',
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

      {/* ── Step 4: Amenities ───────────────────── */}
      {step === 'amenities' && (
        <>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#B54400', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Almost done
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1A0E05' }}>What's available?</h2>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#5C3D1E', background: 'rgba(92,61,30,0.08)', borderRadius: '100px', padding: '2px 8px' }}>
              optional
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {AMENITIES.map(({ key, emoji, label }) => {
              const active = amenities[key as keyof typeof amenities]
              return (
                <button
                  key={key}
                  onClick={() => setAmenities(prev => ({ ...prev, [key]: !prev[key] }))}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px', borderRadius: '14px',
                    border: `1.5px solid ${active ? '#B5440040' : 'rgba(26,14,5,0.10)'}`,
                    background: active ? 'rgba(181,68,0,0.07)' : 'rgba(255,251,245,0.5)',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{emoji}</span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A0E05' }}>{label}</span>
                  </div>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    border: `2px solid ${active ? '#B54400' : 'rgba(26,14,5,0.20)'}`,
                    background: active ? '#B54400' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {active && <span style={{ color: '#FFFBF5', fontSize: '12px', fontWeight: '700' }}>✓</span>}
                  </div>
                </button>
              )
            })}
          </div>
          <button
            onClick={handleSubmit}
            style={{
              width: '100%', padding: '15px', background: '#B54400', color: '#FFFBF5',
              border: 'none', borderRadius: '100px', fontSize: '15px', fontWeight: '600',
              cursor: 'pointer', marginBottom: '14px',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            Add washroom
          </button>
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleSubmit}
              style={{
                background: 'none', border: 'none', color: '#5C3D1E',
                fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                textDecoration: 'underline', fontFamily: 'var(--font-poppins), sans-serif',
              }}
            >
              Skip amenities
            </button>
          </div>
        </>
      )}

      {/* ── Step 5: Thank you ───────────────────── */}
      {step === 'thanks' && (
        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📍</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1A0E05', marginBottom: '8px' }}>Added to SafeStop!</h2>
          <p style={{ fontSize: '14px', color: '#5C3D1E', lineHeight: '1.6', margin: '0 auto 28px', maxWidth: '260px' }}>
            Thank you for helping fellow travelers find clean stops on their route.
          </p>
          <a
            href={whatsappUrl}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '15px', background: '#25D366', color: '#fff',
              borderRadius: '100px', marginBottom: '14px',
              fontSize: '15px', fontWeight: '600', textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: '18px' }}>💬</span>
            Share on WhatsApp
          </a>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: '#5C3D1E',
              fontSize: '14px', fontWeight: '500', cursor: 'pointer',
              textDecoration: 'underline', fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}
