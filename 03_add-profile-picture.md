## FEATURE:
Add Profile Picture to Freelancer Profiles

**Requirements:**

1.  **Add `Media` Collection for Uploads:**
    - The `create-payload-app` template already includes a `Media` collection. We will use this to store our images.
    - We need to ensure that this `Media` collection is publicly readable so that images can be displayed on the website. Please check the `access` control functions for the `Media` collection in `src/collections/Media/index.ts` and set the `read` access to return `true`.

2.  **Update `Profiles` Collection:**
    - Modify the `Profiles` collection in `src/collections/Profiles/index.ts`.
    - Add a new field named `profilePicture`.
    - This field must be of type `upload`.
    - It must have a `relationTo` property pointing to the `'media'` collection.
    - This field should not be required.

3.  **Update Frontend `ProfileCard` Component:**
    - Modify the `ProfileCard` component at `src/app/_components/ProfileCard.tsx`.
    - The component should now accept the entire `Profile` object.
    - It must display the `profilePicture`. If a profile picture exists, show the image. If not, show a generic placeholder avatar.
    - The profile picture should be circular and displayed above the `displayName`.

4.  **Update Frontend Profile Detail Page:**
    - Modify the profile detail page at `/profiles/[id]/page.tsx`.
    - It should also display the `profilePicture` prominently at the top of the page.
    - Use a larger size for the profile picture here compared to the card.

## EXAMPLES:
**Example 1: The `profilePicture` field in the `Profiles` collection.**
```typescript
// In src/collections/Profiles/index.ts, within the 'fields' array
{
  name: 'profilePicture',
  type: 'upload',
  relationTo: 'media',
}

Example 2: How to display a Payload image in a Next.js component.
Remember that the profilePicture field will contain either the ID of the media object or the full media object itself if the query is configured with enough depth. Let's assume we have the full object.

// Inside a React component, where 'profile' is a prop of type 'Profile'
// and 'profile.profilePicture' is of type 'Media'
import { Media } from '@/payload-types';

const picture = profile.profilePicture as Media; // Type assertion
if (picture && typeof picture === 'object' && picture.url) {
  return <img src={picture.url} alt={picture.alt} />;
}


OTHER CONSIDERATIONS:
- After modifying the Payload collections, a database migration is required. Instruct me (the user) to run the migration commands after you are done.
- The Media collection might need to be created if it doesn't exist, but it's standard in the template. Please verify.
- Use the Next.js <Image> component for better performance and optimization, instead of a standard <img> tag.