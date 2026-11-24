import type { Metadata } from 'next'
import { DualTypeChartPage } from '@/components/diary/dual-type-chart-page'

export const metadata: Metadata = {
  title: 'Pokémon GO Dual-Type Weakness Chart',
  description: 'Search all 153 Pokémon GO dual-type combinations and compare single and double weaknesses.',
}

export default function Page() {
  return <DualTypeChartPage />
}
