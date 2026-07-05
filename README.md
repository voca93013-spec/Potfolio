# Ahmed Sultan — Portfolio

A modern, animated, and fully responsive personal portfolio built with pure **HTML, CSS, and vanilla JavaScript** — no build step required.

## ✨ Features

- **5 pages**: Home, About, Skills, Projects, Contact
- **Animated UI**: floating orbs, 3D tilt cards, scroll-reveal, shimmer progress bars, animated modals
- **Dark / Light theme** with localStorage persistence
- **Front-end CMS**: edit any project's image or live-demo link from the browser (slider icon on Projects page). Saved in localStorage.
- **7 projects** included (Home Purify, Art Gallarix, Cafe Landing, Weather Dashboard, **PetFlux · AI Chatbot**, **Urban Threads**, **Aurora Notes**)
- **Live demo links** for every project (configure from the admin panel)
- **Vercel-ready** with `vercel.json` for caching & security headers

## 🗂 Project Structure

```
portfolio/
├── index.html        # Home / hero
├── about.html        # About me
├── skills.html       # Skills + progress bars
├── projects.html     # Project grid + admin editor
├── contact.html      # Contact form
├── style.css         # All styles (dark/light, responsive, animated)
├── script.js         # Theme, nav, render, admin editor
├── vercel.json       # Vercel config (caching + security)
└── images/
    └── profile.jpg   # (optional) profile picture
```

## 🚀 Deploy to Vercel

### Option A — Vercel Dashboard (easiest)

1. Push this folder to a **GitHub repository**.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **"Other"** (it's a static site).
4. Click **Deploy**. You'll get a link like `https://your-name-portfolio.vercel.app`.

### Option B — Vercel CLI

```bash
npm i -g vercel
cd portfolio
vercel        # follow prompts
vercel --prod # deploy to production
```

## 🔗 Set your live demo links

1. Open the deployed site and go to **Projects**.
2. Click the **slider icon (⚙️)** in the navbar.
3. For each project paste:
   - **Image URL** (Vercel blob, Unsplash, or your own hosted image)
   - **Live demo link** (your Vercel project URL, e.g. `https://homepurify.vercel.app`)
4. Click **Save changes** — values persist in the browser.

> To make customizations stick for _all visitors_, edit the `DEFAULT_PROJECTS` array in `script.js` (search for `DEFAULT_PROJECTS`).

## 🛠 Customize

- **Name, brand, hero copy** → edit `index.html` / `about.html`
- **Colors** → tweak the CSS variables at the top of `style.css` (`--accent`, `--grad`, etc.)
- **Skills & percentages** → edit the data at the bottom of `skills.html` (`groups` object)
- **Projects** → edit the `DEFAULT_PROJECTS` array in `script.js`
- **Contact email** → in `script.js` (search for `hello@ahmedsultan.dev`)

## 📄 License

Free to use and adapt for your own portfolio.
