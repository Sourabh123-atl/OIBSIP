// Interactive Navigation & Dynamic Landing Page Logic
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const ctaSubmitBtn = document.getElementById('cta-submit-btn');
  const ctaEmailInput = document.getElementById('cta-email-input');
  const ctaFeedback = document.getElementById('cta-feedback');

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close mobile menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });

  // Active Nav Link Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  });

  // Newsletter / CTA Submit Interaction
  if (ctaSubmitBtn && ctaEmailInput && ctaFeedback) {
    ctaSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = ctaEmailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        ctaFeedback.style.color = '#ef4444';
        ctaFeedback.textContent = 'Please enter your email address.';
        return;
      }

      if (!emailRegex.test(email)) {
        ctaFeedback.style.color = '#ef4444';
        ctaFeedback.textContent = 'Please enter a valid email format (e.g. name@company.com).';
        return;
      }

      ctaFeedback.style.color = '#34d399';
      ctaFeedback.textContent = '🎉 Success! Your access token and sandbox environment have been provisioned.';
      ctaEmailInput.value = '';

      setTimeout(() => {
        ctaFeedback.textContent = '';
      }, 6000);
    });
  }

  // Interactive Pricing Toggle
  const pricingToggle = document.getElementById('pricing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelAnnual = document.getElementById('label-annual');
  const pricePro = document.querySelector('.pricing-card.popular .price-amount');
  const priceEnt = document.querySelectorAll('.pricing-card')[2]?.querySelector('.price-amount');
  const periodEls = document.querySelectorAll('.price-period');

  if (pricingToggle && pricePro && priceEnt) {
    pricingToggle.addEventListener('change', () => {
      if (pricingToggle.checked) {
        // Annual
        labelMonthly.style.color = '#94a3b8';
        labelAnnual.style.color = '#38bdf8';
        pricePro.textContent = '39';
        priceEnt.textContent = '239';
        periodEls.forEach(p => p.textContent = '/ month, billed annually');
      } else {
        // Monthly
        labelMonthly.style.color = '#38bdf8';
        labelAnnual.style.color = '#94a3b8';
        pricePro.textContent = '49';
        priceEnt.textContent = '299';
        periodEls.forEach(p => p.textContent = '/ month');
      }
    });
  }
});
