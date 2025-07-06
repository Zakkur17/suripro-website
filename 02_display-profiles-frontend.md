## FEATURE:
Display Freelancer Profiles on the Frontend

**Requirements:**
1.  **Create a Public "Profiles" Page:**
    - Create a new page route at `/profiles`.
    - This page should fetch ALL documents from the `profiles` collection in Payload.
    - Display the fetched profiles in a grid layout. Use a 3-column grid on desktop, 2-column on tablet, and 1-column on mobile.
    - For each profile in the grid, create a reusable React component called `ProfileCard`.

2.  **Create the `ProfileCard` Component:**
    - This component should be located at `src/app/_components/ProfileCard.tsx`.
    - It should display the `displayName` and the `bio` of the freelancer.
    - The entire card must be a clickable link that navigates to the detail page for that specific profile (e.g., `/profiles/[profileID]`).

3.  **Create a Dynamic Profile Detail Page:**
    - Create a new dynamic page route at `/profiles/[id]`.
    - This page should fetch the data for ONE specific profile from the `profiles` collection, using the `id` from the URL.
    - On this page, display all the details of the profile: the `displayName` and the full `bio`.
    - If a profile with the given `id` is not found, the page should display a "Profile not found" message.

4.  **Styling:**
    - Use **Shadcn/ui** components where appropriate, especially for the `ProfileCard`. The `Card` component from Shadcn/ui would be perfect for this. If Shadcn/ui is not yet installed, you have permission to install it.

## EXAMPLES:
**Example: Fetching all profiles in `/profiles/page.tsx`**
```typescript
import { Profile } from '@/payload-types'; // Use the auto-generated Payload types
import { payload } from '@/payload'; // Use the existing payload client

async function getProfiles(): Promise<Profile[]> {
  const allProfiles = await payload.find({
    collection: 'profiles',
    limit: 100, // Fetch up to 100 profiles
  });
  return allProfiles.docs;
}

OTHER CONSIDERATIONS:

-Use the auto-generated types from Payload (@/payload-types) for type safety. If they are not up-to-date, you can regenerate them by running npm run generate:types.

-Ensure all data fetching is done on the server-side using React Server Components for best performance.

-The id for the detail page link will be profile.id.

