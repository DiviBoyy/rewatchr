import { WatchItem } from "@/lib/types";

type AiInput = {
  question: string;
  watchlist: WatchItem[];
  stats?: {
    favoriteGenre?: string;
    averageRating?: number;
    rewatchCount?: number;
    totalAnimeWatched?: number;
  };
  selectedAnime?: {
    title?: string;
    context?: string | null;
  };
};

const recsByGenre: Record<string, string[]> = {
  Action: ["Jujutsu Kaisen", "Demon Slayer", "Hunter x Hunter", "Mob Psycho 100", "Fate/Zero"],
  Drama: ["Vinland Saga", "86 Eighty-Six", "Violet Evergarden", "March Comes in Like a Lion", "A Silent Voice"],
  Mystery: ["Monster", "Erased", "Psycho-Pass", "Odd Taxi", "Pluto"],
  Psychological: ["Monster", "Paranoia Agent", "Serial Experiments Lain", "Perfect Blue", "Kaiji"],
  Fantasy: ["Frieren: Beyond Journey's End", "Made in Abyss", "Mushoku Tensei", "Dungeon Meshi", "The Ancient Magus' Bride"],
  Comedy: ["Gintama", "Kaguya-sama: Love is War", "Saiki K.", "Grand Blue", "Spy x Family"],
  Romance: ["Fruits Basket", "Horimiya", "Toradora!", "Your Lie in April", "Kaguya-sama: Love is War"]
};

const knownComparisons: Record<string, string> = {
  "black clover|bleach": "Bro, is that even a question? lol\n\nJokes apart: Black Clover is great if you want underdog energy, magic squads, fast friendship arcs, and hype battles. Bleach is better if you want iconic character design, stronger atmosphere, Soul Society lore, and legendary fights.\n\nBased on your taste profile, I would pick Bleach if your higher ratings lean darker/action-heavy. Pick Black Clover if you want comfort shounen momentum and squad vibes.",
  "bleach|black clover": "Bro, is that even a question? lol\n\nJokes apart: Black Clover is great if you want underdog energy, magic squads, fast friendship arcs, and hype battles. Bleach is better if you want iconic character design, stronger atmosphere, Soul Society lore, and legendary fights.\n\nBased on your taste profile, I would pick Bleach if your higher ratings lean darker/action-heavy. Pick Black Clover if you want comfort shounen momentum and squad vibes."
};

function topGenres(watchlist: WatchItem[]) {
  const counts = new Map<string, number>();
  watchlist.forEach((item) => item.genres.forEach((genre) => counts.set(genre, (counts.get(genre) || 0) + Math.max(1, item.userRating || 1))));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([genre]) => genre);
}

function likedAnime(watchlist: WatchItem[]) {
  return watchlist.filter((item) => item.userRating >= 8).sort((a, b) => b.userRating - a.userRating);
}

function droppedAnime(watchlist: WatchItem[]) {
  return watchlist.filter((item) => item.status === "Dropped");
}

function makeRecommendations(input: AiInput) {
  const genres = topGenres(input.watchlist);
  const primary = genres[0] || input.stats?.favoriteGenre || "Action";
  const watchedTitles = new Set(input.watchlist.map((item) => item.animeTitle.toLowerCase()));
  const pool = [...(recsByGenre[primary] || recsByGenre.Action), ...genres.flatMap((genre) => recsByGenre[genre] || [])];
  return [...new Set(pool)].filter((title) => !watchedTitles.has(title.toLowerCase())).slice(0, 5);
}

function comparisonAnswer(question: string) {
  const normalized = question.toLowerCase();
  for (const [pair, answer] of Object.entries(knownComparisons)) {
    const [a, b] = pair.split("|");
    if (normalized.includes(a) && normalized.includes(b)) return answer;
  }
  return null;
}

function rewatchAnswer(input: AiInput) {
  const picks = input.watchlist
    .filter((item) => item.rewatchWorthy || item.userRating >= 9)
    .sort((a, b) => Number(b.rewatchWorthy) - Number(a.rewatchWorthy) || b.userRating - a.userRating)
    .slice(0, 5);

  if (!picks.length) {
    return "Bro, your rewatch shelf is looking mysterious right now.\n\nI would mark something rewatch-worthy only if it has strong favorite genres, an 8+ rating from you, and episodes you would happily sit through again without reaching for your phone.";
  }

  return `Your best rewatch candidates:\n\n${picks.map((item, index) => `${index + 1}. ${item.animeTitle} - ${item.userRating}/10${item.rewatchWorthy ? ", already marked rewatch-worthy" : ""}`).join("\n")}\n\nMy rule: rewatch the show that still sounds exciting even when you already know the twist. That is the real test.`;
}

function selectedAnimeAnswer(input: AiInput) {
  if (!input.selectedAnime?.title) return null;
  const genres = topGenres(input.watchlist).slice(0, 3);
  return `For ${input.selectedAnime.title}: based on your watchlist, I would judge it against your favorite lanes: ${genres.join(", ") || "Action, Mystery, Drama"}.\n\nQuick take: if its description matches your high-rated genres and avoids patterns from shows you dropped, it is worth trying. Give it 3 episodes. If the pacing is still not doing anything by then, no guilt, drop it like a boring recap arc.`;
}

export function answerWithMockRewatchrAI(input: AiInput) {
  const question = input.question.toLowerCase();
  const selected = selectedAnimeAnswer(input);
  const comparison = comparisonAnswer(question);
  if (comparison) return comparison;
  if (question.includes("rewatch")) return rewatchAnswer(input);
  if (selected && (question.includes("worth") || question.includes("this anime"))) return selected;

  const liked = likedAnime(input.watchlist).slice(0, 4);
  const dropped = droppedAnime(input.watchlist).slice(0, 3);
  const recs = makeRecommendations(input);
  const favoriteGenres = topGenres(input.watchlist).slice(0, 3);

  if (question.includes("death note") && question.includes("darker")) {
    return "Bro wants Death Note but darker. Respectfully concerning, but valid.\n\nTry these:\n1. Monster - slower, colder, and way more grounded.\n2. Psycho-Pass - crime, philosophy, dystopian pressure.\n3. Perfect Blue - psychological spiral, very intense.\n4. Paranoia Agent - weird, unsettling, sharp.\n5. Kaiji - mind games with desperate stakes.\n\nWarning: Monster is slow-burn. It pays off, but it does not sprint.";
  }

  return `Bro, based on your taste, I would recommend:\n\n${recs.map((title, index) => `${index + 1}. ${title}`).join("\n")}\n\nWhy: your profile leans toward ${favoriteGenres.join(", ") || input.stats?.favoriteGenre || "high-energy anime"}, and your top ratings include ${liked.map((item) => item.animeTitle).join(", ") || "a few strong picks"}.\n\n${dropped.length ? `Tiny warning: you dropped ${dropped.map((item) => item.animeTitle).join(", ")}, so I would avoid shows with similar pacing or genre mix.` : "No major drop-pattern warning yet. Your taste data is still powering up."}`;
}
