import React, { createContext, useContext, useState, useEffect } from 'react'
import Loqly from '@loqly/web'

const LoqlyContext = createContext()

export default function LoqlyReact({
  translations = {},
  defaultLocale = 'en',
  children,
}) {
  const [locale, setLocale] = useState(defaultLocale)
  const [loadedTranslations, setLoadedTranslations] = useState(translations)

  useEffect(() => {
    setLoadedTranslations(translations)
  }, [translations])

  const t = (key, payload = null) => {
    const translation = loadedTranslations?.[key]?.[locale]
    if (translation) return Loqly.interpolateTranslation(translation, payload)

    const fallbackTranslation = loadedTranslations?.[key]?.[defaultLocale]
    if (fallbackTranslation)
      return Loqly.interpolateTranslation(fallbackTranslation, payload)

    return Loqly.interpolateTranslation(key, payload)
  }

  const updateLanguage = (newLocale) => {
    setLocale(newLocale)
  }

  return (
    <LoqlyContext.Provider value={{ t, updateLanguage, locale }}>
      {children}
    </LoqlyContext.Provider>
  )
}

export const useLoqly = () => {
  return useContext(LoqlyContext)
}
