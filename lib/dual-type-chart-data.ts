type PairingInput = readonly [secondary: string, weaknesses: string, doubleWeaknesses: string]

type TypeGroupInput = {
  primary: string
  pairings: readonly PairingInput[]
}

const rawGroups: readonly TypeGroupInput[] = [
  {
    primary: 'Normal',
    pairings: [
      ['Fire', 'Water, Fighting, Ground, Rock', ''],
      ['Water', 'Electric, Grass, Fighting', ''],
      ['Electric', 'Fighting, Ground', ''],
      ['Grass', 'Fire, Ice, Fighting, Poison, Flying, Bug', ''],
      ['Ice', 'Fire, Rock, Steel', 'Fighting'],
      ['Fighting', 'Fighting, Flying, Psychic, Fairy', ''],
      ['Poison', 'Ground, Psychic', ''],
      ['Ground', 'Water, Grass, Ice, Fighting', ''],
      ['Flying', 'Electric, Ice, Rock', ''],
      ['Psychic', 'Bug, Dark', ''],
      ['Bug', 'Fire, Flying, Rock', ''],
      ['Rock', 'Water, Grass, Ground, Steel', 'Fighting'],
      ['Ghost', 'Dark', ''],
      ['Dragon', 'Ice, Fighting, Dragon, Fairy', ''],
      ['Dark', 'Bug, Fairy', 'Fighting'],
      ['Steel', 'Fire, Ground', 'Fighting'],
      ['Fairy', 'Poison, Steel', ''],
    ],
  },
  {
    primary: 'Fire',
    pairings: [
      ['Water', 'Electric, Ground, Rock', ''],
      ['Electric', 'Water, Rock', 'Ground'],
      ['Grass', 'Poison, Flying, Rock', ''],
      ['Ice', 'Water, Fighting, Ground', 'Rock'],
      ['Fighting', 'Water, Ground, Flying, Psychic', ''],
      ['Poison', 'Water, Psychic, Rock', 'Ground'],
      ['Ground', 'Ground', 'Water'],
      ['Flying', 'Water, Electric', 'Rock'],
      ['Psychic', 'Water, Ground, Rock, Ghost, Dark', ''],
      ['Bug', 'Water, Flying', 'Rock'],
      ['Rock', 'Fighting, Water, Ground', ''],
      ['Ghost', 'Water, Ground, Rock, Ghost, Dark', ''],
      ['Dragon', 'Ground, Rock, Dragon', ''],
      ['Dark', 'Water, Fighting, Ground, Rock', ''],
      ['Steel', 'Water, Fighting', 'Ground'],
      ['Fairy', 'Water, Poison, Ground, Rock', ''],
    ],
  },
  {
    primary: 'Water',
    pairings: [
      ['Electric', 'Grass, Ground', ''],
      ['Grass', 'Poison, Flying, Bug', ''],
      ['Ice', 'Electric, Grass, Fighting, Rock', ''],
      ['Fighting', 'Electric, Grass, Flying, Psychic, Fairy', ''],
      ['Poison', 'Electric, Ground, Psychic', ''],
      ['Ground', '', 'Grass'],
      ['Flying', 'Rock', 'Electric'],
      ['Psychic', 'Electric, Grass, Bug, Ghost, Dark', ''],
      ['Bug', 'Electric, Flying, Rock', ''],
      ['Rock', 'Electric, Fighting, Ground', 'Grass'],
      ['Ghost', 'Electric, Grass, Ghost, Dark', ''],
      ['Dragon', 'Dragon, Fairy', ''],
      ['Dark', 'Electric, Grass, Fighting, Bug, Fairy', ''],
      ['Steel', 'Electric, Fighting, Ground', ''],
      ['Fairy', 'Electric, Grass, Poison', ''],
    ],
  },
  {
    primary: 'Electric',
    pairings: [
      ['Grass', 'Fire, Ice, Poison, Bug', ''],
      ['Ice', 'Fire, Fighting, Ground, Rock', ''],
      ['Fighting', 'Ground, Psychic, Fairy', ''],
      ['Poison', 'Psychic', 'Ground'],
      ['Ground', 'Water, Grass, Ice', ''],
      ['Flying', 'Ice, Rock', ''],
      ['Psychic', 'Ground, Bug, Ghost, Dark', ''],
      ['Bug', 'Fire, Rock', ''],
      ['Rock', 'Water, Grass, Fighting', 'Ground'],
      ['Ghost', 'Ground, Ghost, Dark', ''],
      ['Dragon', 'Ice, Ground, Dragon, Fairy', ''],
      ['Dark', 'Fighting, Ground, Bug, Fairy', ''],
      ['Steel', 'Fire, Fighting', 'Ground'],
      ['Fairy', 'Poison, Ground', ''],
    ],
  },
  {
    primary: 'Grass',
    pairings: [
      ['Ice', 'Fighting, Poison, Flying, Bug, Rock, Steel', 'Fire'],
      ['Fighting', 'Fire, Ice, Poison, Psychic, Fairy', 'Flying'],
      ['Poison', 'Fire, Ice, Flying, Psychic', ''],
      ['Ground', 'Fire, Flying, Bug', 'Ice'],
      ['Flying', 'Fire, Poison, Flying, Rock', 'Ice'],
      ['Psychic', 'Fire, Ice, Poison, Flying, Ghost, Dark', 'Bug'],
      ['Bug', 'Ice, Poison, Bug, Rock', 'Fire, Flying'],
      ['Rock', 'Ice, Fighting, Bug, Steel', ''],
      ['Ghost', 'Fire, Ice, Flying, Ghost, Dark', ''],
      ['Dragon', 'Poison, Flying, Bug, Dragon, Fairy', 'Ice'],
      ['Dark', 'Fire, Ice, Fighting, Poison, Flying, Fairy', 'Bug'],
      ['Steel', 'Fighting', 'Fire'],
      ['Fairy', 'Fire, Ice, Flying, Steel', 'Poison'],
    ],
  },
  {
    primary: 'Ice',
    pairings: [
      ['Fighting', 'Fire, Fighting, Flying, Psychic, Steel, Fairy', ''],
      ['Poison', 'Fire, Ground, Psychic, Rock, Steel', ''],
      ['Ground', 'Fire, Water, Grass, Fighting, Steel', ''],
      ['Flying', 'Fire, Electric, Steel', 'Rock'],
      ['Psychic', 'Fire, Bug, Rock, Ghost, Dark, Steel', ''],
      ['Bug', 'Flying, Steel', 'Fire, Rock'],
      ['Rock', 'Water, Grass, Ground, Rock', 'Fighting, Steel'],
      ['Ghost', 'Fire, Rock, Ghost, Dark, Steel', ''],
      ['Dragon', 'Fighting, Rock, Dragon, Steel, Fairy', ''],
      ['Dark', 'Fire, Bug, Rock, Steel, Fairy', 'Fighting'],
      ['Steel', 'Ground', 'Fire, Fighting'],
      ['Fairy', 'Fire, Poison, Rock', 'Steel'],
    ],
  },
  {
    primary: 'Fighting',
    pairings: [
      ['Poison', 'Ground, Flying', 'Psychic'],
      ['Ground', 'Water, Grass, Ice, Flying, Psychic, Fairy', ''],
      ['Flying', 'Electric, Ice, Flying, Psychic, Fairy', ''],
      ['Psychic', 'Flying, Ghost, Fairy', ''],
      ['Bug', 'Fire, Psychic, Fairy', 'Flying'],
      ['Rock', 'Water, Grass, Fighting, Ground, Psychic, Steel, Fairy', ''],
      ['Ghost', 'Flying, Psychic, Fairy', 'Ghost'],
      ['Dragon', 'Ice, Flying, Psychic, Dragon', 'Fairy'],
      ['Dark', 'Fighting, Flying', 'Fairy'],
      ['Steel', 'Fire, Fighting, Ground', ''],
      ['Fairy', 'Poison, Flying, Psychic, Steel, Fairy', ''],
    ],
  },
  {
    primary: 'Poison',
    pairings: [
      ['Ground', 'Water, Ice, Psychic', 'Ground'],
      ['Flying', 'Electric, Ice, Psychic, Rock', ''],
      ['Psychic', 'Ground, Ghost, Dark', ''],
      ['Bug', 'Fire, Flying, Psychic, Rock', ''],
      ['Rock', 'Water, Psychic, Steel', 'Ground'],
      ['Ghost', 'Ground, Psychic, Ghost, Dark', ''],
      ['Dragon', 'Ice, Ground, Psychic, Dragon', ''],
      ['Dark', 'Ground', ''],
      ['Steel', 'Fire', 'Ground'],
      ['Fairy', 'Ground, Psychic, Steel', ''],
    ],
  },
  {
    primary: 'Ground',
    pairings: [
      ['Flying', 'Water, Ice', ''],
      ['Psychic', 'Water, Grass, Ice, Bug, Ghost, Dark', ''],
      ['Bug', 'Fire, Water, Ice, Flying', ''],
      ['Rock', 'Ice, Fighting, Ground, Steel', 'Water, Grass'],
      ['Ghost', 'Water, Grass, Ice, Ghost, Dark', ''],
      ['Dragon', 'Dragon, Fairy', 'Ice'],
      ['Dark', 'Water, Grass, Ice, Fighting, Bug, Fairy', ''],
      ['Steel', 'Fire, Water, Fighting', 'Ground'],
      ['Fairy', 'Water, Grass, Ice, Steel', ''],
    ],
  },
  {
    primary: 'Flying',
    pairings: [
      ['Psychic', 'Electric, Ice, Rock, Ghost, Dark', ''],
      ['Bug', 'Fire, Electric, Ice', 'Rock'],
      ['Rock', 'Water, Electric, Ice, Steel', ''],
      ['Ghost', 'Electric, Ice, Rock, Ghost, Dark', ''],
      ['Dragon', 'Rock, Dragon, Fairy', 'Ice'],
      ['Dark', 'Electric, Ice, Rock, Fairy', ''],
      ['Steel', 'Fire, Electric', ''],
      ['Fairy', 'Electric, Ice, Poison, Rock, Steel', ''],
    ],
  },
  {
    primary: 'Psychic',
    pairings: [
      ['Bug', 'Fire, Flying, Bug, Rock, Ghost, Dark', ''],
      ['Rock', 'Water, Grass, Ground, Bug, Ghost, Dark, Steel', ''],
      ['Ghost', '', 'Ghost, Dark'],
      ['Dragon', 'Ice, Bug, Ghost, Dragon, Dark, Fairy', ''],
      ['Dark', 'Fairy', 'Bug'],
      ['Steel', 'Fire, Ground, Ghost, Dark', ''],
      ['Fairy', 'Poison, Ghost, Steel', ''],
    ],
  },
  {
    primary: 'Bug',
    pairings: [
      ['Rock', 'Water, Rock, Steel', ''],
      ['Ghost', 'Fire, Flying, Rock, Ghost, Dark', ''],
      ['Dragon', 'Ice, Flying, Rock, Dragon, Fairy', ''],
      ['Dark', 'Fire, Flying, Bug, Rock, Fairy', ''],
      ['Steel', '', 'Fire'],
      ['Fairy', 'Fire, Poison, Flying, Rock, Steel', ''],
    ],
  },
  {
    primary: 'Rock',
    pairings: [
      ['Ghost', 'Water, Grass, Ground, Ghost, Dark, Steel', ''],
      ['Dragon', 'Ice, Fighting, Ground, Dragon, Steel, Fairy', ''],
      ['Dark', 'Water, Grass, Ground, Bug, Steel, Fairy', 'Fighting'],
      ['Steel', 'Water', 'Fighting, Ground'],
      ['Fairy', 'Water, Grass, Ground', 'Steel'],
    ],
  },
  {
    primary: 'Ghost',
    pairings: [
      ['Dragon', 'Ice, Ghost, Dragon, Dark, Fairy', ''],
      ['Dark', 'Fairy', ''],
      ['Steel', 'Fire, Ground, Ghost, Dark', ''],
      ['Fairy', 'Ghost, Steel', ''],
    ],
  },
  {
    primary: 'Dragon',
    pairings: [
      ['Dark', 'Ice, Fighting, Bug, Dragon', 'Fairy'],
      ['Steel', 'Fighting, Ground', ''],
      ['Fairy', 'Ice, Poison, Steel', 'Fairy'],
    ],
  },
  {
    primary: 'Dark',
    pairings: [
      ['Steel', 'Fire, Ground', 'Fighting'],
      ['Fairy', 'Poison, Steel', 'Fairy'],
    ],
  },
  {
    primary: 'Steel',
    pairings: [['Fairy', 'Fire, Ground', '']],
  },
  {
    primary: 'Fairy',
    pairings: [],
  },
]

