export type KantoPokemonWeakness = {
  pokemon: string
  types: string[]
  weaknesses: string[]
  doubleWeaknesses: string[]
}

export const kantoPokemonWeaknesses: KantoPokemonWeakness[] = [
  { pokemon: 'Venusaur', types: ['Grass', 'Poison'], weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'], doubleWeaknesses: [] },
  { pokemon: 'Charizard', types: ['Fire', 'Flying'], weaknesses: ['Water', 'Electric'], doubleWeaknesses: ['Rock'] },
  { pokemon: 'Butterfree', types: ['Bug', 'Flying'], weaknesses: ['Fire', 'Electric', 'Ice'], doubleWeaknesses: ['Rock'] },
  { pokemon: 'Beedrill', types: ['Bug', 'Poison'], weaknesses: ['Fire', 'Flying', 'Psychic', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Pidgeot', types: ['Normal', 'Flying'], weaknesses: ['Electric', 'Ice', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Raticate (Alolan)', types: ['Dark', 'Normal'], weaknesses: ['Fighting', 'Bug', 'Fairy'], doubleWeaknesses: [] },
  { pokemon: 'Fearow', types: ['Normal', 'Flying'], weaknesses: ['Electric', 'Ice', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Arbok', types: ['Poison'], weaknesses: ['Ground', 'Psychic'], doubleWeaknesses: [] },
  { pokemon: 'Nidoqueen', types: ['Poison', 'Ground'], weaknesses: ['Water', 'Ice', 'Ground', 'Psychic'], doubleWeaknesses: [] },
  { pokemon: 'Nidoking', types: ['Poison', 'Ground'], weaknesses: ['Water', 'Ice', 'Ground', 'Psychic'], doubleWeaknesses: [] },
  { pokemon: 'Wigglytuff', types: ['Normal', 'Fairy'], weaknesses: ['Poison', 'Steel'], doubleWeaknesses: [] },
  { pokemon: 'Golbat', types: ['Poison', 'Flying'], weaknesses: ['Electric', 'Ice', 'Psychic', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Oddish', types: ['Grass', 'Poison'], weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'], doubleWeaknesses: [] },
  { pokemon: 'Gloom', types: ['Grass', 'Poison'], weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'], doubleWeaknesses: [] },
  { pokemon: 'Vileplume', types: ['Grass', 'Poison'], weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'], doubleWeaknesses: [] },
  { pokemon: 'Paras', types: ['Bug', 'Grass'], weaknesses: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'], doubleWeaknesses: [] },
  { pokemon: 'Parasect', types: ['Bug', 'Grass'], weaknesses: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'], doubleWeaknesses: [] },
  { pokemon: 'Venomoth', types: ['Bug', 'Poison'], weaknesses: ['Fire', 'Flying', 'Psychic', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Dugtrio (Alolan)', types: ['Ground', 'Steel'], weaknesses: ['Fire', 'Water', 'Fighting'], doubleWeaknesses: [] },
  { pokemon: "Farfetch'd", types: ['Normal', 'Flying'], weaknesses: ['Electric', 'Ice', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Doduo', types: ['Normal', 'Flying'], weaknesses: ['Electric', 'Ice', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Dodrio', types: ['Normal', 'Flying'], weaknesses: ['Electric', 'Ice', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Dewgong', types: ['Water', 'Ice'], weaknesses: ['Electric', 'Grass', 'Fighting', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Muk (Alolan)', types: ['Poison', 'Dark'], weaknesses: ['Ground'], doubleWeaknesses: [] },
  { pokemon: 'Cloyster', types: ['Water', 'Ice'], weaknesses: ['Electric', 'Grass', 'Fighting', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Gengar', types: ['Ghost', 'Poison'], weaknesses: ['Ground', 'Psychic', 'Ghost', 'Dark'], doubleWeaknesses: [] },
  { pokemon: 'Onix', types: ['Rock', 'Ground'], weaknesses: ['Water', 'Grass', 'Ice', 'Fighting', 'Ground', 'Steel'], doubleWeaknesses: [] },
  { pokemon: 'Exeggutor', types: ['Grass', 'Psychic'], weaknesses: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug', 'Ghost', 'Dark'], doubleWeaknesses: [] },
  { pokemon: 'Marowak (Alolan)', types: ['Fire', 'Ghost'], weaknesses: ['Water', 'Ground', 'Rock', 'Ghost', 'Dark'], doubleWeaknesses: [] },
  { pokemon: 'Weezing', types: ['Poison'], weaknesses: ['Ground', 'Psychic'], doubleWeaknesses: [] },
  { pokemon: 'Rhydon', types: ['Ground', 'Rock'], weaknesses: ['Water', 'Grass', 'Ice', 'Fighting', 'Ground', 'Steel'], doubleWeaknesses: ['Water', 'Grass'] },
  { pokemon: 'Tangela', types: ['Grass'], weaknesses: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'], doubleWeaknesses: [] },
  { pokemon: 'Gyarados', types: ['Water', 'Flying'], weaknesses: ['Electric', 'Rock'], doubleWeaknesses: ['Electric'] },
  { pokemon: 'Lapras', types: ['Water', 'Ice'], weaknesses: ['Electric', 'Grass', 'Fighting', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Omanyte', types: ['Rock', 'Water'], weaknesses: ['Electric', 'Grass', 'Fighting', 'Ground'], doubleWeaknesses: ['Grass'] },
  { pokemon: 'Omastar', types: ['Rock', 'Water'], weaknesses: ['Electric', 'Grass', 'Fighting', 'Ground'], doubleWeaknesses: ['Grass'] },
  { pokemon: 'Kabuto', types: ['Rock', 'Water'], weaknesses: ['Electric', 'Grass', 'Fighting', 'Ground'], doubleWeaknesses: ['Grass'] },
  { pokemon: 'Kabutops', types: ['Rock', 'Water'], weaknesses: ['Electric', 'Grass', 'Fighting', 'Ground'], doubleWeaknesses: ['Grass'] },
  { pokemon: 'Aerodactyl', types: ['Rock', 'Flying'], weaknesses: ['Water', 'Electric', 'Ice', 'Steel'], doubleWeaknesses: [] },
  { pokemon: 'Articuno', types: ['Ice', 'Flying'], weaknesses: ['Fire', 'Electric', 'Steel'], doubleWeaknesses: ['Rock'] },
  { pokemon: 'Zapdos', types: ['Electric', 'Flying'], weaknesses: ['Ice', 'Rock'], doubleWeaknesses: [] },
  { pokemon: 'Moltres', types: ['Fire', 'Flying'], weaknesses: ['Water', 'Electric'], doubleWeaknesses: ['Rock'] },
  { pokemon: 'Dragonite', types: ['Dragon', 'Flying'], weaknesses: ['Dragon', 'Fairy'], doubleWeaknesses: ['Ice'] },
  { pokemon: 'Mr. Mime', types: ['Psychic', 'Fairy'], weaknesses: ['Poison', 'Ghost', 'Steel'], doubleWeaknesses: [] },
  { pokemon: 'Jynx', types: ['Ice', 'Psychic'], weaknesses: ['Fire', 'Bug', 'Rock', 'Ghost', 'Dark', 'Steel'], doubleWeaknesses: [] },
  { pokemon: 'Slowbro', types: ['Water', 'Psychic'], weaknesses: ['Electric', 'Grass', 'Bug', 'Ghost', 'Dark'], doubleWeaknesses: [] },
  { pokemon: 'Tentacruel', types: ['Water', 'Poison'], weaknesses: ['Electric', 'Ground', 'Psychic'], doubleWeaknesses: [] },
  { pokemon: 'Graveler', types: ['Rock', 'Ground'], weaknesses: ['Water', 'Grass', 'Ice', 'Fighting', 'Ground', 'Steel'], doubleWeaknesses: ['Water', 'Grass'] },
  { pokemon: 'Golem', types: ['Rock', 'Ground'], weaknesses: ['Water', 'Grass', 'Ice', 'Fighting', 'Ground', 'Steel'], doubleWeaknesses: ['Water', 'Grass'] },
  { pokemon: 'Alolan Exeggutor', types: ['Grass', 'Dragon'], weaknesses: ['Ice', 'Poison', 'Flying', 'Bug', 'Dragon', 'Fairy'], doubleWeaknesses: ['Ice'] },
  { pokemon: 'Alolan Ninetales', types: ['Ice', 'Fairy'], weaknesses: ['Fire', 'Poison', 'Rock', 'Steel'], doubleWeaknesses: [] },
  { pokemon: 'Galarian Rapidash', types: ['Psychic', 'Fairy'], weaknesses: ['Poison', 'Ghost', 'Steel'], doubleWeaknesses: [] },
  { pokemon: 'Galarian Weezing', types: ['Poison', 'Fairy'], weaknesses: ['Ground', 'Psychic', 'Steel'], doubleWeaknesses: [] },
  { pokemon: 'Galarian Mr. Mime', types: ['Ice', 'Psychic'], weaknesses: ['Fire', 'Bug', 'Rock', 'Ghost', 'Dark', 'Steel'], doubleWeaknesses: [] },
  { pokemon: "Galarian Farfetch'd", types: ['Fighting'], weaknesses: ['Flying', 'Psychic', 'Fairy'], doubleWeaknesses: [] },
]

export const damageMultipliers = [
  { value: '2.56×', meaning: 'Double weakness' },
  { value: '1.6×', meaning: 'Normal weakness' },
  { value: '1×', meaning: 'Neutral damage' },
  { value: '0.625×', meaning: 'Resistance' },
  { value: '0.391×', meaning: 'Double resistance' },
]

export const kantoWeaknessSources = [
  { label: 'PogoHelp · Released Pokémon GO Pokédex', href: 'https://pogohelp.app/en/pokemon?utm_source=chatgpt.com' },
  { label: 'Pokémon GO Hub · Pokédex', href: 'https://db.pokemongohub.net/tools/pokedex?utm_source=chatgpt.com' },
  { label: 'Pokémon Database · GO type chart', href: 'https://pokemondb.net/go/type?utm_source=chatgpt.com' },
]
