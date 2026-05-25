import { MOCK_VIDEOS } from "../mocks/videos";

const SIMULATED_DELAY_MS = 500;

/**
 * Searches for videos matching the query string.
 * Matches against title and author (case-insensitive).
 *
 * @param {string} query
 * @returns {Promise<{ videos: Array, query: string }>}
 */
export async function searchVideos(query) {
  if (!query || query.trim() === "") {
    throw new Error("Search query cannot be empty");
  }

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  const normalizedQuery = query.trim().toLowerCase();
  const videos = MOCK_VIDEOS.filter(
    (video) =>
      video.title.toLowerCase().includes(normalizedQuery) ||
      video.author.toLowerCase().includes(normalizedQuery),
  );

  return { videos, query: query.trim() };
}
