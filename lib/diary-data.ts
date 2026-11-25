export type ContentBlock =
  | {
      id: string
      title: string
      type: 'paragraphs'
      paragraphs: string[]
      sources?: string[]
    }
  | {
      id: string
      title: string
      type: 'list'
      lead?: string | string[]
      items: string[]
      sources?: string[]
    }
  | {
      id: string
      title: string
      type: 'table'
      lead?: string | string[]
      columns: string[]
      rows: string[][]
      note?: string
      sources?: string[]
    }
  | {
      id: string
      title: string
      type: 'team'
      lead?: string | string[]
      items: { title: string; details: string }[]
      sources?: string[]
    }
  | {
      id: string
      title: string
      type: 'pairs'
      lead?: string | string[]
      items: { label: string; value: string }[]
      sources?: string[]
    }
  | {
      id: string
      title: string
      type: 'facts'
      items: { label: string; value: string; detail?: string }[]
      sources?: string[]
    }

export type DiaryEvent = {
  id: string
  date: string
  /** First day the event applies to, as a local calendar date (YYYY-MM-DD). */
  startDate: string
  /** Last day the event applies to, as a local calendar date (YYYY-MM-DD). */
  endDate: string
  title: string
  subtitle?: string
  blocks: ContentBlock[]
}

export const introduction = {
  title: "📖 Sahul's Pokémon GO Raid & Event Diary",
  dateRange: '23–29 November 2026 · Complete battle preparation guide',
  paragraphs: [
    'Your objective this week is to prepare for every event, win raids efficiently, catch 100% IV Pokémon, collect Mega Energy, and make the most of Dynamax battles.',
    "I'll organise this as a Pokémon GO battle diary in event order, covering:",
  ],
  coverage: [
    '1. Pokémon weaknesses and type effectiveness.',
    '2. Best raid counters, including movesets.',
    '3. 100% IV (Hundo) CP values after raids.',
    '4. Weather-boosted Hundo CP values.',
    '5. Dynamax battle preparation.',
    '6. Mega Raids, Raid Hours and Super Mega Raids.',
    '7. Daily checklist and preparation strategy.',
  ],
  note: 'Important: A 100% IV Pokémon has 15 Attack, 15 Defense and 15 HP IVs. The CP values below need to be distinguished between normal and weather-boosted raid catches.',
}

