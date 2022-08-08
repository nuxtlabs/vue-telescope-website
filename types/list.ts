import type { Group } from '~/types'

export interface List {
  created_at: string
  groups: Group[]
  id: number
  name: string
  position: number
  published_at: string
  updated_at: string
  // user: null
  user_id: number
}
