'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import RatingSheet from './components/RatingSheet'
import { Washroom } from './types'

// Both Map and AddWashroomSheet use Leaflet — must be browser-only (ssr: false)
const Map              = dynamic(() => import('./components/Map'),              { ssr: false })
const AddWashroomSheet = dynamic(() => import('./components/AddWashroomSheet'), { ssr: false })

// Placeholder WhatsApp number — replace before launch
const WHATSAPP_NUMBER = '919876543210'

// ── Hardcoded washroom data for NH48 ──────────────────────────────────────
// Source: approximate real locations. Replaced with Supabase in a later step.
const WASHROOMS: Washroom[] = [
  {
    id: '1',
    name: 'Kherki Daula Toll Plaza',
    latitude: 28.4234, longitude: 76.9821,
    highway: 'NH48', km_marker: 42, source: 'government_nhai',
    cleanliness: 'good',
    has_running_water: true, has_clean_space: true, has_disposal_bin: false,
    rating_count: 14, last_rated: '2h ago',
  },
  {
    id: '2',
    name: 'Manesar Rest Area',
    latitude: 28.3563, longitude: 76.9345,
    highway: 'NH48', km_marker: 50, source: 'community',
    cleanliness: 'okay',
    has_running_water: true, has_clean_space: false, has_disposal_bin: true,
    rating_count: 8, last_rated: '45m ago',
  },
  {
    id: '3',
    name: 'Dharuhera Dhaba Cluster',
    latitude: 28.2134, longitude: 76.8123,
    highway: 'NH48', km_marker: 70, source: 'community',
    cleanliness: 'bad',
    has_running_water: false, has_clean_space: false, has_disposal_bin: false,
    rating_count: 22, last_rated: '30m ago',
  },
  {
    id: '4',
    name: 'Rewari Petrol Station',
    latitude: 28.1923, longitude: 76.6234,
    highway: 'NH48', km_marker: 85, source: 'community',
    cleanliness: 'good',
    has_running_water: true, has_clean_space: true, has_disposal_bin: true,
    rating_count: 31, last_rated: '15m ago',
  },
  {
    id: '5',
    name: 'Behror Highway Rest Stop',
    latitude: 27.8934, longitude: 76.3245,
    highway: 'NH48', km_marker: 120, source: 'government_sbm',
    cleanliness: null,
    has_running_water: null, has_clean_space: null, has_disposal_bin: null,
    rating_count: 0, last_rated: null,
  },
  {
    id: '6',
    name: 'Kotputli Bus Stand',
    latitude: 27.7023, longitude: 76.1934,
    highway: 'NH48', km_marker: 155, source: 'government_sbm',
    cleanliness: 'okay',
    has_running_water: true, has_clean_space: false, has_disposal_bin: false,
    rating_count: 6, last_rated: '4h ago',
  },
  {
    id: '7',
    name: 'Shahpura Toll Washroom',
    latitude: 27.3923, longitude: 75.9634,
    highway: 'NH48', km_marker: 195, source: 'government_nhai',
    cleanliness: 'good',
    has_running_water: true, has_clean_space: true, has_disposal_bin: true,
    rating_count: 19, last_rated: '1h ago',
  },
  {
    id: '8',
    name: 'Jaipur Entry Point',
    latitude: 26.9234, longitude: 75.7823,
    highway: 'NH48', km_marker: 270, source: 'community',
    cleanliness: 'good',
    has_running_water: true, has_clean_space: true, has_disposal_bin: false,
    rating_count: 43, last_rated: '5m ago',
  },
]

// ── Cleanliness display helpers ────────────────
const LABEL: Record<string, string> = { good: 'Clean', okay: 'Usable', bad: 'Avoid' }
const COLOR: Record<string, string> = {
  good: '#1E7C34', okay: '#B87800', bad: '#C0392B',
}

// Washroom type is imported from ./types
type View = 'splash' | 'location' | 'map'

// ── SafeStop logomark (inline SVG — no image file needed) ─────────────────
function LogoMark({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26 3C14.402 3 5 12.402 5 24c0 16 21 25 21 25s21-9 21-25C47 12.402 37.598 3 26 3z"
        fill="#B54400"
      />
      <circle cx="26" cy="23" r="8" fill="#FFFBF5" opacity="0.95"/>
    </svg>
  )
}

// ── Glass surface — the key to visible glassmorphism is LOW opacity so the
//    map bleeds through, combined with strong blur and a bright border ──────
const glass: React.CSSProperties = {
  background: 'rgba(255, 251, 245, 0.62)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1.5px solid rgba(255, 255, 255, 0.80)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.95)',
}

