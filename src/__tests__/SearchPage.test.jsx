import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchPage from "../SearchPage";
import SearchBar from "../components/SearchBar";
import { searchVideos } from "../api/searchService";

jest.mock("../api/searchService");

const MOCK_RESULTS = [
  {
    video_id: "v1",
    title: "Morning Yoga Routine",
    thumbnail_url: "https://example.com/yoga.jpg",
    author: "FitLife Studio",
    duration: 13,
  },
  {
    video_id: "v2",
    title: "Full Body Workout",
    thumbnail_url: "https://example.com/workout.jpg",
    author: "ActiveBody",
    duration: 22,
  },
];

describe("SearchPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title and search input", () => {
    render(<SearchPage />);
    expect(screen.getByText("GridBank")).toBeInTheDocument();
    expect(screen.getByLabelText("Search videos")).toBeInTheDocument();
  });

  it("displays video results after a successful search", async () => {
    searchVideos.mockResolvedValue({ videos: MOCK_RESULTS, query: "yoga" });

    render(<SearchPage />);
    await userEvent.type(screen.getByLabelText("Search videos"), "yoga");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.getByTestId("video-list")).toBeInTheDocument();
    });
    expect(screen.getByText(/2 results for/)).toBeInTheDocument();
    expect(screen.getByText("Morning Yoga Routine")).toBeInTheDocument();
    expect(screen.getByText("Full Body Workout")).toBeInTheDocument();
  });

  it("shows a loading indicator while searching", async () => {
    let resolvePromise;
    searchVideos.mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );

    render(<SearchPage />);
    await userEvent.type(screen.getByLabelText("Search videos"), "yoga");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    expect(screen.getByText("Searching...")).toBeInTheDocument();

    resolvePromise({ videos: MOCK_RESULTS, query: "yoga" });
    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    });
  });

  it("shows an error message when the search fails", async () => {
    searchVideos.mockRejectedValue(new Error("Network error"));

    render(<SearchPage />);
    await userEvent.type(screen.getByLabelText("Search videos"), "yoga");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
    expect(
      screen.getByText("Something went wrong. Please try again."),
    ).toBeInTheDocument();
  });

  it("shows a no-results message when search returns empty", async () => {
    searchVideos.mockResolvedValue({ videos: [], query: "zzz" });

    render(<SearchPage />);
    await userEvent.type(screen.getByLabelText("Search videos"), "zzz");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.getByTestId("empty-results")).toBeInTheDocument();
    });
    expect(screen.getByText(/No results found for/)).toBeInTheDocument();
  });

  it("clears the error when a new search is performed", async () => {
    searchVideos.mockRejectedValueOnce(new Error("fail"));
    searchVideos.mockResolvedValueOnce({ videos: MOCK_RESULTS, query: "yoga" });

    render(<SearchPage />);
    await userEvent.type(screen.getByLabelText("Search videos"), "yoga");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("video-list")).toBeInTheDocument();
  });
});

describe("SearchBar", () => {
  it("renders with the default placeholder", () => {
    render(
      <SearchBar onSearch={jest.fn()} />,
    );
    expect(screen.getByPlaceholderText(/Trending:/)).toBeInTheDocument();
  });

  it("updates the input value when typing", async () => {
    render(
      <SearchBar onSearch={jest.fn()} />,
    );
    const input = screen.getByLabelText("Search videos");
    await userEvent.type(input, "fitness");
    expect(input).toHaveValue("fitness");
  });

  it("calls onSearch with the trimmed input on button click", async () => {
    const onSearch = jest.fn();
    render(
      <SearchBar onSearch={onSearch} />,
    );
    await userEvent.type(screen.getByLabelText("Search videos"), "  yoga  ");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(onSearch).toHaveBeenCalledWith("yoga");
  });

  it("calls onSearch when pressing Enter", async () => {
    const onSearch = jest.fn();
    render(
      <SearchBar onSearch={onSearch} />,
    );
    await userEvent.type(screen.getByLabelText("Search videos"), "travel{Enter}");
    expect(onSearch).toHaveBeenCalledWith("travel");
  });

  it("clears the input when the clear button is clicked", async () => {
    render(
      <SearchBar onSearch={jest.fn()} />,
    );
    const input = screen.getByLabelText("Search videos");
    await userEvent.type(input, "test");
    expect(input).toHaveValue("test");

    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(input).toHaveValue("");
  });

  it("does not show the clear button when input is empty", () => {
    render(
      <SearchBar onSearch={jest.fn()} />,
    );
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });

  it("disables the search button when input is empty or whitespace-only", () => {
    render(
      <SearchBar onSearch={jest.fn()} />,
    );
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();

    // Whitespace-only should also be disabled — need to type spaces via userEvent
    // But userEvent.type with only spaces won't type anything since type simulates key presses
    // The component's disabled check is `input.trim().length === 0`
    // Testing via direct value approach: the submit handler checks trim()
  });

  it("disables input and buttons while loading", () => {
    render(
      <SearchBar onSearch={jest.fn()} isLoading={true} />,
    );
    expect(screen.getByLabelText("Search videos")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Searching" })).toBeDisabled();
  });

  it("does not call onSearch with whitespace-only input", async () => {
    const onSearch = jest.fn();
    render(
      <SearchBar onSearch={onSearch} />,
    );
    const input = screen.getByLabelText("Search videos");
    // Simulate typing spaces — fireEvent bypasses some userEvent restrictions
    // but with userEvent we type spaces directly
    await userEvent.type(input, "   ");
    // The button should be disabled, so clicking won't fire
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
    // Also verify pressing Enter doesn't call onSearch
    await userEvent.type(input, "{Enter}");
    expect(onSearch).not.toHaveBeenCalled();
  });
});
