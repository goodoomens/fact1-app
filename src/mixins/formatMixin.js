export default {
  methods: {
    getMedalEmoji(position) {
      const medalEmojis = ["🥇", "🥈", "🥉"];
      return medalEmojis[position - 1];
    },
    clearEventName(raceName) {
      return raceName.replace("Grand Prix", "").trim();
    },
    formatDateTime(date, time = null, locale = "de-DE", weekday = false) {
      try {
        let dateTime;

        if (time) {
          dateTime = new Date(`${date} ${time}`);
        } else {
          dateTime = new Date(date);
        }

        const formatOptions = {
          day: "numeric",
          month: "long",
          year: "numeric",
        };

        if (weekday) {
          formatOptions.weekday = "long";
        }

        const formattedDate = new Intl.DateTimeFormat(
          locale,
          formatOptions
        ).format(dateTime);

        if (time) {
          const isEnglishLocale = locale.startsWith("en");
          const formattedTime = new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: isEnglishLocale,
          }).format(dateTime);

          return isEnglishLocale
            ? `${formattedDate}, ${formattedTime}`
            : `${formattedDate}, ${formattedTime} Uhr`;
        } else {
          return formattedDate;
        }
      } catch (error) {
        console.error("Invalid date or time:", date, time);
        return "Invalid date or time";
      }
    },
  },
};
