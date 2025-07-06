## FEATURE:
Implement a Fiverr-Inspired Portfolio Gallery and an Upgraded Profile Card

**Primary Goal:** Allow freelancers to upload a gallery of their work and display it prominently, inspired by the professional look of Fiverr.

**Requirements:**

1.  **Update `Profiles` Collection:**
    - Modify the `Profiles` collection in `src/collections/Profiles/index.ts`.
    - Add a new field named `portfolioImages`.
    - This field must be of type `upload`.
    - **Crucially, it must allow multiple selections (`hasMany: true`)**.
    - It must have a `relationTo` property pointing to the `'media'` collection.

2.  **Upgrade `ProfileCard` Component (`src/app/_components/ProfileCard.tsx`):**
    - The main image area of the card should no longer be the single profile picture.
    - It must now be an **image carousel/slider** that displays the images from the new `portfolioImages` field.
    - Use the **Shadcn/ui `Carousel` component** for this. If it's not installed, you have permission to install it.
    - The carousel should show navigation arrows on hover.
    - **Below the carousel**, display a small, circular version of the single `profilePicture` next to the `displayName`, similar to the Fiverr layout.

3.  **Upgrade Profile Detail Page (`/profiles/[id]/page.tsx`):**
    - At the top of the page, where the single profile picture currently is, replace it with a **large version of the Shadcn/ui `Carousel`**.
    - This carousel should display all images from the `portfolioImages` field in high quality.
    - The rest of the page layout (contact info, bio) can remain as is for now.

## EXAMPLES:
**Example 1: The `portfolioImages` field in the `Profiles` collection.**
```typescript
// In src/collections/Profiles/index.ts, within the 'fields' array
{
  name: 'portfolioImages',
  label: 'Portfolio Images',
  type: 'upload',
  relationTo: 'media',
  hasMany: true, // This allows multiple image uploads
  admin: {
    description: 'Upload images to showcase your work. The first image will be the primary one.',
  },
}

Example 2: Using the Shadcn/ui Carousel.
You can refer to the official Shadcn/ui documentation for the Carousel component. A basic implementation looks like this:

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Inside a component
<Carousel>
  <CarouselContent>
    {portfolioImages.map(image => (
      <CarouselItem key={image.id}>
        <img src={image.url} alt={image.alt} />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>


OTHER CONSIDERATIONS:
- Our New Workflow applies. Final instructions should be to run npm run generate:types and then npm run dev. Do not instruct to run migrations.
- The depth of the payload.find queries on both the profiles list page and the detail page will need to be sufficient (e.g., depth: 2) to ensure that the portfolioImages and profilePicture objects (which are relations) are fully populated with their URL and other data.