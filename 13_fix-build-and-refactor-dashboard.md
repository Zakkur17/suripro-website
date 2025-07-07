## FEATURE:
Fix Critical Build Error and Refactor "Edit Profile" Dashboard to Modern Standards

**Primary Goal:** Resolve the `npm run build` error ("Attempted to call useToast() from the server") by refactoring the entire "Edit Profile" feature to correctly separate server and client logic using React Server Actions and modern hooks.

**This is a critical, multi-file refactoring task.**

**Requirements:**

1.  **Consolidate and Refactor Server Actions (`actions.ts`):**
    - There are currently two `actions.ts` files. This is incorrect.
    - **Delete** the file at `src/app/actions.ts`.
    - The **single source of truth** will be `src/app/(frontend)/dashboard/my-profile/actions.ts`.
    - **Move** the `searchProfiles` function from the old `src/app/actions.ts` into this single file.
    - **Rename** the `updateProfileAction` to `updateProfile`.
    - **Refactor `updateProfile`:** It must not return an object with a `.error` property. Instead, it should return an object with a `.message` property for both success and failure cases. The `success` boolean is key. Also, improve the security check to be more efficient.

2.  **Refactor the Edit Profile Form (`edit-profile-form.tsx`):**
    - **This is the most critical part of the refactor.**
    - **Remove all client-side state management** for the form fields (`useState` for displayName, bio, etc.). The form will become an "uncontrolled" component driven by the server action.
    - **Implement `useActionState`:** This hook will manage the form's state and handle the response from the server action.
    - **Implement `useEffect` for Toasts:** Create a `useEffect` hook that listens to the state returned by `useActionState`. If the state indicates success or failure, this hook will call `toast()` on the client side. **This is the direct fix for the build error.**
    - **Use `defaultValue`:** All `<Input>`, `<Textarea>`, and `<Select>` components must use the `defaultValue` prop instead of `value`.
    - **Manage `services` Array:** Keep a small `useState` hook **only** for managing the dynamic `services` array UI (adding/removing rows). The data for these inputs must be submitted using `name` attributes (e.g., `name="services.0.serviceName"`).
    - **Create a `SubmitButton` component:** Create a small, separate component for the submit button that uses the `useFormStatus` hook to show a "pending..." state.

3.  **Refactor the Page Component (`page.tsx`):**
    - **File:** `src/app/(frontend)/dashboard/my-profile/page.tsx`
    - This file is largely correct, but ensure all `import` paths are correct relative to the new, single `actions.ts` file and other components.
    - Ensure it correctly passes the `profile` and `categories` data to the `EditProfileForm`.

4.  **No changes to `use-toast.ts`:** This file is correct and does not need to be modified.

## OTHER CONSIDERATIONS:
- This refactor moves from a fully client-controlled form to a modern, server-action-driven form. This is the official "React/Next.js" way to handle form submissions.
- The final result should be a successful `npm run build` and a fully functional "Edit Profile" page.
- Final instructions for the user:
  1. Manually delete the `.next` folder.
  2. Run `npm run build`. It must succeed.
  3. Run `npm run dev` and test the functionality.