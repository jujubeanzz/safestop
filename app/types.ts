// Shared types used across the app
// Defining them once here prevents mismatches between components

export type Washroom = {
  id: string
  name: string
  latitude: number
  longitude: number
  highway: string
  km_marker: number
  source: string
  cleanliness: string | null
  has_running_water: boolean | null
  has_clean_space: boolean | null
  has_disposal_bin: boolean | null
  rating_count: number
  last_rated: string | null
}
