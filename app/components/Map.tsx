'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const PIN_COLORS: Record<string, string> = {
  good:    '#1E7C34',
  okay:    '#B87800',
  bad:     '#C0392B',
  unrated: '#6B7280',
}

function createPin(color: string): L.DivIcon {
  const svg = `
    <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
      <filter id="shadow" x="-20%" y="-10%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.25)"/>
      </filter>
      <path
        d="M15 1C7.268 1 1 7.268 1 15c0 9.5 13.1 22.6 13.65 23.18a.9.9 0 001.3 0C16.5 37.6 29 24.5 29 15 29 7.268 22.732 1 15 1z"
        fill="${color}" filter="url(#shadow)"
      />
      <circle cx="15" cy="15" r="6" fill="white" opacity="0.95"/>
    </svg>
  `.trim()
  return L.divIcon({ html: svg, className: '', iconSize: [30, 40], iconAnchor: [15, 40] })
}

// ── Flies to a location when it becomes available ──────────────
function FlyToLocation({ location, zoom = 11 }: { location: [number, number] | null; zoom?: number }) {
  const map = useMap()
  useEffect(() => {
    if (location) map.flyTo(location, zoom, { duration: 1.5 })
  }, [location, zoom, map])
  return null
}

// ── Keeps the URL in sync as the user pans/zooms ───────────────
// This is what makes the WhatsApp deep link strategy work:
// any map view becomes a shareable URL automatically.
function MapURLSync() {
  useMapEvents({
    moveend(e) {
      const { lat, lng } = e.target.getCenter()
      const zoom = e.target.getZoom()
      const url = new URL(window.location.href)
      url.searchParams.set('lat',  lat.toFixed(4))
      url.searchParams.set('lng',  lng.toFixed(4))
      url.searchParams.set('zoom', zoom.toString())
      window.history.replaceState({}, '', url.toString())
    },
  })
  return null
}

import { Washroom } from '../types'

type MapProps = {
  washrooms: Washroom[]
  userLocation: [number, number] | null
  targetLocation: [number, number] | null  // from URL params (?lat=&lng=)
  targetZoom: number
  onSelect: (w: Washroom) => void
}

export default function Map({ washrooms, userLocation, targetLocation, targetZoom, onSelect }: MapProps) {
  return (
    <MapContainer
      center={targetLocation ?? [27.8, 76.5]}
      zoom={targetZoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapURLSync />

      {/* GPS location takes priority over URL params once acquired */}
      {userLocation && <FlyToLocation location={userLocation} zoom={13} />}

      {washrooms.map((w) => {
        const color = w.cleanliness ? PIN_COLORS[w.cleanliness] : PIN_COLORS.unrated
        return (
          <Marker
            key={w.id}
            position={[w.latitude, w.longitude]}
            icon={createPin(color)}
            eventHandlers={{ click: () => onSelect(w) }}
          />
        )
      })}
    </MapContainer>
  )
}
