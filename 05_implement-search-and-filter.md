## FEATURE:
Implement Search and Filter Functionality for Profiles

**Requirements:**

1.  **Update the Profiles List Page (`/profiles/page.tsx`):**
    - Add a search input field and a "Filter by Category" dropdown select menu at the top of the page.
    - The page should now read the search query and category filter from the URL's query parameters (e.g., `/profiles?search=tuin&category=bouw`).

2.  **Update the Data Fetching Logic:**
    - Modify the `getProfiles` function (or equivalent data fetching logic) on the profiles page.
    - It must now accept `search` and `category` as arguments.
    - The `payload.find` query for the `profiles` collection must be updated to include a `where` clause to filter the results based on these parameters.
    - The search should be case-insensitive and check for matches in both the `displayName` and `bio` fields.
    - The category filter should find profiles that match the selected category ID.

3.  **Populate the Category Filter:**
    - The "Filter by Category" dropdown needs to be populated dynamically.
    - Fetch all available documents from the `categories` collection and use them to generate the `<option>` elements for the select menu.

4.  **Create a Reusable Search Form Component:**
    - Create a new client component named `SearchFilterForm.tsx` in `src/app/_components/`.
    - This component will contain the search input and the category select dropdown.
    - It must use the `useRouter` and `useSearchParams` hooks from Next.js to update the URL with the new search parameters when the user types or selects a category, which will trigger a re-render of the server component page.

5.  **Styling and UX:**
    - Use Shadcn/ui for the `Input` and `Select` components.
    - When no search results are found, display a clear message like "No profiles found matching your criteria."

## EXAMPLES:
**Example 1: The updated `payload.find` query in the data fetching function.**
```typescript
// Example of the `where` clause for the `profiles` collection query
const whereClause = {
  and: [],
};

if (search) {
  whereClause.and.push({
    or: [
      {
        displayName: {
          contains: search,
        },
      },
      {
        bio: {
          contains: search,
        },
      },
    ],
  });
}

if (category) {
  whereClause.and.push({
    category: {
      equals: category,
    },
  });
}

const allProfiles = await payload.find({
  collection: 'profiles',
  where: whereClause,
  limit: 100,
  depth: 2, // Ensure category data is populated
});

OTHER CONSIDERATIONS:
- Our New Workflow: This project runs in Payload's dev mode locally. Database synchronization happens automatically when starting the server with npm run dev.
- Do not generate migration files or instruct the user to run migrate commands.
- Instead, your final instruction to the user should be:
    1. Run npm run generate:types if any collection was modified.
    2. Run npm run dev and answer any questions the dev server might ask in the terminal.
    3. The user will test the new functionality.

