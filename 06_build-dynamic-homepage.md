## FEATURE:
Build a Dynamic Homepage Inspired by Upwork and Fiverr

**Requirements:**

1.  **Overhaul Existing Homepage:**
    - Completely replace the content of the current homepage at `src/app/(app)/page.tsx`.
    - The new page should have a clean, modern, dark-theme layout, consistent with the rest of the site.

2.  **Hero Section (Inspired by Upwork):**
    - Create a large, visually impactful "Hero Section" at the top.
    - It must contain a bold, primary heading: **"Connecting clients in need to freelancers who deliver"**.
    - Below the heading, add a subheading: **"Find the perfect professional for your project, right here in Suriname."**
    - **Critically, embed the `SearchFilterForm` component here.** It should be the central focus of this section. The form should be styled to stand out against the hero background.

3.  **"Browse by Category" Section (Inspired by Upwork & Fiverr):**
    - Below the hero section, create a section titled: **"Explore millions of pros"** (We use this title for inspiration, it will show our few categories for now).
    - Fetch all documents from the `categories` collection.
    - Display each category as a **clickable card in a responsive grid** (e.g., 4 columns on desktop).
    - Each category card must be styled using Shadcn/ui `Card` components to have a clean, professional look.
    - The card should contain the category `name` and an appropriate icon. Use `lucide-react` icons. You can use a generic `LayoutGrid` icon for all categories for now.
    - Clicking a card navigates the user to `/profiles?category=[ID]`.

4.  **"Featured Freelancers" Section (Inspired by Fiverr's "Made on Fiverr"):**
    - Further down the page, create a section titled: **"Real results from clients"**.
    - Fetch a random selection of **4** profiles from the `profiles` collection.
    - Display these profiles using the existing **reusable `ProfileCard` component** in a responsive grid. This will showcase real talent available on the platform.

## EXAMPLES:
**Example 1: Fetching Featured Profiles (same as before).**
```typescript
// In src/app/(app)/page.tsx
import { payload } from '@/payload';
import { Profile } from '@/payload-types';

async function getFeaturedProfiles(): Promise<Profile[]> {
  const allProfilesResult = await payload.find({
    collection: 'profiles',
    limit: 100,
    depth: 1, // To populate profilePicture
  });
  const shuffled = allProfilesResult.docs.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4); // We want 4 profiles
}

Example 2: A Category Card Component.
You will likely need to create a new component for this.

// In a new file, e.g., src/app/_components/CategoryCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
  };
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/profiles?category=${category.id}`}>
      <Card className="hover:bg-gray-800 transition-colors">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <LayoutGrid className="h-8 w-8 mb-2" />
          <span className="font-semibold">{category.name}</span>
        </CardContent>
      </Card>
    </Link>
  );
};

OTHER CONSIDERATIONS:
- Our New Workflow: This project runs in dev mode. Database sync happens via npm run dev.
- Do not generate or run migration commands.
- Final instructions for the user: Tell them to run npm run dev and test the new homepage.
- All data fetching must be server-side.
