const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/** "2026-10-05" -> "October 05, 2026". CSS lowercases the month on the page. */
export function formatDate(day) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(day ?? '')
  if (!match) return ''
  const [, year, month, date] = match
  return `${MONTHS[Number(month) - 1]} ${date}, ${year}`
}
