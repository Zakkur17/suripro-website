## FEATURE:
Fix Carousel Click-Through Bug

**Primary Goal:** Fix a critical user experience bug where clicking the navigation arrows on a portfolio carousel incorrectly navigates the user.

**Requirements:**

1.  **Isolate the Click Event:**
    - **File to modify:** `src/app/_components/ProfileCard.tsx`.
    - **Problem:** On the homepage and `/profiles` page, clicking the 'Previous' or 'Next' arrows of the carousel inside a `ProfileCard` incorrectly navigates the user to the profile detail page, because the parent `Link` component also receives the click.
    - **Required Solution:** You must prevent the click event from "bubbling up" from the carousel arrows to the parent link.
    - **Precise Implementation:**
        a) Find the `<CarouselPrevious>` and `<CarouselNext>` components within `ProfileCard.tsx`.
        b) Add an `onClick` event handler to **both** of these components.
        c) In the event handler function, you **must call `e.stopPropagation()`**. This is the most important part of the fix. It tells the browser to stop the event here and not pass it to parent elements.
        d) It is also good practice to call `e.preventDefault()` to be absolutely sure no other default browser action is triggered.

## EXAMPLE:
**This is how the corrected components should look:**
```tsx
// Inside ProfileCard.tsx

<CarouselPrevious
  onClick={(e) => {
    e.stopPropagation();
    e.preventDefault();
  }}
  className="absolute left-2" // Example class
/>

<CarouselNext
  onClick={(e) => {
    e.stopPropagation();
    e.preventDefault();
  }}
  className="absolute right-2" // Example class
/>


## OTHER CONSIDERATIONS:
- **Ensure that any previously added autoplay functionality or plugins (`embla-carousel-autoplay`) are completely removed.**
- No other changes are needed. Do not modify any other files. The only goal is to fix the specific click behavior in `ProfileCard.tsx`.
- The final instruction to the user should be to run `npm run dev` and test that the carousel arrows now work correctly without navigating away.