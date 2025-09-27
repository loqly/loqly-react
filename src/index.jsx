// General JS functionality
import Loqly from '@loqly/web'
const getTranslations = Loqly.getTranslations
export { getTranslations }

// React Specific functionality
import LoqlyReact, { useLoqly } from './lib/LoqlyReact'
export default LoqlyReact
export { useLoqly }
