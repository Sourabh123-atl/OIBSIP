/**
 * Sourabh Patel — Personal Engineering Portfolio
 * Interactive Functionality & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('portfolio-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const allNavLinks = document.querySelectorAll('.nav-item');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile drawer when any navigation link is clicked
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. Active Link Scroll Spy
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id], main[id]');
  const desktopNavLinks = document.querySelectorAll('#portfolio-nav .nav-item');

  const updateActiveSection = () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const matchingLink = document.querySelector(`#portfolio-nav .nav-item[href="#${id}"]`);

      if (matchingLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          desktopNavLinks.forEach(l => l.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  // --------------------------------------------------------------------------
  // 3. Project Category Filter Tabs
  // --------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.project-tab-btn');
  const projectCards = document.querySelectorAll('#portfolio-projects-grid .project-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-category');

      // Update tab active states
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (targetCategory === 'all' || cardCategories.includes(targetCategory)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4. Interactive CLI Terminal Emulator
  // --------------------------------------------------------------------------
  const termInput = document.getElementById('term-cmd-input');
  const termOutput = document.getElementById('term-output');

  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  if (termInput && termOutput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = termInput.value.trim();
        const cmd = rawCmd.toLowerCase();
        termInput.value = '';

        if (!rawCmd) return;

        // Print input prompt line
        const promptLine = document.createElement('div');
        promptLine.innerHTML = `<span style="color:#38bdf8; font-weight: 600;">sourabh:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
        termOutput.appendChild(promptLine);

        let responseHtml = '';

        switch (cmd) {
          case 'help':
            responseHtml = `<div style="color: #94a3b8; line-height: 1.6;">
Available Terminal Commands:
  • <span style="color: #38bdf8; font-weight: 600;">whoami</span>    - Personal bio & engineering focus
  • <span style="color: #38bdf8; font-weight: 600;">skills</span>    - Technical toolbelt & competencies
  • <span style="color: #38bdf8; font-weight: 600;">projects</span>  - Featured live applications
  • <span style="color: #38bdf8; font-weight: 600;">contact</span>   - Official email & communication channels
  • <span style="color: #38bdf8; font-weight: 600;">github</span>    - Open GitHub developer profile
  • <span style="color: #38bdf8; font-weight: 600;">date</span>      - Show current system timestamp
  • <span style="color: #38bdf8; font-weight: 600;">clear</span>     - Clear terminal buffer
</div>`;
            break;

          case 'whoami':
            responseHtml = `<div style="color: #10b981; line-height: 1.5;">
<strong>Sourabh Patel</strong> — Full-Stack Software Engineer &amp; Web Developer.
Intern at Oasis Infobyte (OIBSIP) specializing in modern JavaScript (ES6+),
semantic web architectures, client-side cryptographic security, and clean UX.
</div>`;
            break;

          case 'skills':
            responseHtml = `<div style="color: #cbd5e1; line-height: 1.6;">
<strong style="color: #38bdf8;">Languages:</strong> JavaScript (ES6+), Python 3, Java, HTML5, CSS3
<strong style="color: #38bdf8;">Browser APIs:</strong> Web Crypto (SHA-256), Web Storage, Fetch/REST, Audio API
<strong style="color: #38bdf8;">Tooling:</strong> Git, GitHub Pages, CI/CD Actions, VS Code, Chrome DevTools
<strong style="color: #38bdf8;">Practices:</strong> Semantic Accessibility, Responsive Mobile-First, Zero-Bloat
</div>`;
            break;

          case 'projects':
            responseHtml = `<div style="color: #fbbf24; line-height: 1.6;">
8 Completed Web Applications:
  1. SliceCraft Pizza Platform (Level 3 - Full-Stack Builder)
  2. SecureGate Auth System (Level 2 - Web Crypto SHA-256)
  3. TaskFlow Productivity (Level 2 - To-Do & Pomodoro)
  4. NeoCalc Precision Calculator (Level 2 - Arithmetic)
  5. Dr. APJ Abdul Kalam Tribute (Level 2 - Timeline & Quiz)
  6. ThermoPulse Thermal Converter (Level 1 - Physics Math)
  7. NovaCloud AI Landing Page (Level 1 - SaaS ROI Calc)
  8. OIBSIP Master Suite Portal (Core All-in-One Hub)
</div>`;
            break;

          case 'contact':
            responseHtml = `<div>
Email : <a href="mailto:sourabhpatel.dev@gmail.com" style="color: #38bdf8; text-decoration: underline;">sourabhpatel.dev@gmail.com</a><br>
GitHub: <a href="https://github.com/Sourabh123-atl" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">github.com/Sourabh123-atl</a><br>
Status: Available for full-time Software Engineer &amp; Web roles.
</div>`;
            break;

          case 'github':
            responseHtml = `<div>Opening <a href="https://github.com/Sourabh123-atl" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">github.com/Sourabh123-atl</a> in a new tab...</div>`;
            window.open('https://github.com/Sourabh123-atl', '_blank');
            break;

          case 'date':
            responseHtml = `<div style="color: #94a3b8;">${new Date().toUTCString()}</div>`;
            break;

          case 'clear':
            termOutput.innerHTML = '';
            return;

          default:
            responseHtml = `<div style="color: #ef4444;">command not found: "${escapeHtml(rawCmd)}". Type <span style="color: #38bdf8;">help</span> for available commands.</div>`;
            break;
        }

        const respDiv = document.createElement('div');
        respDiv.innerHTML = responseHtml;
        termOutput.appendChild(respDiv);
        termOutput.scrollTop = termOutput.scrollHeight;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Contact Form & Local Inquiries Storage
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('portfolio-contact-form');
  const contactToast = document.getElementById('contact-toast');
  const inquiriesCountEl = document.getElementById('inquiries-count');
  const inquiriesListEl = document.getElementById('inquiries-list');
  const btnToggleInquiries = document.getElementById('btn-toggle-inquiries');

  const loadInquiries = () => {
    try {
      return JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
    } catch {
      return [];
    }
  };

  const renderInquiries = () => {
    const list = loadInquiries();
    if (inquiriesCountEl) {
      inquiriesCountEl.textContent = list.length;
    }

    if (inquiriesListEl) {
      if (list.length === 0) {
        inquiriesListEl.innerHTML = `<div style="padding: 10px; color: var(--text-secondary); font-size: 0.82rem; font-style: italic;">No inquiries submitted yet from this browser.</div>`;
      } else {
        inquiriesListEl.innerHTML = list.map((item, idx) => `
          <div class="inquiry-item">
            <div>
              <strong>${escapeHtml(item.name)}</strong> (${escapeHtml(item.email)})
              <div style="color: var(--text-secondary); font-size: 0.76rem;">${escapeHtml(item.subject)}</div>
            </div>
            <span style="color: var(--text-muted); font-size: 0.72rem;">${new Date(item.date).toLocaleDateString()}</span>
          </div>
        `).join('');
      }
    }
  };

  // Initial render of inquiries
  renderInquiries();

  if (btnToggleInquiries && inquiriesListEl) {
    btnToggleInquiries.addEventListener('click', () => {
      inquiriesListEl.classList.toggle('open');
    });
  }

  if (contactForm && contactToast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !subject || !message) {
        contactToast.className = 'contact-toast error';
        contactToast.textContent = 'Please fill out all required fields.';
        return;
      }

      // Save inquiry to localStorage
      const inquiries = loadInquiries();
      inquiries.unshift({
        id: Date.now(),
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
      });
      localStorage.setItem('portfolio_inquiries', JSON.stringify(inquiries));

      // Visual feedback
      contactToast.className = 'contact-toast success';
      contactToast.textContent = `Thank you, ${name}! Your message has been safely recorded. I will follow up via ${email} soon.`;
      contactForm.reset();
      renderInquiries();

      setTimeout(() => {
        contactToast.textContent = '';
        contactToast.className = 'contact-toast';
      }, 6000);
    });
  }

  // --------------------------------------------------------------------------
  // 6. Scroll Back to Top Button
  // --------------------------------------------------------------------------
  const btnTop = document.getElementById('btn-portfolio-top');
  if (btnTop) {
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
