import { useState } from "react";

const DEFAULT_PLACEHOLDER = "Trending: Productive, Fitness, Travel";

export default function SearchBar({
  onSearch,
  isLoading = false,
  placeholder = DEFAULT_PLACEHOLDER,
}) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim().length > 0 && !isLoading) {
      onSearch(input.trim());
    }
  };

  const handleClear = () => {
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="search-bar" role="search">
      <input
        type="text"
        name="search"
        aria-label="Search videos"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {input && (
        <button
          type="button"
          className="search-bar__clear"
          aria-label="Clear search"
          onClick={handleClear}
          disabled={isLoading}
        >
          ✕
        </button>
      )}
      <button
        type="button"
        className="search-bar__submit"
        aria-label={isLoading ? "Searching" : "Search"}
        onClick={handleSubmit}
        disabled={isLoading || input.trim().length === 0}
      >
        {isLoading ? "Searching…" : "Search"}
      </button>
    </div>
  );
}
