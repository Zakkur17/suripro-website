## FEATURE:
Refine Carousel Behavior and User Experience

**Primary Goal:** Fix two specific user experience issues with the newly implemented portfolio carousels.

**Requirements:**

1.  **Fix "Click-Through" Bug on `ProfileCard` Carousel:**
    - **Problem:** On the homepage and `/profiles` page, clicking the 'Previous' or 'Next' arrows of the carousel inside a `ProfileCard` incorrectly navigates the user to the profile detail page.
    - **Root Cause:** The click event on the carousel arrows is "bubbling up" to the parent `<Link>` component that wraps the entire card.
    - **Required Solution:**
        a) Modify the `ProfileCard.tsx` component.
        b) Find the `<CarouselPrevious>` and `<CarouselNext>` components.
        c) Add an `onClick` event handler to both of them.
        d) In the event handler function, you **must call `e.stopPropagation()`**. This will prevent the click event from reaching the parent `<Link>`.
        e) The implementation should look like: `onClick={(e) => e.stopPropagation()}`.

2.  **Implement Autoplay for Homepage Carousel:**
    - **Goal:** The portfolio carousels on the **homepage only** should automatically scroll through the images to create a dynamic and engaging experience.
    - **Required Solution:**
        a) You must install the Embla Carousel Autoplay plugin. The command is: `npm install embla-carousel-autoplay`. You have permission to run this.
        b) Modify the `page.tsx` file for the homepage (`src/app/(app)/page.tsx`).
        c) In the section where the "Featured Freelancers" are rendered, you need to pass a `plugins` prop to the `Carousel` component used by the `ProfileCard`.
        d) You will need to import `Autoplay from "embla-carousel-autoplay"` and create a plugin reference using `React.useRef`.
        e) The `Carousel` component should be configured with the Autoplay plugin, set to a delay of around 2000ms (2 seconds).
    - **Important:** This autoplay functionality should **only** be applied to the carousels on the homepage, not on the `/profiles` list page. This means you might need to pass a prop to the `ProfileCard` to conditionally enable it.

## EXAMPLES:
**Example 1: Fixing the click-through bug.**
```tsx
// In ProfileCard.tsx
<CarouselPrevious
  onClick={(e) => {
    e.preventDefault(); // Good practice to add this as well
    e.stopPropagation();
  }}
  // ... other props
/>

Example 2: Implementing the Autoplay plugin.

// At the top of the homepage component (page.tsx)
'use client' // This section of the page will now be a client component
import Autoplay from "embla-carousel-autoplay"
import * as React from "react"
// ... other imports

// Inside the component
const autoplayPlugin = React.useRef(
  Autoplay({ delay: 2000, stopOnInteraction: true })
)

// When rendering the Carousel
<Carousel plugins={[autoplayPlugin.current]} ...>
  // ...
</Carousel>


OTHER CONSIDERATIONS:
- Our standard workflow applies. The final instruction to the user should be to run npm run dev and test the new carousel behaviors.
- The most critical part is correctly stopping the event propagation on the carousel buttons.