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

  // Live Cloud ROI Calculator
  const sliderReq = document.getElementById('slider-requests');
  const sliderNodes = document.getElementById('slider-nodes');
  const dispReq = document.getElementById('display-requests');
  const dispNodes = document.getElementById('display-nodes');
  const costLegacy = document.getElementById('cost-legacy');
  const costNova = document.getElementById('cost-novacloud');
  const costSavings = document.getElementById('cost-savings');

  function updateRoi() {
    if (!sliderReq || !sliderNodes) return;
    const reqM = parseInt(sliderReq.value);
    const nodes = parseInt(sliderNodes.value);

    dispReq.textContent = `${reqM} Million`;
    dispNodes.textContent = `${nodes} Nodes`;

    // Calculation logic
    const legacyMonthly = (reqM * 180) + (nodes * 45) + 120;
    const novaMonthly = Math.round((reqM * 35) + (nodes * 12) + 49);
    const annualSavings = (legacyMonthly - novaMonthly) * 12;

    costLegacy.textContent = `$${legacyMonthly.toLocaleString()} / mo`;
    costNova.textContent = `$${novaMonthly.toLocaleString()} / mo`;
    costSavings.textContent = `$${annualSavings.toLocaleString()} / yr`;
  }

  if (sliderReq && sliderNodes) {
    sliderReq.addEventListener('input', updateRoi);
    sliderNodes.addEventListener('input', updateRoi);
  }

  // Simulated Edge Deployment Runner
  const btnDeploy = document.getElementById('btn-run-deploy');
  const deployStatus = document.getElementById('deploy-status');
  const deployLog = document.getElementById('deploy-log');

  if (btnDeploy && deployStatus && deployLog) {
    btnDeploy.addEventListener('click', () => {
      btnDeploy.disabled = true;
      btnDeploy.textContent = '⏳ Compiling...';
      deployStatus.textContent = '● Synthesizing edge container...';
      deployLog.style.display = 'block';
      deployLog.innerHTML = `<span style="color:#38bdf8;">[0.00s]</span> Initiating NovaCore 3.0 JIT optimization...<br>`;

      setTimeout(() => {
        deployLog.innerHTML += `<span style="color:#38bdf8;">[0.42s]</span> Compiling WebAssembly WASI binaries for 3 regions...<br>`;
        deployStatus.textContent = '● Propagating to global POPs...';
      }, 500);

      setTimeout(() => {
        deployLog.innerHTML += `<span style="color:#38bdf8;">[0.85s]</span> Distributed to us-east, eu-central, ap-south (38ms latency avg)<br>`;
        deployLog.innerHTML += `<span style="color:#34d399; font-weight:bold;">[1.18s] ✔ LIVE: Deployed at https://edge.novacloud.ai/node-889</span>`;
        deployStatus.textContent = '✔ Deployment successful (38ms edge)';
        btnDeploy.textContent = '✔ Deployed';
        btnDeploy.disabled = false;
      }, 1200);
    });
  }

  // Copy LinkedIn Post Caption Helper
  const btnCopyCaption = document.getElementById('btn-copy-caption');
  const captionToast = document.getElementById('caption-toast');

  if (btnCopyCaption && captionToast) {
    const task1Caption = `🚀 Thrilled to share Task 1 of my Web Development & Designing Internship at Oasis Infobyte!

For this task, I built "NovaCloud AI" — a production-grade, highly responsive SaaS product landing page designed for next-generation cloud infrastructure.

🌟 Key Features:
✅ Frosted glass sticky navigation & modern typography
✅ Interactive Live Cloud ROI & Infrastructure Savings Calculator
✅ Interactive Simulated Microservice Deployment Terminal
✅ Mobile-first responsive layout with dynamic pricing toggle
✅ Accessible semantic HTML5 & high-performance vanilla CSS3

🔗 Live Project: https://sourabh123-atl.github.io/OIBSIP/WebDev-L1-LandingPage/
📁 GitHub Repo: https://github.com/Sourabh123-atl/OIBSIP

Special thanks to the @Oasis Infobyte team for this opportunity!

#oasisinfobyte #webdevelopment #frontend #internship #javascript #html5 #css3 #cloudcomputing #portfolio`;

    btnCopyCaption.addEventListener('click', () => {
      navigator.clipboard.writeText(task1Caption).then(() => {
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
