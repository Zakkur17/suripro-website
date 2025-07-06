## FEATURE:
Fix Filtering/Caching Bugs and Improve Styling Consistency

**Requirements:**

1.  **Fix Filter Caching Issue (Primary Goal):**
    - The main issue is that when navigating to `/profiles` with a query parameter (e.g., from a category link on the homepage), the page initially shows all profiles and only updates after a hard refresh. This is a Next.js App Router caching problem.
    - To solve this, you must modify the data fetching logic on the `/profiles/page.tsx`.
    - The page must be forced to be **dynamically rendered**. You can achieve this by either:
      a) Using the `searchParams` prop directly in the page component.
      b) Setting `export const dynamic = 'force-dynamic'` at the top of the `page.tsx` file.
      c) Setting `revalidate = 0` in the `fetch` call if one is used.
    - Please implement the most appropriate solution to ensure the data is always fresh when a URL parameter changes.

2.  **Fix "Clear Filters" Logic:**
    - In the `SearchFilterForm.tsx` component, the `clearFilters` function currently does not reset the `searchTerm` state before navigating.
    - Modify the `clearFilters` function to also call `setSearchTerm('')` to ensure the search input is cleared along with the category selection.

3.  **Fix Styling Inconsistencies (Dark Mode):**
    - The profile detail page (`/profiles/[id]/page.tsx`) currently has a white background. Modify the root `div` of this page to have a dark background consistent with the rest of the site (e.g., `bg-gray-900` or similar).
    - The `CategoryCard` component on the homepage has a hover effect that turns the background black. Change this to a more subtle hover effect, for example, by slightly increasing the background brightness (e.g., `hover:bg-gray-800`).

## OTHER CONSIDERATIONS:
- This task is primarily about fixing bugs and polishing the existing UI. No new features should be added.
- The most critical fix is the dynamic rendering of the profiles page.
- After the fixes, the filtering experience should be seamless and immediate for the user.
- Our standard workflow applies: run `npm run dev` to test the changes.