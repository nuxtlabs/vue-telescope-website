export * from './showcase'
export * from './user'
export * from './list'
export * from './group'

declare global {
  interface Window {
    $vueTelemetryExtension: any,
    $vueTelescopeExtension: any,
    fathom: any
  }
}
