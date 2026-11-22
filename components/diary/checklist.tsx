'use client'

import { useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { checklist, checklistInfo } from '@/lib/diary-data'

export function ChecklistSection() {
  const [completed, setCompleted] = useState<Set<string>>(() => new Set())
  const total = useMemo(() => checklist.reduce((sum, group) => sum + group.items.length, 0), [])
  const progress = completed.size

  function toggleItem(id: string) {
    setCompleted((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="content-section checklist-section" id="checklist" aria-labelledby="checklist-title">
      <div className="section-heading">
        <div>
          <h2 id="checklist-title">{checklistInfo.title}</h2>
          <p className="section-description">{checklistInfo.intro}</p>
        </div>
        <button
          type="button"
          className="quiet-button reset-button"
          onClick={() => setCompleted(new Set())}
          disabled={progress === 0}
        >
          <RotateCcw size={15} aria-hidden="true" />
          {checklistInfo.resetLabel}
        </button>
      </div>

      <div className="checklist-progress" aria-live="polite">
        <div className="progress-topline">
          <span>{checklistInfo.progressLabel}</span>
          <strong>{progress}/{total} completed</strong>
        </div>
        <div className="progress-track" role="progressbar" aria-label="Weekly checklist progress" aria-valuemin={0} aria-valuemax={total} aria-valuenow={progress}>
          <span style={{ width: `${total ? (progress / total) * 100 : 0}%` }} />
        </div>
      </div>

      <div className="checklist-grid">
        {checklist.map((group) => (
          <fieldset className="checklist-day" key={group.id}>
            <legend>{group.day}</legend>
            <div className="checklist-items">
              {group.items.map((item, index) => {
                const id = `check-${group.id}-${index}`
                const isChecked = completed.has(id)
                return (
                  <label className={`checklist-item${isChecked ? ' is-checked' : ''}`} id={id} key={id}>
                    <input type="checkbox" checked={isChecked} onChange={() => toggleItem(id)} />
                    <span className="custom-checkbox" aria-hidden="true" />
                    <span>{item}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  )
}
