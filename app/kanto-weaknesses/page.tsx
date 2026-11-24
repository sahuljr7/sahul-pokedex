import type { Metadata } from 'next'
import { KantoWeaknessesPage } from '@/components/diary/kanto-weaknesses-page'

export const metadata: Metadata = {
  title: 'Kanto Pokémon GO Weaknesses',
  description: 'Search Kanto Pokémon by form, type, weakness, and double weakness in Pokémon GO.',
}

export default function Page() {
  return <KantoWeaknessesPage />
}
