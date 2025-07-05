# Global Rules for the SuriPro Project

This document contains project-wide rules that you, as the AI assistant, must follow in every interaction.

## 1. Project Awareness & Goal
- **Project Name:** SuriPro
- **Goal:** To build an online platform where Surinamese freelancers and businesses can offer their services.
- **Core Functionality:** Searchable profiles with portfolios.

## 2. Technology Stack
- **Framework:** Next.js (using App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS. Use Shadcn/ui for any new UI components.
- **Database:** PostgreSQL (local) and Vercel Postgres (production).
- **Authentication:** NextAuth.js (this needs to be added and integrated).
- **Backend/Admin:** Payload CMS. The base configuration is already present in `/src/payload.config.ts`.

## 3. Code Structure & Modularity
- **Organization:** Follow the existing project structure. Place new components in `/src/app/_components`.
- **Payload Collections:** All new Payload collections must be defined in `payload.config.ts` and added to the `collections` array.
- **File Size:** A file must not exceed 400 lines of code. Refactor into smaller, reusable functions or components if necessary.

## 4. Testing & Reliability
- **Frameworks:** The project is set up with Vitest for unit testing. Write tests for crucial business logic.
- **Location:** Place tests next to the files they are testing, using a `.test.ts` or `.test.tsx` extension.

## 5. AI Behavioral Rules
- **Analyze First:** Thoroughly analyze the existing code and file structure before adding new code. The `create-payload-app` template has already established a solid foundation.
- **Ask for Clarification:** If a request is unclear, ask for clarification before proceeding.
- **Security First:** Always follow security best practices, especially for the new NextAuth.js integration and database interactions.