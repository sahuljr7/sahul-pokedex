'use client'

import { useCallback, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  ChevronDown,
  CircleDot,
  Moon,
  Sun,
  Swords,
} from 'lucide-react'
import {
  additionalMegaRaids,
  closingNotes,
  events,
  hundoReference,
  introduction,
  raidResources,
  raidStrategies,
} from '@/lib/diary-data'
import { type SearchHit } from '@/lib/diary-search'
import { ChecklistSection } from '@/components/diary/checklist'
import { ContentBlockView, DataTable } from '@/components/diary/content-block'
import { DiarySearch } from '@/components/diary/diary-search'

function scrollToTarget(targetId: string, focusTarget = false) {
  window.requestAnimationFrame(() => {
    const target = document.getElementById(targetId)
    if (!target) return
    if (target instanceof HTMLDetailsElement) target.open = true
    target.closest('details')?.setAttribute('open', '')
    if (focusTarget) {
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' })
  })
}

function EventTimeline({ onJump }: { onJump: (targetId: string) => void }) {
  return (
    <div className="event-list">
      {events.map((event, index) => (
        <details className="event-entry" id={event.id} key={event.id}>
          <summary className="event-summary">
            <span className="event-summary-copy">
              <span className="event-name">{index + 1}. {event.date} — {event.title}</span>
              {event.subtitle && <span className="event-subtitle">{event.subtitle}</span>}
            </span>
            <ChevronDown size={18} className="event-chevron" aria-hidden="true" />
          </summary>
          <div className="event-content">
            {event.blocks.map((block) => <ContentBlockView block={block} key={block.id} />)}
            <button className="text-link event-return" type="button" onClick={() => onJump('events')}>
              Back to this week <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </details>
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

  const handleSearchSelect = useCallback((hit: SearchHit) => {
    if (hit.target === 'home') setActiveNav('home')
    else if (hit.target === 'cp-reference' || hit.target.startsWith('hundo-row-')) setActiveNav('cp-reference')
    else if (hit.target === 'checklist' || hit.target.startsWith('check-')) setActiveNav('checklist')
    else if (
      events.some((event) => hit.target === event.id || hit.target.startsWith(`${event.id}-`)) ||
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
        <section className="hero-section" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="hero-date">{introduction.dateRange}</p>
            <h1 id="page-title" aria-label={introduction.title}>
  <BookOpen className="hero-title-icon" aria-hidden="true" />
  <span>{introduction.title.replace(/^📖\s/, '')}</span>
  </h1>
            <p className="hero-subtitle">{introduction.paragraphs[0]}</p>
            <a className="hero-link" href="#events" onClick={() => setActiveNav('events')}>
              Explore the week <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-inner" />
            <div className="orbit-core"><CircleDot size={50} strokeWidth={1.2} /></div>
            <span className="orbital-dot orbital-dot-one" />
            <span className="orbital-dot orbital-dot-two" />
            <span className="orbital-dot orbital-dot-three" />
          </div>
        </section>

        <section className="guide-coverage" aria-label="Diary guide topics">
          <p className="guide-introduction">{introduction.paragraphs[1]}</p>
          <div className="coverage-topics">
            {introduction.coverage.map((topic) => <span className="coverage-topic" key={topic}>{topic}</span>)}
          </div>
          <aside className="coverage-note"><p>{introduction.note}</p></aside>
        </section>

        <section className="content-section events-section" id="events" aria-labelledby="events-title">
          <div className="section-heading">
            <div>
              <h2 id="events-title">The event diary</h2>
            </div>
          </div>
          <EventTimeline onJump={handleJump} />
          <AdditionalMegaRaidSection />
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
