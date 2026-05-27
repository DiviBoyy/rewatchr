"use client";

import { useEffect, useMemo, useState } from "react";
import { AIChat } from "@/components/AIChat";
import { AnimeCard } from "@/components/AnimeCard";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { StatsPreview } from "@/components/StatsPreview";
import { WatchlistSection } from "@/components/WatchlistSection";
import { animeList, WatchItem, watchlistKey } from "@/lib/mockAnime";

type User = {
  username: string;
  email: string;
};

const userKey = "rewatchr.preview.user";

export default function Home() {
  const [query, setQuery] = useState("");
  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem(userKey);
    const rawWatchlist = localStorage.getItem(watchlistKey);
    setUser(rawUser ? JSON.parse(rawUser) as User : null);
    setWatchlist(rawWatchlist ? JSON.parse(rawWatchlist) as WatchItem[] : []);
  }, []);

  function saveWatchlist(next: WatchItem[]) {
    setWatchlist(next);
    localStorage.setItem(watchlistKey, JSON.stringify(next));
  }

  function updateWatchItem(animeId: number, updates: Partial<WatchItem>) {
    saveWatchlist(watchlist.map((item) => item.animeId === animeId ? { ...item, ...updates } : item));
  }

  function logout() {
    localStorage.removeItem(userKey);
    localStorage.removeItem(watchlistKey);
    setUser(null);
    setWatchlist([]);
  }

  const filteredAnime = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return animeList.slice(0, 10);
    const starts = animeList.filter((anime) => anime.title.toLowerCase().startsWith(clean));
    const contains = animeList.filter((anime) => !anime.title.toLowerCase().startsWith(clean) && anime.title.toLowerCase().includes(clean));
    return [...starts, ...contains];
  }, [query]);

  return (
    <main>
      <Navbar user={user} onLogout={logout} />
      <Hero query={query} onSearch={setQuery} />

      <section className="section" id="popular">
        <div className="section-head">
          <div>
            <span className="eyebrow">{query ? "Search Results" : "Popular"}</span>
            <h2>{query ? `Anime matching "${query}"` : "Popular anime right now"}</h2>
          </div>
          <p>{query ? "Search prioritizes anime starting with your letters first." : "The original Rewatchr discovery lane, restored with poster cards and clean links."}</p>
        </div>
        <div className="anime-grid">
          {filteredAnime.length ? filteredAnime.map((anime) => <AnimeCard key={anime.id} anime={anime} />) : (
            <div className="empty-state full">No anime found. Try another title.</div>
          )}
        </div>
      </section>

      <WatchlistSection items={watchlist} onUpdate={updateWatchItem} />
      <StatsPreview items={watchlist} />
      <AIChat watchlist={watchlist} />
    </main>
  );
}
