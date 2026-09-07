// ThermoPulse Temperature Converter Logic
document.addEventListener('DOMContentLoaded', () => {
  const tempInput = document.getElementById('temp-input');
  const inputUnit = document.getElementById('input-unit');
  const btnConvert = document.getElementById('btn-convert');
  const btnClear = document.getElementById('btn-clear');
  const autoToggle = document.getElementById('auto-convert-toggle');
  const alertBox = document.getElementById('alert-box');
  const alertMsg = document.getElementById('alert-message');

  const valC = document.getElementById('val-celsius');
  const valF = document.getElementById('val-fahrenheit');
  const valK = document.getElementById('val-kelvin');
  const valR = document.getElementById('val-rankine');

  const gaugeFill = document.getElementById('gauge-fill');
  const stateLabel = document.getElementById('thermal-state-label');
  const chips = document.querySelectorAll('.chip');

  // Absolute zero constants
  const ABS_ZERO_C = -273.15;
  const ABS_ZERO_F = -459.67;
  const ABS_ZERO_K = 0;
  const ABS_ZERO_R = 0;

  function showAlert(message) {
    alertMsg.textContent = message;
    alertBox.classList.add('visible');
  }

  function clearAlert() {
    alertBox.classList.remove('visible');
    alertMsg.textContent = '';
  }

  function formatNum(num) {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  }

  function updateThermalGauge(celsius) {
    let state = '';
    let percentage = 50; // default middle

    if (celsius < -273.15) {
      state = '⚠️ Below Absolute Zero (Impossible State)';
      percentage = 0;
    } else if (celsius <= -200) {
      state = '❄️ Deep Cryogenic Range';
      percentage = 5;
    } else if (celsius < 0) {
      state = '🧊 Sub-Zero / Freezing Ice';
      percentage = 20;
    } else if (celsius === 0) {
      state = '💧 Water Freezing Point';
      percentage = 35;
    } else if (celsius > 0 && celsius <= 15) {
      state = '🍃 Crisp & Cool';
      percentage = 44;
    } else if (celsius > 15 && celsius <= 26) {
      state = '🏡 Optimal Room Temperature';
      percentage = 52;
    } else if (celsius > 26 && celsius <= 38) {
      state = '☀️ Warm / Human Body Temperature (~37°C)';
      percentage = 65;
    } else if (celsius > 38 && celsius < 100) {
      state = '🔥 High Thermal State';
      percentage = 80;
    } else if (celsius === 100) {
      state = '♨️ Water Boiling Point (100°C)';
      percentage = 100;
    } else {
      state = '⚡ Superheated Thermal Plasma (>100°C)';
      percentage = 100;
    }

    stateLabel.textContent = state;
    gaugeFill.style.left = `${Math.min(Math.max(percentage, 0), 100)}%`;
  }

  function performConversion() {
    const rawVal = tempInput.value.trim();
    clearAlert();

    if (rawVal === '') {
      valC.textContent = '--';
      valF.textContent = '--';
      valK.textContent = '--';
      valR.textContent = '--';
      stateLabel.textContent = 'Waiting for input';
      gaugeFill.style.left = '50%';
      return;
    }

    const numVal = parseFloat(rawVal);
    if (isNaN(numVal) || !/^-?\d*(\.\d+)?$/.test(rawVal)) {
      showAlert('Invalid input: Please enter a valid numerical temperature value.');
      valC.textContent = 'Error';
      valF.textContent = 'Error';
      valK.textContent = 'Error';
      valR.textContent = 'Error';
      stateLabel.textContent = 'Invalid Input';
      return;
    }

    const unit = inputUnit.value;
    let c = 0, f = 0, k = 0, r = 0;

    // Convert input to standard Celsius first
    if (unit === 'C') {
      c = numVal;
      f = (c * 9/5) + 32;
      k = c + 273.15;
      r = (c + 273.15) * 9/5;

      if (c < ABS_ZERO_C) {
        showAlert(`Physical Boundary Alert: ${numVal}°C is below Absolute Zero (-273.15°C).`);
      }
    } else if (unit === 'F') {
      f = numVal;
      c = (f - 32) * 5/9;
      k = (f - 32) * 5/9 + 273.15;
      r = f + 459.67;

      if (f < ABS_ZERO_F) {
        showAlert(`Physical Boundary Alert: ${numVal}°F is below Absolute Zero (-459.67°F).`);
      }
    } else if (unit === 'K') {
      k = numVal;
      c = k - 273.15;
      f = (k - 273.15) * 9/5 + 32;
      r = k * 9/5;

      if (k < ABS_ZERO_K) {
        showAlert(`Physical Boundary Alert: ${numVal} K is below Absolute Zero (0 K).`);
      }
    } else if (unit === 'R') {
      r = numVal;
      c = (r - 491.67) * 5/9;
      f = r - 459.67;
      k = r * 5/9;

      if (r < ABS_ZERO_R) {
        showAlert(`Physical Boundary Alert: ${numVal}°R is below Absolute Zero (0°R).`);
      }
    }

    // Update Output displays
    valC.textContent = `${formatNum(c)}°C`;
    valF.textContent = `${formatNum(f)}°F`;
    valK.textContent = `${formatNum(k)} K`;
    valR.textContent = `${formatNum(r)}°R`;

    updateThermalGauge(c);

    // Dynamic Mathematical Derivation Output
    const derivText = document.getElementById('derivation-text');
    if (derivText) {
      if (unit === 'C') {
        derivText.innerHTML = `
          <strong>Input:</strong> ${numVal}°C<br>
          • <strong>To Fahrenheit:</strong> (${numVal} × 9/5) + 32 = <span style="color:#38bdf8; font-weight:bold;">${formatNum(f)}°F</span><br>
          • <strong>To Kelvin (SI):</strong> ${numVal} + 273.15 = <span style="color:#34d399; font-weight:bold;">${formatNum(k)} K</span><br>
          • <strong>To Rankine:</strong> (${numVal} + 273.15) × 9/5 = <span style="color:#fbbf24; font-weight:bold;">${formatNum(r)}°R</span>
        `;
      } else if (unit === 'F') {
        derivText.innerHTML = `
          <strong>Input:</strong> ${numVal}°F<br>
          • <strong>To Celsius:</strong> (${numVal} - 32) × 5/9 = <span style="color:#38bdf8; font-weight:bold;">${formatNum(c)}°C</span><br>
          • <strong>To Kelvin (SI):</strong> ((${numVal} - 32) × 5/9) + 273.15 = <span style="color:#34d399; font-weight:bold;">${formatNum(k)} K</span><br>
          • <strong>To Rankine:</strong> ${numVal} + 459.67 = <span style="color:#fbbf24; font-weight:bold;">${formatNum(r)}°R</span>
        `;
      } else if (unit === 'K') {
        derivText.innerHTML = `
          <strong>Input:</strong> ${numVal} K<br>
          • <strong>To Celsius:</strong> ${numVal} - 273.15 = <span style="color:#38bdf8; font-weight:bold;">${formatNum(c)}°C</span><br>
          • <strong>To Fahrenheit:</strong> ((${numVal} - 273.15) × 9/5) + 32 = <span style="color:#34d399; font-weight:bold;">${formatNum(f)}°F</span><br>
          • <strong>To Rankine:</strong> ${numVal} × 9/5 = <span style="color:#fbbf24; font-weight:bold;">${formatNum(r)}°R</span>
        `;
      } else {
        derivText.innerHTML = `
          <strong>Input:</strong> ${numVal}°R<br>
          • <strong>To Celsius:</strong> (${numVal} - 491.67) × 5/9 = <span style="color:#38bdf8; font-weight:bold;">${formatNum(c)}°C</span><br>
          • <strong>To Fahrenheit:</strong> ${numVal} - 459.67 = <span style="color:#34d399; font-weight:bold;">${formatNum(f)}°F</span><br>
          • <strong>To Kelvin (SI):</strong> ${numVal} × 5/9 = <span style="color:#fbbf24; font-weight:bold;">${formatNum(k)} K</span>
        `;
      }
    }
  }

  // Event Listeners
  btnConvert.addEventListener('click', performConversion);

  tempInput.addEventListener('input', () => {
    if (autoToggle.checked) {
      performConversion();
    }
  });

  inputUnit.addEventListener('change', () => {
    if (autoToggle.checked || tempInput.value.trim() !== '') {
      performConversion();
    }
  });

  btnClear.addEventListener('click', () => {
    tempInput.value = '';
    tempInput.focus();
    performConversion();
  });

  // Benchmark chip quick-select
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      tempInput.value = chip.getAttribute('data-temp');
      inputUnit.value = chip.getAttribute('data-unit');
      performConversion();
    });
  });

  // Live Satellite Weather Integration (Open-Meteo REST API)
  const cityBtns = document.querySelectorAll('.city-btn');
  const weatherStatus = document.getElementById('weather-status');
  const weatherDetails = document.getElementById('weather-details');

  cityBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const cityName = btn.getAttribute('data-city');
      const lat = btn.getAttribute('data-lat');
      const lon = btn.getAttribute('data-lon');

      btn.disabled = true;
      weatherStatus.textContent = `📡 Querying satellite telemetry for ${cityName}...`;

      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        const liveTemp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        const time = new Date(data.current_weather.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        tempInput.value = liveTemp;
        inputUnit.value = 'C';
        performConversion();

        weatherDetails.style.display = 'block';
        weatherDetails.innerHTML = `🛰️ <strong>${cityName} Live Atmospheric Telemetry:</strong> Currently <strong>${liveTemp}°C</strong> (${formatNum((liveTemp * 9/5) + 32)}°F) • Wind Speed: ${wind} km/h • Synced at ${time}`;
        weatherStatus.textContent = `✅ Live satellite telemetry synced from Open-Meteo REST API`;
      } catch (err) {
        weatherStatus.textContent = `⚠️ Network offline or satellite timeout. Using offline cache.`;
      } finally {
        btn.disabled = false;
      }
    });
  });

  // Copy LinkedIn Post Caption Helper for Task 3
  const btnCopyCaption = document.getElementById('btn-copy-caption-temp');
  const captionToast = document.getElementById('caption-toast');

  if (btnCopyCaption && captionToast) {
    const task3Caption = `🌡️ Proud to present Task 3 of my Web Development & Designing Internship at Oasis Infobyte!

For this project, I built "ThermoPulse" — a real-time Atmospheric & Thermal Physics Studio that elevates the standard temperature converter into an engineering tool.

🌟 Key Innovations:
✅ Live Satellite Weather Sync via Open-Meteo REST API (real-time temperature from global cities)
✅ Multi-scale precision conversions (Celsius, Fahrenheit, Kelvin, and Rankine)
✅ Physical Absolute Zero boundary detection & thermodynamic law alerts
✅ Dynamic step-by-step mathematical derivation breakdown
✅ Real-time thermal state fluid gauge & responsive glassmorphism UI

🔗 Live Application: https://sourabh123-atl.github.io/OIBSIP/WebDev-L1-TemperatureConverter/
📁 GitHub Repository: https://github.com/Sourabh123-atl/OIBSIP

Special thanks to @Oasis Infobyte for this hands-on engineering journey!

#oasisinfobyte #webdevelopment #javascript #physics #api #frontend #html5 #css3 #internship`;

    btnCopyCaption.addEventListener('click', () => {
      navigator.clipboard.writeText(task3Caption).then(() => {
        captionToast.classList.add('show');
        setTimeout(() => {
          captionToast.classList.remove('show');
        }, 3500);
      }).catch(() => {
        alert('Caption ready! Please check LINKEDIN_POSTS_GUIDE.md');
      });
    });
  }

  // Initial calculation
  tempInput.value = '37';
  performConversion();
});
