import { WatchItem } from "@/lib/mockAnime";

export function mockRewatchrAI(question: string, watchlist: WatchItem[]) {
  if (!question.trim()) return "";
  if (!watchlist.length) return "Coming Soon !";
  return "Coming Soon !";
}
