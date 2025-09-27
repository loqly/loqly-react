# loqly-react

**loqly-react** is a JavaScript package that makes it easy to integrate [loqly](https://loqly.dev) for internationalization and copy management in your React projects.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Translating in Components](#translating-in-components)
- [Interpolation](#interpolation)
- [Updating the Langugae](#updating-the-language)

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

In your main.jsx, import **LoqlyReact** and wrap your App:

```js
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoqlyReact, { getTranslations } from '@loqly/react'
import fallback from './translations.json'

const translations = await getTranslation(
  'your-loqly-api-key',

  // Optional configuration
  {
    projectIds: ['website'],
    namespaces: ['auth', 'error'],
    languages: ['en', 'de'],
  },
  fallback
)

createRoot(document.getElementById('root')).render(
  <LoqlyReact translations={translations} defaultLocale='en'>
    <App />
  </LoqlyReact>
)
```

If you pass a fallback object to the plugin, your translations should be structured like this:

```json
{
  "auth.btn.login": {
    "en": "Login",
    "de": "Anmelden"
  },
  "error_404": {
    "en": "Page not found.",
    "de": "Seite konnte nicht gefunden werden."
  }
}
```

## Translating in Components

You can access the translation function t anywhere inside your app using the useLoqly hook:

```js
import { useLoqly } from '@loqly/react'

function MyButton() {
  const { t } = useLoqly()

  return <button>{t('auth.btn.login')}</button>
}
```

## Interpolation

You can easily insert dynamic content into your translations using our string interpolation functionality:

```js
<h2>
  {t('User {user} has {count} new notifications', {
    user: 'Alice',
    count: 3,
  })}
</h2>
```

This will render as:

```html
<h2>User Alice has 3 new notifications</h2>
```

## Updating the language

To change the current language, call updateLanguage from the hook:

```js
import { useLoqly } from '@loqly/react'

function LanguageSwitcher() {
  const { updateLanguage } = useLoqly()

  return (
    <>
      <button onClick={() => updateLanguage('en')}>English</button>
      <button onClick={() => updateLanguage('de')}>German</button>
    </>
  )
}
```
