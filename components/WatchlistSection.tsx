"use client";

import { AnimeStatus, WatchItem } from "@/lib/mockAnime";

const statuses: AnimeStatus[] = ["Watching", "Completed", "Plan to Watch", "Dropped", "On Hold"];

export function WatchlistSection({ items, onUpdate }: { items: WatchItem[]; onUpdate: (animeId: number, updates: Partial<WatchItem>) => void }) {
  function editEpisodes(item: WatchItem) {
    const answer = window.prompt("How many episodes watched?", String(item.episodesWatched || 0));
    if (answer === null) return;
    const next = Number(answer);
    if (Number.isNaN(next)) return;
    const capped = item.totalEpisodes ? Math.min(Math.max(next, 0), item.totalEpisodes) : Math.max(next, 0);
    onUpdate(item.animeId, { episodesWatched: capped });
  }

  return (
    <section className="section" id="watchlist">
      <div className="section-head">
        <div>
          <span className="eyebrow">Watchlist</span>
          <h2>Your anime command center</h2>
        </div>
        <p>Status, episode progress, ratings, notes, and rewatch-worthy picks all live here.</p>
      </div>
      <div className="watchlist-panel">
        {items.length ? items.map((item) => (
          <article key={item.animeId} className="watch-row">
            <img src={item.poster} alt={item.animeTitle} />
            <div className="watch-main">
              <div className="watch-title-line">
                <h3>{item.animeTitle}</h3>
                {item.rewatch ? <span className="rewatch-badge">Rewatch</span> : null}
              </div>
              <div className="watch-controls">
                <select value={item.status} onChange={(event) => onUpdate(item.animeId, { status: event.target.value as AnimeStatus })}>
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
                <input aria-label="Rating out of 10" type="number" min="0" max="10" value={item.rating} onChange={(event) => onUpdate(item.animeId, { rating: Number(event.target.value) })} />
                <label><input type="checkbox" checked={item.rewatch} onChange={(event) => onUpdate(item.animeId, { rewatch: event.target.checked })} /> Worth rewatching</label>
                <button className="mini-button" type="button" onClick={() => editEpisodes(item)}>Edit</button>
              </div>
              <div className="progress"><span style={{ width: `${item.totalEpisodes ? Math.min(100, (item.episodesWatched / item.totalEpisodes) * 100) : 0}%` }} /></div>
              <p>{item.episodesWatched}/{item.totalEpisodes || "?"} episodes / {item.rating || "N/A"}/10</p>
            </div>
          </article>
        )) : (
          <div className="empty-state">
            <b>Your watchlist is empty.</b>
            Search an anime, add your first pick, and start building your binge legacy.
          </div>
        )}
      </div>
    </section>
  );
}
