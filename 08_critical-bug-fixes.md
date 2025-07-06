## FEATURE:
Critical Bug-Fixes for Filtering, State, and Styling

**Primary Goal:** Fix three core bugs that are currently harming the user experience.

**Requirements:**

1.  **Fix the Filter Caching Bug (Top Priority):**
    - **Problem:** When navigating to `/profiles?category=...`, the page initially shows all profiles. The filter is only applied after a backward navigation action. This indicates that the server-side data fetching is not re-running correctly when the `searchParams` change.
    - **Solution:** You must ensure the `/profiles/page.tsx` is truly dynamic. The previous fix (`force-dynamic`) was insufficient. Let's try a more robust approach. The `key` prop on a React component can force a remount.
    - **Implementation:** Modify the main component that renders the profiles list. Wrap it in a component that receives a `key` derived from the `searchParams`. A simple way is to wrap the list rendering logic in a `<div key={JSON.stringify(searchParams)}>...</div>`. This forces React to re-render the entire component tree when the search parameters change, triggering a fresh data fetch.

2.  **Fix the "Clear Filters" Bug:**
    - **Problem:** The `clearFilters` function in `SearchFilterForm.tsx` causes a brief "unknown" state in the URL and doesn't behave intuitively.
    - **Solution:** We need to simplify the state management. Instead of triggering navigation on every keypress in the search bar, we will use a form submission. The `useEffect` hook that watches `searchTerm` should be removed. The filtering should only happen when the "Search" button is clicked or a category is selected.
    - **Implementation:**
        a) Refactor `SearchFilterForm.tsx` to use a standard HTML `<form>` element.
        b) The main "Search" button should be of `type="submit"`.
        c) The category `Select` component should trigger the form submission `onChange`.
        d) The `clearFilters` button should simply call `router.push('/profiles')`, which will clear all URL parameters.

3.  **Fix the Styling Bug (Dark Mode):**
    - **Problem:** On the profile detail page (`/profiles/[id]/page.tsx`), the "Contact Information" heading is invisible in dark mode.
    - **Solution:** This is a text color issue. The heading element needs an explicit text color class that works in dark mode.
    - **Implementation:** Locate the `<h2>` or `<h3>` element for "Contact Information". Add the class `text-white` or `text-gray-100` to it to ensure it is visible against the dark background. Also check the bio text and make sure it has sufficient contrast (e.g., `text-gray-300` or `text-gray-400`).

## OTHER CONSIDERATIONS:
- This is a bug-fixing task. Do not add new features.
- The most critical fix is the caching/filtering issue. The `key` prop solution is a very strong pattern for this.
- After implementing these fixes, the user experience should feel instant, correct, and visually consistent.
- Our standard workflow applies: Run `npm run dev` to test the changes.