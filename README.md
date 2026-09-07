# 🌐 OIBSIP — Oasis Infobyte Student Internship Program

<div align="center">

![Oasis Infobyte Internship](https://img.shields.io/badge/OASIS%20INFOBYTE-SIP%202026-00ADB5?style=for-the-badge&logo=codeforces&logoColor=white)
![Domain](https://img.shields.io/badge/TRACK-Web%20Development%20%26%20Designing-blue?style=for-the-badge&logo=googlechrome&logoColor=white)
![Status](https://img.shields.io/badge/STATUS-Completed-success?style=for-the-badge&logo=checkmarx&logoColor=white)
![License](https://img.shields.io/badge/LICENSE-MIT-lightgrey?style=for-the-badge)

<p align="center">
  <b>Repository holding all task submissions for the Oasis Infobyte Web Development & Designing Track.</b><br>
  Includes complete implementations of <b>Level 1 (3 Tasks)</b> and <b>Level 2 (4 Tasks)</b> adhering strictly to all requirements.
</p>

[📌 Explore Projects](#-project-directory--matrix) • [🚀 Getting Started](#-getting-started) • [🛠️ Tech Stack](#️-technology-stack) • [📋 Features Overview](#-features-overview)

</div>

---

## 📌 Project Directory & Matrix

| Level | Task | Project Name | Tech Stack | Status | Live Demo Link |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Level 1** | **Task 1** | **Landing Page** | HTML5, CSS3, JavaScript | `COMPLETED` | [🌐 Launch App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L1-LandingPage/) |
| **Level 1** | **Task 2** | **Personal Portfolio** | HTML5, CSS3, JavaScript | `COMPLETED` | [🌐 Launch App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L1-PersonalPortfolio/) |
| **Level 1** | **Task 3** | **Temperature Converter** | HTML5, CSS3, JavaScript | `COMPLETED` | [🌐 Launch App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L1-TemperatureConverter/) |
| **Level 2** | **Task 1** | **Calculator** | HTML5, CSS3 (Grid), JavaScript | `COMPLETED` | [🌐 Launch App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L2-Calculator/) |
| **Level 2** | **Task 2** | **Tribute Page** | HTML5, CSS3, JavaScript | `COMPLETED` | [🌐 Launch App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L2-TributePage/) |
| **Level 2** | **Task 3** | **To-Do Web App** | HTML5, CSS3, JavaScript, LocalStorage | `COMPLETED` | [🌐 Launch App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L2-ToDoWebApp/) |
| **Level 2** | **Task 4** | **Login Authentication System** | HTML5, CSS3, JS, Web Crypto (SHA-256) | `COMPLETED` | [🌐 Launch App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L2-LoginAuth/) |

---

## 🚀 Getting Started

All projects are built using pure, standards-compliant HTML5, modern responsive CSS3, and modular Vanilla JavaScript with zero external runtime build dependencies required.

### 1. Clone the repository
```bash
git clone https://github.com/Sourabh123-atl/OIBSIP.git
cd OIBSIP
```

### 2. Run Any Project
You can open the `index.html` file of any project folder directly in any modern web browser, or serve locally with Python or VS Code Live Server:

```bash
# Serve the whole workspace locally:
# Python 3
python -m http.server 8000

# Or with Node.js
npx serve .
```
Then navigate to `http://localhost:8000` in your web browser.

---

## 🛠️ Technology Stack

- **Markup & Structure**: HTML5 (Semantic elements, accessible ARIA attributes)
- **Styling & Layout**: CSS3 (Modern Flexbox, CSS Grid, Glassmorphism, CSS Custom Properties / Design Tokens, Keyframe Animations)
- **Logic & State**: Modern Vanilla JavaScript (ES6+, DOM Manipulation, Web Storage API, Web Crypto API)
- **Icons & Typography**: Google Fonts (Inter, Outfit, Playfair Display), Modern SVG Icons

---

## 📋 Features Overview

### 🔹 Level 1 — Foundational Web Engineering
1. **NovaCloud AI Landing Page (`WebDev-L1-LandingPage`)**:
   - Sticky frosted-glass navigation bar with smooth anchor links.
   - High-impact hero section with live demo triggers and CTA buttons.
   - Feature matrix, architecture showcase, customer testimonial cards, and tiered pricing table.
   - Comprehensive footer with social channels and interactive newsletter signup.
   - Zero element overlap, fully fluid mobile-to-desktop responsiveness.

2. **Personal Developer Portfolio (`WebDev-L1-PersonalPortfolio`)**:
   - Polished hero introduction with avatar, role tags, and interactive resume download.
   - Structured "About Me" biographical narrative.
   - Categorized technical skills grid with animated proficiency indicators.
   - Interactive project showcase with tag filtering and GitHub/demo buttons.
   - Validated contact form with interactive toast notification feedback.

3. **ThermoPulse Temperature Converter (`WebDev-L1-TemperatureConverter`)**:
   - Bi-directional conversion supporting Celsius ($^\circ\text{C}$), Fahrenheit ($^\circ\text{F}$), and Kelvin ($\text{K}$).
   - Instant real-time conversion across all units simultaneously.
   - Input validation guarding against non-numeric entries with clear error toasts.
   - Absolute zero physical threshold detection ($< -273.15^\circ\text{C}$ / $< 0\text{K}$).
   - Dynamic temperature thermal state visualizer gauge.

### 🔹 Level 2 — Interactive Applications & Systems
1. **NeoCalc Arithmetic Calculator (`WebDev-L2-Calculator`)**:
   - Clean CSS Grid layout with tactile push animations and responsive buttons.
   - Complete arithmetic operation engine supporting chained operations ($5 + 3 \times 2$).
   - Division-by-zero protection with user-friendly error banners.
   - Full keyboard navigation and calculation history drawer.
   - Pure event listener architecture (0 inline `onclick` attributes).

2. **Dr. A.P.J. Abdul Kalam Tribute Page (`WebDev-L2-TributePage`)**:
   - Editorial tribute layout dedicated to India's "Missile Man" and 11th President.
   - Curated biographical chapters and high-resolution imagery.
   - Interactive chronological timeline covering milestones from 1931 to 2015.
   - Distinctive typography pairing (Playfair Display serif + Inter sans-serif).
   - Inspiring quote callouts and awards archive.

3. **TaskFlow To-Do Web App (`WebDev-L2-ToDoWebApp`)**:
   - Dual-board task manager dividing Pending and Completed items.
   - Add tasks with priority tags (High, Medium, Low) and categories.
   - Inline real-time editing, item completion toggle, and permanent delete.
   - Real-time pending/completed counter badges.
   - ISO timestamps for creation and completion dates.
   - Full `localStorage` state persistence.

4. **SecureGate Authentication System (`WebDev-L2-LoginAuth`)**:
   - Tabbed User Registration and Login interface.
   - Robust password validation (8+ characters, numbers, uppercase, special symbols) with real-time strength meter.
   - Client-side SHA-256 password hashing via Web Crypto API before storing.
   - Duplicate account detection and secure generic authentication error handling.
   - Protected Dashboard page with token validation and unauthorized direct-access redirect.
   - Authenticated session management with logout and user profile summary.

---

## 📜 Submission & Evaluation Notes
- **Repository Name**: `OIBSIP` (Strict compliance)
- **Folder Format**: `OIBSIP/[TrackName]-[Level/Task]-[ProjectName]/`
- **Demo Videos**: Follows the required 2-second static title card format `[Full Name] | [Track] | [Task Title]` prior to end-to-end screen recordings.
