'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import type { DiaryEvent } from '@/lib/diary-data'
import {
  eventDateKeys,
  formatLongDate,
  formatMonthTitle,
  parseDateKey,
} from '@/lib/diary-dates'

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

type CalendarView = {
  year: number
  month: number
}

function viewFor(dateKey: string): CalendarView {
  const date = parseDateKey(dateKey)
  return { year: date.getFullYear(), month: date.getMonth() }
}

export function EventCalendar({
  events,
  selectedDate,
  today,
  onSelect,
}: {
  events: DiaryEvent[]
  selectedDate: string
  today: string
  onSelect: (dateKey: string) => void
}) {
  const [view, setView] = useState<CalendarView>(() => viewFor(selectedDate))
  const markedDates = useMemo(() => eventDateKeys(events), [events])

  // Keep the visible month in step whenever the selection changes elsewhere
  // (the Today button, a search result, or the initial mount).
  useEffect(() => {
    setView(viewFor(selectedDate))
  }, [selectedDate])

  const monthTitle = formatMonthTitle(view.year, view.month)
  const firstWeekday = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ]

  function changeMonth(offset: number) {
    const next = new Date(view.year, view.month + offset, 1, 12)
    setView({ year: next.getFullYear(), month: next.getMonth() })
  }

  function goToToday() {
    setView(viewFor(today))
    onSelect(today)
  }

  return (
    <div className="calendar-card">
      <div className="calendar-toolbar">
        <p className="calendar-title">
          <CalendarDays size={17} aria-hidden="true" />
          <span>{monthTitle}</span>
        </p>
        <div className="calendar-controls">
          <button
            type="button"
            className="calendar-nav"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button type="button" className="calendar-today" onClick={goToToday}>
            Today
          </button>
          <button
            type="button"
            className="calendar-nav"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="calendar-weekdays" aria-hidden="true">
        {WEEKDAY_LABELS.map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>

      <div className="calendar-grid" role="group" aria-label={`${monthTitle} calendar`}>
        {cells.map((day, index) => {
          if (day === null) {
            return <span className="calendar-cell is-empty" key={`empty-${index}`} aria-hidden="true" />
          }

          const dateKey = `${view.year}-${String(view.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isToday = dateKey === today
          const isSelected = dateKey === selectedDate
          const hasEvents = markedDates.has(dateKey)
          const classNames = [
            'calendar-cell',
            isToday ? 'is-today' : '',
            isSelected ? 'is-selected' : '',
            hasEvents ? 'has-events' : '',
          ].filter(Boolean).join(' ')

          return (
            <button
              type="button"
              key={dateKey}
              className={classNames}
              onClick={() => onSelect(dateKey)}
              aria-label={`${formatLongDate(dateKey)}${hasEvents ? ', Pokémon GO events' : ''}`}
              aria-current={isToday ? 'date' : undefined}
              aria-pressed={isSelected}
            >
              <span>{day}</span>
              {hasEvents && <span className="calendar-dot" aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      <p className="calendar-legend">
        <span className="legend-item"><span className="legend-swatch legend-swatch-today" aria-hidden="true" />Today</span>
        <span className="legend-item"><span className="legend-swatch legend-swatch-event" aria-hidden="true" />Has event data</span>
      </p>
    </div>
  )
}
