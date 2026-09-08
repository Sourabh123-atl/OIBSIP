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

    // Session Timer
    this.sessionTimerInterval = null;

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

  getAuditLogs() {
    try {
      const data = localStorage.getItem('securegate_audit_logs_v1');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  addAuditLog(action) {
    const logs = this.getAuditLogs();
    logs.unshift({
      action,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
    if (logs.length > 8) logs.pop();
    localStorage.setItem('securegate_audit_logs_v1', JSON.stringify(logs));
    this.renderAuditLogs();
  }

  renderAuditLogs() {
    const list = document.getElementById('audit-log-list');
    if (!list) return;
    const logs = this.getAuditLogs();
    if (logs.length === 0) {
      list.innerHTML = '<li class="audit-log-item"><span class="audit-action">No recent activity</span></li>';
      return;
    }
    list.innerHTML = logs.map(l => `
      <li class="audit-log-item">
        <span class="audit-action">${l.action}</span>
        <span class="audit-time">${l.time}</span>
      </li>
    `).join('');
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
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const sessionData = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.jobTitle || 'Full Stack Web Developer',
      bio: user.bio || 'Building next-generation web applications & systems.',
      token: 'sg_sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
      loginAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'medium' }),
      expiresAt
    };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    this.addAuditLog(`User @${user.username} signed in`);
    return sessionData;
  }

  clearSession() {
    const curr = this.getSession();
    if (curr) {
      this.addAuditLog(`User @${curr.username} signed out`);
    }
    localStorage.removeItem(this.SESSION_KEY);
    if (this.sessionTimerInterval) {
      clearInterval(this.sessionTimerInterval);
    }
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
      jobTitle: 'Full Stack Web Developer',
      bio: 'Oasis Infobyte Internship Candidate',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    this.addAuditLog(`New account created (@${username})`);

    this.showAlert('Registration successful! Please sign in with your credentials.', 'success');
    this.registerForm.reset();
    setTimeout(() => {
      this.switchTab('login');
      document.getElementById('login-identifier').value = username;
    }, 1200);
  }

  async handleLogin(e) {
    if (e) e.preventDefault();
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

  startSessionTimer(expiresAt) {
    if (this.sessionTimerInterval) clearInterval(this.sessionTimerInterval);
    const timerElem = document.getElementById('dash-session-timer');
    if (!timerElem) return;

    const updateTimer = () => {
      const remaining = Math.max(0, expiresAt - Date.now());
      const hours = Math.floor(remaining / 3600000);
      const mins = Math.floor((remaining % 3600000) / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      timerElem.textContent = `${hours}h ${mins}m ${secs}s`;

      if (remaining <= 0) {
        clearInterval(this.sessionTimerInterval);
        this.clearSession();
        this.showAuth();
        this.showAlert('Session expired. Please sign in again.');
      }
    };

    updateTimer();
    this.sessionTimerInterval = setInterval(updateTimer, 1000);
  }

  renderDashboard(session) {
    this.authView.classList.add('hidden');
    this.dashboardView.classList.remove('hidden');

    const initials = session.fullname
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'SP';

    this.dashAvatar.textContent = initials;
    this.dashUserName.textContent = session.fullname;
    this.dashUserEmail.textContent = session.email;
    this.dashUserUsername.textContent = `@${session.username}`;
    this.dashSessionToken.textContent = session.token;
    this.dashLoginTime.textContent = session.loginAt;

    // Populate edit profile inputs
    const editName = document.getElementById('edit-fullname');
    const editRole = document.getElementById('edit-jobtitle');
    const editBio = document.getElementById('edit-bio');
    if (editName) editName.value = session.fullname;
    if (editRole) editRole.value = session.role || 'Full Stack Web Developer';
    if (editBio) editBio.value = session.bio || '';

    this.renderAuditLogs();
    this.startSessionTimer(session.expiresAt || (Date.now() + 86400000));
  }

  showAuth() {
    this.dashboardView.classList.add('hidden');
    this.authView.classList.remove('hidden');
    this.switchTab('login');
  }

  // Seed default demo user if empty
  async seedDemoUser() {
    const users = this.getUsers();
    const demoHash = await this.hashPassword('Password123');
    
    // Ensure Sourabh Patel demo exists
    const existingSourabh = users.find(u => u.username === 'sourabhpatel');
    if (!existingSourabh) {
      users.push({
        id: 'usr_demo_1',
        fullname: 'Sourabh Patel',
        username: 'sourabhpatel',
        email: 'sourabhpatel.dev@gmail.com',
        jobTitle: 'Full Stack Web Developer',
        bio: 'Oasis Infobyte Web Development & Designing Intern 2026.',
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

    // Quick 1-Click Demo Fill
    const btnDemo = document.getElementById('btn-quick-demo');
    if (btnDemo) {
      btnDemo.addEventListener('click', async () => {
        document.getElementById('login-identifier').value = 'sourabhpatel';
        document.getElementById('login-password').value = 'Password123';
        this.showAlert('Demo credentials loaded! Signing in...', 'success');
        setTimeout(() => {
          this.handleLogin();
        }, 400);
      });
    }

    // Edit Profile Form Submit
    const profileForm = document.getElementById('profile-edit-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('edit-fullname').value.trim();
        const newRole = document.getElementById('edit-jobtitle').value.trim();
        const newBio = document.getElementById('edit-bio').value.trim();
        const msg = document.getElementById('profile-saved-msg');

        const session = this.getSession();
        if (session && newName) {
          session.fullname = newName;
          session.role = newRole;
          session.bio = newBio;
          localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

          // Also update users array
          const users = this.getUsers();
          const uIdx = users.findIndex(u => u.username === session.username);
          if (uIdx !== -1) {
            users[uIdx].fullname = newName;
            users[uIdx].jobTitle = newRole;
            users[uIdx].bio = newBio;
            this.saveUsers(users);
          }

          this.addAuditLog(`Profile updated by @${session.username}`);
          this.renderDashboard(session);

          msg.className = 'profile-saved-msg success';
          msg.textContent = '✅ Profile updated successfully!';
          setTimeout(() => { msg.textContent = ''; }, 3000);
        }
      });
    }

    // Change Password Form Submit
    const changePwdForm = document.getElementById('change-pwd-form');
    if (changePwdForm) {
      changePwdForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currPwd = document.getElementById('current-pwd').value;
        const newPwd = document.getElementById('new-pwd').value;
        const msg = document.getElementById('pwd-update-msg');

        const session = this.getSession();
        if (!session) return;

        const users = this.getUsers();
        const targetUser = users.find(u => u.username === session.username);

        if (!targetUser) return;

        const currHash = await this.hashPassword(currPwd);
        if (currHash !== targetUser.passwordHash) {
          msg.className = 'pwd-update-msg error';
          msg.textContent = '⚠️ Current password incorrect.';
          return;
        }

        if (newPwd.length < 8 || !/\d/.test(newPwd)) {
          msg.className = 'pwd-update-msg error';
          msg.textContent = '⚠️ New password must be 8+ chars with number.';
          return;
        }

        targetUser.passwordHash = await this.hashPassword(newPwd);
        this.saveUsers(users);
        this.addAuditLog(`Password changed for @${session.username}`);

        changePwdForm.reset();
        msg.className = 'pwd-update-msg success';
        msg.textContent = '✅ Password updated securely (SHA-256)!';
        setTimeout(() => { msg.textContent = ''; }, 3500);
      });
    }

    // Live password strength
    const regPassword = document.getElementById('reg-password');
    if (regPassword) {
      regPassword.addEventListener('input', () => this.checkPasswordStrength(regPassword.value));
    }

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
