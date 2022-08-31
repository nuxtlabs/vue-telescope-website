export interface Framework {
  id: number
  imgPath: string
  name: string
  slug: string
  url: string
}

export interface Ui {
  id: number
  imgPath: string
  name: string
  slug: string
  url: string
}

export interface Plugin {
  id: number
  imgPath: string
  name: string
  slug: string
  url: string
}

export interface NuxtModule {
  id: number
  imgPath: string
  name: string
  slug: string
  url: string
}

export interface Showcase {
  categories: object[] // TODO: are we using it?
  createdAt: string
  description: string,
  domain: string
  favicon: string
  framework: Framework
  frameworkVersion: string
  hasSSR: boolean
  hostname: string
  id: number
  isAdultContent: boolean
  isStatic: boolean
  isFeatured: boolean
  isPublic: boolean
  language: string,
  lastDetectedAt: string
  modules: NuxtModule[]
  position: number
  plugins: Plugin[]
  rank: string
  siteName: string,
  screenshotUrl: string
  slug: string
  title: string,
  url: string // URL?
  ui: Ui
  uiVersion: string
  updatedAt: string
  vueVersion: string
  // views: number
}
