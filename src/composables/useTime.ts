const localeMap = {
    'en': 'en-US',
    'de': 'de-DE'
}

type Options = {
    long?: boolean
    weekdayShort?: boolean
    monthLong?: boolean
    dateOnly?: boolean
}

export default (locale: keyof typeof localeMap = 'en') => {
    const format = (date: string, time: string, options: Options = {
        long: false,
        weekdayShort: false,
        monthLong: false,
        dateOnly: false
    }) => {
        const d = new Date(`${ date }T${ time }`)

        const dateOptions: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: options.monthLong ? 'long' : '2-digit',
            year: '2-digit'
        }

        if (options.long) dateOptions.weekday = options.weekdayShort ? 'short' : 'long'

        const datePart = new Intl.DateTimeFormat(localeMap[locale] || 'en-US', dateOptions).format(d)

        const timePart = d.toLocaleTimeString(localeMap[locale] || 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: locale === 'en'
        })

        if (options.dateOnly) return datePart

        return locale === 'de'
            ? `${ datePart } // ${ timePart } Uhr`
            : `${ datePart } // ${ timePart }`
    }

    return {
        format
    }
}
