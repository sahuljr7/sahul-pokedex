'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowRight, BookOpen, ChevronDown, Moon, Sun, Swords } from 'lucide-react'
import {
  additionalMegaRaids,
  closingNotes,
  events,
  hundoReference,
  introduction,
  raidResources,
  raidStrategies,
  type DiaryEvent,
} from '@/lib/diary-data'
import { type SearchHit } from '@/lib/diary-search'
import { eventsForDate, formatLongDate, formatShortDate, todayDateKey } from '@/lib/diary-dates'
import { ChecklistSection } from '@/components/diary/checklist'
import { ContentBlockView, DataTable } from '@/components/diary/content-block'
import { DiarySearch } from '@/components/diary/diary-search'
import { EventCalendar } from '@/components/diary/event-calendar'

function scrollToTarget(targetId: string, focusTarget = false) {
  window.requestAnimationFrame(() => {
    const target = document.getElementById(targetId)
    if (!target) return
    if (target instanceof HTMLDetailsElement) target.open = true
    // Open every collapsed ancestor, so archive entries reached from search are visible.
    let details = target.closest('details')
    while (details) {
      details.open = true
      details = details.parentElement?.closest('details') ?? null
    }
    if (focusTarget) {
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' })
  })
}

function EventEntry({
  event,
  index,
  defaultOpen = false,
  onJump,
  idPrefix = '',
}: {
  event: DiaryEvent
  index?: number
  defaultOpen?: boolean
  onJump?: (targetId: string) => void
  idPrefix?: string
}) {
  return (
    <details className="event-entry" id={`${idPrefix}${event.id}`} open={defaultOpen || undefined}>
      <summary className="event-summary">
        <span className="event-summary-copy">
          <span className="event-name">
            {index === undefined ? event.title : `${index + 1}. ${event.date} — ${event.title}`}
          </span>
          {event.subtitle && <span className="event-subtitle">{event.subtitle}</span>}
        </span>
        <ChevronDown size={18} className="event-chevron" aria-hidden="true" />
      </summary>
      <div className="event-content">
        {event.blocks.map((block) => <ContentBlockView block={block} key={block.id} idPrefix={idPrefix} />)}
        {onJump && (
          <button className="text-link event-return" type="button" onClick={() => onJump('events')}>
            Back to the calendar <ArrowRight size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    </details>
  )
}

function EventList({
  dayEvents,
  defaultOpen = false,
  emptyMessage,
  emptyHint,
  onJump,
  idPrefix = '',
}: {
  dayEvents: DiaryEvent[]
  defaultOpen?: boolean
  emptyMessage: string
  emptyHint?: string
  onJump?: (targetId: string) => void
  idPrefix?: string
}) {
  if (dayEvents.length === 0) {
    return (
      <div className="daily-empty" role="status">
        <strong>{emptyMessage}</strong>
        {emptyHint && <span>{emptyHint}</span>}
      </div>
    )
  }

  return (
    <div className="event-list">
      {dayEvents.map((event) => (
        <EventEntry event={event} key={event.id} defaultOpen={defaultOpen} onJump={onJump} idPrefix={idPrefix} />
      ))}
    </div>
  )
}

function EventTimeline({ onJump }: { onJump: (targetId: string) => void }) {
  return (
    <div className="event-list">
      {events.map((event, index) => (
        <EventEntry event={event} index={index} key={event.id} onJump={onJump} />
      ))}
    </div>
  )
}

function AdditionalMegaRaidSection() {
  const cpRows = additionalMegaRaids.raids.map((raid) => [raid.pokemon.replace('Mega ', ''), raid.normal, raid.boosted])

  return (
    <details className="event-entry additional-raids" id={additionalMegaRaids.id}>
      <summary className="event-summary">
        <span className="event-summary-copy">
          <span className="event-name">{additionalMegaRaids.title}</span>
        </span>
        <ChevronDown size={18} className="event-chevron" aria-hidden="true" />
      </summary>
      <div className="event-content">
        <section className="detail-block" id="additional-mega-raid-bosses">
          {additionalMegaRaids.intro.map((paragraph) => <p className="detail-lead" key={paragraph}>{paragraph}</p>)}
          <DataTable
            columns={['Raid boss', 'Weaknesses', 'Best counters']}
            rows={additionalMegaRaids.raids.map((raid) => [raid.pokemon, raid.weaknesses, raid.bestCounters])}
            rowIds={additionalMegaRaids.raids.map((raid) => `mega-raid-${raid.pokemon.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
          />
          <p className="source-notes">{additionalMegaRaids.sources.map((source, index) => <span key={`${source}-${index}`}>{source}</span>)}</p>
        </section>
        <section className="detail-block" id="additional-mega-movesets">
          <div className="detail-heading"><h3>Recommended movesets</h3></div>
          <ul className="detail-list">
            {additionalMegaRaids.raids.map((raid) => (
              <li id={`mega-moveset-${raid.pokemon.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={raid.pokemon}>
                <span>{raid.pokemon}: {raid.moveset}</span>
                <span className="moveset-source">{raid.source}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="detail-block" id="additional-mega-cp">
          <div className="detail-heading"><h3>Hundo CP cheat sheet for these four raids</h3></div>
          <DataTable
            columns={['Pokémon caught', 'Normal weather', 'Weather boosted']}
            rows={cpRows}
            rowIds={additionalMegaRaids.raids.map((raid) => `mega-cp-${raid.pokemon.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
          />
          <p className="source-notes">{additionalMegaRaids.sources.filter((source) => source.includes('Database')).map((source, index) => <span key={`${source}-${index}`}>{source}</span>)}</p>
        </section>
      </div>
    </details>
  )
}

function HundoReference() {
  return (
    <section className="content-section hundo-section" id="cp-reference" aria-labelledby="hundo-title">
      <div className="section-heading">
        <div>
          <h2 id="hundo-title">{hundoReference.title}</h2>
          <p className="section-description">{hundoReference.intro}</p>
        </div>
      </div>

      <div className="reference-surface">
        <DataTable
          columns={['Pokémon', 'Normal', 'Weather boosted']}
          rows={hundoReference.rows}
          rowIds={hundoReference.rows.map((row) => `hundo-row-${row[0].toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
        />
      </div>
      <div className="reference-notes">
        {hundoReference.notes.map((note, index) => <p key={`hundo-note-${index}`}>{note}</p>)}
        <p className="source-notes">{hundoReference.sources.map((source) => <span key={source}>{source}</span>)}</p>
      </div>
    </section>
  )
}

export function DiaryApp() {
  const [isDark, setIsDark] = useState(false)
  const [activeNav, setActiveNav] = useState('home')
  const [today, setToday] = useState(() => todayDateKey())
  const [selectedDate, setSelectedDate] = useState(() => todayDateKey())

  // Re-read the browser's local date after mount so the daily view always
  // follows the visitor's timezone, not the server's.
  useEffect(() => {
    const localToday = todayDateKey()
    setToday(localToday)
    setSelectedDate(localToday)
  }, [])

  const todayEvents = useMemo(() => eventsForDate(events, today), [today])
  const selectedEvents = useMemo(() => eventsForDate(events, selectedDate), [selectedDate])
  const isTodaySelected = selectedDate === today

  const handleSearchSelect = useCallback((hit: SearchHit) => {
    const hitEvent = events.find((event) =>
      hit.target === event.id ||
      hit.target.startsWith(`${event.id}-`) ||
      (hit.blockId ? event.blocks.some((block) => block.id === hit.blockId) : false) ||
      event.blocks.some((block) => hit.target === block.id || hit.target.startsWith(`${block.id}-`)),
    )
    if (hitEvent) setSelectedDate(hitEvent.startDate)

    if (hit.target === 'home') setActiveNav('home')
    else if (hit.target === 'cp-reference' || hit.target.startsWith('hundo-row-')) setActiveNav('cp-reference')
    else if (hit.target === 'checklist' || hit.target.startsWith('check-')) setActiveNav('checklist')
    else if (
      hitEvent ||
      hit.target === additionalMegaRaids.id ||
      hit.target.startsWith(`${additionalMegaRaids.id}-`) ||
      hit.target.startsWith('additional-mega-') ||
      hit.target.startsWith('mega-raid-') ||
      hit.target.startsWith('mega-moveset-') ||
      hit.target.startsWith('mega-cp-')
    ) setActiveNav('events')
    else setActiveNav('')
    scrollToTarget(hit.target, true)
  }, [])

  const handleThemeToggle = () => {
    setIsDark((current) => {
      const next = !current
      document.documentElement.dataset.theme = next ? 'dark' : 'light'
      return next
    })
  }

  const handleJump = useCallback((targetId: string) => {
    setActiveNav(targetId)
    scrollToTarget(targetId)
  }, [])

  return (
    <main className="diary-shell" id="home">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#home" aria-label={`${introduction.title} home`} onClick={() => setActiveNav('home')}>
          <span className="brand-mark"><BookOpen size={18} aria-hidden="true" /></span>
          <span className="brand-copy"><strong>{introduction.title.replace(/^📖\s/, '')}</strong></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {[
            { id: 'home', label: 'Overview' },
            { id: 'events', label: 'Event diary' },
            { id: 'checklist', label: 'Checklist' },
            { id: 'cp-reference', label: 'Hundo CP' },
            { id: 'type-chart', label: 'Type chart', href: '/type-chart' },
            { id: 'dual-type-chart', label: 'Dual types', href: '/dual-type-chart' },
            { id: 'kanto-weaknesses', label: 'Kanto', href: '/kanto-weaknesses' },
          ].map((item) => (
            <a
              href={'href' in item ? item.href : `#${item.id}`}
              key={item.id}
              className={activeNav === item.id ? 'active' : ''}
              onClick={() => setActiveNav(item.id)}
            >{item.label}</a>
          ))}
        </nav>
        <div className="topbar-actions">
          <DiarySearch onSelect={handleSearchSelect} />
          <button type="button" className="theme-toggle glass-control" onClick={handleThemeToggle} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div className="page-frame">
        <section className="daily-view" aria-labelledby="daily-title">
          <p className="hero-eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Daily view</p>
          <h1 className="daily-date" id="daily-title" suppressHydrationWarning>{formatLongDate(today)}</h1>
          <p className="daily-subtitle" suppressHydrationWarning>{introduction.paragraphs[0]}</p>
        </section>

        <section className="content-section daily-events" aria-labelledby="today-events-title">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">Today&apos;s events</p>
              <h2 id="today-events-title" suppressHydrationWarning>Events for {formatShortDate(today)}</h2>
            </div>
          </div>
          <EventList
            dayEvents={todayEvents}
            defaultOpen
            onJump={handleJump}
            idPrefix="today-"
            emptyMessage="No Pokémon GO events scheduled for today."
            emptyHint="Choose another date in the calendar below to see this week's events."
          />
        </section>

        <section className="content-section calendar-section" id="events" aria-labelledby="calendar-title">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">Explore by date</p>
              <h2 id="calendar-title">Event calendar</h2>
              <p className="section-description">
                Today&apos;s events stay at the top of the page. Pick any other day here to look back or ahead.
              </p>
            </div>
          </div>

          <EventCalendar
            events={events}
            selectedDate={selectedDate}
            today={today}
            onSelect={setSelectedDate}
          />

          {!isTodaySelected && (
            <section className="selected-date-panel" aria-labelledby="selected-date-title">
              <div className="selected-date-heading">
                <h3 id="selected-date-title" suppressHydrationWarning>Selected date: {formatShortDate(selectedDate)}</h3>
                <button type="button" className="quiet-button reset-button" onClick={() => setSelectedDate(today)}>
                  Back to today
                </button>
              </div>
              <p className="selected-date-note">Only events for the selected date are shown.</p>
              <EventList
                dayEvents={selectedEvents}
                defaultOpen
                idPrefix="selected-"
                emptyMessage="No Pokémon GO events scheduled for this date."
                emptyHint="Dates with a dot in the calendar have event information."
              />
            </section>
          )}

          <details className="archive-details" id="event-archive">
            <summary className="archive-summary">
              <span className="archive-copy">
                <span className="section-eyebrow">Event diary</span>
                <span className="archive-title">Full event archive</span>
                <span className="section-description">Every event in this diary, in order. Search results open here automatically.</span>
              </span>
              <ChevronDown size={18} className="archive-chevron" aria-hidden="true" />
            </summary>
            <div className="archive-body">
              <EventTimeline onJump={handleJump} />
              <AdditionalMegaRaidSection />
            </div>
          </details>
        </section>

        <ChecklistSection />
        <HundoReference />

        <section className="content-section closing-section" id="raid-strategies" aria-labelledby="strategies-title">
          <div className="section-heading">
            <div>
              <h2 id="strategies-title">{raidStrategies.title}</h2>
            </div>
          </div>
          <ol className="strategy-list">
            {raidStrategies.items.map((item, index) => (
              <li id={`strategy-${index}`} key={item}>
                <span className="strategy-number">{index + 1}.</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>

          <div className="resources-section" id="raid-resources">
            <div>
              <h3>{raidResources.title}</h3>
              <p className="section-description">{raidResources.intro}</p>
            </div>
            <ul className="resource-list">
              {raidResources.items.map((item, index) => (
                <li id={`resource-${index}`} key={item}><span>{item}</span></li>
              ))}
            </ul>
          </div>

          <div className="final-notes">
            {closingNotes.map((note, index) => (
              <p id={`closing-note-${index}`} key={`closing-${index}`} aria-label={note}>
                {note.endsWith(' ⚔️') ? <>{note.slice(0, -3)}<Swords className="closing-note-icon" aria-hidden="true" /></> : note}
              </p>
            ))}
          </div>
        </section>

        <footer className="page-footer">
          <a href="#home" onClick={() => setActiveNav('home')}>Back to top <ArrowRight size={13} aria-hidden="true" /></a>
        </footer>
      </div>
    </main>
  )
}
