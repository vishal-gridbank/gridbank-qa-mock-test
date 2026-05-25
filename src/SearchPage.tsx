import { useState } from "react";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import { searchVideos } from "./api/searchService";

export default function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedQuery, setSearchedQuery] = useState("");

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setSearchedQuery(query);

    try {
      const { videos: results } = await searchVideos(query);
      setVideos(results);
    } catch {
      setError("Something went wrong. Please try again.");
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="search-page">
      <h1 className="search-page__title">GridBank</h1>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      <VideoList
        videos={videos}
        isLoading={isLoading}
        error={error}
        searchedQuery={searchedQuery}
      />
    </main>
  );
}
