import de from './src/de'
import en from './src/en'

export default {
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: { de, en }
}
