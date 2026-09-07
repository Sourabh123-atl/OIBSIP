# 🛡️ WebDev-L2-LoginAuth — SecureGate Authentication System

**Oasis Infobyte Internship — Web Development & Designing (Level 2, Task 4)**

A client-side authentication and session management system featuring real-time input validation, SHA-256 cryptographic password hashing, protected dashboard route guards, and session termination.

---

## 📋 Feature Checklist Compliance

- [x] **Registration Page**: User registration capturing Full Name, Username, Email, and Password with instant validation.
- [x] **Password Validation**: Enforces minimum 8 characters and at least 1 numeric digit, with a 4-tier live visual strength meter.
- [x] **Duplicate User & Email Guard**: Checks whether the username or email already exists in local storage before account creation.
- [x] **Login Page**: Authentication portal supporting sign-in via either username or registered email.
- [x] **Secure Credential Handling**: Returns a generic security error message (`Invalid username/email or password`) to prevent account enumeration.
- [x] **Protected Dashboard Page**: Only accessible with a valid session token; unauthorized attempts automatically redirect to the login portal.
- [x] **Logout & Session Termination**: Logout button immediately invalidates the session token, clears `localStorage` session state, and redirects to login.
- [x] **SHA-256 Cryptographic Hashing**: Passwords are never stored in plain text; salted hashes are generated directly using the browser's native Web Crypto API (`crypto.subtle.digest`).
- [x] **Form Validation**: Strict client-side validation preventing blank or malformed submissions.

---

## 🛠️ Tech Stack
- **HTML5**: Form elements, accessibility ARIA landmarks.
- **CSS3**: Glassmorphism, CSS Grid, password strength visual indicators.
- **Vanilla JavaScript & Web Crypto API**: SHA-256 hashing, session management, route protection.

---

## 🏃‍♂️ Running Locally
Open `index.html` in your browser or run:
```bash
python -m http.server 8000
```
Visit `http://localhost:8000/WebDev-L2-LoginAuth/`

### 🔑 Pre-Seeded Demo Account:
- **Username**: `alexrivera` (or email `alex.rivera@example.com`)
- **Password**: `Password123`
*(Or click "Create Account" to register any new account instantly)*