const parseTypes = (value: string) => value ? value.split(',').map((type) => type.trim()) : []

export const dualTypeGroups = rawGroups.map(({ primary, pairings }) => ({
  primary,
  rows: pairings.map(([secondary, weaknesses, doubleWeaknesses]) => ({
    primary,
    secondary,
    combination: `${primary} + ${secondary}`,
    weaknesses: parseTypes(weaknesses),
    doubleWeaknesses: parseTypes(doubleWeaknesses),
  })),
}))

export const dualTypeCombinationCount = dualTypeGroups.reduce((total, group) => total + group.rows.length, 0)

export const dualTypeRaidExamples = [
  { pokemon: 'Rayquaza', combination: 'Dragon + Flying', weaknesses: 'Ice' },
  { pokemon: 'Garchomp', combination: 'Dragon + Ground', weaknesses: 'Ice' },
  { pokemon: 'Salamence', combination: 'Dragon + Flying', weaknesses: 'Ice' },
  { pokemon: 'Dragonite', combination: 'Dragon + Flying', weaknesses: 'Ice' },
  { pokemon: 'Charizard', combination: 'Fire + Flying', weaknesses: 'Rock' },
  { pokemon: 'Tyranitar', combination: 'Rock + Dark', weaknesses: 'Fighting' },
  { pokemon: 'Swampert', combination: 'Water + Ground', weaknesses: 'Grass' },
  { pokemon: 'Rhyperior', combination: 'Ground + Rock', weaknesses: 'Water, Grass' },
  { pokemon: 'Aggron', combination: 'Steel + Rock', weaknesses: 'Fighting, Ground' },
  { pokemon: 'Scizor', combination: 'Bug + Steel', weaknesses: 'Fire' },
]

export const dualTypeSources = [
  { label: 'Pokémon Database type chart', href: 'https://pokemondb.net/go/type' },
  { label: 'RotomLabs dual-type calculator', href: 'https://rotomlabs.net/pokemon-go/types' },
  { label: 'POGO Nerfplz type chart', href: 'https://pogo.nerfplz.com/type-chart/' },
]
