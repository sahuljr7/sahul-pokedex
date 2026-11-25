# Sahul's Pokémon GO Raid & Event Diary

A simple website that keeps a week of Pokémon GO battle prep in one place. Instead of scrolling through notes and Reddit threads, you get the dates, the counters, and the numbers you need on a single page.

It covers the week of **23–29 November 2026**. The homepage opens on today's date and shows only today's events, with an interactive calendar for looking at any other day.

## What's in it

- **Daily view** — today's date and only the events scheduled for today, or a short message when the day is empty.
- **Event calendar** — a month-by-month calendar with dots on days that have event data. Click any day to see its events, and use **Today** to come back. The full event archive stays available below the calendar.
- **Event details** — each day's event (Dynamax Espurr, Twilight Wishes, Deoxys, Mega raids and so on), with the best counters, movesets and battle tips.
- **Type and weakness charts** — which types beat which, plus a dual-type chart for Pokémon that have two types at once.
- **Kanto weaknesses** — a quick list of weaknesses for the Kanto Pokémon.
- **Hundo CP sheet** — the CP numbers to look for when catching a 100% IV Pokémon after a raid, with and without weather boost.
- **Weekly checklist** — a 35-item to-do list for the week that shows how far along you are.
- **Search** — type a Pokémon, move, type or date and jump straight to the right section.

## How to run it

You need Node.js and pnpm installed.

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000 in your browser.

To make a production build:

```bash
pnpm build
pnpm start
```

## Built with

Next.js, React and Tailwind CSS. All the diary content lives in plain data files under `lib/`, so editing the guide is just editing text — no database needed.
