// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL_API: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
