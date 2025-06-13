# Daily Cats 🐱

_Your daily dose of feline joy – now on the web & Android!_

Daily Cats shows you a fresh, adorable cat picture every morning. This repository contains:

1. **Landing page (`index.html`, `styles.css`, `images/`)** – The public-facing website used on GitHub&nbsp;Pages / Netlify.
2. **Progressive Web App (PWA) under `webapp/`** – A lightweight JS app that fetches a random cat from [cataas.com](https://cataas.com) once per day, caches it locally and can send daily notifications via the browser.

---

## ✨ Features

| Feature | Web | Android |
|---------|-----|---------|
| Daily push/notification at random time between **06:00** and **12:00** | ✅ (via Service-Worker) | ✅ (WorkManager) |
| Offline caching of images | ✅ (IndexedDB/Cache) | ✅ (Room DB) |
| Clean, modern **Material 3 / Jetpack Compose** design | ✅ | ✅ |
| One-tap refresh / retry | ✅ | ✅ |

> **Tech stack (web)**: _HTML, CSS, vanilla&nbsp;JS, Service-Workers._

---

## 🚀 Quick start

Clone the repo and just open the landing page or the PWA in your browser — **no build step required**.

```bash
# clone
git clone https://github.com/<your-username>/dailycats-web.git
cd dailycats-web

# open landing page
start index.html           # or double-click in Explorer / Finder

# open PWA directly
start webapp/index.html
```

The site is strictly static, so you can also serve it locally to test service-workers:

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000/
```

---

## 📂 Repository layout

```
├── images/              # screenshots, icons & badges
│   └── app-preview.png
├── index.html           # landing page
├── styles.css           # styling for landing page
├── webapp/              # Progressive Web App
│   ├── index.html       # PWA UI
│   ├── app.js           # core logic (fetch + notifications)
│   ├── styles.css       # PWA specific styles
│   └── service-worker.js
└── README.md
```

---

## 🛠️ Development notes

* The cat image is requested from **https://cataas.com/cat**.
* Images are cached in **`localStorage`** for a period of one calendar day.
* Notifications are scheduled and triggered by the **Service-Worker** (`webapp/service-worker.js`).
* There are **no external build tools** or package managers – keeping the project ultra-lightweight.

---

## 📦 Deploying

Because everything is static, deployment is as simple as copying the files to any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

```bash
# example: deploy to GitHub Pages
# 1. Push main branch to GitHub
# 2. In repository settings enable Pages → source: / (root)
```

The PWA will automatically register its Service-Worker when hosted on **HTTPS**.

---

## 🙏 Acknowledgements

* Cat images provided by **[Cataas – Cat as a Service](https://cataas.com)**.
* Emoji icons courtesy of [Twemoji](https://twemoji.twitter.com/).

---

## 📝 License

This project is released under the **MIT License**. See [`LICENSE`](LICENSE) for details.
