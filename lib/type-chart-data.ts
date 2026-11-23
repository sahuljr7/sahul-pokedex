export const typeWeaknesses: Array<[string, string]> = [
  ['Normal', 'Fighting'],
  ['Fire', 'Water, Ground, Rock'],
  ['Water', 'Electric, Grass'],
  ['Electric', 'Ground'],
  ['Grass', 'Fire, Ice, Poison, Flying, Bug'],
  ['Ice', 'Fire, Fighting, Rock, Steel'],
  ['Fighting', 'Flying, Psychic, Fairy'],
  ['Poison', 'Ground, Psychic'],
  ['Ground', 'Water, Grass, Ice'],
  ['Flying', 'Electric, Ice, Rock'],
  ['Psychic', 'Bug, Ghost, Dark'],
  ['Bug', 'Fire, Flying, Rock'],
  ['Rock', 'Water, Grass, Fighting, Ground, Steel'],
  ['Ghost', 'Ghost, Dark'],
  ['Dragon', 'Ice, Dragon, Fairy'],
  ['Dark', 'Fighting, Bug, Fairy'],
  ['Steel', 'Fire, Fighting, Ground'],
  ['Fairy', 'Poison, Steel'],
]

export const battleRules = [
  {
    value: '1.6×',
    title: 'Super effective',
    description: 'Deals 1.6× damage.',
  },
  {
    value: '2.56×',
    title: 'Double super effective',
    description: 'Deals 2.56× damage.',
  },
  {
    value: '1.2×',
    title: 'Same Type Attack Bonus',
    description: 'STAB boosts matching-type attacks by 1.2×.',
  },
]
