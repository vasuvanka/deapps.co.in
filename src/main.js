/**
 * deApps (deapps.co.in) - Client Application
 * Quiet Luxury for Software: Calm at rest, instant in action.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initHeroDeviceSwitcher();
  initEcosystemNodes();
  initArchitectureTabs();
  initOpenPauseSimulator();
  initDeLauncherSandbox();
  initDeMusicPlayer();
  initThemeSwitcher();
  initTokenCopy();
  initCollaborationCopy();
  initLightbox();
  initModals();
  initNewsletterForm();
  initSmoothScrollNav();
});

/* ==========================================================================
   0. Mobile Navigation Toggle & Accessibility
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('primaryNav');
  if (!toggleBtn || !navLinks) return;

  const hamburgerIcon = toggleBtn.querySelector('.hamburger-icon');
  const closeIcon = toggleBtn.querySelector('.close-icon');

  function setOpen(isOpen) {
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      navLinks.classList.add('mobile-open');
      if (hamburgerIcon) hamburgerIcon.style.display = 'none';
      if (closeIcon) closeIcon.style.display = 'block';
    } else {
      navLinks.classList.remove('mobile-open');
      if (hamburgerIcon) hamburgerIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isCurrentlyOpen = navLinks.classList.contains('mobile-open');
    setOpen(!isCurrentlyOpen);
  });

  // Close when clicking any nav link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      setOpen(false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('mobile-open')) {
      setOpen(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
      setOpen(false);
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   1. Hero Interactive Phone Mockup View Switcher
   ========================================================================== */
function initHeroDeviceSwitcher() {
  const tabs = document.querySelectorAll('.device-tab');
  const views = document.querySelectorAll('.phone-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetView = tab.getAttribute('data-view');

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      views.forEach(v => v.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const activeView = document.querySelector(`.view-${targetView}`);
      if (activeView) {
        activeView.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. OpenPause Interactive Simulator (Mindful Gatekeeper)
   ========================================================================== */
let impulseWins = parseInt(localStorage.getItem('deapps_impulse_wins') || '14', 10);
let pauseTimerInterval = null;

function initOpenPauseSimulator() {
  const appButtons = document.querySelectorAll('.op-sim-app-btn');
  const launchBtn = document.getElementById('opSimLaunchBtn');
  const overlay = document.getElementById('opSimOverlay');
  const timerCircle = document.getElementById('opSimTimer');
  const stepBackBtn = document.getElementById('opStepBackBtn');
  const continueBtn = document.getElementById('opContinueBtn');
  const winsCounterHero = document.getElementById('opWinsHero');
  const winsCounterSandbox = document.getElementById('opWinsSandbox');
  const targetAppLabel = document.getElementById('opTargetAppName');

  // Update initial counters
  updateWinsDisplay(winsCounterHero, winsCounterSandbox);

  let selectedApp = 'Instagram';

  appButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      appButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedApp = btn.getAttribute('data-app');
      if (targetAppLabel) targetAppLabel.textContent = selectedApp;
    });
  });

  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      startGatekeeperPause(selectedApp);
    });
  }

  function startGatekeeperPause(appName) {
    if (!overlay || !timerCircle) return;
    overlay.classList.add('active');
    let timeLeft = 5;
    timerCircle.textContent = timeLeft;

    if (pauseTimerInterval) clearInterval(pauseTimerInterval);

    pauseTimerInterval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) {
        timerCircle.textContent = timeLeft;
      } else {
        clearInterval(pauseTimerInterval);
        timerCircle.textContent = '✓';
      }
    }, 1000);
  }

  if (stepBackBtn) {
    stepBackBtn.addEventListener('click', () => {
      if (pauseTimerInterval) clearInterval(pauseTimerInterval);
      if (overlay) overlay.classList.remove('active');
      impulseWins += 1;
      localStorage.setItem('deapps_impulse_wins', impulseWins.toString());
      updateWinsDisplay(winsCounterHero, winsCounterSandbox);
      showToast(`+1 Impulse Win! Mindful choice acknowledged.`);
    });
  }

  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      if (pauseTimerInterval) clearInterval(pauseTimerInterval);
      if (overlay) overlay.classList.remove('active');
      showToast(`Proceeding intentionally. Session duration: 15 min.`);
    });
  }
}

function updateWinsDisplay(heroEl, sandboxEl) {
  if (heroEl) heroEl.textContent = `${impulseWins} Impulse Wins today.`;
  if (sandboxEl) sandboxEl.textContent = `${impulseWins} Wins`;
}

/* ==========================================================================
   2.5 Architecture Explorer Tabs
   ========================================================================== */
