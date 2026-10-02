# Oluwatobi Joel — Portfolio

Portfolio site for a freelance **Web Designer & Data Analyst** based in Maiduguri, Nigeria. It's a static site hosted on **Vercel**, with no database.

```
public/           (every file sits directly in this folder, no subfolders)
  index.html        Home page (hero, Web Design, Data Analyst, About, Contact)
  design.html       Design page at /design (nav "Design" links here)
  data.html         Data Analyst page at /data (nav "Data Analyst" links here)
  about.html        About Me page at /about (nav "About" links here)
  style.css     Styles (colors & fonts are at the top)
  design.css    Styles for the Design, Data Analyst and About pages
  projects.js    ← YOUR PROJECTS: edit this list
  main.js        Home page script
  design.js      Design + Data pages: project cards and project viewer
  me.webp       Home hero portrait
  me-seated.webp  Design / Data / About portrait
  signature-full.webp  About page signature
  project-*.webp  Project screenshots
dev-server.js       Local preview server (Node.js, no dependencies)
vercel.json         Vercel config
```

## Preview locally

```bash
npm run dev     # http://localhost:3000
```

## Deploy

The repo is connected to Vercel, so every push to `main` redeploys the site automatically.

## Editing

| What | Where |
|---|---|
| Projects | `public/projects.js` (`category: 'design'` or `'data'`). Add `live` and `repo` links. Put screenshots in `public/` (named `project-*.webp`). |
| Hero photo | Replace `public/me.webp` (a cut-out portrait with a transparent background) |
| Text, skills, email | `public/index.html`, and `EMAIL` in `public/main.js` |
| Colors & fonts | Top of `public/style.css` |

The home screen is laid out on a 1536×1152 artboard that scales with the window. Below 760px wide it switches to a stacked phone layout.

**Contact form:** messages are saved to Supabase (table `contact_messages`). Read them in Supabase → Table Editor. If saving fails, the form opens the visitor's email app instead.

**Supabase setup (once):** open Supabase → SQL Editor, paste `supabase/schema.sql`, and click Run. The project URL and publishable key are in `public/supabase.js`.

**Design and Data Analyst pages:** each project card opens a preview with the screenshot, description, tech tags, and **Live Site** / **GitHub** buttons. The project list is stored in this repo, so adding a project means editing `projects.js` and committing.

**About page:** the bio, info card, values, hobbies and skills are all plain HTML in `public/about.html`.
