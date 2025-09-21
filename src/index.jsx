import React, { createContext, useContext, useState, useEffect } from 'react'
import Loqly from '@loqly/web'

const LoqlyContext = createContext()

export default function LoqlyReact({
  apiKey = '',
  translations = {},
  defaultLocale = 'en',
  children,
}) {
  const [locale, setLocale] = useState(defaultLocale)
  const [loadedTranslations, setLoadedTranslations] = useState(translations)

  useEffect(() => {
    if (apiKey && Object.keys(translations).length === 0) {
      Loqly.getTranslations(apiKey).then((fetched) => {
        setLoadedTranslations(fetched)
      })
    }
  }, [apiKey])

  const t = (key) => {
    return loadedTranslations?.[key]?.[locale] ?? key
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

export const getTranslations = async (apiKey) => {
  return await Loqly.getTranslations(apiKey)
}