function initArchitectureTabs() {
  const tabButtons = document.querySelectorAll('.arch-tab-btn');
  const panes = document.querySelectorAll('.arch-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const activePane = document.getElementById(`pane-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. deLauncher Command Capsule Sandbox (TRD FunctionGemma Intent Simulator)
   ========================================================================== */
const launcherData = [
  { id: 'arun', title: 'Arun', subtitle: 'Mobile · +91 98400 12345', category: 'people', actions: ['Call', 'Message', 'WhatsApp'] },
  { id: 'alarm_6am', title: 'Set Alarm for 6:00 AM', subtitle: 'Clock Provider · Morning Focus', category: 'actions', actions: ['Create Alarm'] },
  { id: 'wifi', title: 'Wi-Fi Settings', subtitle: 'System Settings · Connectivity', category: 'actions', actions: ['Open Settings'] },
  { id: 'pdf_doc', title: 'deSuite-Architecture-TRD.pdf', subtitle: 'Local Document · Downloads (2.4 MB)', category: 'files', actions: ['Open', 'Share'] },
  { id: 'calm_profile', title: 'Activate Calm Mode', subtitle: 'Focus Profile · Intentional Home', category: 'actions', actions: ['Activate Profile'] },
  { id: 'police', title: 'Police', subtitle: 'Emergency Service · 100', category: 'people', actions: ['Call', 'SMS', 'WhatsApp', 'Pay'] },
  { id: 'phone', title: 'Dial Pad', subtitle: 'Call & WhatsApp unsaved numbers', category: 'actions', actions: ['Open Dial Pad'] },
  { id: 'camera', title: 'Camera', subtitle: 'Utility · Instant Capture', category: 'apps', actions: ['Open', 'Pro Mode'] },
  { id: 'calc', title: 'Calculator', subtitle: 'Utility · Currency & Math', category: 'apps', actions: ['Open', 'Unit Convert'] },
  { id: 'calendar', title: 'Calendar', subtitle: 'Schedule · Nov 18', category: 'apps', actions: ['Agenda', 'Add Event'] },
  { id: 'music', title: 'deMusic', subtitle: 'Offline Audio Sanctuary', category: 'apps', actions: ['Play Sanctuary', 'Queue'] },
  { id: 'openpause', title: 'OpenPause', subtitle: 'Mindful Gatekeeper · Active', category: 'apps', actions: ['Settings', 'Stats'] },
  { id: 'vault', title: 'deVault & App Vault', subtitle: 'Productivity · On-Device', category: 'apps', actions: ['Open'] },
  { id: 'work_notes', title: 'Q4 Product Roadmap.md', subtitle: 'Local Document · 48 KB', category: 'files', actions: ['View', 'Edit'] }
];

function initDeLauncherSandbox() {
  const searchInput = document.getElementById('dlSearchInput');
  const resultsContainer = document.getElementById('dlSearchResults');
  const filterChips = document.querySelectorAll('.filter-chip');
  const bottomCapsule = document.getElementById('dlBottomActionCapsule');
  const intentStatusEl = document.getElementById('dlIntentStatus');
  const intentJsonEl = document.getElementById('dlIntentJson');
  const presetChips = document.querySelectorAll('.preset-chip');

  let activeCategory = 'all';

  function updateIntentDisplay(query = '') {
    if (!intentJsonEl || !intentStatusEl) return;

    const q = query.toLowerCase().trim();

    if (!q) {
      intentStatusEl.textContent = 'DETERMINISTIC RETRIEVAL (<100ms)';
      intentStatusEl.style.borderColor = 'var(--champagne-base)';
      intentStatusEl.style.color = 'var(--champagne-light)';
      intentJsonEl.textContent = `// Type or click a natural language preset above to inspect the on-device intent schema\n// Model: FunctionGemma 270M candidate running on LiteRT-LM (100% on-device)`;
      return;
    }

    if (q.includes('dial') || q.includes('call') || q.includes('arun')) {
      intentStatusEl.textContent = 'INTENT: CALL_CONTACT · ASSIST';
      intentStatusEl.style.borderColor = '#F4A282';
      intentStatusEl.style.color = '#F4A282';
      intentJsonEl.textContent = JSON.stringify({
        schema_version: "1.0",
        intent: "CALL_CONTACT",
        parameters: {
          contact_name: "Arun",
          matched_number: "+91 98400 12345"
        },
        confidence: 0.96,
        requires_confirmation: true,
        mode: "ASSIST (Confirmation Required)",
        action_policy: "OPEN_SYSTEM_DIALER",
        runtime: "FunctionGemma 270M (LiteRT-LM On-Device)"
      }, null, 2);
    } else if (q.includes('alarm') || q.includes('6') || q.includes('timer')) {
      intentStatusEl.textContent = 'INTENT: CREATE_ALARM · ASSIST';
      intentStatusEl.style.borderColor = '#F4A282';
      intentStatusEl.style.color = '#F4A282';
      intentJsonEl.textContent = JSON.stringify({
        schema_version: "1.0",
        intent: "CREATE_ALARM",
        parameters: {
          time: "06:00",
          am_pm: "AM",
          label: "Morning Focus",
          skip_ui_if_confirmed: true
        },
        confidence: 0.98,
        requires_confirmation: false,
        mode: "ASSIST",
        action_policy: "ACTION_REGISTRY_VERIFIED",
        runtime: "FunctionGemma 270M (LiteRT-LM On-Device)"
      }, null, 2);
    } else if (q.includes('wifi') || q.includes('setting')) {
      intentStatusEl.textContent = 'INTENT: OPEN_WIFI_SETTINGS · ASK';
      intentStatusEl.style.borderColor = 'var(--champagne-base)';
      intentStatusEl.style.color = 'var(--champagne-light)';
      intentJsonEl.textContent = JSON.stringify({
        schema_version: "1.0",
        intent: "OPEN_WIFI_SETTINGS",
        parameters: {},
        confidence: 0.99,
        requires_confirmation: false,
        mode: "ASK",
        action_policy: "SETTINGS_REDIRECT (Public Android API)",
        runtime: "FunctionGemma 270M (LiteRT-LM On-Device)"
      }, null, 2);
    } else if (q.includes('pdf') || q.includes('find') || q.includes('file')) {
      intentStatusEl.textContent = 'PROVIDER: FILE_SEARCH_PROVIDER · ASK';
      intentStatusEl.style.borderColor = '#9AD3BC';
      intentStatusEl.style.color = '#9AD3BC';
      intentJsonEl.textContent = JSON.stringify({
        schema_version: "1.0",
        intent: "SEARCH_FILES",
        parameters: {
          file_type: "pdf",
          search_scope: "Local Storage & Downloads"
        },
        confidence: 0.95,
        requires_confirmation: false,
        mode: "ASK",
        search_provider: "FileSearchProvider (Room SQLite)",
        runtime: "Deterministic Provider Pipeline"
      }, null, 2);
    } else if (q.includes('calm') || q.includes('mode') || q.includes('work') || q.includes('focus')) {
      intentStatusEl.textContent = 'STATE: SET_FOCUS_PROFILE · ASK';
      intentStatusEl.style.borderColor = '#C3ADF4';
      intentStatusEl.style.color = '#C3ADF4';
      intentJsonEl.textContent = JSON.stringify({
        schema_version: "1.0",
        intent: "SET_FOCUS_PROFILE",
        parameters: {
          profile: "Calm",
          filter_notifications: true,
          adaptive_dock: ["OpenPause", "deMusic", "Journal"]
        },
        confidence: 0.99,
        requires_confirmation: false,
        mode: "ASK",
        action_policy: "LAUNCHER_INTERNAL_STATE",
        runtime: "Deterministic Fallback Router"
      }, null, 2);
    } else {
      intentStatusEl.textContent = 'DETERMINISTIC RETRIEVAL (<100ms)';
      intentStatusEl.style.borderColor = 'var(--champagne-base)';
      intentStatusEl.style.color = 'var(--champagne-light)';
      intentJsonEl.textContent = JSON.stringify({
        schema_version: "1.0",
        intent: "SEARCH_APP_OR_ENTITY",
        parameters: {
          query: q,
          fuzzy_match: true
        },
        confidence: 1.0,
        mode: "ASK",
        runtime: "PackageManager & Deterministic Providers (0ms LLM)"
      }, null, 2);
    }
  }

  function renderResults(query = '') {
    if (!resultsContainer) return;

    updateIntentDisplay(query);

    const lowerQuery = query.toLowerCase().trim();
    const filtered = launcherData.filter(item => {
      const matchCat = (activeCategory === 'all') || (item.category === activeCategory) || (activeCategory === 'files' && item.category === 'files');
      const matchText = !lowerQuery || item.title.toLowerCase().includes(lowerQuery) || item.subtitle.toLowerCase().includes(lowerQuery) || (lowerQuery.includes('dial') && item.id === 'arun') || (lowerQuery.includes('alarm') && item.id === 'alarm_6am') || (lowerQuery.includes('wifi') && item.id === 'wifi') || (lowerQuery.includes('calm') && item.id === 'calm_profile') || (lowerQuery.includes('pdf') && item.id === 'pdf_doc');
      return matchCat && matchText;
    });

    resultsContainer.innerHTML = '';

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 1rem; text-align: center; color: var(--text-tertiary); font-size: 13px;">
          Search web for "${query}" ↗
        </div>
      `;
      if (bottomCapsule) bottomCapsule.textContent = `Search web for "${query}"`;
      return;
    }

    filtered.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = `capsule-result-item ${index === 0 ? 'focused' : ''}`;
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');

      const actionsHtml = item.actions.map(act => `<span class="capsule-action-link">${act}</span>`).join('<span class="capsule-action-dot"> · </span>');

      row.innerHTML = `
        <div>
          <div style="font-weight: 500; font-size: 14px; color: var(--text-primary);">${item.title}</div>
          <div class="meta-text">${item.subtitle}</div>
        </div>
        <div class="capsule-inline-actions">
          ${actionsHtml}
        </div>
      `;

      row.addEventListener('click', () => {
        showToast(`Executed: ${item.title} (${item.actions[0]})`);
      });

      resultsContainer.appendChild(row);
    });

    if (bottomCapsule && filtered.length > 0) {
      bottomCapsule.textContent = `Press return to execute top action: ${filtered[0].title}`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderResults(e.target.value);
    });
  }

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (searchInput) {
        searchInput.value = query;
        searchInput.focus();
      }
      renderResults(query);
    });
  });

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-filter');
      renderResults(searchInput ? searchInput.value : '');
    });
  });

  // Initial render
  renderResults();
}

/* ==========================================================================
   4. deMusic Web Audio Sanctuary Player (432Hz Calm Synthesis)
   ========================================================================== */
let audioCtx = null;
let oscillator = null;
let gainNode = null;
let biquadFilter = null;
let isPlaying = false;
let animationFrameId = null;

function initDeMusicPlayer() {
  const playBtn = document.getElementById('dmPlayBtn');
  const playBtnHero = document.getElementById('dmPlayBtnHero');
  const canvas = document.getElementById('waveformCanvas');
  const soundChips = document.querySelectorAll('.sound-chip');
  const scrubSlider = document.getElementById('dmScrubSlider');
  const trackTime = document.getElementById('dmTrackTime');

  let currentFrequency = 432; // 432Hz harmonic relaxation

  function toggleAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (isPlaying) {
      stopAudio();
    } else {
      startAudio(currentFrequency);
    }
    updatePlayIcons();
  }

  function startAudio(freq) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    biquadFilter = audioCtx.createBiquadFilter();

    // Gentle warm acoustic tone
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Warm low-pass filter
    biquadFilter.type = 'lowpass';
    biquadFilter.frequency.setValueAtTime(800, audioCtx.currentTime);

    // Fade in to prevent click
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.8);

    oscillator.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    isPlaying = true;

    drawWaveform();
    showToast(`Playing Mindful Sanctuary (${freq} Hz)`);
  }

  function stopAudio() {
    if (gainNode && audioCtx) {
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      setTimeout(() => {
        if (oscillator) {
          try { oscillator.stop(); } catch (e) {}
          oscillator.disconnect();
          oscillator = null;
        }
      }, 450);
    }
    isPlaying = false;
    cancelAnimationFrame(animationFrameId);
    clearWaveform();
  }

  function updatePlayIcons() {
    const iconHtml = isPlaying
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>`;

    if (playBtn) playBtn.innerHTML = iconHtml;
    if (playBtnHero) playBtnHero.innerHTML = iconHtml;
  }

  if (playBtn) playBtn.addEventListener('click', toggleAudio);
  if (playBtnHero) playBtnHero.addEventListener('click', toggleAudio);

  soundChips.forEach(chip => {
    chip.addEventListener('click', () => {
      soundChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFrequency = parseFloat(chip.getAttribute('data-freq') || '432');
      if (isPlaying) {
        stopAudio();
        startAudio(currentFrequency);
      }
    });
  });

  // Waveform visualization
  function drawWaveform() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    let phase = 0;

    function render() {
      if (!isPlaying) return;
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#C9A974';

      const amplitude = height / 3.5;
      const centerY = height / 2;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin((x * 0.035) + phase) * amplitude * Math.sin(x / width * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.08;
      animationFrameId = requestAnimationFrame(render);
    }
    render();
  }

  function clearWaveform() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw resting baseline
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#23222B';
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }

  clearWaveform();

  // Scrubber simulation
  if (scrubSlider && trackTime) {
    let currentSec = 45;
    setInterval(() => {
      if (isPlaying) {
        currentSec = (currentSec + 1) % 480;
        scrubSlider.value = currentSec;
        const mins = Math.floor(currentSec / 60);
        const secs = currentSec % 60;
        trackTime.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs} / 8:00`;
      }
    }, 1000);
  }
}

/* ==========================================================================
   5. Interactive Curated Theme Switcher
   ========================================================================== */
function initThemeSwitcher() {
  const themeButtons = document.querySelectorAll('.theme-pill-btn');
  const savedTheme = localStorage.getItem('deapps_theme') || 'obsidian-champagne';

  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    const themeName = btn.getAttribute('data-theme');
    if (themeName === savedTheme) {
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyTheme(themeName);
      localStorage.setItem('deapps_theme', themeName);
      showToast(`Theme applied: ${btn.textContent.trim()}`);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'obsidian-champagne') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

/* ==========================================================================
   6. Click-to-Copy Design Token Hex Codes
   ========================================================================== */
function initTokenCopy() {
  const swatches = document.querySelectorAll('.token-swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-hex');
      const name = swatch.getAttribute('data-token');
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied ${name} (${hex}) to clipboard!`);
        }).catch(() => {
          showToast(`Copied ${hex}`);
        });
      }
    });
  });
}

