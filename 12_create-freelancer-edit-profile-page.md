## FEATURE:
Create a "My Profile" page for logged-in freelancers to edit their own profile.

**Primary Goal:** Build a secure, user-friendly page at `/dashboard/my-profile` where a freelancer can view and update their own profile information.

**Requirements:**

1.  **Create a New Secure Page Route:**
    - Create a new page route at `/dashboard/my-profile`.
    - This entire route must be secure. Only authenticated users with the `role` of 'freelancer' should be able to access it. Users who are not logged in or have a different role should be redirected to the login page or homepage.

2.  **Fetch the Correct Profile Data:**
    - On this page, you must fetch the profile data that belongs to the **currently logged-in user**.
    - This involves:
        a) Getting the current user's session data (which contains the user `id`).
        b) Using a `payload.find` query on the `profiles` collection with a `where` clause to find the profile where the `user` field equals the logged-in user's `id`.

3.  **Create an "Edit Profile" Form:**
    - Display a form on the page that is pre-filled with the fetched profile data.
    - The form should allow editing of the following fields:
        - `displayName` (text input)
        - `profilePicture` (upload component)
        - `bio` (textarea)
        - `contactInfo.email` (email input)
        - `contactInfo.phone` (text input)
        - `category` (select dropdown, populated with all categories)
        - The `services` array (this is the most complex part).

4.  **Implement the Update Logic (Server Action):**
    - Create a new **Server Action** to handle the form submission.
    - This action will receive the form data and the `id` of the profile to be updated.
    - It must use `payload.update` to update the correct profile document in the database with the new data.
    - **Crucially, add a security check:** inside the Server Action, verify again that the user performing the update is indeed the owner of the profile they are trying to edit.
    - After a successful update, show a success message to the user (e.g., using a toast notification from Shadcn/ui).

5.  **Handling the `services` Array Field:**
    - The form needs a dynamic way for users to add, edit, and remove service packages.
    - A good UX for this is to have an "Add Service" button that adds a new set of empty input fields, and a "Remove" button next to each existing service.
    - This will likely require a client component with React state (`useState`) to manage the list of services before submitting the form.

## EXAMPLES:
**Example 1: Fetching the user-specific profile.**
```typescript
// On the /dashboard/my-profile/page.tsx
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { unstable_noStore as noStore } from 'next/cache'

const payload = await getPayloadHMR({ config })
// const user = await meUser(payload) // You will need a way to get the current user session

const { docs: profiles } = await payload.find({
  collection: 'profiles',
  where: {
    'user.id': {
      equals: user.id, // Pseudo-code for user ID from session
    },
  },
  depth: 2,
})
const myProfile = profiles[0]


OTHER CONSIDERATIONS:
- Our standard workflow applies (dev mode, generate:types, etc.).
- This is a complex feature. Break it down. The highest priority is getting the form to display the correct data and successfully update the simple fields (displayName, bio). The dynamic services array is a secondary priority within this task.
- You will need to install and configure the Shadcn/ui Toast component to show success/error messages after form submission. You have permission to do so.