export const events: DiaryEvent[] = [
  {
    id: 'monday-espurr',
    date: 'Monday, November 23',
    startDate: '2026-11-23',
    endDate: '2026-11-23',
    title: 'Dynamax Espurr',
    subtitle: 'Max Battle preparation',
    blocks: [
      {
        id: 'espurr-debut',
        title: 'Dynamax Espurr debut',
        type: 'paragraphs',
        paragraphs: ['Psychic type · Weak to Bug, Dark and Ghost'],
      },
      {
        id: 'espurr-weaknesses',
        title: 'Weaknesses',
        type: 'pairs',
        lead: 'Espurr is a pure Psychic-type Pokémon.',
        items: [
          { label: 'Ghost', value: 'Super effective' },
          { label: 'Dark', value: 'Super effective' },
          { label: 'Bug', value: 'Super effective' },
        ],
      },
      {
        id: 'espurr-counters',
        title: 'Best Dynamax / Gigantamax counters',
        type: 'table',
        columns: ['Priority', 'Pokémon', 'Recommended Max move'],
        rows: [
          ['1', 'Gigantamax Gengar', 'G-Max Terror'],
          ['2', 'Gigantamax Grimmsnarl', 'G-Max Snooze'],
          ['3', 'Dynamax Gengar', 'Max Phantasm'],
          ['4', 'Dynamax Hydreigon', 'Max Darkness'],
          ['5', 'Dynamax Urshifu (Single Strike)', 'Max Darkness'],
          ['6', 'Dynamax Weavile', 'Max Darkness'],
        ],
        sources: ['Pokémon GO Database+1'],
      },
      {
        id: 'espurr-team',
        title: 'Recommended battle team',
        type: 'team',
        items: [
          { title: 'Attacker: Gigantamax Gengar', details: 'Lick + G-Max Terror' },
          { title: 'Defender: Dynamax Hydreigon', details: 'Bite / Dragon Breath · Max Darkness' },
          { title: 'Support: Dynamax Blissey', details: 'Pound · Max Spirit for healing' },
        ],
      },
      {
        id: 'espurr-strategy',
        title: 'Battle strategy',
        type: 'list',
        items: [
          'Use Hydreigon to absorb damage and build the Max Meter.',
          'Switch to Gengar when you can unleash Max attacks.',
          "Use Blissey's Max Spirit when your team needs healing.",
          'Upgrade Max Guard and Max Spirit if you have sufficient Candy and Max Particles.',
        ],
      },
      {
        id: 'espurr-ranking-note',
        title: 'Counter ranking note',
        type: 'paragraphs',
        paragraphs: [
          'The Espurr counter rankings are based on currently available Max Battle simulations; exact boss stats can vary or remain unconfirmed.',
        ],
        sources: ['Pokémon GO Database+1'],
      },
    ],
  },
  {
    id: 'tuesday-twilight-wishes',
    date: 'Tuesday, November 24',
    startDate: '2026-11-24',
    endDate: '2026-11-24',
    title: 'Twilight Wishes',
    blocks: [
      {
        id: 'twilight-wishes-dates',
        title: 'Event dates',
        type: 'paragraphs',
        paragraphs: ['This event starts at 10 a.m. local time and runs until November 30 at 8 p.m.'],
      },
      {
        id: 'sun-scarf-espeon-counters',
        title: 'A. Sun Scarf Espeon — 3-star raid',
        type: 'table',
        lead: ['Type: Psychic', 'Weaknesses: Ghost, Dark, Bug'],
        columns: ['Best counters', 'Fast move', 'Charged move'],
        rows: [
          ['Dawn Wings Necrozma', 'Shadow Claw', 'Moongeist Beam'],
          ['Shadow Darkrai', 'Snarl', 'Foul Play'],
          ['Mega Absol', 'Snarl', 'Brutal Swing'],
          ['Mega Houndoom', 'Snarl', 'Dark Pulse'],
          ['Mega Gengar', 'Lick', 'Shadow Ball'],
          ['Shadow Hydreigon', 'Bite', 'Brutal Swing'],
        ],
        sources: ['Pokémon GO Database'],
      },
      {
        id: 'sun-scarf-espeon-cp',
        title: 'Sun Scarf Espeon · 100% IV CP targets',
        type: 'table',
        columns: ['Weather', 'Hundo CP'],
        rows: [
          ['Normal weather', '1811'],
          ['Windy weather', '2264'],
        ],
        note: 'Raid catch range: 1730–1811 CP / weather boosted: 2162–2264 CP.',
        sources: ['Pokémon GO Database'],
      },
      {
        id: 'moon-scarf-umbreon-counters',
        title: 'B. Moon Scarf Umbreon — 3-star raid',
        type: 'table',
        lead: ['Type: Dark', 'Weaknesses: Fighting, Bug, Fairy'],
        columns: ['Best counters', 'Fast move', 'Charged move'],
        rows: [
          ['Mega Lucario', 'Force Palm', 'Aura Sphere'],
          ['Mega Mewtwo X', 'Counter', 'Dynamic Punch'],
          ['Mega Blaziken', 'Counter', 'Aura Sphere'],
          ['Shadow Blaziken', 'Counter', 'Aura Sphere'],
          ['Mega Gallade', 'Low Kick', 'Sacred Sword'],
          ['Keldeo (Resolute)', 'Low Kick', 'Secret Sword'],
        ],
        sources: ['Pokémon GO Database'],
      },
      {
        id: 'moon-scarf-umbreon-cp',
        title: 'Moon Scarf Umbreon · 100% IV CP targets',
        type: 'table',
        columns: ['Weather', 'Hundo CP'],
        rows: [
          ['Normal weather', '1221'],
          ['Fog weather', '1526'],
        ],
        note: 'Raid catch range: 1153–1221 CP / weather boosted: 1442–1526 CP.',
        sources: ['Pokémon GO Database'],
      },
      {
        id: 'twilight-wishes-recommendation',
        title: 'Collection recommendation',
        type: 'paragraphs',
        paragraphs: [
          'My recommendation: Prioritise collecting both costume Pokémon. Their costumes make them special collection targets, regardless of whether you intend to use them in raids.',
        ],
      },
    ],
  },
  {
    id: 'wednesday-deoxys-metagross',
    date: 'Wednesday, November 25',
    startDate: '2026-11-25',
    endDate: '2026-11-25',
    title: 'Deoxys Raid Hour + Mega Metagross',
    subtitle: 'Highest raid priority of the week',
    blocks: [
      {
        id: 'deoxys-raid-hour',
        title: 'Deoxys Raid Hour',
        type: 'paragraphs',
        paragraphs: [
          'This is the day to build your Deoxys collection. All four formes appear in 5-star raids, with Raid Hour from 6–7 p.m. local time.',
        ],
        sources: ['as.com'],
      },
      {
        id: 'deoxys-weaknesses',
        title: 'A. Deoxys — common weaknesses',
        type: 'table',
        lead: 'All four Deoxys formes are pure Psychic type.',
        columns: ['Attack type', 'Effectiveness'],
        rows: [
          ['Ghost', 'Super effective'],
          ['Dark', 'Super effective'],
          ['Bug', 'Super effective'],
        ],
        note: 'Build one strong Ghost/Dark raid team and reuse it for all four formes.',
      },
      {
        id: 'deoxys-counters',
        title: 'Best counters for all four Deoxys formes',
        type: 'table',
        columns: ['Pokémon', 'Fast move', 'Charged move'],
        rows: [
          ['Dawn Wings Necrozma', 'Shadow Claw', 'Moongeist Beam'],
          ['Mega Chandelure', 'Hex', 'Ominous Wind+'],
          ['Mega Tyranitar', 'Bite', 'Brutal Swing'],
          ['Shadow Darkrai', 'Snarl', 'Foul Play'],
          ['Shadow Tyranitar', 'Bite', 'Brutal Swing'],
          ['Shadow Hydreigon', 'Bite', 'Brutal Swing'],
          ['Mega Gengar', 'Lick', 'Shadow Ball'],
          ['Mega Absol', 'Snarl', 'Brutal Swing'],
          ['Mega Mewtwo Y', 'Psycho Cut', 'Shadow Ball'],
        ],
        note: 'These are strong general-purpose options; exact rankings differ by Deoxys forme.',
        sources: ['Pokémon GO Database+2'],
      },
      {
        id: 'deoxys-cp',
        title: 'B. Deoxys 100% IV CP cheat sheet',
        type: 'table',
        lead: 'This is particularly important. Save these numbers before Raid Hour.',
        columns: ['Forme', 'Normal', 'Weather boosted'],
        rows: [
          ['Normal Forme', '1806 CP', '2257 CP'],
          ['Attack Forme', '1474 CP', '1842 CP'],
          ['Defense Forme', '1299 CP', '1624 CP'],
          ['Speed Forme', '1645 CP', '2056 CP'],
        ],
        note: 'All four numbers are 100% IV raid-catch CPs at level 20 or level 25 when weather boosted.',
        sources: ['Sources:', 'Pokémon GO Database+3'],
      },
      {
        id: 'deoxys-priorities',
        title: 'C. Which Deoxys should you prioritise?',
        type: 'table',
        columns: ['Forme', 'Raid difficulty', 'Collection priority'],
        rows: [
          ['Attack', 'Easier', 'High'],
          ['Normal', 'Moderate', 'High'],
          ['Speed', 'Moderate', 'High'],
          ['Defense', 'Hardest', 'Very high'],
        ],
      },
      {
        id: 'deoxys-planning',
        title: 'Deoxys raid planning',
        type: 'list',
        items: [
          'Attack Forme has extremely high Attack but low Defense and can be soloed by strong trainers.',
          'Defense Forme has extremely high Defense. Bring a larger, stronger group.',
          'Normal and Speed Formes are intermediate targets.',
          'For planning, aim for 2–5 experienced trainers against Normal, 4–6 against Defense, and approximately 2–4 against Speed.',
        ],
        sources: ['Pokémon GO Hub+3'],
      },
      {
        id: 'mega-metagross-weaknesses',
        title: 'D. Mega Metagross — Mega Raid',
        type: 'list',
        lead: ['Mega Metagross', 'Steel / Psychic', 'Four weaknesses', 'Weaknesses:'],
        items: ['Fire', 'Ground', 'Ghost', 'Dark'],
      },
      {
        id: 'mega-metagross-counters',
        title: 'Best counters',
        type: 'table',
        columns: ['Pokémon', 'Fast move', 'Charged move'],
        rows: [
          ['Mega Delphox', 'Fire Spin', 'Blast Burn'],
          ['Mega Charizard Y', 'Fire Spin', 'Blast Burn'],
          ['Mega Chandelure', 'Fire Spin', 'Ominous Wind+'],
          ['Primal Groudon', 'Mud Shot', 'Precipice Blades'],
          ['Dawn Wings Necrozma', 'Shadow Claw', 'Moongeist Beam'],
          ['Shadow Reshiram', 'Fire Fang', 'Fusion Flare'],
          ['Mega Blaziken', 'Fire Spin', 'Blast Burn'],
          ['Mega Tyranitar', 'Bite', 'Brutal Swing'],
        ],
        sources: ['Pokémon GO Database+1'],
      },
      {
        id: 'metagross-cp',
        title: 'Metagross Hundo CP after Mega Raid',
        type: 'table',
        columns: ['Weather', '100% IV'],
        rows: [
          ['Normal weather', '2166'],
          ['Snow / Windy', '2708'],
        ],
        sources: ['Pokémon GO Database+1'],
      },
      {
        id: 'metagross-catch-note',
        title: 'Mega Metagross catch note',
        type: 'paragraphs',
        paragraphs: [
          'Important: You catch regular Metagross after defeating Mega Metagross, not its Mega form. You can then Mega Evolve it using Mega Energy.',
        ],
      },
    ],
  },
  {
    id: 'thursday-noibat',
    date: 'Thursday, November 26',
    startDate: '2026-11-26',
    endDate: '2026-11-26',
    title: 'Noibat Spotlight Hour',
    subtitle: '2× Catch Candy\n6–7 p.m. local time',
    blocks: [
      {
        id: 'noibat-spotlight-hour',
        title: 'Noibat Spotlight Hour',
        type: 'paragraphs',
        paragraphs: [
          'This is not a raid event, but it is an excellent opportunity to collect Noibat Candy and evolve Noibat into Noivern.',
        ],
      },
      {
        id: 'noibat-weaknesses',
        title: 'Noibat weaknesses',
        type: 'list',
        lead: 'Noibat is Dragon / Flying.',
        items: [
          'Ice — double weakness (2.56× damage)',
          'Rock',
          'Dragon',
          'Fairy',
        ],
      },
      {
        id: 'noibat-counters',
        title: 'Best Pokémon to use against Noibat',
        type: 'table',
        columns: ['Pokémon', 'Fast move', 'Charged move'],
        rows: [
          ['Darmanitan (Galarian)', 'Ice Fang', 'Avalanche'],
          ['Mamoswine', 'Powder Snow', 'Avalanche'],
          ['Baxcalibur', 'Ice Fang', 'Avalanche'],
          ['Mega Glalie', 'Frost Breath', 'Avalanche'],
          ['Mega Abomasnow', 'Powder Snow', 'Weather Ball (Ice)'],
          ['Kyurem', 'Dragon Breath', 'Glaciate'],
        ],
      },
      {
        id: 'noibat-farming',
        title: 'Your Noibat farming strategy',
        type: 'list',
        items: [
          'Use Pinap Berries for additional Candy.',
          'Use Mega Pokémon of Dragon or Flying type to gain extra Candy through type matching.',
          'Activate a Mega Evolution with a high Mega Level.',
          'Use Ultra Balls when you find high-IV Noibat.',
          'Check IVs before transferring.',
          'Save high-IV Noibat for evolving and powering up.',
        ],
      },
      {
        id: 'noibat-hundo-note',
        title: 'Hundo hunting',
        type: 'paragraphs',
        paragraphs: [
          "Noibat's wild CP does not have one universal Hundo number because wild Pokémon levels vary. Use the in-game appraisal rather than relying on a single CP value.",
        ],
      },
    ],
  },
  {
    id: 'friday-friendship',
    date: 'Friday, November 27',
    startDate: '2026-11-27',
    endDate: '2026-11-27',
    title: 'Friendship Friday + Global Challenge',
    blocks: [
      {
        id: 'friendship-friday-intro',
        title: 'Friday preparation',
        type: 'paragraphs',
        paragraphs: [
          'Friday is preparation day for Mega Clefable.',
          'The Global Challenge begins at 5 p.m. PST. For India, that is approximately 6:30 a.m. IST on Saturday, November 28.',
        ],
        sources: ['pokemondex.com'],
      },
      {
        id: 'friendship-friday-objectives',
        title: 'Your objectives',
        type: 'list',
        items: [
          'Complete raids with friends.',
          'Increase friendship interactions.',
          'Coordinate your Super Mega Raid team.',
          'Help complete the Global Challenge tiers.',
          'Prepare your Steel-type counters.',
        ],
      },
      {
        id: 'global-challenge-rewards',
        title: 'Global Challenge rewards',
        type: 'paragraphs',
        paragraphs: [
          "The challenge rewards will improve Mega Clefable's Moonblast+ or Super Max CP bonuses, depending on the tiers completed.",
        ],
        sources: ['Pokémon GO+1'],
      },
    ],
  },
  {
    id: 'saturday-mega-clefable',
    date: 'Saturday, November 28',
    startDate: '2026-11-28',
    endDate: '2026-11-28',
    title: 'Mega Clefable Super Mega Raid Day',
    subtitle: 'Major event of the week',
    blocks: [
      {
        id: 'clefable-raid-day',
        title: '',
        type: 'facts',
        items: [
          { label: 'Event timing', value: '2–5 PM', detail: 'Local time · Saturday' },
          { label: 'Raid rewards', value: '6', detail: 'Free Raid Passes available' },
        ],
        sources: ['db.pokemongohub.net'],
      },
      {
        id: 'mega-clefable-weaknesses',
        title: 'A. Mega Clefable weaknesses',
        type: 'table',
        lead: 'Mega Clefable is different from regular Clefable.',
        columns: ['Form', 'Type'],
        rows: [
          ['Regular Clefable', 'Fairy'],
          ['Mega Clefable', 'Fairy / Flying'],
        ],
      },
      {
        id: 'mega-clefable-weakness-list',
        title: 'Mega Clefable weaknesses:',
        type: 'list',
        items: ['Steel', 'Electric', 'Ice', 'Poison', 'Rock'],
      },
      {
        id: 'mega-clefable-counters',
        title: 'B. Best Mega Clefable counters',
        type: 'table',
        lead: 'This is the team I would prepare first.',
        columns: ['Priority', 'Pokémon', 'Fast move', 'Charged move'],
        rows: [
          ['1', 'Crowned Sword Zacian', 'Metal Claw', 'Behemoth Blade'],
          ['2', 'Dusk Mane Necrozma', 'Metal Claw', 'Sunsteel Strike'],
          ['3', 'Crowned Shield Zamazenta', 'Metal Claw', 'Behemoth Bash'],
          ['4', 'Shadow Metagross', 'Bullet Punch', 'Meteor Mash'],
          ['5', 'Mega Metagross', 'Bullet Punch', 'Meteor Mash'],
          ['6', 'White Kyurem', 'Ice Fang', 'Ice Burn'],
          ['7', 'Shadow Thundurus (Therian)', 'Volt Switch', 'Wildbolt Storm'],
        ],
        sources: ['Pokémon GO Database'],
      },
      {
        id: 'mega-clefable-team',
        title: 'My recommended six-Pokémon lineup',
        type: 'team',
        items: [
          { title: 'Crowned Sword Zacian', details: '' },
          { title: 'Dusk Mane Necrozma', details: '' },
          { title: 'Shadow Metagross', details: '' },
          { title: 'Mega Metagross', details: '' },
          { title: 'White Kyurem', details: '' },
          { title: 'Therian Thundurus', details: '' },
        ],
      },
      {
        id: 'clefable-hundo-cp',
        title: 'C. 100% IV Clefable CP after the raid',
        type: 'table',
        lead: 'Clefable encounter · The Pokémon you catch after defeating Mega Clefable',
        columns: ['Weather', '100% IV CP'],
        rows: [
          ['Normal weather', '1392'],
          ['Weather boosted', '1741'],
        ],
        note: 'Normal raid range: 1322–1392 CP. Weather-boosted range: 1653–1741 CP.',
        sources: ['Pokémon GO Database+1'],
      },
      {
        id: 'clefable-catch-note',
        title: 'Mega Clefable catch note',
        type: 'paragraphs',
        paragraphs: [
          "Important distinction: The catch is Clefable with Mega Level 1 unlocked. You don't catch a permanently Mega-Evolved Pokémon. Mega Evolution remains temporary.",
        ],
      },
      {
        id: 'super-mega-raid-preparation',
        title: 'D. Super Mega Raid preparation',
        type: 'list',
        lead: "Super Mega Raids are designed for coordinated groups. Don't assume an ordinary Mega Raid team size will be sufficient.",
        items: [
          'Arrange a group before reaching the Gym.',
          'Bring multiple powered-up Steel attackers.',
          'Coordinate Mega Energy requirements.',
          'Keep backup Pokémon ready.',
          'Revive and heal your attackers between raids.',
        ],
      },
      {
        id: 'clefable-event-rewards',
        title: 'E. Important event rewards',
        type: 'table',
        columns: ['Reward', 'Details'],
        rows: [
          ['Free Raid Passes', 'Up to 6'],
          ['Shiny', 'Increased Shiny Clefable chance'],
          ['Mega Level', 'Clefable starts at Mega Level 1'],
          ['Timed Research', 'Premium Battle Pass + Metagross encounter'],
          ['Global Challenge', 'Bonuses for Mega Clefable'],
          ['Ticket', 'Up to 14 free Raid Passes with ticket bonuses'],
        ],
      },
      {
        id: 'clefable-super-max-level',
        title: 'Mega progression',
        type: 'paragraphs',
        paragraphs: [
          'Mega Clefable can progress to Super Max Level. It must reach Max Mega Level first, and additional Mega Energy and Mega Raid participation are required.',
          'It also gets the special Charged Attack Moonblast+, with 160 power in raids at its base event specification.',
        ],
        sources: ['Pokémon GO+1'],
      },
    ],
  },
  {
    id: 'sunday-scenic',
    date: 'Sunday, November 29',
    startDate: '2026-11-29',
    endDate: '2026-11-29',
    title: 'Scenic Sunday',
    blocks: [
      {
        id: 'scenic-sunday-list',
        title: 'Your final day',
        type: 'list',
        lead: 'Your final day should be about completing your collection and checking your catches.',
        items: [
          'Finish any remaining Twilight Wishes raids.',
          'Look for Sun Scarf Espeon.',
          'Look for Moon Scarf Umbreon.',
          'Check your Shiny Staryu and Elgyem collection.',
          'Finish any remaining research.',
          'Check your Mega Energy balance.',
          'Appraise all your legendary and raid catches.',
        ],
        sources: ['serebii.net'],
      },
      {
        id: 'twilight-wishes-end',
        title: 'Twilight Wishes end date',
        type: 'paragraphs',
        paragraphs: [
          'Twilight Wishes ends Monday, November 30, at 8 p.m. local time, so you still have some extra time after Sunday.',
        ],
        sources: ['Pokémon GO'],
      },
    ],
  },
]

