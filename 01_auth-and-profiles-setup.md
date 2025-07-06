## FEATURE:
Basic User Authentication and Freelancer Profile Setup.

**Requirements:**
1.  **Add User Role:** Modify the existing `Users` collection in `/src/payload.config.ts`. Add a `role` field, which must be a 'select' type with the options 'admin' and 'freelancer'.
2.  **Create Freelancer Profile Collection:** Create a COMPLETELY NEW Payload collection named `profiles`. Add it to the `collections` array in `payload.config.ts`. This collection must have the following fields:
    - `displayName` (type: text, required)
    - `bio` (type: textarea, optional)
    - `user` (type: relationship, to the 'users' collection, required and unique, so each user can only have one profile).
3.  **NextAuth.js Integration:** Integrate NextAuth.js for user authentication on the website.
    - Create the API route `src/app/api/auth/[...nextauth]/route.ts`.
    - Configure a `CredentialsProvider` that checks the email and password against the `users` collection in Payload.
    - Ensure the user session contains the user's `id` and `role`.
4.  **Environment Variables:** Create a `.env` file based on `.env.example`. Add the necessary `NEXTAUTH_SECRET` and `NEXTAUTH_URL` variables and instruct me (the user) on what values to fill in.

## EXAMPLES:
**Example: The `role` field for the Users collection.**
```typescript
// In /src/payload.config.ts, inside the 'fields' of the Users collection
{
  name: 'role',
  type: 'select',
  options: ['admin', 'freelancer'],
  required: true,
  defaultValue: 'freelancer',
  admin: {
    position: 'sidebar',
  }
}

DOCUMENTATION:
- Next.js + Payload CMS is already integrated.
- Use the official documentation for the NextAuth.js CredentialsProvider: https://next-auth.js.org/providers/credentials

OTHER CONSIDERATIONS:
- Ensure the AI understands it must work within the EXISTING structure of the create-payload-app template.
- The goal is not to build a new site, but to ADD authentication and a new collection to the existing one.