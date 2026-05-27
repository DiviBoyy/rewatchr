import { WatchItem } from "@/lib/types";

export const demoWatchlist: WatchItem[] = [
  {
    id: "demo-aot",
    animeId: 16498,
    animeTitle: "Attack on Titan",
    animePoster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-4I5E3Z47iGbk.png",
    status: "Completed",
    episodesWatched: 25,
    totalEpisodes: 25,
    userRating: 10,
    rewatchWorthy: true,
    personalNote: "Peak tension and ruthless reveals.",
    genres: ["Action", "Drama", "Mystery"],
    year: 2013,
    updatedAt: new Date().toISOString()
  },
  {
    id: "demo-death-note",
    animeId: 1535,
    animeTitle: "Death Note",
    animePoster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg",
    status: "Completed",
    episodesWatched: 37,
    totalEpisodes: 37,
    userRating: 9,
    rewatchWorthy: true,
    personalNote: "Mind games still hit.",
    genres: ["Mystery", "Psychological", "Supernatural"],
    year: 2006,
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "demo-black-clover",
    animeId: 97940,
    animeTitle: "Black Clover",
    animePoster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97940-O2qdE4Q7W8Z0.jpg",
    status: "Watching",
    episodesWatched: 64,
    totalEpisodes: 170,
    userRating: 8,
    rewatchWorthy: false,
    personalNote: "Hype squad energy.",
    genres: ["Action", "Comedy", "Fantasy"],
    year: 2017,
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  }
];
