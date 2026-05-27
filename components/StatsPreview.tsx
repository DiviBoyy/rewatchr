import { WatchItem } from "@/lib/mockAnime";

export function StatsPreview({ items }: { items: WatchItem[] }) {
  const completed = items.filter((item) => item.status === "Completed").length;
  const episodes = items.reduce((sum, item) => sum + item.episodesWatched, 0);
  const rated = items.filter((item) => item.rating > 0);
  const average = rated.length ? (rated.reduce((sum, item) => sum + item.rating, 0) / rated.length).toFixed(1) : "0.0";
  const genres = items.flatMap((item) => item.genres);
  const favorite = genres.sort((a, b) => genres.filter((genre) => genre === b).length - genres.filter((genre) => genre === a).length)[0] || "None yet";

  return (
    <section className="section" id="stats">
      <div className="section-head">
        <div>
          <span className="eyebrow">Stats</span>
          <h2>Your taste, in numbers</h2>
        </div>
      </div>
      <div className="stats-grid">
        <div><b>{completed}</b><span>Completed</span></div>
        <div><b>{episodes}</b><span>Episodes</span></div>
        <div><b>{average}</b><span>Average rating</span></div>
        <div><b>{favorite}</b><span>Favorite genre</span></div>
      </div>
    </section>
  );
}
