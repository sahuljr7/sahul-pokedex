'use client'

import type { ContentBlock } from '@/lib/diary-data'

export function DataTable({
  columns,
  rows,
  rowIds,
}: {
  columns: string[]
  rows: string[][]
  rowIds?: string[]
}) {
  return (
    <div className="table-scroll" role="region" aria-label={`${columns.join(', ')} table`} tabIndex={0}>
      <table className="diary-table">
        <thead>
          <tr>
            {columns.map((column) => <th scope="col" key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr id={rowIds?.[rowIndex]} key={`${row[0] ?? 'row'}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                cellIndex === 0
                  ? <th scope="row" key={`${rowIndex}-${cellIndex}`}>{cell}</th>
                  : <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SourceNotes({ sources }: { sources?: string[] }) {
  if (!sources?.length) return null
  return (
    <p className="source-notes">
      {sources.map((source, index) => <span key={`${source}-${index}`}>{source}</span>)}
    </p>
  )
}

function BlockLead({ lead }: { lead?: string | string[] }) {
  if (!lead) return null
  const lines = Array.isArray(lead) ? lead : [lead]
  return (
    <p className="detail-lead">
      {lines.map((line, index) => <span key={`${line}-${index}`}>{line}{index < lines.length - 1 && <br />}</span>)}
    </p>
  )
}

export function ContentBlockView({ block, idPrefix = '' }: { block: ContentBlock; idPrefix?: string }) {
  const blockId = `${idPrefix}${block.id}`

  return (
    <section className="detail-block" id={blockId}>
      {block.title && <div className="detail-heading"><h3>{block.title}</h3></div>}

      {block.type === 'paragraphs' && (
        <div className="detail-copy">
          {block.paragraphs.map((paragraph, index) => <p key={`${block.id}-${index}`}>{paragraph}</p>)}
        </div>
      )}

      {block.type === 'list' && (
        <>
          <BlockLead lead={block.lead} />
          <ul className="detail-list">
            {block.items.map((item, index) => (
              <li id={`${blockId}-item-${index}`} key={`${block.id}-${index}`}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {block.type === 'table' && (
        <>
          <BlockLead lead={block.lead} />
          <DataTable
            columns={block.columns}
            rows={block.rows}
            rowIds={block.rows.map((_, index) => `${blockId}-row-${index}`)}
          />
          {block.note && <p className="table-note">{block.note}</p>}
        </>
      )}

      {block.type === 'team' && (
        <>
          <BlockLead lead={block.lead} />
          <div className="team-list">
            {block.items.map((item, index) => (
              <article className="team-member" id={`${blockId}-item-${index}`} key={`${block.id}-${index}`}>
                <div>
                  <h4>{item.title}</h4>
                  {item.details && <p>{item.details}</p>}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {block.type === 'pairs' && (
        <>
          <BlockLead lead={block.lead} />
          <dl className="pair-list">
            {block.items.map((item, index) => (
              <div id={`${blockId}-row-${index}`} key={`${item.label}-${index}`}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      {block.type === 'facts' && (
        <dl className="facts-list">
          {block.items.map((item, index) => (
            <div id={`${blockId}-row-${index}`} key={`${item.label}-${index}`}>
              <dt>{item.label}</dt>
              <dd>
                <span>{item.value}</span>
                {item.detail && <span className="fact-detail">{item.detail}</span>}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <SourceNotes sources={block.sources} />
    </section>
  )
}