export const additionalMegaRaids = {
  id: 'additional-twilight-mega-raids',
  title: '8. Additional Twilight Wishes Mega Raids — November 24–30',
  intro: [
    "The official Twilight Wishes announcement also lists four other Mega Raid bosses. Don't miss these if you want to collect Mega Energy.",
  ],
  raids: [
    {
      pokemon: 'Mega Beedrill',
      weaknesses: 'Fire, Flying, Psychic, Rock',
      bestCounters: 'Mega Rayquaza, Mega Mewtwo Y, Mega Charizard Y',
      moveset: 'Rayquaza — Air Slash / Dragon Ascent.',
      source: 'Pokémon GO Database',
      normal: '1054',
      boosted: '1318',
    },
    {
      pokemon: 'Mega Houndoom',
      weaknesses: 'Fighting, Ground, Rock, Water',
      bestCounters: 'Mega Lucario, Primal Groudon, Primal Kyogre',
      moveset: 'Lucario — Force Palm / Aura Sphere.',
      source: 'Pokémon GO Database',
      normal: '1505',
      boosted: '1882',
    },
    {
      pokemon: 'Mega Sableye',
      weaknesses: 'Fairy only',
      bestCounters: 'Mega Gardevoir, Zacian, Enamorus',
      moveset: 'Gardevoir — Charm / Dazzling Gleam.',
      source: 'Pokémon GO Database',
      normal: '843',
      boosted: '1054',
    },
    {
      pokemon: 'Mega Manectric',
      weaknesses: 'Ground only',
      bestCounters: 'Primal Groudon, Mega Garchomp, Landorus',
      moveset: 'Primal Groudon — Mud Shot / Precipice Blades.',
      source: 'Pokémon GO Database',
      normal: '1337',
      boosted: '1672',
    },
  ],
  sources: ['Pokémon GO+1', 'Pokémon GO Database+3'],
}

