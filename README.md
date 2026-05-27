# Rewatchr

Rewatchr is a dark cinematic anime tracker, watchlist, rating, discovery, and AI recommendation platform. It combines AniList search/details, local demo persistence, Supabase-ready auth/database structure, and a mock rule-based anime assistant.

## Features

- Responsive premium dark UI with red accent, glass cards, hero banner, poster grids, and mobile navigation.
- AniList GraphQL search, trending sections, random discovery, and anime detail pages.
- Watchlist tracking with status, episodes watched, rating out of 10, personal notes, and rewatch-worthy toggle.
- Dashboard filters, progress bars, top-rated/recent sorting, empty states, and profile badges.
- Stats page with totals, average rating, favorite genres, completion rate, and Recharts visualizations.
- Comments per anime in local demo mode.
- Rewatchr AI chat route with a smart mock recommendation engine that uses watchlist, ratings, genres, dropped anime, and rewatch picks.
- Supabase Auth page and SQL schema for profiles, watchlist, and comments.

## Tech Stack

Next.js, TypeScript, Tailwind CSS, Supabase, AniList GraphQL API, Framer Motion, Lucide Icons, and Recharts.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill what you need:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Without Supabase keys, the app still works in demo mode using browser localStorage for watchlist and comments. Rewatchr AI is currently mock/rule-based, so it does not require a paid API key.

## Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add the Supabase URL and anon key to `.env.local`.
4. Enable email auth in Supabase Auth settings.

## Production Notes

- Move watchlist/comment writes from localStorage to Supabase mutations for authenticated users.
- Add server-side user session handling with Supabase SSR helpers if you want protected routes.
- Keep AniList calls server-side where possible to avoid exposing unnecessary client fetch complexity.
- Replace `lib/ai/mock-rewatchr-ai.ts` behind the existing `/api/ai` route when you are ready to connect a paid AI provider.
