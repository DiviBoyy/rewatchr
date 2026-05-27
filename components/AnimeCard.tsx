import Link from "next/link";
import { Anime } from "@/lib/mockAnime";

export function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Link href={`/anime/${anime.id}`} className="anime-card">
      <img src={anime.poster} alt={anime.title} />
      <div>
        <h3>{anime.title}</h3>
        <p>{anime.japaneseTitle}</p>
        <div className="card-meta"><span>{anime.type} / {anime.year}</span><span>{anime.rating}/10</span></div>
        <div className="card-meta"><span>{anime.genres.slice(0, 2).join(", ")}</span><span>{anime.status}</span></div>
      </div>
    </Link>
  );
}
