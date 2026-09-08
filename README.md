# Sourabh Patel — Web Development & Designing Portfolio

A curated collection of 8 frontend and JavaScript applications developed for the **Oasis Infobyte Student Internship Program (OIBSIP)**. Built using foundational web standards—semantic HTML5, modern responsive CSS3, and modular Vanilla JavaScript—with zero external runtime dependencies.

- **Candidate**: Sourabh Patel
- **Internship**: Oasis Infobyte (OIBSIP)
- **Track**: Web Development & Designing
- **Live Portal**: [https://sourabh123-atl.github.io/OIBSIP/](https://sourabh123-atl.github.io/OIBSIP/)
- **Repository**: [https://github.com/Sourabh123-atl/OIBSIP](https://github.com/Sourabh123-atl/OIBSIP)

---

## 📌 Applications Matrix

| Level | Task | Application | Description | Live Demo | Source Code |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **Level 1** | Task 1 | **SaaS Landing Page** | Responsive SaaS landing page for NovaCloud AI with modern pricing, ROI calculator, and feature highlights. | [Open App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L1-LandingPage/) | [View Code](https://github.com/Sourabh123-atl/OIBSIP/tree/main/WebDev-L1-LandingPage) |
| **Level 1** | Task 2 | **Personal Portfolio** | Clean developer portfolio presenting Sourabh Patel’s skills, projects, in-browser CLI, and contact form. | [Open App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L1-PersonalPortfolio/) | [View Code](https://github.com/Sourabh123-atl/OIBSIP/tree/main/WebDev-L1-PersonalPortfolio) |
| **Level 1** | Task 3 | **Temperature Converter** | Practical temperature conversion tool supporting Celsius, Fahrenheit, and Kelvin with instant calculations. | [Open App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L1-TemperatureConverter/) | [View Code](https://github.com/Sourabh123-atl/OIBSIP/tree/main/WebDev-L1-TemperatureConverter) |
| **Level 2** | Task 1 | **Precision Calculator** | Responsive calculator interface with accurate arithmetic operations, keyboard support, and history log. | [Open App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L2-Calculator/) | [View Code](https://github.com/Sourabh123-atl/OIBSIP/tree/main/WebDev-L2-Calculator) |
| **Level 2** | Task 2 | **APJ Abdul Kalam Tribute** | Interactive tribute page and quiz celebrating the life, achievements, and inspiring ideas of Dr. APJ Abdul Kalam. | [Open App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L2-TributePage/) | [View Code](https://github.com/Sourabh123-atl/OIBSIP/tree/main/WebDev-L2-TributePage) |
| **Level 2** | Task 3 | **TaskFlow To-Do App** | Productivity application combining dual-board task management with a focused 25-minute Pomodoro timer. | [Open App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L2-ToDoWebApp/) | [View Code](https://github.com/Sourabh123-atl/OIBSIP/tree/main/WebDev-L2-ToDoWebApp) |
| **Level 2** | Task 4 | **SecureGate Login Auth** | Security-focused login and dashboard interface demonstrating SHA-256 Web Crypto hashing, validation, and route guards. | [Open App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L2-LoginAuth/) | [View Code](https://github.com/Sourabh123-atl/OIBSIP/tree/main/WebDev-L2-LoginAuth) |
| **Level 3** | Task 1 | **SliceCraft Pizza Platform** | Responsive pizza ordering experience with menu browsing, 4-step custom builder, cart, and live order tracking. | [Open App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L3-PizzaApp/) | [View Code](https://github.com/Sourabh123-atl/OIBSIP/tree/main/WebDev-L3-PizzaApp) |

---

## 🛠️ Core Technologies

- **Markup**: Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) with accessible ARIA attributes.
- **Styling**: Modern CSS3 (Flexbox, CSS Grid, custom properties / design tokens, responsive media queries, fluid typography).
- **Client Logic**: Vanilla JavaScript ES6+ (DOM manipulation, event delegation, Web Storage API, Web Crypto API for SHA-256, Web Speech API, Web Audio API).
- **Deployment**: GitHub Pages with automated continuous deployment via GitHub Actions.

---

## 🚀 Local Setup & Execution

Since all projects are built without build steps, compilers, or external package managers, you can serve the repository locally using any static web server:

### 1. Clone the repository
```bash
git clone https://github.com/Sourabh123-atl/OIBSIP.git
cd OIBSIP
```

### 2. Start a local HTTP server
Using Python (recommended):
```bash
# Python 3
python -m http.server 3000
```

Or using Node.js:
```bash
npx serve .
```

### 3. Open in Browser
Navigate to `http://localhost:3000` to access the master portal and all connected applications.

---

## 📂 Project Structure

```text
OIBSIP/
├── index.html                           # Master Portfolio Web Portal
├── 404.html                             # GitHub Pages Fallback Error Page
├── README.md                            # Documentation & Project Matrix
├── LINKEDIN_POSTS_GUIDE.md              # LinkedIn Video Submission Guide
├── .github/workflows/pages.yml          # GitHub Pages CI/CD Pipeline
│
├── WebDev-L1-LandingPage/               # Level 1 Task 1: SaaS Landing Page
│   ├── index.html, styles.css, app.js
│
├── WebDev-L1-PersonalPortfolio/         # Level 1 Task 2: Personal Portfolio
│   ├── index.html, styles.css, app.js
│
├── WebDev-L1-TemperatureConverter/      # Level 1 Task 3: Temperature Converter
│   ├── index.html, styles.css, app.js
│
├── WebDev-L2-Calculator/                # Level 2 Task 1: Precision Calculator
│   ├── index.html, styles.css, app.js
│
├── WebDev-L2-TributePage/               # Level 2 Task 2: APJ Abdul Kalam Tribute
│   ├── index.html, styles.css, app.js
│
├── WebDev-L2-ToDoWebApp/                # Level 2 Task 3: TaskFlow To-Do App
│   ├── index.html, styles.css, app.js
│
├── WebDev-L2-LoginAuth/                 # Level 2 Task 4: SecureGate Login Auth
│   ├── index.html, styles.css, app.js
│
└── WebDev-L3-PizzaApp/                  # Level 3 Task 1: SliceCraft Pizza Delivery
    ├── index.html, styles.css, app.js
```

---

## 📜 Evaluation Compliance
- **Folder Naming**: Adheres strictly to the `OIBSIP/[TrackName]-[Level/Task]-[ProjectName]/` standard.
- **Independence**: Every application functions completely independently as well as seamlessly linked from the master portal.
- **Responsiveness**: Tested across mobile (320px, 375px), tablet (768px), and desktop (1024px, 1440px) viewports.

---

© 2026 **Sourabh Patel**. All rights reserved.
