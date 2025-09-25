# loqly-react

**loqly-react** is a JavaScript package that makes it easy to integrate [loqly](https://loqly.dev) for internationalization and copy management in your React projects.

For detailed documentation and guides, visit the [loqly documentation](https://loqly.dev/documentation).

## Installation

Install via npm

```bash
npm install @loqly/react
```

Include via script tag

```html
<script src="https://unpkg.com/@loqly/react/dist/index.umd.js"></script>
```

## Setup

In your main.jsx, import **LoqlyReact** and wrap your App.

```js
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoqlyReact, { getTranslations } from '@loqly/react'

const translations = await getTranslation('your-loqly-api-key')

createRoot(document.getElementById('root')).render(
  <LoqlyReact translations={translations} defaultLocale='en'>
    <App />
  </LoqlyReact>
)
```

If you pass a translations object to the plugin, loqly will not fetch translations remotely. Your translations should be structured like this:

```js
const translations = {
  'auth.btn.login': {
    en: 'Login',
    de: 'Anmelden',
  },
  error_404: {
    en: 'Page not found.',
    de: 'Seite konnte nicht gefunden werden.',
  },
}
```

## Usage

### Translating text

You can access the translation function t anywhere inside your app using the useLoqly hook:

```js
import { useLoqly } from '@loqly/react'

function MyButton() {
  const { t } = useLoqly()

  return <button>{t('auth.btn.login')}</button>
}
```

### Updating the language

To change the current language, call updateLanguage from the hook:

```js
import { useLoqly } from '@loqly/react'

function LanguageSwitcher() {
  const { updateLanguage } = useLoqly()

  return (
    <>
      <button onClick={() => updateLanguage('de')}>German</button>
      <button onClick={() => updateLanguage('en')}>English</button>
    </>
  )
}
```

### Fetching translations manually

If you want to fetch translations directly (without using the provider), you can use the utility function getTranslations:

```js
import { useState, useEffect } from 'react'
import { getTranslations } from '@loqly/react'

function CustomLoader() {
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    const loadTranslations = async () => {
      const res = await getTranslations('your-loqly-api-key')
      setTranslations(res)
    }
    loadTranslations()
  }, [])

  return <pre>{JSON.stringify(translations, null, 2)}</pre>
}
```
