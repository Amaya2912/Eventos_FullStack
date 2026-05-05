type EventDateTime = {
  date: string;
  time: string;
};

function parseLocalDateTime(value: string) {
  const [datePart, timePart = ""] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour = 0, minute = 0] = timePart.split(":").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day, hour, minute);
}

export function formatEventDateTime(value: string): EventDateTime {
  const date = parseLocalDateTime(value);

  if (!date) {
    return {
      date: value,
      time: "",
    };
  }

  return {
    date: new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("es-CO", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date),
  };
}

export function formatEventDateTimeText(value: string) {
  const formatted = formatEventDateTime(value);

  if (!formatted.time) {
    return formatted.date;
  }

  return `${formatted.date} - ${formatted.time}`;
}

export function toEventFormDateTime(value: string) {
  const [date = "", timeWithSeconds = ""] = value.split("T");
  const time = timeWithSeconds.slice(0, 5);

  return {
    date,
    time,
  };
}
