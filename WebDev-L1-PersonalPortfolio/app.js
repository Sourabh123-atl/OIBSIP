// Personal Portfolio Interactions & Interactive CLI Terminal
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('portfolio-menu-toggle');
  const navBar = document.getElementById('portfolio-nav');
  const navLinks = document.querySelectorAll('.nav-item');
  const contactForm = document.getElementById('portfolio-contact-form');
  const contactToast = document.getElementById('contact-toast');

  // Mobile menu toggle
  if (menuToggle && navBar) {
    menuToggle.addEventListener('click', () => {
      navBar.classList.toggle('open');
    });
  }

  // Close menu on navigation click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navBar && navBar.classList.contains('open')) {
        navBar.classList.remove('open');
      }
    });
  });

  // Smooth Scroll Active Link Spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);

      if (activeLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  });

  // Contact Form Submission Handler with LocalStorage Persistence
  if (contactForm && contactToast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) {
        contactToast.style.color = '#ef4444';
        contactToast.textContent = 'Please fill out all required fields.';
        return;
      }

      // Save message to local inquiries list
      const inquiries = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
      inquiries.push({ name, email, subject, message, date: new Date().toISOString() });
      localStorage.setItem('portfolio_inquiries', JSON.stringify(inquiries));

      contactToast.style.color = '#34d399';
      contactToast.textContent = `Thank you, ${name}! Your message has been received. I will respond to ${email} promptly.`;
      contactForm.reset();

      setTimeout(() => {
        contactToast.textContent = '';
      }, 7000);
    });
  }

  // Interactive CLI Terminal Emulator
  const termInput = document.getElementById('term-cmd-input');
  const termOutput = document.getElementById('term-output');

  if (termInput && termOutput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = '';

        const cmdRow = document.createElement('div');
        cmdRow.innerHTML = `<span style="color:#38bdf8;">sourabh:~$</span> <span>${escapeHtml(cmd)}</span>`;
        termOutput.appendChild(cmdRow);

        let response = '';
        switch (cmd) {
          case 'help':
            response = `<div style="color:#94a3b8;">Available Commands:
  • <span style="color:#38bdf8;">whoami</span>    - Brief intro about Sourabh Patel
  • <span style="color:#38bdf8;">skills</span>    - List core competencies & technical toolbelt
  • <span style="color:#38bdf8;">projects</span>  - Show featured internship applications
  • <span style="color:#38bdf8;">contact</span>   - Get official contact details
  • <span style="color:#38bdf8;">github</span>    - Link to GitHub profile
  • <span style="color:#38bdf8;">clear</span>     - Clear terminal buffer</div>`;
            break;
          case 'whoami':
            response = `<div style="color:#34d399;">Sourabh Patel — Full-Stack Software Engineer & Web Developer.
Intern at Oasis Infobyte (OIBSIP) specializing in modern web systems, JavaScript, and Python.</div>`;
            break;
          case 'skills':
            response = `<div style="color:#a5b4fc;">Technical Toolbelt:
  - Frontend: HTML5, CSS3 Grid/Flexbox, JavaScript (ES6+), Canvas, Audio API
  - Backend : Python, Java, REST APIs, Socket Programming, Web Crypto (SHA-256)
  - Data    : Pandas, NumPy, Scikit-Learn, SQLite, Data Cleaning Pipeline</div>`;
            break;
          case 'projects':
            response = `<div style="color:#fbbf24;">Featured Works:
  1. NovaCloud AI — SaaS Product Landing Page (WebDev-L1)
  2. TaskFlow — Kanban Focus Manager with Confetti Celebrations (WebDev-L2)
  3. ThermoPulse — Real-Time Thermal Physics Suite (WebDev-L1)
  4. NeoCalc — Precision Calculator with Web Audio Synth (WebDev-L2)</div>`;
            break;
          case 'contact':
            response = `<div>Email : <a href="mailto:sourabhpatel.dev@gmail.com" style="color:#38bdf8;">sourabhpatel.dev@gmail.com</a>
GitHub: <a href="https://github.com/Sourabh123-atl" target="_blank" style="color:#38bdf8;">github.com/Sourabh123-atl</a></div>`;
            break;
          case 'github':
            response = `<div>Redirecting to GitHub... <a href="https://github.com/Sourabh123-atl" target="_blank" style="color:#38bdf8;">github.com/Sourabh123-atl</a></div>`;
            window.open('https://github.com/Sourabh123-atl', '_blank');
            break;
          case 'clear':
            termOutput.innerHTML = '';
            return;
          case '':
            return;
          default:
            response = `<div style="color:#ef4444;">Command not recognized: '${escapeHtml(cmd)}'. Type 'help' for available commands.</div>`;
        }

        const resDiv = document.createElement('div');
        resDiv.innerHTML = response;
        termOutput.appendChild(resDiv);
        termOutput.scrollTop = termOutput.scrollHeight;
      }
    });
  }

  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Copy LinkedIn Post Caption Helper for Task 2
  const btnCopyCaption = document.getElementById('btn-copy-caption-portfolio');
  const captionToast = document.getElementById('caption-toast');

  if (btnCopyCaption && captionToast) {
    const task2Caption = `👨‍💻 Excited to showcase Task 2 of my Web Development & Designing Internship at Oasis Infobyte!

For this milestone, I engineered my Personal Developer Portfolio — a modern, production-grade digital résumé tailored for full-stack engineering roles.

🌟 Technical Highlights:
✅ Interactive in-browser CLI Terminal Emulator (try: whoami, skills, projects, github)
✅ Filterable project repository matrix & interactive skill badges
✅ Contact inquiry system with localStorage persistence
✅ Audio-synthesized interactions & responsive glassmorphism aesthetic
✅ Semantic HTML5, modern CSS Grid/Flexbox, and vanilla JavaScript

🔗 Live Portfolio: https://sourabh123-atl.github.io/OIBSIP/WebDev-L1-PersonalPortfolio/
📁 GitHub Repository: https://github.com/Sourabh123-atl/OIBSIP

Grateful to @Oasis Infobyte for this enriching learning experience!

#oasisinfobyte #webdevelopment #portfolio #fullstack #javascript #html5 #css3 #softwareengineering #developer`;

    btnCopyCaption.addEventListener('click', () => {
      navigator.clipboard.writeText(task2Caption).then(() => {
        captionToast.classList.add('show');
        setTimeout(() => {
          captionToast.classList.remove('show');
        }, 3500);
      }).catch(() => {
        alert('Caption ready! Please check LINKEDIN_POSTS_GUIDE.md');
      });
    });
  }
});
