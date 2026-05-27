export type AnimeStatus = "Watching" | "Completed" | "Plan to Watch" | "Dropped" | "On Hold";

export type Anime = {
  id: number;
  title: string;
  japaneseTitle: string;
  type: string;
  status: string;
  ageRating: string;
  episodes: number;
  duration: string;
  year: number;
  rating: number;
  genres: string[];
  poster: string;
  banner: string;
  description: string;
};

export type WatchItem = {
  animeId: number;
  animeTitle: string;
  poster: string;
  status: AnimeStatus;
  episodesWatched: number;
  totalEpisodes: number;
  rating: number;
  rewatch: boolean;
  note: string;
  genres: string[];
};

export const animeList: Anime[] = [
  {
    id: 16498,
    title: "Attack on Titan",
    japaneseTitle: "進撃の巨人",
    type: "TV",
    status: "Finished",
    ageRating: "R - 17+",
    episodes: 25,
    duration: "24 min",
    year: 2013,
    rating: 8.5,
    genres: ["Action", "Drama", "Fantasy", "Mystery"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
    description: "Humanity lives behind giant walls to survive man-eating Titans. When the walls fall, Eren Yeager joins the fight and uncovers brutal secrets about the world."
  },
  {
    id: 1535,
    title: "Death Note",
    japaneseTitle: "デスノート",
    type: "TV",
    status: "Finished",
    ageRating: "R - 17+",
    episodes: 37,
    duration: "23 min",
    year: 2006,
    rating: 8.9,
    genres: ["Mystery", "Psychological", "Supernatural"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg",
    description: "Light Yagami finds a notebook that can kill anyone whose name is written inside. His idea of justice turns into a tense battle of minds."
  },
  {
    id: 97940,
    title: "Black Clover",
    japaneseTitle: "ブラッククローバー",
    type: "TV",
    status: "Finished",
    ageRating: "PG-13",
    episodes: 170,
    duration: "24 min",
    year: 2017,
    rating: 7.8,
    genres: ["Action", "Comedy", "Fantasy"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97940-fyh8o7gNbha0.png",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/97940-1URQdQ4U1a0b.jpg",
    description: "Asta has no magic in a world ruled by it. He still aims to become Wizard King through stubborn grit, rivalry, and explosive squad battles."
  },
  {
    id: 269,
    title: "Bleach",
    japaneseTitle: "BLEACH",
    type: "TV",
    status: "Finished",
    ageRating: "PG-13",
    episodes: 366,
    duration: "24 min",
    year: 2004,
    rating: 8.0,
    genres: ["Action", "Adventure", "Supernatural"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx269-d2GmRkJbMopq.png",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/269-08ar2HJOUAuL.jpg",
    description: "Ichigo Kurosaki becomes a Soul Reaper and steps into a stylish spirit world filled with rivalries, lore, and iconic fights."
  },
  {
    id: 11061,
    title: "Hunter x Hunter",
    japaneseTitle: "HUNTER×HUNTER",
    type: "TV",
    status: "Finished",
    ageRating: "PG-13",
    episodes: 148,
    duration: "23 min",
    year: 2011,
    rating: 9.0,
    genres: ["Action", "Adventure", "Fantasy"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-y5gsT1hoHuHw.png",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11061-8WkkTZ6duKpq.jpg",
    description: "Gon becomes a Hunter to find his father. The journey starts bright and adventurous, then grows into some of anime's smartest battles."
  },
  {
    id: 21,
    title: "One Piece",
    japaneseTitle: "ONE PIECE",
    type: "TV",
    status: "Ongoing",
    ageRating: "PG-13",
    episodes: 1100,
    duration: "24 min",
    year: 1999,
    rating: 8.8,
    genres: ["Action", "Adventure", "Comedy"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
    description: "Luffy and his crew sail for the ultimate treasure. It is a massive adventure about freedom, friendship, and dreams that refuse to die."
  },
  {
    id: 154587,
    title: "Frieren",
    japaneseTitle: "葬送のフリーレン",
    type: "TV",
    status: "Finished",
    ageRating: "PG-13",
    episodes: 28,
    duration: "24 min",
    year: 2023,
    rating: 9.2,
    genres: ["Adventure", "Drama", "Fantasy"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg",
    description: "After the hero's journey ends, an elf mage learns what time, memory, and friendship really mean. Quiet, beautiful, and emotionally sharp."
  },
  {
    id: 113415,
    title: "Jujutsu Kaisen",
    japaneseTitle: "呪術廻戦",
    type: "TV",
    status: "Finished",
    ageRating: "R - 17+",
    episodes: 24,
    duration: "24 min",
    year: 2020,
    rating: 8.6,
    genres: ["Action", "Drama", "Supernatural"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    description: "Yuji Itadori enters the world of curses after swallowing a dangerous relic. The fights are slick, brutal, and packed with personality."
  },
  {
    id: 19,
    title: "Monster",
    japaneseTitle: "MONSTER",
    type: "TV",
    status: "Finished",
    ageRating: "R - 17+",
    episodes: 74,
    duration: "24 min",
    year: 2004,
    rating: 8.9,
    genres: ["Drama", "Mystery", "Psychological"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx19-gtMC64182sm4.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/19-kJhwsB0Z97tL.jpg",
    description: "A brilliant doctor hunts a former patient who became a terrifying killer. Slow-burn, grounded, and deeply unsettling."
  },
  {
    id: 13601,
    title: "Psycho-Pass",
    japaneseTitle: "PSYCHO-PASS",
    type: "TV",
    status: "Finished",
    ageRating: "R - 17+",
    episodes: 22,
    duration: "24 min",
    year: 2012,
    rating: 8.2,
    genres: ["Action", "Psychological", "Sci-Fi"],
    poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx13601-i42VFuHpqEOJ.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/13601-YrCmS1oY4uBZ.jpg",
    description: "A future justice system predicts criminal intent before crimes happen. Stylish, philosophical, and tense."
  }
];

export const watchlistKey = "rewatchr.watchlist";

export function findAnime(id: number) {
  return animeList.find((anime) => anime.id === id);
}
