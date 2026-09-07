# ⚡ WebDev-L2-ToDoWebApp — TaskFlow

**Oasis Infobyte Internship — Web Development & Designing (Level 2, Task 3)**

A responsive dual-board daily task and focus manager with inline editing, priority filtering, timestamps, and localStorage persistence.

---

## 📋 Feature Checklist Compliance

- [x] **Input Field & Add Button**: Interactive form to quickly create new tasks with priority and category tags.
- [x] **Immediate Pending List Addition**: Newly created items appear instantaneously in the Pending Tasks column.
- [x] **Mark Complete Toggle**: Checkbox toggles task status, moving items fluidly between Pending and Completed lists with smooth visual transitions.
- [x] **Inline Edit Capability**: Edit button enables in-place text modification with `Enter` / `Escape` keyboard shortcuts.
- [x] **Permanent Delete**: Trash button removes tasks with immediate DOM and storage synchronization.
- [x] **Task Count Badges**: Live counters (`X pending` and `Y completed`) displayed above each board alongside a global completion percentage meter.
- [x] **Timestamps (Bonus)**: Displays creation timestamp on pending tasks and exact completion time on finished items.
- [x] **LocalStorage Persistence (Bonus)**: All state changes, additions, and edits persist across browser refreshes and sessions.
- [x] **Empty State Messaging**: Visual empty state cards with icons and encouraging copy when lists have no items.

---

## 🛠️ Tech Stack
- **HTML5**: Semantic tags, accessible form inputs.
- **CSS3**: Modern Flexbox, CSS Grid, Glassmorphism, custom styled checkboxes.
- **Vanilla JavaScript**: ES6 Class architecture, Web Storage API, inline DOM event delegation.

---

## 🏃‍♂️ Running Locally
Open `index.html` in your browser or run:
```bash
python -m http.server 8000
```
Visit `http://localhost:8000/WebDev-L2-ToDoWebApp/`
