'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, BookOpen, Search, Swords, X } from 'lucide-react'
import { searchDiary, type SearchHit } from '@/lib/diary-search'

function HighlightText({ text, query }: { text: string; query: string }) {
  const hasBook = text.startsWith('📖 ')
  const hasSwords = text.endsWith(' ⚔️')
  const visibleText = text.slice(hasBook ? 3 : 0, hasSwords ? -3 : undefined)
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = visibleText.split(new RegExp(`(${escaped})`, 'ig'))

  return (
    <span aria-label={text}>
      {hasBook && <BookOpen className="search-source-icon" aria-hidden="true" />}
      {parts.map((part, index) => part.toLocaleLowerCase() === query.trim().toLocaleLowerCase()
        ? <mark key={`${part}-${index}`}>{part}</mark>
        : <span key={`${part}-${index}`}>{part}</span>)}
      {hasSwords && <Swords className="search-source-icon" aria-hidden="true" />}
    </span>
  )
}

function getExcerpt(text: string, query: string) {
  const lowerText = text.toLocaleLowerCase()
  const position = lowerText.indexOf(query.trim().toLocaleLowerCase())
  if (position < 0) return text.length > 96 ? `${text.slice(0, 96)}…` : text
  const start = Math.max(0, position - 32)
  const end = Math.min(text.length, position + query.trim().length + 64)
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`
}

export function DiarySearch({ onSelect }: { onSelect: (hit: SearchHit) => void }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const hits = useMemo(() => searchDiary(query), [query])
  const hasQuery = query.trim().length > 0

  function chooseHit(hit: SearchHit) {
    setQuery('')
    setActiveIndex(0)
    onSelect(hit)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.keyCode === 229)) return
    if (event.key === 'Enter') {
      event.preventDefault()
      if (hits[activeIndex]) chooseHit(hits[activeIndex])
    }
    if (event.key === 'ArrowDown' && hits.length) {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % hits.length)
    }
    if (event.key === 'ArrowUp' && hits.length) {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + hits.length) % hits.length)
    }
    if (event.key === 'Escape') {
      setQuery('')
      setActiveIndex(0)
    }
  }

  return (
    <div className="search-wrap" role="search">
      <label className="sr-only" htmlFor="diary-search">Search Pokémon, events, dates, moves and CP values</label>
      <Search aria-hidden="true" className="search-icon" size={18} strokeWidth={1.8} />
      <input
        id="diary-search"
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setActiveIndex(0)
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search Pokémon, events, CP…"
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={hasQuery}
        aria-controls="diary-search-results"
        aria-activedescendant={hits[activeIndex] ? `search-option-${hits[activeIndex].id}` : undefined}
      />
      {hasQuery && (
        <button
          type="button"
          className="search-clear"
          aria-label="Clear search"
          onClick={() => {
            setQuery('')
            setActiveIndex(0)
          }}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
      {hasQuery && (
        <div className="search-results" id="diary-search-results" role="listbox" aria-label="Search results">
          {hits.length > 0 ? hits.map((hit, index) => (
            <button
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              id={`search-option-${hit.id}`}
              className="search-result"
              key={hit.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => chooseHit(hit)}
            >
              <span className="search-result-copy">
                <span className="search-result-context"><HighlightText text={hit.context} query={query} /></span>
                <span className="search-result-title"><HighlightText text={hit.title} query={query} /></span>
                <span className="search-result-excerpt"><HighlightText text={getExcerpt(hit.text, query)} query={query} /></span>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          )) : (
            <div className="search-empty" role="status">
              <span className="search-empty-title">No matches found</span>
              <span>Try a Pokémon name, move, event date, weakness, or CP value.</span>
            </div>
          )}
          {hits.length > 0 && <p className="search-hint">Use ↑ ↓ to browse · Enter to open · Esc to clear</p>}
        </div>
      )}
    </div>
  )
}
