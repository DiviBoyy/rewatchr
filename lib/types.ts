export type AnimeStatus = "Watching" | "Completed" | "Plan to Watch" | "Dropped" | "On Hold";

export type AnimeSummary = {
  id: number;
  title: { romaji: string; english?: string | null; native?: string | null };
  coverImage: { extraLarge: string; large: string; color?: string | null };
  bannerImage?: string | null;
  format?: string | null;
  status?: string | null;
  episodes?: number | null;
  duration?: number | null;
  averageScore?: number | null;
  season?: string | null;
  seasonYear?: number | null;
  startDate?: { year?: number | null; month?: number | null; day?: number | null };
  genres: string[];
  studios?: { nodes: { name: string }[] };
  description?: string | null;
  trailer?: { id?: string | null; site?: string | null } | null;
  ageRating?: string | null;
};

export type WatchItem = {
  id: string;
  animeId: number;
  animeTitle: string;
  animePoster: string;
  status: AnimeStatus;
  episodesWatched: number;
  totalEpisodes: number;
  userRating: number;
  rewatchWorthy: boolean;
  personalNote: string;
  genres: string[];
  year?: number | null;
  updatedAt: string;
};

export type Comment = {
  id: string;
  animeId: number;
  username: string;
  comment: string;
  createdAt: string;
};
