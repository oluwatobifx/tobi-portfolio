# Oluwatobi Joel — Portfolio

Portfolio site for a freelance **Web Designer & Data Analyst** based in Maiduguri, Nigeria. It's a static site hosted on **Vercel**, with no database.

```
public/
  index.html        Home page (hero, Web Design, Data Analyst, About, Contact)
  design.html       Design page at /design (nav "Design" links here)
  data.html         Data Analyst page at /data (nav "Data Analyst" links here)
  about.html        About Me page at /about (nav "About" links here)
  css/style.css     Styles (colors & fonts are at the top)
  css/design.css    Styles for the Design, Data Analyst and About pages
  js/projects.js    ← YOUR PROJECTS: edit this list
  js/main.js        Home page script
  js/design.js      Design + Data pages: project cards and project viewer
  img/me.webp       Home hero portrait
  img/me-seated.webp  Design / Data / About portrait
  img/signature-full.webp  About page signature
  img/project-*.webp  Project screenshots
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
| Projects | `public/js/projects.js` (`category: 'design'` or `'data'`). Add `live` and `repo` links. Put screenshots in `public/img/` (named `project-*.webp`). |
| Hero photo | Replace `public/img/me.webp` (a cut-out portrait with a transparent background) |
| Text, skills, email | `public/index.html`, and `EMAIL` in `public/js/main.js` |
| Colors & fonts | Top of `public/css/style.css` |

The home screen is laid out on a 1536×1152 artboard that scales with the window. Below 760px wide it switches to a stacked phone layout.

**Contact form:** it opens the visitor's email app with the message already filled in.

**Design and Data Analyst pages:** each project card opens a preview with the screenshot, description, tech tags, and **Live Site** / **GitHub** buttons. The project list is stored in this repo, so adding a project means editing `projects.js` and committing.

**About page:** the bio, info card, values, hobbies and skills are all plain HTML in `public/about.html`.
