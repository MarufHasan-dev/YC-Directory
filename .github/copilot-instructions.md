# GitHub Copilot Instructions

## Project Context

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Shadcn UI, Lucide React
- **CMS/Database**: Sanity.io
- **Auth**: NextAuth.js v5 (Beta)
- **Monitoring**: Sentry

## Architecture & Data Flow

- **Sanity Integration**:
  - **Queries**: Define in `sanity/lib/queries.ts` using `defineQuery` for type safety.
  - **Fetching**: Use `sanityFetch` from `@/sanity/lib/live` in Server Components. This enables live content updates.
  - **Mutations**: Use `writeClient` from `@/sanity/lib/write-client` for write operations (e.g., in Server Actions).
  - **Types**: Run `npm run typegen` after modifying schemas or queries to update `sanity.types.ts`.
- **Authentication**:
  - Configured in `auth.ts` with GitHub provider.
  - **User Sync**: Custom `signIn` callback syncs GitHub users to the Sanity `author` collection.
  - **Session**: The session is augmented with the Sanity `_id` (mapped to `session.user.id`). Always use this ID for relationships.

## Coding Standards

- **Components**:
  - **UI Library**: Use `components/ui` for atomic components (Shadcn pattern).
  - **Feature Components**: Place business logic components in `components/`.
  - **Server vs Client**: Default to Server Components. Use `"use client"` only for interactivity.
- **Styling**:
  - Use Tailwind CSS v4 utility classes.
  - Use `cn()` utility (from `@/lib/utils`) for conditional class merging.
  - Define global styles in `app/globals.css`.

## Server Actions & Forms

- **Location**: Define actions in `lib/actions.ts` with `"use server"`.
- **Pattern**:
  1. Authenticate user via `auth()`.
  2. Validate inputs (use `zod` or manual checks).
  3. Perform Sanity mutation using `writeClient`.
  4. Return consistent response using `parseServerActionResponse`.
- **Slug Generation**: Use `slugify` with `{ lower: true, strict: true }`.

## Key Workflows

- **Type Generation**: `npm run typegen` (Critical for Sanity type safety).
- **Development**: `npm run dev`.

## Specific Examples

- **Fetching Data**:

  ```typescript
  import { sanityFetch } from "@/sanity/lib/live";
  import { STARTUPS_QUERY } from "@/sanity/lib/queries";

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  ```

- **Defining Queries**:
  ```typescript
  import { defineQuery } from "next-sanity";
  export const MY_QUERY = defineQuery(`*[_type == "startup"]{_id, title}`);
  ```
