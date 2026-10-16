# Wave Scrims — Fortnite scrims community site (pitch mockup)

Next.js 14 (App Router) + TypeScript + Tailwind CSS. All data is fictional and lives in `lib/data.ts`.

## Features
- Hero with **Join Discord** button and a live countdown to the next scrim (computed from the schedule)
- Weekly schedule stored in **UTC**, displayed in the viewer's local timezone via `Intl`, with region (OCE/NA) and mode (Solos/Duos/Trios) filters
- Rules & how to join
- Sortable leaderboard (points/wins/kills) with 8 rank tiers: Bronze → Unreal
- Player profiles at `/players/<tag>` (stats, tier progress, achievements, recent scrims)
- Season playoff bracket + hall of fame
- Clip of the week voting (client-side state, gradient placeholder thumbnails)
- Sponsor placeholder slots

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start   # production
```

## Customise
- Discord invite: replace `href="#"` in `components/Nav.tsx` and `app/page.tsx`
- Schedule, players, bracket, clips: `lib/data.ts` (`utcDay` 0=Sunday, `utcHour`/`utcMinute` in UTC)
- Colours: `tailwind.config.ts`

## Push to GitHub
```bash
git init && git add . && git commit -m "Wave Scrims mockup"
git branch -M main
git remote add origin https://github.com/<you>/scrim-hq.git
git push -u origin main
```

## Deploy (Vercel)
- Dashboard: Import the GitHub repo at vercel.com/new. The framework is auto-detected as Next.js, so no config is needed.
- Or CLI: `npm i -g vercel && vercel` (preview) then `vercel --prod`.

Not affiliated with Epic Games. No Epic/Fortnite logos or assets are used.
