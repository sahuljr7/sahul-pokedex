import {
  additionalMegaRaids,
  checklist,
  checklistInfo,
  closingNotes,
  events,
  hundoReference,
  introduction,
  raidResources,
  raidStrategies,
} from '@/lib/diary-data'

export type SearchHit = {
  id: string
  target: string
  title: string
  context: string
  text: string
  score: number
}

function normalize(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim()
}

function collectText(value: unknown): string[] {
  if (typeof value === 'string' || typeof value === 'number') return [String(value)]
  if (Array.isArray(value)) return value.flatMap(collectText)
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([key]) => key !== 'id' && key !== 'type')
      .flatMap(([, child]) => collectText(child))
  }
  return []
}

function slug(value: string) {
  return normalize(value).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function buildIndex() {
  const index: Omit<SearchHit, 'score'>[] = []
  const add = (item: Omit<SearchHit, 'score'>) => index.push(item)

  add({
    id: 'intro',
    target: 'home',
    title: introduction.title,
    context: introduction.dateRange,
    text: collectText(introduction).join(' '),
  })

  for (const event of events) {
    add({
      id: `event-${event.id}`,
      target: event.id,
      title: event.title,
      context: event.date,
      text: collectText(event).join(' '),
    })

    for (const block of event.blocks) {
      const context = `${event.date} · ${event.title}`
      add({
        id: `block-${block.id}`,
        target: block.id,
        title: block.title,
        context,
        text: [
          ...(block.type === 'table' ? block.columns : []),
          ...collectText(block),
        ].join(' '),
      })

      if (block.type === 'table') {
        block.rows.forEach((row, rowIndex) => {
          add({
            id: `row-${block.id}-${rowIndex}`,
            target: `${block.id}-row-${rowIndex}`,
            title: row[0] ?? block.title,
            context: `${context} · ${block.title}`,
            text: [...block.columns, ...row].join(' '),
          })
        })
      }

      if (block.type === 'list') {
        block.items.forEach((item, itemIndex) => {
          add({
            id: `item-${block.id}-${itemIndex}`,
            target: `${block.id}-item-${itemIndex}`,
            title: item,
            context: `${context} · ${block.title}`,
            text: item,
          })
        })
      }

      if (block.type === 'pairs' || block.type === 'facts') {
        block.items.forEach((item, itemIndex) => {
          add({
            id: `fact-${block.id}-${itemIndex}`,
            target: `${block.id}-row-${itemIndex}`,
            title: item.label,
            context: `${context} · ${block.title}`,
            text: [item.label, item.value, 'detail' in item ? item.detail : ''].filter(Boolean).join(' '),
          })
        })
      }

      if (block.type === 'team') {
        block.items.forEach((item, itemIndex) => {
          add({
            id: `team-${block.id}-${itemIndex}`,
            target: `${block.id}-item-${itemIndex}`,
            title: item.title,
            context: `${context} · ${block.title}`,
            text: `${item.title} ${item.details}`,
          })
        })
      }
    }
  }

  add({
    id: 'additional-mega-raids',
    target: additionalMegaRaids.id,
    title: additionalMegaRaids.title,
    context: additionalMegaRaids.title,
    text: ['Raid boss', 'Weaknesses', 'Best counters', ...collectText(additionalMegaRaids)].join(' '),
  })
  add({
    id: 'additional-mega-cp',
    target: 'additional-mega-cp',
    title: 'Hundo CP cheat sheet for these four raids',
    context: additionalMegaRaids.title,
    text: [
      'Pokémon caught', 'Normal weather', 'Weather boosted',
      ...additionalMegaRaids.raids.flatMap((raid) => [raid.pokemon, raid.normal, raid.boosted]),
    ].join(' '),
  })
  add({
    id: 'additional-mega-movesets',
    target: 'additional-mega-movesets',
    title: 'Recommended movesets',
    context: additionalMegaRaids.title,
    text: additionalMegaRaids.raids.map((raid) => `${raid.pokemon}: ${raid.moveset}`).join(' '),
  })
  additionalMegaRaids.raids.forEach((raid, indexInList) => {
    add({
      id: `mega-raid-${indexInList}`,
      target: `mega-raid-${slug(raid.pokemon)}`,
      title: raid.pokemon,
      context: additionalMegaRaids.title,
      text: collectText(raid).join(' '),
    })
    add({
      id: `mega-moveset-${indexInList}`,
      target: `mega-moveset-${slug(raid.pokemon)}`,
      title: raid.pokemon,
      context: `${additionalMegaRaids.title} · Recommended movesets`,
      text: `${raid.pokemon}: ${raid.moveset} ${raid.source}`,
    })
    add({
      id: `mega-cp-${indexInList}`,
      target: `mega-cp-${slug(raid.pokemon)}`,
      title: raid.pokemon.replace('Mega ', ''),
      context: 'Hundo CP cheat sheet for these four raids',
            text: `Pokémon caught Normal weather Weather boosted ${raid.pokemon.replace('Mega ', '')} ${raid.normal} ${raid.boosted}`,

    })
  })

  add({
    id: 'checklist',
    target: 'checklist',
    title: checklistInfo.title,
    context: checklistInfo.progressLabel,
    text: [
      checklistInfo.title,
      checklistInfo.intro,
      checklistInfo.progressLabel,
      checklistInfo.initialProgress,
      checklistInfo.resetLabel,
      ...checklist.flatMap((group) => [group.day, ...group.items]),
    ].join(' '),
  })

  checklist.forEach((group) => {
    add({
      id: `checklist-${group.id}`,
      target: 'checklist',
      title: group.day,
      context: checklistInfo.title,
      text: group.items.join(' '),
    })
    group.items.forEach((item, itemIndex) => {
      add({
        id: `check-${group.id}-${itemIndex}`,
        target: `check-${group.id}-${itemIndex}`,
        title: item,
        context: `${group.day} · ${checklistInfo.title}`,
        text: item,
      })
    })
  })

  add({
    id: 'hundo-reference',
    target: hundoReference.id,
    title: hundoReference.title,
    context: '100% IV · Catch CP values',
    text: collectText(hundoReference).join(' '),
  })
  hundoReference.rows.forEach((row) => {
    add({
      id: `hundo-${slug(row[0])}`,
      target: `hundo-row-${slug(row[0])}`,
      title: row[0],
      context: hundoReference.title,
      text: row.join(' '),
    })
  })

  add({
    id: 'raid-strategies',
    target: raidStrategies.id,
    title: raidStrategies.title,
    context: 'Raid preparation',
    text: collectText(raidStrategies).join(' '),
  })
  raidStrategies.items.forEach((item, itemIndex) => {
    add({
      id: `strategy-${itemIndex}`,
      target: `strategy-${itemIndex}`,
      title: item,
      context: raidStrategies.title,
      text: item,
    })
  })

  add({
    id: 'raid-resources',
    target: raidResources.id,
    title: raidResources.title,
    context: 'Raid preparation',
    text: collectText(raidResources).join(' '),
  })
  raidResources.items.forEach((item, itemIndex) => {
    add({
      id: `resource-${itemIndex}`,
      target: `resource-${itemIndex}`,
      title: item,
      context: raidResources.title,
      text: item,
    })
  })

  closingNotes.forEach((note, itemIndex) => {
    add({
      id: `closing-note-${itemIndex}`,
      target: `closing-note-${itemIndex}`,
      title: note,
      context: "Sahul's Pokémon GO Raid & Event Diary",
      text: note,
    })
  })

  return index
}

const searchIndex = buildIndex()

export function searchDiary(rawQuery: string, limit = 8): SearchHit[] {
  const query = normalize(rawQuery)
  if (!query) return []

  return searchIndex
    .map((entry, order) => {
      const title = normalize(entry.title)
      const text = normalize(entry.text)
      if (!title.includes(query) && !text.includes(query)) return null

      const score = title === query ? 0 : title.startsWith(query) ? 1 : title.includes(query) ? 2 : 3
      return { ...entry, score, order }
    })
    .filter((entry): entry is SearchHit & { order: number } => entry !== null)
    .sort((a, b) => a.score - b.score || a.order - b.order)
    .slice(0, limit)
    .map(({ order: _order, ...hit }) => hit)
}
