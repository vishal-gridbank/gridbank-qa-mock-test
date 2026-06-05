# GridBank – QA Engineer Live Coding Interview

Welcome! This session is about writing automated tests for a real feature.

**You have 1 hour.** Read this brief carefully before writing any code (5 min), then get into it.

## Getting started

## Running the local server

```
npm run dev
```

---

## The feature

GridBank is a video platform. The core feature you're testing today is search:

1. User types a query into the search bar
2. User presses **Enter** or clicks **Search**
3. Matching video cards appear on screen

---

## What's already built — don't modify these

| File                           | What it does                                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `src/SearchPage.jsx`           | Page component — owns all state, calls the search service, renders results                                            |
| `src/components/SearchBar.jsx` | Controlled input + buttons, calls `onSearch(query)` prop                                                              |
| `src/components/VideoList.jsx` | Renders loading / error / empty / results states                                                                      |
| `src/components/VideoCard.jsx` | Renders a single video (thumbnail, title, author)                                                                     |
| `src/api/searchService.js`     | `searchVideos(query)` — returns a Promise that resolves to `{ videos, query }`, `searchVideos` has a real 500ms delay |

Your job is to **write tests only**. All your work goes in `src/__tests__/SearchPage.test.jsx`. You're allowed to use official documentation for help.

---

## Your task

Write tests for `SearchPage` and `SearchBar` using **Playwright** and the test utilities already imported in the file.

---

## Running the tests

```
# Run all end-to-end tests headlessly in the terminal
npm run test:e2e

# Open the Playwright UI mode for interactive test exploration and debugging
npm run test:e2e:ui

# Step through tests one action at a time with the Playwright Inspector
npm run test:e2e:debug
```

## Acceptance Criteria

You will need to implement the following test cases:

### SearchPage (6 tests)

- [] Renders title and search input
- [] Displays video results successful search
- [] Shows loading indicator while searching
- [] Shows error message when search fails
- [] Shows no-results message on empty results
- [] Clears error on subsequent successful search

### SearchBar (9 tests)

- [] Renders with default placeholder
- [] Updates input value on typing
- [] Calls onSearch with trimmed input on button click
- [] Calls onSearch on Enter key press
- [] Clear button clears the input
- [] Clear button hidden when input is empty
- [] Search button disabled when input is empty/whitespace-only
- [] Input and buttons disabled while loading
- [] Does not call onSearch with whitespace-only input

---

Good luck! Focus on the must-pass tests first, then build outward.