export const checklistInfo = {
  title: '9. Your weekly battle preparation checklist',
  intro: 'This is the checklist I recommend following before you start raiding.',
  progressLabel: 'Weekly progress',
  initialProgress: '0/35 completed',
  resetLabel: 'Reset checklist',
}

export const checklist = [
  {
    id: 'monday',
    day: 'Monday',
    items: [
      'Prepare Gigantamax Gengar',
      'Prepare Dynamax Hydreigon',
      'Prepare Dynamax Blissey',
      'Complete Dynamax Espurr battles',
      'Finish Dynamax Trails before 8 PM',
    ],
  },
  {
    id: 'tuesday',
    day: 'Tuesday',
    items: [
      'Raid for Sun Scarf Espeon',
      'Raid for Moon Scarf Umbreon',
      'Check Espeon Hundo: 1811 / 2264',
      'Check Umbreon Hundo: 1221 / 1526',
      'Collect Mega Energy from event Mega Raids',
    ],
  },
  {
    id: 'wednesday',
    day: 'Wednesday',
    items: [
      'Prepare Ghost and Dark attackers',
      'Raid all four Deoxys formes',
      'Check all four Hundo CP values',
      'Mega Raid Mega Metagross',
      'Check Metagross Hundo: 2166 / 2708',
    ],
  },
  {
    id: 'thursday',
    day: 'Thursday',
    items: [
      'Activate a suitable Mega Evolution',
      'Use Pinap Berries on Noibat',
      'Collect Noibat Candy',
      'Check Noibat IVs',
      'Complete GO Battle Thursday',
    ],
  },
  {
    id: 'friday',
    day: 'Friday',
    items: [
      'Complete Friendship Friday activities',
      'Coordinate raid groups',
      'Prepare Steel attackers for Mega Clefable',
      'Participate in Global Challenge',
    ],
  },
  {
    id: 'saturday',
    day: 'Saturday',
    items: [
      'Collect six free Raid Passes from Gyms',
      'Prepare your Mega Clefable counter team',
      'Complete Super Mega Raids',
      'Check Clefable Hundo: 1392 / 1741',
      'Complete Timed Research',
      'Claim Metagross encounter',
    ],
  },
  {
    id: 'sunday',
    day: 'Sunday',
    items: [
      'Complete remaining Twilight Wishes raids',
      'Check Shiny collection',
      'Appraise all raid catches',
      'Check Mega Energy',
      'Complete Scenic Sunday',
    ],
  },
]

