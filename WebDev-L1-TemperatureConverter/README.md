# 🌡️ WebDev-L1-TemperatureConverter — ThermoPulse

**Oasis Infobyte Internship — Web Development & Designing (Level 1, Task 3)**

A real-time temperature conversion web tool supporting multiple temperature scales (Celsius, Fahrenheit, Kelvin, Rankine) with thermodynamic boundary validation and physical state visualization.

---

## 📋 Feature Checklist Compliance

- [x] **Numeric Input Field**: Validates and restricts input, rejecting non-numeric values and malformed strings with friendly alerts.
- [x] **Unit Selector (Input)**: Clean dropdown allowing users to select input unit (Celsius, Fahrenheit, Kelvin, Rankine).
- [x] **All-Units Simultaneous Output**: Output grid displaying converted values across all target units simultaneously with formulas.
- [x] **Convert Button & Instant Auto-Convert**: Supports manual trigger button as well as instant live calculation mode.
- [x] **Result Display Area**: Distinct glassmorphism result cards with clear unit labels and formatted floating-point values.
- [x] **Absolute Zero Edge Case Handling**: Detects temperatures below Absolute Zero ($-273.15^\circ\text{C}$, $0\text{K}$, $-459.67^\circ\text{F}$) and triggers a physical boundary alert.
- [x] **Thermal State Visualizer**: Dynamic visual gauge marking cryogenic, freezing, room temp, body temp, and boiling stages.
- [x] **Centered Modern UI**: Symmetrical, centered glass card layout with quick benchmark presets.

---

## 🛠️ Tech Stack
- **HTML5**: Form inputs, select dropdowns, semantic container structure.
- **CSS3**: Linear gradients, CSS Grid, Glassmorphism backdrop filters, fluid animations.
- **Vanilla JavaScript**: Precision floating point mathematics, thermodynamic boundary guard, DOM rendering.

---

## 🏃‍♂️ Running Locally
Open `index.html` in your browser or run:
```bash
python -m http.server 8000
```
Visit `http://localhost:8000/WebDev-L1-TemperatureConverter/`
