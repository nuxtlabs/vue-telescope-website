import type { Showcase } from '~/types'

export interface Group {
  created_at: string
  id: number
  list: number
  name: string
  position: number
  published_at: string
  showcases: Showcase[]
  updated_at: string
}
