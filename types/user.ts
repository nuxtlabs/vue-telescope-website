export interface User {
  blocked: boolean
  confirmed: boolean
  createdAt: string
  email: string
  id: number
  lists: []
  provider: string
  role: object
  token: string
  updatedAt: string
  username: string
}
