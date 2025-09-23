import type { Locale } from '@/models'

import de_flag from '@/assets/flags/de.svg'
import en_flag from '@/assets/flags/uk.svg'
import nl_flag from '@/assets/flags/nl.svg'

export const languages = [
  {
    image: en_flag,
    locale: 'en' as Locale
  },
  {
    image: de_flag,
    locale: 'de' as Locale
  },
  {
    image: nl_flag,
    locale: 'nl' as Locale
  }
]