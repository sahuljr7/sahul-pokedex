import type { Metadata } from 'next'
import { TypeChartPage } from '@/components/diary/type-chart-page'

export const metadata: Metadata = {
  title: 'Pokémon GO Type Weakness Chart',
  description: 'A complete Pokémon GO type weakness chart, battle damage multipliers, and a Rayquaza double-weakness example.',
}

export default function Page() {
  return <TypeChartPage />
}
