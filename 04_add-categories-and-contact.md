## FEATURE:
Add Categories and Contact Info to Profiles

**Requirements:**

1.  **Create a `Categories` Collection:**
    - Create a new Payload collection named `categories`.
    - It should have one simple field: `name` (type: text, required, unique).
    - Ensure this collection is publicly readable.
    - Add this new collection to the `payload.config.ts`.

2.  **Update `Profiles` Collection:**
    - Modify the `Profiles` collection in `src/collections/Profiles/index.ts`.
    - Add a **relationship** field named `category`. This field should point to the `categories` collection (`relationTo: 'categories'`). This will allow each profile to be assigned to one category.
    - Add a `contact` group field. This field should be of type `group` and named `contactInfo`.
    - Inside the `contactInfo` group, add two fields:
      - `email` (type: email)
      - `phone` (type: text)

3.  **Update Admin UI for `Profiles`:**
    - In the `Profiles` collection config, add a `filterOptions` configuration to the list view, so that administrators can easily filter profiles by category.

4.  **Update Frontend `ProfileCard` Component:**
    - Modify the `ProfileCard` component (`src/app/_components/ProfileCard.tsx`).
    - Display the name of the category as a "tag" or "badge" on the card. The category name can be accessed via `profile.category.name`.
    - Use a Shadcn/ui `Badge` component for styling the category tag.

5.  **Update Frontend Profile Detail Page:**
    - Modify the profile detail page (`/profiles/[id]/page.tsx`).
    - Prominently display the category name.
    - Display the `email` and `phone` number from the `contactInfo` group.

## EXAMPLES:
**Example 1: The `category` relationship field in the `Profiles` collection.**
```typescript
// In src/collections/Profiles/index.ts, within the 'fields' array
{
  name: 'category',
  type: 'relationship',
  relationTo: 'categories',
  required: true,
}


Example 2: The contactInfo group field.

// In src/collections/Profiles/index.ts, within the 'fields' array
{
  name: 'contactInfo',
  type: 'group',
  fields: [
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
  ],
}


OTHER CONSIDERATIONS:
-After these changes, the auto-generated Payload types need to be regenerated. Instruct me (the user) to run npm run generate:types after the implementation.
-You will need to populate the Categories collection manually in the admin panel first (e.g., create categories like "Bouw", "IT", "Tuinonderhoud") before you can assign them to profiles.
-Ensure all data fetching queries are updated with sufficient depth (e.g., depth: 2) to populate the related category data.