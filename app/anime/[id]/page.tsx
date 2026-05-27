"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Calendar, Check, Clock, Film, MessageSquare, Save, Sparkles, Star } from "lucide-react";
import { AnimeStatus, findAnime, WatchItem, watchlistKey } from "@/lib/mockAnime";

const userKey = "rewatchr.preview.user";
const statuses: AnimeStatus[] = ["Watching", "Completed", "Plan to Watch", "Dropped", "On Hold"];

export default function AnimeDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const anime = useMemo(() => findAnime(Number(params.id)), [params.id]);
  const [status, setStatus] = useState<AnimeStatus>("Plan to Watch");
  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rating, setRating] = useState(0);
  const [rewatch, setRewatch] = useState(false);
  const [note, setNote] = useState("");
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!anime) return;
    const raw = localStorage.getItem(watchlistKey);
    const list = raw ? JSON.parse(raw) as WatchItem[] : [];
    const existing = list.find((item) => item.animeId === anime.id);
    if (!existing) return;
    setStatus(existing.status);
    setEpisodesWatched(existing.episodesWatched);
    setRating(existing.rating);
    setRewatch(existing.rewatch);
    setNote(existing.note);
  }, [anime]);

  if (!anime) {
    return (
      <main className="detail-page">
        <div className="not-found-card">
          <h1>Anime not found</h1>
          <p>This one escaped the watchlist realm.</p>
          <Link className="primary" href="/">Back Home</Link>
        </div>
      </main>
    );
  }

  function saveAnime(event?: FormEvent) {
    event?.preventDefault();
    if (!anime) return;
    const selectedAnime = anime;
    if (!localStorage.getItem(userKey)) {
      setLoginPrompt(true);
      return;
    }
    const raw = localStorage.getItem(watchlistKey);
    const list = raw ? JSON.parse(raw) as WatchItem[] : [];
    const cappedEpisodes = selectedAnime.episodes ? Math.min(Math.max(episodesWatched, 0), selectedAnime.episodes) : Math.max(episodesWatched, 0);
    const nextItem: WatchItem = {
      animeId: selectedAnime.id,
      animeTitle: selectedAnime.title,
      poster: selectedAnime.poster,
      status,
      episodesWatched: cappedEpisodes,
      totalEpisodes: selectedAnime.episodes,
      rating: Math.min(Math.max(rating, 0), 10),
      rewatch,
      note,
      genres: selectedAnime.genres
    };
    const next = [nextItem, ...list.filter((item) => item.animeId !== selectedAnime.id)];
    localStorage.setItem(watchlistKey, JSON.stringify(next));
    setSaved(true);
  }

  function markCompleted() {
    if (!anime) return;
    setStatus("Completed");
    setEpisodesWatched(anime.episodes || episodesWatched);
  }

  return (
    <main className="detail-page">
      <nav className="detail-nav">
        <Link href="/">Home</Link>
        <Link href="/" className="ghost">Back Home</Link>
      </nav>

      <section className="detail-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(11,11,15,.98), rgba(11,11,15,.78), rgba(11,11,15,.96)), url(${anime.banner})` }}>
        <img className="detail-poster" src={anime.poster} alt={anime.title} />
        <div className="detail-info">
          <span className="eyebrow">{anime.type} / {anime.status}</span>
          <h1>{anime.title}</h1>
          <p className="native-title">{anime.japaneseTitle}</p>
          <div className="genre-row">
            {anime.genres.map((genre) => <span key={genre}>{genre}</span>)}
          </div>
          <div className="detail-stats">
            <span><Star size={18} fill="currentColor" /> {Math.round(anime.rating * 10)}% avg</span>
            <span><Film size={18} /> {anime.episodes} episodes</span>
            <span><Clock size={18} /> {anime.duration}</span>
            <span><Calendar size={18} /> {anime.year}</span>
          </div>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-stack">
          <article className="detail-card">
            <h2>Description</h2>
            <p>{anime.description}</p>
          </article>
          <div className="mini-info-grid">
            <article className="detail-card">
              <h3>Age Rating</h3>
              <p>{anime.ageRating}</p>
            </article>
            <article className="detail-card">
              <h3>Started</h3>
              <p>{anime.year}</p>
            </article>
          </div>
          <article className="detail-card comments-card">
            <h2>Comments</h2>
            <div className="comment"><b>Rewatchr user</b><span>This page is restored as a mock comment zone for the prototype.</span></div>
            <div className="comment"><b>Anime mood check</b><span>Rate it, track it, then decide if it deserves the sacred rewatch badge.</span></div>
          </article>
        </div>

        <aside className="tracker-card">
          <div className="tracker-head">
            <div>
              <span className="eyebrow">Your Tracker</span>
              <h2>Rewatch Score {rewatch ? Math.min(10, Math.max(1, rating + 1)) : Math.max(1, rating || Math.round(anime.rating))}</h2>
            </div>
            <div className="spark"><Sparkles size={24} /></div>
          </div>

          <form onSubmit={saveAnime} className="tracker-form">
            <select value={status} onChange={(event) => setStatus(event.target.value as AnimeStatus)}>
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
            <div className="two-fields">
              <label>Episodes<input type="number" min="0" max={anime.episodes} value={episodesWatched} onChange={(event) => setEpisodesWatched(Number(event.target.value))} /></label>
              <label>Rating / 10<input type="number" min="0" max="10" value={rating} onChange={(event) => setRating(Number(event.target.value))} /></label>
            </div>
            <label className="check-row">Worth Rewatching?<input type="checkbox" checked={rewatch} onChange={(event) => setRewatch(event.target.checked)} /></label>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Personal note: did it slap, drag, or emotionally destroy you?" />
            <div className="detail-actions">
              <button className="primary" type="submit"><Save size={18} /> Save</button>
              <button className="ghost" type="button" onClick={markCompleted}><Check size={18} /> Done</button>
              <button className="ghost" type="button"><MessageSquare size={18} /> Comment</button>
            </div>
            {saved ? <p className="save-note">Saved to your watchlist.</p> : null}
          </form>
        </aside>
      </section>

      {loginPrompt ? (
        <div className="modal open">
          <div className="login-required-card panel">
            <span className="eyebrow">Login required</span>
            <h2>Login to add anime</h2>
            <p>You need to login before adding anime to your watchlist.</p>
            <div className="login-required-actions">
              <button className="ghost" type="button" onClick={() => setLoginPrompt(false)}>Leave it..</button>
              <button className="primary" type="button" onClick={() => router.push("/login")}>Login</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