// Slightly more opaque version for the detail card (readability matters more)
const glassCard: React.CSSProperties = {
  background: 'rgba(255, 251, 245, 0.72)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1.5px solid rgba(255, 255, 255, 0.82)',
  boxShadow: '0 -10px 48px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,1)',
}

// ─────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [view, setView]                       = useState<View>('splash')
  const [selected, setSelected]               = useState<Washroom | null>(null)
  const [showRating, setShowRating]           = useState(false)
  const [showAddWashroom, setShowAddWashroom] = useState(false)
  const [menstrualFilter, setMenstrualFilter] = useState(false)
  const [userLocation, setUserLocation]       = useState<[number, number] | null>(null)
  const [targetLocation, setTargetLocation]   = useState<[number, number] | null>(null)
  const [targetZoom, setTargetZoom]           = useState(8)
  const [localWashrooms, setLocalWashrooms]   = useState<Washroom[]>([])

  // Auto-advance splash after 1.8 seconds
  useEffect(() => {
    if (view !== 'splash') return
    const t = setTimeout(() => setView('location'), 1800)
    return () => clearTimeout(t)
  }, [view])

  // Read URL params on first load — enables WhatsApp deep links.
  // If someone shares safestop.in?lat=27.7&lng=76.1&zoom=11 on WhatsApp,
  // the map will fly to that exact view when the link is opened.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const lat  = params.get('lat')
    const lng  = params.get('lng')
    const zoom = params.get('zoom')
    if (lat && lng) {
      setTargetLocation([parseFloat(lat), parseFloat(lng)])
      if (zoom) setTargetZoom(parseInt(zoom))
    }
  }, [])

  // Request GPS from the browser
  const handleAllowLocation = () => {
    if (!navigator.geolocation) { setView('map'); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude])
        setView('map')
      },
      () => setView('map')   // if denied, just go to map anyway
    )
  }

  // Toggle menstrual filter — only show washrooms with disposal bin + clean space
  const toggleFilter = () => setMenstrualFilter(v => !v)

  // Merge hardcoded seed data with any washrooms added by this user session
  const allWashrooms = [...WASHROOMS, ...localWashrooms]

  const displayedWashrooms = menstrualFilter
    ? allWashrooms.filter(w => w.has_disposal_bin && w.has_clean_space)
    : allWashrooms

  // Handler called when AddWashroomSheet completes
  const handleAddWashroom = (w: {
    name: string; latitude: number; longitude: number
    cleanliness: string; has_running_water: boolean
    has_clean_space: boolean; has_disposal_bin: boolean
  }) => {
    const newWashroom: Washroom = {
      id: `local-${Date.now()}`,
      highway: 'NH48',
      km_marker: 0,
      source: 'community',
      rating_count: 1,
      last_rated: 'just now',
      ...w,
    }
    setLocalWashrooms(prev => [...prev, newWashroom])
  }


  // ── SPLASH SCREEN ─────────────────────────────────────────────────────
  if (view === 'splash') {
    return (
      <div style={{
        height: '100dvh', width: '100%',
        background: '#FFFBF5',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '14px',
      }}>
        <div className="splash-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <LogoMark size={56} />
          <h1 style={{
            fontSize: '32px', fontWeight: '700',
            color: '#B54400', letterSpacing: '-0.5px',
            fontFamily: 'var(--font-poppins), sans-serif',
          }}>
            SafeStop
          </h1>
          <p style={{
            fontSize: '15px', fontWeight: '500',
            color: '#5C3D1E', letterSpacing: '0.2px',
            fontFamily: 'var(--font-poppins), sans-serif',
          }}>
            Clean stops. Every highway.
          </p>
        </div>
      </div>
    )
  }

  // ── LOCATION PERMISSION SCREEN ────────────────────────────────────────
  if (view === 'location') {
    return (
      <div
        className="screen-fade"
        style={{
          height: '100dvh', width: '100%',
          background: '#FFFBF5',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '32px 28px',
          textAlign: 'center',
          gap: '0',
          fontFamily: 'var(--font-poppins), sans-serif',
        }}
      >
        {/* Large pin icon */}
        <div style={{ marginBottom: '24px' }}>
          <LogoMark size={64} />
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1A0E05', marginBottom: '10px', lineHeight: '1.3' }}>
          Find washrooms near you
        </h2>
        <p style={{ fontSize: '14px', color: '#5C3D1E', lineHeight: '1.6', marginBottom: '36px', maxWidth: '280px' }}>
          SafeStop uses your location to show what's nearby on your route. We never store it.
        </p>

        {/* Allow button */}
        <button
          onClick={handleAllowLocation}
          style={{
            width: '100%', maxWidth: '320px',
            padding: '16px',
            background: '#B54400',
            color: '#FFFBF5',
            border: 'none',
            borderRadius: '100px',
            fontSize: '16px', fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '16px',
            fontFamily: 'var(--font-poppins), sans-serif',
          }}
        >
          Allow location
        </button>

        {/* Skip link */}
        <button
          onClick={() => setView('map')}
          style={{
            background: 'none', border: 'none',
            color: '#5C3D1E', fontSize: '14px', fontWeight: '500',
            cursor: 'pointer', textDecoration: 'underline',
            fontFamily: 'var(--font-poppins), sans-serif',
          }}
        >
          Skip for now
        </button>
      </div>
    )
  }

  // ── MAP SCREEN ────────────────────────────────────────────────────────
  return (
    <main
      className="screen-fade"
      style={{
        position: 'relative', width: '100%', height: '100dvh',
        background: '#FFFBF5', overflow: 'hidden',
        fontFamily: 'var(--font-poppins), sans-serif',
      }}
    >
      {/* Map fills the full screen */}
      <div style={{ height: '100%', width: '100%' }}>
        <Map
          washrooms={displayedWashrooms}
          userLocation={userLocation}
          targetLocation={targetLocation}
          targetZoom={targetZoom}
          onSelect={setSelected}
        />
      </div>

      {/* Top gradient — softens the map edge under the header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '100px', zIndex: 999, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(255,251,245,0.6) 0%, transparent 100%)',
      }} />

      {/* ── Header ──────────────────────────────────── */}
      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        zIndex: 1000, padding: '14px 20px',
        ...glass,
        borderLeft: 'none', borderRight: 'none', borderTop: 'none',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <LogoMark size={28} />
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#B54400', letterSpacing: '-0.3px', flex: 1 }}>
          SafeStop
        </h1>

      </header>

      {/* ── Filter pill ─────────────────────────────── */}
      {/* Sits below the header. Filters pins to menstrual-friendly washrooms. */}
      <div style={{
        position: 'absolute', top: '64px', left: 0, right: 0,
        zIndex: 999, padding: '10px 20px',
        display: 'flex', gap: '8px', overflowX: 'auto',
      }}>
        <button
          onClick={toggleFilter}
          className={menstrualFilter ? 'pill-pop' : ''}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px',
            borderRadius: '100px',
            border: `1.5px solid ${menstrualFilter ? '#B54400' : 'rgba(92,61,30,0.25)'}`,
            background: menstrualFilter ? '#B54400' : 'rgba(255,251,245,0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: menstrualFilter ? '#FFFBF5' : '#5C3D1E',
            fontSize: '13px', fontWeight: '600',
            cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            fontFamily: 'var(--font-poppins), sans-serif',
          }}
        >
          <span>{menstrualFilter ? '✓' : '◎'}</span>
          Menstrual facilities
        </button>
      </div>

      {/* ── Legend (hidden when detail card is open) ── */}
      {!selected && (
        <div style={{
          position: 'absolute', bottom: '28px',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex', gap: '10px', alignItems: 'center',
          ...glass,
          borderRadius: '100px',
          padding: '8px 18px',
          whiteSpace: 'nowrap',
        }}>
          {[
            { color: '#1E7C34', label: 'Clean' },
            { color: '#B87800', label: 'Usable' },
            { color: '#C0392B', label: 'Avoid' },
            { color: '#6B7280', label: 'Unrated' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#1A0E05' }}>{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Detail Card ─────────────────────────────── */}
      {selected && !showRating && (
        <div
          className="detail-card"
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            zIndex: 1001,
            ...glassCard,
            borderBottom: 'none', borderLeft: 'none', borderRight: 'none',
            borderRadius: '22px 22px 0 0',
            padding: '14px 20px 44px',
          }}
        >
          {/* Drag handle */}
          <div style={{
            width: '40px', height: '4px',
            background: 'rgba(26,14,5,0.12)',
            borderRadius: '2px', margin: '0 auto 16px',
          }} />

          {/* Close */}
          <button
            onClick={() => setSelected(null)}
            aria-label="Close"
            style={{
              position: 'absolute', top: '14px', right: '16px',
              background: 'rgba(26,14,5,0.07)', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px',
              cursor: 'pointer', fontSize: '14px', color: '#1A0E05',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >✕</button>

          {/* Name */}
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1A0E05', paddingRight: '40px', marginBottom: '4px' }}>
            {selected.name}
          </h2>

          {/* Location */}
          <p style={{ fontSize: '13px', color: '#5C3D1E', marginBottom: '14px' }}>
            km {selected.km_marker} · {selected.highway}
          </p>

          {/* Cleanliness badge */}
          {selected.cleanliness ? (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: COLOR[selected.cleanliness] + '18',
              border: `1px solid ${COLOR[selected.cleanliness]}40`,
              borderRadius: '100px', padding: '5px 14px', marginBottom: '14px',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLOR[selected.cleanliness], display: 'inline-block' }} />
              <span style={{ fontSize: '13px', fontWeight: '600', color: COLOR[selected.cleanliness] }}>
                {LABEL[selected.cleanliness]}
              </span>
            </span>
          ) : (
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#6B728012', border: '1px solid #6B728030',
              borderRadius: '100px', padding: '5px 14px', marginBottom: '14px',
            }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280' }}>Not yet rated</span>
            </span>
          )}

          {/* Amenity badges */}
          {selected.cleanliness && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {[
                { key: 'has_running_water', label: 'Running water' },
                { key: 'has_clean_space',   label: 'Clean space' },
                { key: 'has_disposal_bin',  label: 'Disposal bin' },
              ].map(({ key, label }) => {
                const val = selected[key as keyof typeof selected]
                return (
                  <span key={key} style={{
                    padding: '4px 12px', borderRadius: '100px',
                    fontSize: '12px', fontWeight: '500',
                    background: val ? '#1E7C3410' : '#C0392B10',
                    color:      val ? '#1E7C34'   : '#C0392B',
                    border: `1px solid ${val ? '#1E7C3428' : '#C0392B28'}`,
                  }}>
                    {val ? '✓' : '✗'} {label}
                  </span>
                )
              })}
            </div>
          )}

          {/* Footer: rating count */}
          <p style={{ fontSize: '12px', color: '#5C3D1E', lineHeight: '1.5', marginBottom: '14px' }}>
            {selected.rating_count > 0
              ? `${selected.rating_count} ratings · Last rated ${selected.last_rated}`
              : 'No ratings yet — be the first!'}
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowRating(true)}
              style={{
                flex: 1, padding: '12px',
                background: 'rgba(181,68,0,0.08)',
                border: '1.5px solid rgba(181,68,0,0.25)',
                borderRadius: '100px',
                fontSize: '13px', fontWeight: '600', color: '#B54400',
                cursor: 'pointer',
                fontFamily: 'var(--font-poppins), sans-serif',
              }}
            >
              Rate
            </button>

            {/* Share this washroom on WhatsApp */}
            <button
              onClick={() => {
                const link = `${window.location.origin}?lat=${selected.latitude}&lng=${selected.longitude}&zoom=15`
                const text = `Found a washroom on SafeStop! ${selected.name} (km ${selected.km_marker}, ${selected.highway}) — check ratings & navigate: ${link}`
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
              }}
              style={{
                flex: 1, padding: '12px',
                background: 'rgba(37,211,102,0.10)',
                border: '1.5px solid rgba(37,211,102,0.30)',
                borderRadius: '100px',
                fontSize: '13px', fontWeight: '600', color: '#128C3E',
                cursor: 'pointer',
                fontFamily: 'var(--font-poppins), sans-serif',
              }}
            >
              Share
            </button>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selected.latitude},${selected.longitude}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, padding: '12px',
                background: '#B54400', color: '#FFFBF5',
                borderRadius: '100px',
                fontSize: '13px', fontWeight: '600',
                textDecoration: 'none', textAlign: 'center',
              }}
            >
              Navigate
            </a>
          </div>
        </div>
      )}

      {/* ── Rating sheet ─────────────────────────────── */}
      {selected && showRating && (
        <RatingSheet
          washroomName={selected.name}
          onClose={() => { setShowRating(false); setSelected(null) }}
        />
      )}

      {/* ── Add washroom FAB (hidden when any sheet is open) ── */}
      {!selected && !showAddWashroom && (
        <button
          onClick={() => setShowAddWashroom(true)}
          aria-label="Add a washroom"
          style={{
            position: 'absolute', bottom: '90px', right: '20px',
            zIndex: 1000,
            width: '52px', height: '52px',
            borderRadius: '50%',
            background: '#B54400',
            border: '2px solid rgba(255,255,255,0.5)',
            boxShadow: '0 4px 20px rgba(181,68,0,0.35)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', color: '#FFFBF5',
            fontWeight: '300',
          }}
        >
          +
        </button>
      )}

      {/* ── Add washroom sheet ────────────────────────── */}
      {showAddWashroom && (
        <AddWashroomSheet
          onClose={() => setShowAddWashroom(false)}
          onAdd={(w) => {
            handleAddWashroom(w)
            setShowAddWashroom(false)
          }}
        />
      )}
    </main>
  )
}
