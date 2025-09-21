import * as React from 'react'

export interface LoqlyProviderProps {
  apiKey?: string
  translations?: Record<string, Record<string, string>>
  defaultLocale?: string
  children: React.ReactNode
}

export interface LoqlyContextValue {
  t: (key: string) => string
  updateLanguage: (locale: string) => void
  locale: string
}

export declare const LoqlyProvider: React.FC<LoqlyProviderProps>

export declare const useLoqly: () => LoqlyContextValue

export declare const translate: (key: string) => string

export declare const getTranslations: (
  apiKey: string
) => Promise<Record<string, Record<string, string>>>
