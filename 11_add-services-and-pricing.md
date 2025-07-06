## FEATURE:
Implement a "Services & Pricing" Feature for Profiles

**Primary Goal:** Allow freelancers to define specific service packages on their profile, similar to Fiverr's "gigs". These services will be displayed on their profile detail page.

**Requirements:**

1.  **Update `Profiles` Collection:**
    - **File to modify:** `src/collections/Profiles/index.ts`.
    - Add a new field named `services`.
    - This field must be of type `array`. This allows a freelancer to add multiple service packages.
    - Inside the `array` field, define the fields for a single service package:
        - `serviceName` (type: text, required, e.g., "Basic Logo Design").
        - `serviceDescription` (type: textarea, required, e.g., "Includes 2 concepts and 3 revisions.").
        - `price` (type: number, required).
    - **Important:** Make the `services` array field itself **optional**, not required. This prevents data loss for existing profiles.

2.  **Update Profile Detail Page (`/profiles/[id]/page.tsx`):**
    - **File to modify:** `src/app/(app)/profiles/[id]/page.tsx`.
    - Below the bio/contact information, create a new, distinct section with a heading like "Services Offered".
    - If the `profile.services` array exists and is not empty, iterate over it.
    - For each service in the array, display it in a visually appealing way. A good approach is to use a styled `div` or a Shadcn/ui `Card` for each service.
    - Each service display must show the `serviceName`, `serviceDescription`, and the `price` (formatted as currency, e.g., "$150").
    - If a profile has no services defined, this section should not be rendered at all.

## EXAMPLES:
**Example 1: The `services` array field in the `Profiles` collection.**
```typescript
// In src/collections/Profiles/index.ts, within the 'fields' array
{
  name: 'services',
  label: 'Service Packages',
  type: 'array',
  minRows: 1, // A user must add at least one if they decide to use this block
  fields: [
    {
      name: 'serviceName',
      type: 'text',
      required: true,
      label: 'Service Name (e.g., Basic Logo Design)',
    },
    {
      name: 'serviceDescription',
      type: 'textarea',
      required: true,
      label: 'What is included in this service?',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price (in USD)',
      admin: {
        description: 'Enter the price for this service package.',
      },
    },
  ],
}

OTHER CONSIDERATIONS:
-Our New Workflow: This project runs in dev mode. Database sync happens automatically via npm run dev.
-Do not generate migration files.
-Final instructions for the user:
    1. Run npm run generate:types to update the TypeScript types with the new services field.
    2. Run npm run dev and answer any questions the dev server might ask.
    3. The user will then test by editing a profile, adding services, and verifying they appear on the detail page.