// Personal Portfolio Interactions
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('portfolio-menu-toggle');
  const navBar = document.getElementById('portfolio-nav');
  const navLinks = document.querySelectorAll('.nav-item');
  const contactForm = document.getElementById('portfolio-contact-form');
  const contactToast = document.getElementById('contact-toast');
  const downloadCvBtn = document.getElementById('btn-download-resume');

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

  // Contact Form Submission Handler
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

      contactToast.style.color = '#34d399';
      contactToast.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
      contactForm.reset();

      setTimeout(() => {
        contactToast.textContent = '';
      }, 6000);
    });
  }

  // Download CV dummy trigger
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('📄 Resume Download: Curriculum Vitae PDF placeholder triggered.');
    });
  }
});
