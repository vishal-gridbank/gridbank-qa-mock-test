function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function VideoCard({ video }) {
  const { title, thumbnail_url, author, duration } = video;

  return (
    <article className="video-card" data-testid="video-card">
      <div className="video-card__thumbnail-wrapper">
        <img
          src={thumbnail_url}
          alt={title}
          className="video-card__thumbnail"
        />
        <span className="video-card__duration">{formatDuration(duration)}</span>
      </div>
      <div className="video-card__info">
        <h3 className="video-card__title">{title}</h3>
        <p className="video-card__author">{author}</p>
      </div>
    </article>
  );
}
