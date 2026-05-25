import VideoCard from "./VideoCard";

export default function VideoList({ videos, isLoading, error, searchedQuery }) {
  if (isLoading) {
    return (
      <p className="status-message" data-testid="loading-indicator">
        Searching...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="status-message status-message--error"
        role="alert"
        data-testid="error-message"
      >
        {error}
      </p>
    );
  }

  if (searchedQuery && videos.length === 0) {
    return (
      <p className="status-message" data-testid="empty-results">
        No results found for &ldquo;{searchedQuery}&rdquo;
      </p>
    );
  }

  if (!searchedQuery) {
    return null;
  }

  return (
    <section aria-label="Search results" data-testid="video-list">
      <p className="results-count">
        {videos.length} result{videos.length !== 1 ? "s" : ""} for &ldquo;
        {searchedQuery}&rdquo;
      </p>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.video_id} video={video} />
        ))}
      </div>
    </section>
  );
}
