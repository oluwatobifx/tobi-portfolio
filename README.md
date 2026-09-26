# Tobi — Portfolio

A personal portfolio site (Developer & Designer). It's a plain static site with no database or backend, and it's hosted on **Vercel**.

```
public/
  index.html        The whole site: hero, work, about, contact
  css/style.css     Styles (colors & fonts are at the top)
  js/projects.js    ← YOUR PROJECTS: edit this list
  js/main.js        Filters, animations, contact form
  img/              Your photo, project images, favicon
dev-server.js       Local preview server (Node.js, no dependencies)
vercel.json         Vercel config
```

## Preview locally

```bash
npm run dev     # http://localhost:3000
```

## Deploy

Push to GitHub, then in Vercel choose **Add New → Project** and import the repo. No build settings are needed. Every `git push` to `main` redeploys the site.

## Make it yours

| What | Where |
|---|---|
| Projects | `public/js/projects.js` |
| Your photo | Add `public/img/me.png`. Use a cut-out portrait with a transparent background, about 1200px tall. |
| Headline, about, stats, skills | `public/index.html` |
| Email | `public/index.html` and `EMAIL` in `public/js/main.js` |
| Colors & fonts | Top of `public/css/style.css` |

**Contact form:** there's no server, so the form opens the visitor's email app with the message already filled in.

**Visitor stats:** turn on **Vercel → Project → Analytics** (free). The tracking script is already in `index.html`.
