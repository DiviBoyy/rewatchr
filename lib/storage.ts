"use client";

import { Comment, WatchItem } from "@/lib/types";
import { demoWatchlist } from "@/lib/demo-data";

const watchlistKey = "rewatchr.watchlist";
const commentsKey = "rewatchr.comments";

export function readWatchlist(): WatchItem[] {
  if (typeof window === "undefined") return demoWatchlist;
  const value = window.localStorage.getItem(watchlistKey);
  if (!value) {
    window.localStorage.setItem(watchlistKey, JSON.stringify(demoWatchlist));
    return demoWatchlist;
  }
  return JSON.parse(value) as WatchItem[];
}

export function saveWatchlist(items: WatchItem[]) {
  window.localStorage.setItem(watchlistKey, JSON.stringify(items));
}

export function readComments(animeId: number): Comment[] {
  if (typeof window === "undefined") return [];
  const value = window.localStorage.getItem(commentsKey);
  const comments = value ? (JSON.parse(value) as Comment[]) : [];
  return comments.filter((comment) => comment.animeId === animeId);
}

export function saveComment(comment: Comment) {
  const value = window.localStorage.getItem(commentsKey);
  const comments = value ? (JSON.parse(value) as Comment[]) : [];
  window.localStorage.setItem(commentsKey, JSON.stringify([comment, ...comments]));
}
