"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

export function Hero({ query, onSearch }: { query: string; onSearch: (value: string) => void }) {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <span className="eyebrow">Track. Rate. Rewatch.</span>
        <h1>Rewatchr</h1>
        <p>Track your anime taste, discover what to binge next, and decide which stories are truly worth a rewatch.</p>
        <div className="hero-actions">
          <a href="#watchlist" className="primary">Start Tracking</a>
          <a href="#popular" className="ghost">Explore Anime</a>
          <a href="#ai" className="ghost">Ask AI</a>
        </div>
        <SearchBar value={query} onChange={onSearch} />
      </div>
      <div className="hero-art" aria-hidden="true">
        <img src="/home-characters.png" alt="" />
      </div>
      <Link href="/anime/16498" className="sr-only">Open Attack on Titan</Link>
    </section>
  );
}
