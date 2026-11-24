'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Moon, Search, Sun, Swords } from 'lucide-react'
import { introduction } from '@/lib/diary-data'
import {
  dualTypeCombinationCount,
  dualTypeGroups,
  dualTypeRaidExamples,
  dualTypeSources,
} from '@/lib/dual-type-chart-data'

function DualTypeHeader({ isDark, onThemeToggle }: { isDark: boolean; onThemeToggle: () => void }) {
  return (
    <header className="topbar type-chart-topbar">
      <a className="brand" href="/" aria-label={`${introduction.title.replace(/^📖\s/, '')} home`}>
        <span className="brand-mark"><BookOpen size={18} aria-hidden="true" /></span>
        <span className="brand-copy"><strong>{introduction.title.replace(/^📖\s/, '')}</strong></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/">Diary</a>
        <a href="/type-chart">Type chart</a>
        <a className="active" href="/dual-type-chart" aria-current="page">Dual types</a>
      </nav>
      <div className="topbar-actions">
        <button
          type="button"
          className="theme-toggle glass-control"
          onClick={onThemeToggle}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}

function WeaknessTags({ types, emphasis = false }: { types: string[]; emphasis?: boolean }) {
  if (types.length === 0) return <span className="dual-type-no-weakness">None listed</span>

  return (
    <ul className={`dual-type-tags${emphasis ? ' emphasized' : ''}`} aria-label={types.join(', ')}>
      {types.map((type) => <li key={type}>{type}</li>)}
    </ul>
  )
}

function DualTypeChart() {
  const [query, setQuery] = useState('')
  const [doubleOnly, setDoubleOnly] = useState(false)

  const visibleGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()

    return dualTypeGroups
      .map((group) => ({
        ...group,
        rows: group.rows.filter((row) => {
          if (doubleOnly && row.doubleWeaknesses.length === 0) return false
          if (!normalizedQuery) return true
          const searchable = [
            row.combination,
            ...row.weaknesses,
            ...row.doubleWeaknesses,
          ].join(' ').toLocaleLowerCase()
          return searchable.includes(normalizedQuery)
        }),
      }))
      .filter((group) => group.rows.length > 0)
  }, [doubleOnly, query])

  const visibleCount = visibleGroups.reduce((total, group) => total + group.rows.length, 0)

  return (
    <section className="content-section type-chart-section dual-type-section" id="dual-type-combinations" aria-labelledby="dual-type-combinations-title">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow"><span className="eyebrow-dot" aria-hidden="true" />THE COMPLETE MATCHUP LIST</p>
          <h2 id="dual-type-combinations-title">All {dualTypeCombinationCount} dual-type pairings</h2>
          <p className="section-description">Search any pairing or attacking type, or narrow the list to combinations with a double weakness.</p>
        </div>
      </div>

      <div className="dual-type-toolbar">
        <label className="dual-type-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search type pairs or attacking types</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a type or pairing"
          />
        </label>
        <div className="dual-type-filter" role="group" aria-label="Filter dual-type combinations">
          <button type="button" aria-pressed={!doubleOnly} onClick={() => setDoubleOnly(false)}>All pairs</button>
          <button type="button" aria-pressed={doubleOnly} onClick={() => setDoubleOnly(true)}>Double weak</button>
        </div>
        <p className="dual-type-result-count" aria-live="polite">Showing <strong>{visibleCount}</strong> of {dualTypeCombinationCount}</p>
      </div>

      {visibleCount > 0 ? (
        <div className="reference-surface dual-type-surface">
          <div className="table-scroll dual-type-table-scroll" role="region" aria-label="Dual-type weakness chart" tabIndex={0}>
            <table className="diary-table dual-type-table">
              <thead>
                <tr>
                  <th scope="col">Defending Pokémon types</th>
                  <th scope="col">Weaknesses · 1.6×</th>
                  <th scope="col">Double weaknesses · 2.56×</th>
                </tr>
              </thead>
              {visibleGroups.map((group) => (
                <tbody key={group.primary}>
                  <tr className="dual-type-group-heading">
                    <th scope="rowgroup" colSpan={3}>
                      {group.primary} as the first type{' '}
                      <span>{group.rows.length} {group.rows.length === 1 ? 'pairing' : 'pairings'}</span>
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.combination}>
                      <th scope="row">{row.combination}</th>
                      <td><WeaknessTags types={row.weaknesses} /></td>
                      <td><WeaknessTags types={row.doubleWeaknesses} emphasis /></td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      ) : (
        <p className="dual-type-empty" role="status">No combinations match that search. Try another type name.</p>
      )}
      <p className="type-chart-source-note">These are theoretical pairings of two different types. “None listed” means no super-effective attack appears at that multiplier; a weakness canceled by the other type&apos;s resistance is not shown. Pokémon GO treats type immunities as strong resistances rather than zero damage. Pairings are listed alphabetically, so Fairy has no remaining unique combination.</p>
    </section>
  )
}

function RaidExamples() {
  return (
    <section className="content-section type-chart-section dual-type-examples" aria-labelledby="dual-type-examples-title">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow"><span className="eyebrow-dot" aria-hidden="true" />RAID COUNTER SHORTLIST</p>
          <h2 id="dual-type-examples-title">Double weaknesses to remember</h2>
          <p className="section-description">These familiar raid bosses are especially vulnerable to one attack type.</p>
        </div>
      </div>
      <div className="reference-surface dual-type-examples-surface">
        <div className="table-scroll" role="region" aria-label="Pokémon double weakness examples" tabIndex={0}>
          <table className="diary-table dual-type-examples-table">
            <thead>
              <tr><th scope="col">Pokémon</th><th scope="col">Type combination</th><th scope="col">Double weak to</th></tr>
            </thead>
            <tbody>
              {dualTypeRaidExamples.map((example) => (
                <tr key={example.pokemon}>
                  <th scope="row">{example.pokemon}</th>
                  <td>{example.combination}</td>
                  <td>{example.weaknesses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export function DualTypeChartPage() {
  const [isDark, setIsDark] = useState(false)

  const handleThemeToggle = () => {
    setIsDark((current) => {
      const next = !current
      document.documentElement.dataset.theme = next ? 'dark' : 'light'
      return next
    })
  }

  return (
    <main className="diary-shell type-chart-shell dual-type-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <DualTypeHeader isDark={isDark} onThemeToggle={handleThemeToggle} />

      <div className="page-frame">
        <section className="hero-section type-chart-hero dual-type-hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="hero-date">POKÉMON GO · DUAL-TYPE REFERENCE</p>
            <h1 id="page-title"><Swords className="hero-title-icon" aria-hidden="true" /><span>Dual-type weaknesses</span></h1>
            <p className="hero-subtitle">A complete reference for every two-type combination, with single and double weaknesses clearly separated.</p>
            <a className="hero-link" href="#dual-type-combinations">Explore all {dualTypeCombinationCount} pairings <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <aside className="type-chart-summary" aria-label="Dual-type chart summary">
            <div className="type-chart-summary-stat"><strong>{dualTypeCombinationCount}</strong><span>type pairings</span></div>
            <div className="type-chart-summary-stat"><strong>18</strong><span>Pokémon types</span></div>
            <div className="type-chart-summary-stat"><strong>2.56×</strong><span>double weakness</span></div>
            <p className="type-chart-summary-note">Search by defending pair or by the attack type to use.</p>
          </aside>
        </section>

        <DualTypeChart />
        <RaidExamples />

        <section className="dual-type-reference" aria-labelledby="dual-type-reference-title">
          <h2 id="dual-type-reference-title">Reference links</h2>
          <ul>
            {dualTypeSources.map((source) => (
              <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}<span className="sr-only"> (opens in a new tab)</span></a></li>
            ))}
          </ul>
          <p>Multipliers shown here are for Pokémon GO: single weaknesses deal 1.6× damage and double weaknesses deal 2.56× damage. The tables describe defensive weaknesses, not attack strength.</p>
        </section>

        <footer className="page-footer type-chart-footer">
          <a href="/type-chart">Back to the single-type chart <ArrowRight size={13} aria-hidden="true" /></a>
          <a href="/">Back to the event diary <ArrowRight size={13} aria-hidden="true" /></a>
        </footer>
      </div>
    </main>
  )
}
