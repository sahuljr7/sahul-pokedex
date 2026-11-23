'use client'

import { useState } from 'react'
import { ArrowRight, BookOpen, Moon, Snowflake, Sun, Swords } from 'lucide-react'
import { DataTable } from '@/components/diary/content-block'
import { battleRules, typeWeaknesses } from '@/lib/type-chart-data'
import { introduction } from '@/lib/diary-data'

function TypeChartHeader({ isDark, onThemeToggle }: { isDark: boolean; onThemeToggle: () => void }) {
  return (
    <header className="topbar type-chart-topbar">
      <a className="brand" href="/" aria-label={`${introduction.title.replace(/^📖\s/, '')} home`}>
        <span className="brand-mark"><BookOpen size={18} aria-hidden="true" /></span>
        <span className="brand-copy"><strong>{introduction.title.replace(/^📖\s/, '')}</strong></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/">Diary</a>
        <a className="active" href="/type-chart" aria-current="page">Type chart</a>
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

function WeaknessTableSection() {
  return (
    <section className="content-section type-chart-section" id="weakness-chart" aria-labelledby="weakness-chart-title">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow"><span className="eyebrow-dot" aria-hidden="true" />THE FULL MATCHUP LIST</p>
          <h2 id="weakness-chart-title">All 18 Pokémon types</h2>
          <p className="section-description">Use the listed attack types to target a defending Pokémon&apos;s weakness in raids, Gym Battles, and Team GO Rocket battles.</p>
        </div>
      </div>
      <div className="reference-surface">
        <DataTable columns={['Pokémon type', 'Weak against (use these attacks)']} rows={typeWeaknesses} />
      </div>
      <p className="type-chart-source-note">The supplied reference repeats this same chart under its correction heading. Both lists match, so they are combined here for easier scanning.</p>
    </section>
  )
}

function BattleRulesSection() {
  return (
    <section className="content-section type-chart-section" aria-labelledby="battle-rules-title">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow"><span className="eyebrow-dot" aria-hidden="true" />BATTLE MULTIPLIERS</p>
          <h2 id="battle-rules-title">Pokémon GO battle rules</h2>
          <p className="section-description">A quick reference for how type advantages affect damage.</p>
        </div>
      </div>
      <div className="type-chart-rules">
        {battleRules.map((rule) => (
          <article className="type-chart-rule" key={rule.title}>
            <strong className="type-chart-rule-value">{rule.value}</strong>
            <h3>{rule.title}</h3>
            <p>{rule.description}</p>
          </article>
        ))}
      </div>
      <p className="type-chart-dual-note">For dual-type Pokémon, weaknesses and resistances from both types combine.</p>
    </section>
  )
}

function RayquazaExample() {
  return (
    <aside className="type-chart-example" aria-labelledby="rayquaza-example-title">
      <div className="type-chart-example-heading">
        <span className="type-chart-example-icon"><Swords size={18} aria-hidden="true" /></span>
        <div>
          <p className="section-eyebrow">DUAL-TYPE EXAMPLE</p>
          <h2 id="rayquaza-example-title">Rayquaza</h2>
        </div>
      </div>
      <div className="type-chart-example-details">
        <div className="type-chart-type-pair" aria-label="Dragon and Flying type">
          <span>Dragon</span><span aria-hidden="true">+</span><span>Flying</span>
        </div>
        <div className="type-chart-ice-weakness">
          <Snowflake size={16} aria-hidden="true" />
          <span>Double weak to Ice</span>
        </div>
        <p>Ice attacks deal <strong>2.56× damage</strong>.</p>
      </div>
    </aside>
  )
}

export function TypeChartPage() {
  const [isDark, setIsDark] = useState(false)

  const handleThemeToggle = () => {
    setIsDark((current) => {
      const next = !current
      document.documentElement.dataset.theme = next ? 'dark' : 'light'
      return next
    })
  }

  return (
    <main className="diary-shell type-chart-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <TypeChartHeader isDark={isDark} onThemeToggle={handleThemeToggle} />

      <div className="page-frame">
        <section className="hero-section type-chart-hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="hero-date">POKÉMON GO · BATTLE REFERENCE</p>
            <h1 id="page-title"><Swords className="hero-title-icon" aria-hidden="true" /><span>Type weaknesses</span></h1>
            <p className="hero-subtitle">A practical matchup guide for choosing stronger counters in Raids, Gym Battles, and Team GO Rocket battles.</p>
            <a className="hero-link" href="#weakness-chart">Explore all 18 types <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <aside className="type-chart-summary" aria-label="Battle multiplier summary">
            <div className="type-chart-summary-stat"><strong>18</strong><span>types</span></div>
            <div className="type-chart-summary-stat"><strong>2.56×</strong><span>double weakness</span></div>
            <div className="type-chart-summary-stat"><strong>1.2×</strong><span>STAB bonus</span></div>
            <p className="type-chart-summary-note">Know the matchup. Build a better counter team.</p>
          </aside>
        </section>

        <WeaknessTableSection />
        <BattleRulesSection />
        <RayquazaExample />

        <footer className="page-footer type-chart-footer">
          <a href="/">Back to the event diary <ArrowRight size={13} aria-hidden="true" /></a>
        </footer>
      </div>
    </main>
  )
}
