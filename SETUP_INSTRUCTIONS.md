# Authentication Feature Setup Instructions

## Environment Variables Configuration

Your `.env` file has been updated with the NextAuth.js configuration. Please update the following values:

### NextAuth Secret
```bash
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET_HERE
```

**Instructions:**
1. Generate a secure random string (32+ characters)
2. You can use this command to generate one:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. Replace `YOUR_NEXTAUTH_SECRET_HERE` with your generated secret

### NextAuth URL
```bash
NEXTAUTH_URL=http://localhost:3000
```

**Instructions:**
- For development: Keep as `http://localhost:3000`
- For production: Change to your actual domain (e.g., `https://yourdomain.com`)

### Other Required Values
Make sure these are also set in your `.env` file:
```bash
CRON_SECRET=YOUR_CRON_SECRET_HERE
PREVIEW_SECRET=YOUR_SECRET_HERE
```

## Summary of Changes Made

### 1. ✅ User Role Field Added
- Modified `src/collections/Users/index.ts` to include a `role` field
- Options: 'admin' and 'freelancer'
- Default value: 'freelancer'

### 2. ✅ Profiles Collection Created
- Created `src/collections/Profiles/index.ts` with:
  - `displayName` (required text field)
  - `bio` (optional textarea)
  - `user` (required unique relationship to users)
- Added to payload configuration

### 3. ✅ NextAuth.js Integration
- Installed `next-auth`, `bcryptjs`, and `@types/bcryptjs`
- Created `src/app/api/auth/[...nextauth]/route.ts`
- Configured CredentialsProvider with Payload authentication
- Added proper TypeScript types for user sessions

### 4. ✅ Environment Variables
- Updated `.env` and `.env.example` files
- Added `NEXTAUTH_SECRET` and `NEXTAUTH_URL` variables

## Next Steps

1. **Update your environment variables** as instructed above
2. **Run database migrations** (if using PostgreSQL):
   ```bash
   npm run payload migrate:create
   npm run payload migrate
   ```
3. **Test the authentication** by creating a user and attempting to sign in
4. **Regenerate types** if you make further changes:
   ```bash
   npm run generate:types
   ```

## Authentication Flow

- Users can sign in using their email and password
- Authentication is handled by NextAuth.js
- User sessions include `id`, `email`, `name`, and `role`
- Each user can have one associated profile in the `profiles` collection

All requirements from `INITIAL.md` have been successfully implemented!