/* ==========================================================================
   7. Screenshot Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const thumbs = document.querySelectorAll('.screenshot-thumb-wrap');
  const dialog = document.getElementById('lightboxDialog');
  const imgEl = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (!dialog || !imgEl) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const img = thumb.querySelector('img');
      const caption = thumb.querySelector('.screenshot-caption');
      if (img) {
        imgEl.src = img.src;
        imgEl.alt = img.alt || 'deApps screenshot preview';
        if (captionEl) captionEl.textContent = caption ? caption.textContent : '';
        dialog.showModal();
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
      && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      dialog.close();
    }
  });
}

/* ==========================================================================
   8. Privacy & Terms Modal Handlers
   ========================================================================== */
function initModals() {
  setupModalTrigger('privacyLink', 'privacyDialog', 'privacyCloseBtn');
  setupModalTrigger('termsLink', 'termsDialog', 'termsCloseBtn');
  setupModalTrigger('aboutLink', 'aboutDialog', 'aboutCloseBtn');
}

function setupModalTrigger(triggerId, dialogId, closeId) {
  const trigger = document.getElementById(triggerId);
  const dialog = document.getElementById(dialogId);
  const closeBtn = document.getElementById(closeId);

  if (!trigger || !dialog) return;

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.showModal();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
      && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      dialog.close();
    }
  });
}

