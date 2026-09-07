// SecureGate Authentication Engine with SHA-256 Web Crypto Hashing
class AuthSystem {
  constructor() {
    this.USERS_KEY = 'securegate_users_v1';
    this.SESSION_KEY = 'securegate_session_v1';

    // DOM Elements
    this.authView = document.getElementById('auth-view');
    this.dashboardView = document.getElementById('dashboard-view');
    this.tabLogin = document.getElementById('tab-login');
    this.tabRegister = document.getElementById('tab-register');
    this.loginForm = document.getElementById('login-form');
    this.registerForm = document.getElementById('register-form');
    this.authAlert = document.getElementById('auth-alert');
    this.alertText = document.getElementById('alert-text');
    this.alertIcon = document.getElementById('alert-icon');

    // Dashboard Elements
    this.dashAvatar = document.getElementById('dash-avatar');
    this.dashUserName = document.getElementById('dash-user-name');
    this.dashUserEmail = document.getElementById('dash-user-email');
    this.dashUserUsername = document.getElementById('dash-user-username');
    this.dashSessionToken = document.getElementById('dash-session-token');
    this.dashLoginTime = document.getElementById('dash-login-time');
    this.btnLogout = document.getElementById('btn-logout');

    this.init();
  }

  // Cryptographic SHA-256 Hashing via Web Crypto API
  async hashPassword(password, salt = 'oibsip_secure_salt_2026') {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  getUsers() {
    try {
      const data = localStorage.getItem(this.USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to read users database', e);
      return [];
    }
  }

  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  getSession() {
    try {
      const data = localStorage.getItem(this.SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  setSession(user) {
    const sessionData = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      token: 'sg_sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
      loginAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'medium' })
    };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    return sessionData;
  }

  clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
  }

  showAlert(message, type = 'error') {
    this.alertText.textContent = message;
    this.authAlert.className = `auth-alert visible ${type}`;
    this.alertIcon.textContent = type === 'error' ? '⚠️' : '✅';
  }

  clearAlert() {
    this.authAlert.className = 'auth-alert';
    this.alertText.textContent = '';
  }

  switchTab(target) {
    this.clearAlert();
    if (target === 'login') {
      this.tabLogin.classList.add('active');
      this.tabRegister.classList.remove('active');
      this.loginForm.classList.remove('hidden');
      this.registerForm.classList.add('hidden');
    } else {
      this.tabRegister.classList.add('active');
      this.tabLogin.classList.remove('active');
      this.registerForm.classList.remove('hidden');
      this.loginForm.classList.add('hidden');
    }
  }

  checkPasswordStrength(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const strengthBars = document.querySelector('.strength-bars');
    const strengthText = document.getElementById('pwd-strength-text');

    strengthBars.className = 'strength-bars';
    if (!pwd) {
      strengthText.textContent = 'Password strength: Enter password';
      return;
    }

    if (score === 1) {
      strengthBars.classList.add('weak');
      strengthText.textContent = 'Password strength: Weak (Need 8+ chars & numbers)';
    } else if (score === 2) {
      strengthBars.classList.add('fair');
      strengthText.textContent = 'Password strength: Fair (Add uppercase/special chars)';
    } else if (score === 3) {
      strengthBars.classList.add('good');
      strengthText.textContent = 'Password strength: Good';
    } else if (score >= 4) {
      strengthBars.classList.add('strong');
      strengthText.textContent = 'Password strength: Strong & Secure 🔒';
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    this.clearAlert();

    const fullname = document.getElementById('reg-fullname').value.trim();
    const username = document.getElementById('reg-username').value.trim().toLowerCase();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;

    if (!fullname || !username || !email || !password) {
      this.showAlert('All registration fields are required.');
      return;
    }

    // Password validation: min 8 characters, at least 1 number
    if (password.length < 8) {
      this.showAlert('Password must be at least 8 characters long.');
      return;
    }

    if (!/\d/.test(password)) {
      this.showAlert('Password must contain at least one numeric digit (0-9).');
      return;
    }

    const users = this.getUsers();

    // Check duplicate username or email
    const duplicate = users.find(u => u.username === username || u.email === email);
    if (duplicate) {
      if (duplicate.username === username) {
        this.showAlert(`The username "${username}" is already taken. Please choose another.`);
      } else {
        this.showAlert(`An account with the email "${email}" already exists.`);
      }
      return;
    }

    // Hash password with SHA-256
    const passwordHash = await this.hashPassword(password);

    const newUser = {
      id: 'usr_' + Date.now(),
      fullname,
      username,
      email,
      passwordHash,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    this.showAlert('Registration successful! Please sign in with your credentials.', 'success');
    this.registerForm.reset();
    setTimeout(() => {
      this.switchTab('login');
      document.getElementById('login-identifier').value = username;
    }, 1500);
  }

  async handleLogin(e) {
    e.preventDefault();
    this.clearAlert();

    const identifier = document.getElementById('login-identifier').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    if (!identifier || !password) {
      this.showAlert('Please provide both your username/email and password.');
      return;
    }

    const users = this.getUsers();
    const targetUser = users.find(u => u.username === identifier || u.email === identifier);

    if (!targetUser) {
      // Security best practice: generic error message
      this.showAlert('Invalid username/email or password.');
      return;
    }

    const enteredHash = await this.hashPassword(password);
    if (enteredHash !== targetUser.passwordHash) {
      this.showAlert('Invalid username/email or password.');
      return;
    }

    // Success: establish session
    const session = this.setSession(targetUser);
    this.loginForm.reset();
    this.renderDashboard(session);
  }

  renderDashboard(session) {
    this.authView.classList.add('hidden');
    this.dashboardView.classList.remove('hidden');

    const initials = session.fullname
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'US';

    this.dashAvatar.textContent = initials;
    this.dashUserName.textContent = session.fullname;
    this.dashUserEmail.textContent = session.email;
    this.dashUserUsername.textContent = `@${session.username}`;
    this.dashSessionToken.textContent = session.token;
    this.dashLoginTime.textContent = session.loginAt;
  }

  showAuth() {
    this.dashboardView.classList.add('hidden');
    this.authView.classList.remove('hidden');
    this.switchTab('login');
  }

  // Seed default demo user if empty
  async seedDemoUser() {
    const users = this.getUsers();
    if (users.length === 0) {
      const demoHash = await this.hashPassword('Password123');
      users.push({
        id: 'usr_demo_1',
        fullname: 'Alex Rivera',
        username: 'alexrivera',
        email: 'alex.rivera@example.com',
        passwordHash: demoHash,
        createdAt: new Date().toISOString()
      });
      this.saveUsers(users);
    }
  }

  init() {
    this.seedDemoUser();

    // Tab switcher events
    this.tabLogin.addEventListener('click', () => this.switchTab('login'));
    this.tabRegister.addEventListener('click', () => this.switchTab('register'));

    // Form submit events
    this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));

    // Live password strength
    const regPassword = document.getElementById('reg-password');
    regPassword.addEventListener('input', () => this.checkPasswordStrength(regPassword.value));

    // Toggle Password Visibility
    document.querySelectorAll('.btn-toggle-pwd').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.target);
        if (input) {
          input.type = input.type === 'password' ? 'text' : 'password';
        }
      });
    });

    // Forgot password demo
    const btnForgot = document.getElementById('btn-forgot-demo');
    if (btnForgot) {
      btnForgot.addEventListener('click', (e) => {
        e.preventDefault();
        alert('ℹ️ Password Reset: A password reset link has been dispatched to your email.');
      });
    }

    // Logout
    this.btnLogout.addEventListener('click', () => {
      this.clearSession();
      this.showAuth();
      this.showAlert('You have been securely signed out.', 'success');
    });

    // Protected Route Session Guard Check
    const activeSession = this.getSession();
    if (activeSession) {
      this.renderDashboard(activeSession);
    } else {
      this.showAuth();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.authSystem = new AuthSystem();
});
