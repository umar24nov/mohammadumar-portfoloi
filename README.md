# 🌐 Mohd Umar — Personal Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-00d4ff?style=flat-square)](LICENSE)
[![Portfolio](https://img.shields.io/badge/Live-Portfolio-ff6b35?style=flat-square)](https://www.mohammadumarportfoloi.online/)

---

## 👤 About

This is the personal portfolio of **Mohd Umar**, a B.Tech Computer Science fresher passionate about Development and Machine Learning. This site serves as a showcase of projects, skills, and open-source activity.

- 📧 [umar24nov@gmail.com](mailto:umar24nov@gmail.com)
- 💼 [linkedin.com/in/mohammadumarfarook](https://www.linkedin.com/in/mohammadumarfarook)
- 🐙 [github.com/umar24nov](https://github.com/umar24nov)

---

## 📁 What This Repo Contains

```
my-portfolio/
├── public/
│   ├── favicon.svg             # Browser tab logo (MU monogram)
│   └── index.html              # SPA shell
├── src/
│   ├── App.jsx                 # Root — composes all sections
│   ├── index.js                # React entry point
│   ├── index.css               # Tailwind imports + global reset
│   ├── config/                 # Constants, projects, skills, timeline, Firebase, API
│   ├── context/                # ThemeContext (light/dark)
│   ├── hooks/                  # useTypewriter
│   ├── styles/animations.css   # Full design system (palette, fonts, utilities)
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, AnimatedCanvas
│   │   ├── sections/           # Hero, About, Projects, Skills, Education, Contact, ...
│   │   ├── ui/                 # Section, Chip, SkillBar, LottieCube, ...
│   │   └── feedback/           # Feedback button + modal
├── server/                     # Express API (feedback, rate limiting, validation)
├── vercel.json                 # Build/output config for Vercel
├── tailwind.config.js          # Tailwind content paths
├── package.json                # Dependencies & scripts
└── README.md                   # You are here
```

---

## 🗂️ Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | **Hero** | Typewriter intro, name, CTAs, Download CV + rotating Lottie cube backdrops |
| 02 | **About** | Bio, highlight stat cards, social links |
| 03 | **Projects** | StudyVault, Performance Predictor, Portfolio — Live Demo + GitHub links |
| 04 | **Skills** | Animated skill bars (Languages, Frontend, Backend) + chip tags (ML, DB, Tools) |
| 05 | **Code Signature** | Syntax-highlighted Python snippet showing personality & philosophy |
| 06 | **Education** | Glowing dot timeline |
| 07 | **Contact** | Email, GitHub, LinkedIn link cards + working feedback form (API) |
| 08 | **GitHub Activity** | Live contribution graph, streak stats, top languages |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion, CSS `@keyframes`, Lottie (`lottie-react`) |
| Fonts | JetBrains Mono, Inter, Fira Code (Google Fonts) |
| Backend | Express (feedback API — validation, rate limiting, helmet) |
| Database | Firebase / MongoDB (Mongoose) |
| Forms | react-hook-form |
| GitHub Stats | [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) |
| Contribution Graph | [github-readme-activity-graph](https://github.com/Ashutosh00710/github-readme-activity-graph) |
| Deployment | Vercel |

---

## ✨ Features

- 🎨 Neon Grid design system — warm gradient (orange → magenta → purple) + neon green on near-black, light/dark modes
- 🔷 Rotating Lottie wireframe cubes flanking the hero name
- ⌨️ Typewriter effect cycling through roles
- 📜 Scroll-triggered reveal animations on every section
- 📊 Animated skill bars that fill on scroll
- 🖥️ Fake VS Code editor (Code Signature section)
- 🐛 Working Report/Feedback modal with type selector backed by an Express API
- 📈 Live GitHub contribution graph + stats
- 📱 Fully responsive — mobile, tablet, desktop
- ⬇️ Download CV button

---

## 🚀 Projects Showcased

### 📚 StudyVault
AI-powered study companion. Centralises notes, generates summaries, flashcards and quizzes from uploaded PDFs.
`React` `Node.js` `MongoDB` `OpenAI API` `Express` `Cloudinary`

### 📊 Performance Predictor
ML model that analyses student data to predict academic performance and flag at-risk students early.
`Python` `Scikit-learn` `Pandas` `NumPy` `Flask` `MySQL`

### 🌐 Portfolio Website
This site. React portfolio with Lottie animations, scroll reveals and GitHub stats.
`React` `Tailwind CSS` `Framer Motion` `Lottie`

---

## 🚦 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run the React dev server |
| `npm run build` | Production build to `build/` |
| `npm test` | Run tests |
| `npm run server` | Run the Express feedback API |
| `npm run dev` | Run frontend + API concurrently |
| `npm run install-all` | Install root + server dependencies |

---

## 📄 License

This portfolio is open for inspiration. Please do not copy it wholesale and present it as your own.

---

<p align="center">Designed & Built by <strong>Mohd Umar</strong> · 2025</p>
