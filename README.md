# Oluwatobi Joel — Portfolio

Portfolio site for a freelance **Web Designer & Data Analyst** based in Maiduguri, Nigeria. It's a static site hosted on **Vercel**, with no database.

```
public/
  index.html        Home, Web Design, Data Analyst, About, Contact
  css/style.css     Styles (colors & fonts are at the top)
  js/projects.js    ← YOUR PROJECTS: edit this list
  js/main.js        Menu, project cards, contact form
  img/me.webp       Hero portrait (transparent background)
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
| Projects | `public/js/projects.js` (`category: 'design'` or `'data'`) |
| Hero photo | Replace `public/img/me.webp` (a cut-out portrait with a transparent background) |
| Text, skills, email | `public/index.html`, and `EMAIL` in `public/js/main.js` |
| Colors & fonts | Top of `public/css/style.css` |

The home screen is laid out on a 1536×1152 artboard that scales with the window. Below 760px wide it switches to a stacked phone layout.

**Contact form:** it opens the visitor's email app with the message already filled in.