/* ==========================================================================
   9. Beta Access & Release Alerts Form
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');
  const feedback = document.getElementById('newsletterFeedback');

  if (!form || !input || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.className = 'form-feedback error';
      return;
    }

    const subscribers = JSON.parse(localStorage.getItem('deapps_subscribers') || '[]');
    subscribers.push({ email, date: new Date().toISOString() });
    localStorage.setItem('deapps_subscribers', JSON.stringify(subscribers));

    feedback.textContent = '✓ You are on the private release list. Welcome to mindful software.';
    feedback.className = 'form-feedback success';
    input.value = '';

    showToast('Subscribed to deApps private releases!');
  });
}

/* ==========================================================================
   10. Collaboration Email Copy (Following Modern Copy-Button Guidance)
   ========================================================================== */
function initCollaborationCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const bubble = document.getElementById('copyEmailBubble');
  const emailText = 'deapps.co.in@gmail.com';

  if (!copyBtn) return;

  let timer = null;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      reportCopy(true);
    } catch (err) {
      reportCopy(false);
    }
  });

  function reportCopy(ok) {
    if (!bubble) return;
    clearTimeout(timer);
    const msg = ok ? 'Copied deapps.co.in@gmail.com' : 'Copy failed';
    bubble.textContent = msg;
    bubble.classList.add('active');
    showToast(msg);

    timer = setTimeout(() => {
      bubble.classList.remove('active');
      bubble.textContent = '';
    }, 2400);
  }
}

/* ==========================================================================
   11. Ecosystem Interactive Node Highlights
   ========================================================================== */
function initEcosystemNodes() {
  const nodes = document.querySelectorAll('.ecosystem-node');
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const title = node.querySelector('.ecosystem-node-title span');
      if (title) {
        showToast(`Selected Ecosystem Node: ${title.textContent}`);
      }
    });
  });
}

/* ==========================================================================
   12. Smooth Scroll Nav & Toast Utility
   ========================================================================== */
function initSmoothScrollNav() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.startsWith('#!')) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('deappsToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'deappsToast';
    toast.className = 'copy-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
