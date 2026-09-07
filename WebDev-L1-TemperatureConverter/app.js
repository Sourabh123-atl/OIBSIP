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

  // Initial demo calculation
  tempInput.value = '37';
  performConversion();
});
