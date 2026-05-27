import { AnimeSummary } from "@/lib/types";

const endpoint = "https://graphql.anilist.co";

async function anilistRequest<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 1800 }
  });

  if (!response.ok) {
    throw new Error(`AniList request failed with ${response.status}`);
  }

  const json = await response.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }
  return json.data as T;
}

const mediaFields = `
  id
  title { romaji english native }
  coverImage { extraLarge large color }
  bannerImage
  format
  status
  episodes
  duration
  averageScore
  season
  seasonYear
  startDate { year month day }
  genres
  description(asHtml: false)
  trailer { id site }
  studios(isMain: true) { nodes { name } }
`;

export async function searchAnime(search: string, page = 1, perPage = 12) {
  const query = `
    query SearchAnime($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { hasNextPage currentPage }
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) { ${mediaFields} }
      }
    }
  `;
  const data = await anilistRequest<{ Page: { media: AnimeSummary[]; pageInfo: { hasNextPage: boolean; currentPage: number } } }>(query, { search, page, perPage });
  return data.Page;
}

export async function getAnime(id: number) {
  const query = `
    query Anime($id: Int) {
      Media(id: $id, type: ANIME) { ${mediaFields} }
    }
  `;
  const data = await anilistRequest<{ Media: AnimeSummary }>(query, { id });
  return data.Media;
}

export async function getAnimeCollection(sort: string, perPage = 10) {
  const query = `
    query Collection($sort: [MediaSort], $perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(type: ANIME, sort: $sort) { ${mediaFields} }
      }
    }
  `;
  const data = await anilistRequest<{ Page: { media: AnimeSummary[] } }>(query, { sort: [sort], perPage });
  return data.Page.media;
}

export function titleOf(anime: AnimeSummary) {
  return anime.title.english || anime.title.romaji;
}

export function cleanDescription(description?: string | null) {
  return (description || "No description available yet.")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\n{3,}/g, "\n\n");
}
