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
| **Level 3** | **Task 1** | **Pizza Delivery & Inventory Platform** | HTML5, CSS3, JS, Dynamic Canvas/SVG | `COMPLETED` | [🌐 Launch App](https://sourabh123-atl.github.io/OIBSIP/WebDev-L3-PizzaApp/) |

---

## 🚀 Getting Started

All projects are built using pure, standards-compliant HTML5, modern responsive CSS3, and modular Vanilla JavaScript with zero external runtime build dependencies required.

### 1. Clone the repository
```bash
git clone https://github.com/Sourabh123-atl/OIBSIP.git
cd OIBSIP
```

### 2. Run All-in-One Master Suite
You can open the `index.html` master hub directly or serve locally to access all 8 apps with the integrated live sandbox preview:

```bash
# Serve the whole workspace locally:
# Python 3
python -m http.server 3000

# Or with Node.js
npx serve .
```
Then navigate to `http://localhost:3000` in your web browser.

---

## 🛠️ Technology Stack

- **Markup & Structure**: HTML5 (Semantic elements, accessible ARIA attributes)
- **Styling & Layout**: CSS3 (Modern Flexbox, CSS Grid, Glassmorphism, CSS Custom Properties / Design Tokens, Keyframe Animations)
- **Logic & State**: Modern Vanilla JavaScript (ES6+, DOM Manipulation, Web Storage API, Web Crypto API, Web Audio API, Web Speech API)
- **Icons & Typography**: Google Fonts (Outfit, Plus Jakarta Sans, Fira Code), Modern SVG Icons

---

## 📋 Features Overview

### 🔹 Level 1 — Foundational Web Engineering
1. **NovaCloud AI Landing Page (`WebDev-L1-LandingPage`)**:
   - Sticky frosted-glass navigation bar with smooth anchor links.
   - Interactive Annual/Monthly billing toggle with instant discount calculation.
   - Live Interactive Cloud Cost & ROI Calculator with slider controls.
   - Terminal sandbox, customer testimonial cards, and tiered pricing table.

2. **Personal Developer Portfolio (`WebDev-L1-PersonalPortfolio`)**:
   - Polished hero introduction for **Sourabh Patel** with avatar and resume download.
   - Interactive in-browser CLI terminal emulator (`help`, `skills`, `projects`, `contact`).
   - Categorized technical skills grid with animated proficiency indicators and radar.
   - Live contact form with `localStorage` message inbox and simulated auto-reply.

3. **ThermoPulse Temperature Converter (`WebDev-L1-TemperatureConverter`)**:
   - Bi-directional conversion supporting Celsius ($^\circ\text{C}$), Fahrenheit ($^\circ\text{F}$), Kelvin ($\text{K}$), and Rankine ($^\circ\text{R}$).
   - Fluid animated thermometer visualizer responding dynamically to temperature.
   - Absolute zero physical threshold detection ($< -273.15^\circ\text{C}$).
   - Real-world city weather temperature presets (Delhi, London, Tokyo, Dubai, Antarctic).

### 🔹 Level 2 — Interactive Applications & Systems
1. **NeoCalc Arithmetic Calculator (`WebDev-L2-Calculator`)**:
   - Clean CSS Grid layout with tactile push animations and responsive buttons.
   - Complete arithmetic operation engine supporting chained operations and parentheses.
   - Division-by-zero protection with user-friendly error banners.
   - Full keyboard navigation, Web Audio sound synthesis, and calculation history drawer.

2. **Dr. A.P.J. Abdul Kalam Tribute Page (`WebDev-L2-TributePage`)**:
   - Editorial tribute layout dedicated to India's "Missile Man" and 11th President.
   - Interactive chronological timeline covering milestones from 1931 to 2015.
   - Text-to-Speech quote narrator using Web Speech API.
   - Interactive 5-Question Kalam Trivia Quiz with instant badge scoring.

3. **TaskFlow To-Do Web App (`WebDev-L2-ToDoWebApp`)**:
   - Dual-board task manager dividing Pending and Completed items.
   - Add tasks with priority tags (High, Medium, Low), categories, and due dates.
   - Inline real-time editing, item completion toggle, and permanent delete.
   - Confetti celebration FX and victory chimes on completion.
   - Integrated 25-minute Pomodoro focus timer with alert chimes.
   - Full `localStorage` state persistence.

4. **SecureGate Authentication System (`WebDev-L2-LoginAuth`)**:
   - Tabbed User Registration and Login interface with 1-Click Quick Demo Login.
   - Client-side SHA-256 password hashing via Web Crypto API before storing.
   - Real-time password strength meter and duplicate account detection.
   - Protected Dashboard: live profile editor, password change module, live security audit logs, and 24h session countdown timer.

### 🔹 Level 3 — Advanced Full-Stack Platform
1. **SliceCraft Pizza Delivery & Inventory Platform (`WebDev-L3-PizzaApp`)**:
   - 4-Step Custom Pizza Builder with live dynamic visual layers (Crust, Sauce, Cheese, Veggies) and real-time pricing calculation.
   - Artisan Menu with category filters, dynamic cart system, and coupon code discounts (`OASIS20`).
   - Simulated Razorpay checkout gateway with OTP verification and instant invoice generation.
   - Real-time animated order progress tracker (Order Placed ➔ Baking in Oven ➔ Quality Check ➔ Out for Delivery ➔ Delivered).
   - Admin Inventory Portal to manage ingredient stock counts and item availability.

---

## 📜 Submission & Evaluation Notes
- **Candidate Name**: **Sourabh Patel**
- **Track**: Web Development & Designing (OIBSIP 2026)
- **Repository Name**: `OIBSIP` (Strict compliance)
- **Folder Format**: `OIBSIP/[TrackName]-[Level/Task]-[ProjectName]/`
- **Demo Videos**: Follows the required 2-second static title card format `[Full Name] | [Track] | [Task Title]` prior to end-to-end screen recordings.
