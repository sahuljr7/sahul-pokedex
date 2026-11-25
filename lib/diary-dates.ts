import type { DiaryEvent } from '@/lib/diary-data'

/**
 * Calendar dates are handled as local `YYYY-MM-DD` keys. Building them from
 * local getters (instead of toISOString) keeps an event on the day the user
 * actually sees in their own timezone.
 */
export function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayDateKey(): string {
  return toDateKey(new Date())
}

/** Local noon avoids DST shifts moving the date when it is formatted or advanced. */
export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day, 12)
}

export function addDays(key: string, amount: number): string {
  const date = parseDateKey(key)
  date.setDate(date.getDate() + amount)
  return toDateKey(date)
}

export function formatDateKey(key: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(undefined, options).format(parseDateKey(key))
}

export function formatLongDate(key: string): string {
  return formatDateKey(key, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatShortDate(key: string): string {
  return formatDateKey(key, { day: 'numeric', month: 'long' })
}

export function formatMonthTitle(year: number, month: number): string {
  return new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' })
    .format(new Date(year, month, 1, 12))
}

/** Events whose startDate–endDate range covers the given day. */
export function eventsForDate(allEvents: DiaryEvent[], dateKey: string): DiaryEvent[] {
  return allEvents.filter((event) => dateKey >= event.startDate && dateKey <= event.endDate)
}

/** Every day covered by any event, used for the calendar's event indicators. */
export function eventDateKeys(allEvents: DiaryEvent[]): Set<string> {
  const keys = new Set<string>()

  for (const event of allEvents) {
    if (!event.startDate || !event.endDate || event.endDate < event.startDate) continue
    let cursor = event.startDate
    let guard = 0
    while (cursor <= event.endDate && guard < 400) {
      keys.add(cursor)
      cursor = addDays(cursor, 1)
      guard += 1
    }
  }

  return keys
}
