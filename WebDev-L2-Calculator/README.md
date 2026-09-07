# 🧮 WebDev-L2-Calculator — NeoCalc

**Oasis Infobyte Internship — Web Development & Designing (Level 2, Task 1)**

A fully functional browser-based arithmetic calculator with operator chaining, division-by-zero protection, and a calculation history log.

---

## 📋 Feature Checklist Compliance

- [x] **Display Screen**: Dual-tier screen showing previous operand/operator and active result.
- [x] **Numeric & Decimal Keys**: Digits `0-9`, decimal `.`, and negation `±`.
- [x] **Arithmetic Operators**: Addition (`+`), Subtraction (`−`), Multiplication (`×`), and Division (`÷`).
- [x] **Equals Button**: Evaluates expressions accurately while maintaining mathematical floating-point precision.
- [x] **Clear & All-Clear**: `AC` (All Clear) and `C` (Clear active entry) controls.
- [x] **Backspace / Delete**: Single-character deletion.
- [x] **Division-by-Zero Protection**: Gracefully intercepts `x / 0` and renders `Cannot divide by 0` without browser crashes or `Infinity` output.
- [x] **Operator Chaining**: Supports continuous sequential computations (e.g. `5 + 3 × 2 = 16`).
- [x] **CSS Grid Alignment**: Modern responsive grid layout for button arrangement with tactile push feedback.
- [x] **Clean Event Listeners**: 100% event delegation & listener architecture with zero inline `onclick` attributes.
- [x] **Keyboard Accessibility**: Full physical keyboard support (`0-9`, operators, `Enter`, `Escape`, `Backspace`).
- [x] **Calculation History Drawer**: Logs recent calculation expressions with one-click restore.

---

## 🛠️ Tech Stack
- **HTML5**: Accessible `<main>`, `<section>`, and `<button>` elements.
- **CSS3**: CSS Grid, Flexbox, Glassmorphism, tactile press animations.
- **Vanilla JavaScript**: Pure Object-Oriented Calculator class, zero `eval()` security risks.

---

## 🏃‍♂️ Running Locally
Open `index.html` in your browser or run:
```bash
python -m http.server 8000
```
Visit `http://localhost:8000/WebDev-L2-Calculator/`
