# 🧠 DSA Mastery

Master **Data Structures & Algorithms** with implementations in **C++**, **Java**, **Python** and **JavaScript** — a React app you can deploy free on GitHub Pages.

## Features

- 🎬 **19 step-by-step visualizations** — watch algorithms run: array bars with pointers, linked-list nodes, sliding windows, stacks, 2D DP tables, flood-fill grids, trees and BFS graphs (play / pause / step / speed controls)
- 📚 **14 topics**, from Arrays to Dynamic Programming, with must-know problems
- 🌐 **4 languages** per problem — switch with a click, copy with one button
- ⏱ Time & space complexity shown for every problem
- 🔍 Instant search across problems, descriptions and tags
- 🏆 Progress tracking saved in your browser (localStorage)
- 📈 Big-O reference table with growth comparison
- 🌙 Dark, developer-friendly theme

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages (free)

1. **Change the base path** in `vite.config.js` to your repo name:

   ```js
   base: '/<your-repo-name>/',
   ```

2. Push the project to a GitHub repo (branch `main`).

3. In your repo: **Settings → Pages → Source → GitHub Actions**.

4. The included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically on every push. Your site will be live at:

   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

> Uses `HashRouter`, so deep links and refreshes work on GitHub Pages without extra configuration.

## Add your own problems

Edit `src/data/topics.js` — each problem is an object with a `title`, `description`, `complexity`, `tags`, and a `code` map keyed by language (`cpp`, `java`, `python`, `javascript`). Add a language by extending the map; the UI renders it automatically.

## Add your own visualizations

Edit `src/data/visualizations.js` — add an entry keyed by `topicId/itemId` with `type` (`array`, `list`, `grid` or `tree`) and a list of `frames`. Each frame is one animation step: a `note` shown to the learner plus the visual state (values, states, pointers, chips). The player controls render automatically.

## Tech stack

- React 19 + Vite
- react-router-dom (HashRouter)
- No UI library — hand-rolled dark theme
- GitHub Actions CI/CD
