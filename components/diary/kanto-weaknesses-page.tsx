'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Moon, Search, Sun, Swords } from 'lucide-react'
import { introduction } from '@/lib/diary-data'
import { damageMultipliers, kantoPokemonWeaknesses, kantoWeaknessSources } from '@/lib/kanto-weaknesses-data'

function KantoHeader({ isDark, onThemeToggle }: { isDark: boolean; onThemeToggle: () => void }) {
  return (
    <header className="topbar type-chart-topbar">
      <a className="brand" href="/" aria-label={`${introduction.title.replace(/^📖\s/, '')} home`}>
        <span className="brand-mark"><BookOpen size={18} aria-hidden="true" /></span>
        <span className="brand-copy"><strong>{introduction.title.replace(/^📖\s/, '')}</strong></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/">Diary</a>
        <a href="/type-chart">Type chart</a>
        <a href="/dual-type-chart">Dual types</a>
        <a className="active" href="/kanto-weaknesses" aria-current="page">Kanto</a>
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

function TypeTags({ types, emphasized = false }: { types: string[]; emphasized?: boolean }) {
  if (types.length === 0) return <span className="dual-type-no-weakness">—</span>

  return (
    <ul className={`dual-type-tags${emphasized ? ' emphasized' : ''}`} aria-label={types.join(', ')}>
      {types.map((type) => <li key={type}>{type}</li>)}
    </ul>
  )
}

function MultiplierGuide() {
  return (
    <section className="kanto-multiplier-section" aria-labelledby="kanto-multipliers-title">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow"><span className="eyebrow-dot" aria-hidden="true" />DAMAGE MULTIPLIERS</p>
          <h2 id="kanto-multipliers-title">How much damage?</h2>
          <p className="section-description">Pokémon GO combines a Pokémon&apos;s types before calculating the final damage multiplier.</p>
        </div>
      </div>
      <div className="kanto-multiplier-grid">
        {damageMultipliers.map((multiplier) => (
          <article className="kanto-multiplier-card" key={multiplier.value}>
            <strong>{multiplier.value}</strong>
            <span>{multiplier.meaning}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function KantoWeaknessTable() {
  const [query, setQuery] = useState('')
  const [doubleOnly, setDoubleOnly] = useState(false)

  const visiblePokemon = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()

    return kantoPokemonWeaknesses.filter((pokemon) => {
      if (doubleOnly && pokemon.doubleWeaknesses.length === 0) return false
      if (!normalizedQuery) return true
      const searchable = [
        pokemon.pokemon,
        ...pokemon.types,
        ...pokemon.weaknesses,
        ...pokemon.doubleWeaknesses,
      ].join(' ').toLocaleLowerCase()
      return searchable.includes(normalizedQuery)
    })
  }, [doubleOnly, query])

  const doubleWeakCount = kantoPokemonWeaknesses.filter((pokemon) => pokemon.doubleWeaknesses.length > 0).length

  return (
    <section className="content-section type-chart-section kanto-weakness-section" id="kanto-weaknesses" aria-labelledby="kanto-weaknesses-title">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow"><span className="eyebrow-dot" aria-hidden="true" />GENERATION 1 · KANTO</p>
          <h2 id="kanto-weaknesses-title">Pokémon and their weaknesses</h2>
          <p className="section-description">Search by Pokémon, defensive type, or a type to use as an attack. Double weaknesses are called out separately.</p>
        </div>
      </div>

      <div className="dual-type-toolbar kanto-toolbar">
        <label className="dual-type-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search Kanto Pokémon, types, or weaknesses</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Pokémon or type"
          />
        </label>
        <div className="dual-type-filter" role="group" aria-label="Filter Kanto Pokémon">
          <button type="button" aria-pressed={!doubleOnly} onClick={() => setDoubleOnly(false)}>All entries</button>
          <button type="button" aria-pressed={doubleOnly} onClick={() => setDoubleOnly(true)}>Double weak</button>
        </div>
        <p className="dual-type-result-count" aria-live="polite">
          Showing <strong>{visiblePokemon.length}</strong> of {kantoPokemonWeaknesses.length}
        </p>
      </div>

      {visiblePokemon.length > 0 ? (
        <div className="reference-surface kanto-table-surface">
          <div className="table-scroll kanto-table-scroll" role="region" aria-label="Kanto Pokémon weaknesses" tabIndex={0}>
            <table className="diary-table kanto-table">
              <thead>
                <tr>
                  <th scope="col">Pokémon / form</th>
                  <th scope="col">Type</th>
                  <th scope="col">Weaknesses · 1.6×</th>
                  <th scope="col">Double weakness · 2.56×</th>
                </tr>
              </thead>
              <tbody>
                {visiblePokemon.map((pokemon) => (
                  <tr key={pokemon.pokemon}>
                    <th scope="row">{pokemon.pokemon}</th>
                    <td><TypeTags types={pokemon.types} /></td>
                    <td><TypeTags types={pokemon.weaknesses} /></td>
                    <td><TypeTags types={pokemon.doubleWeaknesses} emphasized /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="dual-type-empty" role="status">No Pokémon match that search. Try a different Pokémon or type.</p>
      )}
      <p className="type-chart-source-note">The supplied Kanto reference includes relevant regional forms and lists Pokémon by their applicable form. It describes the Kanto section, not a complete nine-generation catalogue.</p>
    </section>
  )
}

function RaidCorrections() {
  return (
    <section className="content-section type-chart-section kanto-raid-section" aria-labelledby="kanto-raid-title">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow"><span className="eyebrow-dot" aria-hidden="true" />RAID COUNTER SHORTLIST</p>
          <h2 id="kanto-raid-title">Best weaknesses to exploit</h2>
          <p className="section-description">Quick examples from the supplied reference, with double weaknesses distinguished from ordinary weaknesses.</p>
        </div>
      </div>
      <div className="reference-surface">
        <div className="table-scroll" role="region" aria-label="Kanto raid weakness examples" tabIndex={0}>
          <table className="diary-table kanto-raid-table">
            <thead>
              <tr>
                <th scope="col">Pokémon</th>
                <th scope="col">Best weakness to exploit</th>
                <th scope="col">Damage</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Charizard</th><td>Rock</td><td>2.56×</td></tr>
              <tr><th scope="row">Gyarados</th><td>Electric</td><td>2.56×</td></tr>
              <tr><th scope="row">Dragonite</th><td>Ice</td><td>2.56×</td></tr>
              <tr><th scope="row">Rhydon</th><td>Grass / Water</td><td>2.56×</td></tr>
              <tr><th scope="row">Golem</th><td>Grass / Water</td><td>2.56×</td></tr>
              <tr><th scope="row">Lapras</th><td>Fighting, Electric, Grass, Rock, Steel</td><td>1.6×</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function KantoSources() {
  return (
    <section className="dual-type-reference kanto-reference" aria-labelledby="kanto-reference-title">
      <h2 id="kanto-reference-title">Reference databases</h2>
      <p>These databases track released Pokémon, forms, and Pokémon GO type effectiveness.</p>
      <ul>
        {kantoWeaknessSources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.label}<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="kanto-scope-caveat">Scope note: the supplied text says single-type Pokémon are excluded, but its list includes single-type entries such as Arbok, Weezing, Tangela, and Galarian Farfetch&apos;d. They are retained here as supplied; verify their scope or typings against the linked databases if you need an exhaustive reference.</p>
    </section>
  )
}

export function KantoWeaknessesPage() {
  const [isDark, setIsDark] = useState(false)
  const doubleWeakCount = kantoPokemonWeaknesses.filter((pokemon) => pokemon.doubleWeaknesses.length > 0).length

  const handleThemeToggle = () => {
    setIsDark((current) => {
      const next = !current
      document.documentElement.dataset.theme = next ? 'dark' : 'light'
      return next
    })
  }

  return (
    <main className="diary-shell type-chart-shell kanto-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <KantoHeader isDark={isDark} onThemeToggle={handleThemeToggle} />

      <div className="page-frame">
        <section className="hero-section type-chart-hero kanto-hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="hero-date">POKÉMON GO · KANTO BATTLE REFERENCE</p>
            <h1 id="page-title"><Swords className="hero-title-icon" aria-hidden="true" /><span>Kanto weaknesses</span></h1>
            <p className="hero-subtitle">A form-aware matchup guide to the Kanto Pokémon in your reference, with attack types and raid-critical double weaknesses in one place.</p>
            <a className="hero-link" href="#kanto-weaknesses">Explore the list <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <aside className="type-chart-summary" aria-label="Kanto reference summary">
            <div className="type-chart-summary-stat"><strong>{kantoPokemonWeaknesses.length}</strong><span>listed entries</span></div>
            <div className="type-chart-summary-stat"><strong>{doubleWeakCount}</strong><span>double-weak entries</span></div>
            <div className="type-chart-summary-stat"><strong>2.56×</strong><span>double weakness</span></div>
            <p className="type-chart-summary-note">Search Pokémon, types, or filter to double weaknesses.</p>
          </aside>
        </section>

        <MultiplierGuide />
        <KantoWeaknessTable />
        <RaidCorrections />
        <KantoSources />

        <footer className="page-footer type-chart-footer">
          <a href="/type-chart">Single-type chart <ArrowRight size={13} aria-hidden="true" /></a>
          <a href="/dual-type-chart">Dual-type chart <ArrowRight size={13} aria-hidden="true" /></a>
          <a href="/">Event diary <ArrowRight size={13} aria-hidden="true" /></a>
        </footer>
      </div>
    </main>
  )
}
