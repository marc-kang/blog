# Personal Blog

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Velite (MDX content management)
- next-themes (dark mode)
- Resend (email subscriptions)
- Vercel Analytics

## Development Commands
- `bun dev` — Start development server
- `bun build` — Build for production
- `bun start` — Start production server

## Project Structure
```
content/blog/       — MDX blog posts
src/app/            — Next.js App Router pages
src/components/     — React components
src/components/ui/  — shadcn/ui components
src/config/site.ts  — Site configuration
src/lib/utils.ts    — Utility functions
velite.config.ts    — Velite content config
.velite/            — Generated content (gitignored)
```

## Content
- Blog posts go in `content/blog/*.mdx`
- Frontmatter: title, description, date, published, tags
- Import posts via `import { posts } from "#site/content"`

## Conventions
- Use TypeScript strict mode
- Use bun as package manager
- Follow existing code patterns
- shadcn/ui for UI components
- Tailwind v4 with CSS variables for theming