export const hundoReference = {
  id: 'hundo-reference',
  title: '10. Your ultimate Hundo CP reference sheet',
  intro: 'Save this section. These are the most important catch-screen numbers for the week.',
  rows: [
    ['Deoxys Normal', '1806', '2257'],
    ['Deoxys Attack', '1474', '1842'],
    ['Deoxys Defense', '1299', '1624'],
    ['Deoxys Speed', '1645', '2056'],
    ['Metagross', '2166', '2708'],
    ['Espeon', '1811', '2264'],
    ['Umbreon', '1221', '1526'],
    ['Clefable', '1392', '1741'],
    ['Beedrill', '1054', '1318'],
    ['Houndoom', '1505', '1882'],
    ['Sableye', '843', '1054'],
    ['Manectric', '1337', '1672'],
  ],
  notes: [
    'All CP values refer to 100% IV (15/15/15) catches. Weather conditions vary by Pokémon. Mega raid catches are generally the regular Pokémon, not the Mega form. Dynamax encounters and wild encounters have different CP rules.',
    'One important Hundo tip: CP alone is not enough to identify every 100% IV Pokémon. Always use Appraise and check that Attack, Defense and HP are all three stars and completely filled.',
  ],
  sources: ['Pokémon GO Database+3'],
}

export const raidStrategies = {
  id: 'raid-strategies',
  title: '11. Five strategies to maximise your raid wins',
  items: [
    'Use Party Power: Raid with friends in a party and activate Party Power to boost charged attacks.',
    'Use type-matched Mega Pokémon: They boost your team\'s matching attacks and provide additional Candy when catching Pokémon.',
    'Avoid unnecessary relobbies: Prepare six suitable counters and revive your team between battles.',
    'Use weather boosts: Windy boosts Psychic and Dragon attacks, Fog boosts Dark and Ghost, and Sunny boosts Fire and Ground.',
    'Prioritise damage over CP: A Pokémon with a lower CP but a super-effective moveset can outperform a much higher-CP Pokémon with the wrong moves.',
  ],
}

export const raidResources = {
  id: 'raid-resources',
  title: '12. Useful raid resources',
  intro: 'These are worth bookmarking:',
  items: [
    'Pokémon GO Hub Database — Counters, movesets, weaknesses and IV charts.',
    'Pokebattler — Raid simulations and team performance.',
    'Leek Duck Events — Event calendars, raids and research.',
    'Official Pokémon GO News — Official event announcements.',
  ],
}

export const closingNotes = [
  "My final recommendation: Make Wednesday your Deoxys collection day and Saturday your Mega Clefable day. Those are the two days I'd prioritise for coordinated group raids. On Monday, build your Dynamax team; on Tuesday, hunt the scarf-wearing Eeveelutions.",
  'One correction to keep in mind: the Dynamax Trails event ends at 8 p.m. Monday, while the Espurr Max Monday schedule is listed separately. Check the in-game event timer before planning your final battles.',
  'Happy raiding! ⚔️',
]
