/**
 * Rosario - Holy Rosary Web Application Engine
 * Responsive, Bilingual, Dark/Light Theme, Interactive Bead Visualizer
 */

class RosaryApp {
  constructor() {
    // Persistent Preferences
    this.lang = localStorage.getItem('rosary_lang') || 'id';
    this.theme = localStorage.getItem('rosary_theme') || 'light';
    this.fontSize = localStorage.getItem('rosary_font_size') || 'normal';
    this.isChimeEnabled = localStorage.getItem('rosary_chime') !== 'false';
    this.isTtsEnabled = localStorage.getItem('rosary_tts') === 'true';

    // App Navigation & Session State
    this.currentScreen = 'home';
    this.previousScreen = 'home';
    this.selectedMysteryKey = this.getTodayMysteryKey();
    
    // Prayer Flow State
    this.prayerFlow = {
      decadeIndex: 0, // 0 to 4 (Decades I to V)
      stepType: 'decade_intro', // 'intro_creed' | 'decade_intro' | 'our_father' | 'hail_mary' | 'glory_be' | 'fatima' | 'closing'
      beadNumber: 1, // 1 to 10 for Hail Marys
      isPlaying: false,
      autoPlayTimer: null
    };

    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.applyFontSize(this.fontSize);
    
    if (window.rosaryAudio) {
      window.rosaryAudio.isChimeEnabled = this.isChimeEnabled;
      window.rosaryAudio.isTtsEnabled = this.isTtsEnabled;
    }

    this.bindEvents();
    this.renderAll();

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  // Determine today's mystery based on Gregorian day
  getTodayMysteryKey() {
    const day = new Date().getDay(); // 0: Sun, 1: Mon, ...
    const dayObj = ROSARY_DATA.daysOfWeek[day];
    return dayObj ? dayObj.mysteryKey : 'gembira';
  }

  getTodayDayIndex() {
    return new Date().getDay();
  }

  /* --------------------------------------------------------------------------
     DOM RENDERING & TRANSLATIONS
     -------------------------------------------------------------------------- */
  t(key) {
    const dict = ROSARY_DATA.translations[this.lang] || ROSARY_DATA.translations.id;
    return dict[key] || key;
  }

  renderAll() {
    this.updateI18nLabels();
    this.renderHome();
    this.renderSchedule();
    this.renderSettings();
  }

  updateI18nLabels() {
    // Dynamic text nodes marked with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = this.t(key);
      }
    });

    // Language pills active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.lang);
    });

    // Theme pills active state & icon/label update
    document.querySelectorAll('.theme-btn').forEach(btn => {
      const val = btn.getAttribute('data-theme-val');
      if (val) {
        btn.classList.toggle('active', val === this.theme);
      }
      const labelText = btn.querySelector('.theme-label-text');
      if (labelText) {
        labelText.textContent = this.theme === 'dark' ? this.t('themeDark') : this.t('themeLight');
      }
      const icon = btn.querySelector('i');
      if (icon && !btn.hasAttribute('data-theme-val')) {
        icon.className = this.theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
      }
    });
  }

  renderHome() {
    const todayKey = this.getTodayMysteryKey();
    const todayMystery = ROSARY_DATA.mysteries[todayKey];
    const dayIndex = this.getTodayDayIndex();
    const dayObj = ROSARY_DATA.daysOfWeek[dayIndex];
    const todayDayName = this.lang === 'id' ? dayObj.dayNameId : dayObj.dayNameEn;

    // Recommendation card
    const recomCard = document.getElementById('card-today-recom');
    if (recomCard && todayMystery) {
      const recomTitle = todayMystery.name[this.lang];
      const recomSub = `${this.t('recomDescPrefix')} ${todayDayName}`;
      
      document.getElementById('recom-mystery-name').textContent = recomTitle;
      document.getElementById('recom-mystery-sub').textContent = recomSub;
      
      recomCard.onclick = () => {
        this.openMysteryDetail(todayKey);
      };
    }

    // 4 Mystery Cards
    const container = document.getElementById('mysteries-list-container');
    if (container) {
      container.innerHTML = '';
      const keys = ['gembira', 'terang', 'sedih', 'mulia'];
      
      keys.forEach(key => {
        const m = ROSARY_DATA.mysteries[key];
        const card = document.createElement('div');
        card.className = 'card-mystery';
        card.setAttribute('data-key', key);
        card.innerHTML = `
          <div class="mystery-left">
            <div class="mystery-accent-bar"></div>
            <div class="mystery-info">
              <h4>${m.name[this.lang]}</h4>
              <p>${m.days[this.lang]}</p>
            </div>
          </div>
          <div class="mystery-arrow">
            <i class="bi bi-chevron-right"></i>
          </div>
        `;
        card.onclick = () => this.openMysteryDetail(key);
        container.appendChild(card);
      });
    }
  }

  openMysteryDetail(mysteryKey) {
    this.selectedMysteryKey = mysteryKey;
    const mystery = ROSARY_DATA.mysteries[mysteryKey];
    if (!mystery) return;

    // Header info
    document.getElementById('detail-mystery-title').textContent = mystery.name[this.lang];
    document.getElementById('detail-mystery-days').textContent = `${this.t('prayedOn')} ${mystery.days[this.lang]}`;

    // 5 Decades list
    const decadesContainer = document.getElementById('decades-list-container');
    decadesContainer.innerHTML = '';

    mystery.decades.forEach((decade, idx) => {
      const decadeCard = document.createElement('div');
      decadeCard.className = 'card-decade-item';
      decadeCard.innerHTML = `
        <div class="decade-roman-badge">${decade.roman}</div>
        <div class="decade-item-body">
          <div class="decade-item-label">${this.t('decadeLabel')}${decade.roman}</div>
          <h5 class="decade-item-title">${decade.title[this.lang]}</h5>
          <div class="decade-item-scripture">${decade.scripture.ref}: ${decade.scripture.text[this.lang]}</div>
        </div>
      `;
      decadeCard.onclick = () => {
        this.startPrayerSession(mysteryKey, idx);
      };
      decadesContainer.appendChild(decadeCard);
    });

    // Start Prayer CTA Button
    const startBtn = document.getElementById('btn-start-mystery');
    startBtn.onclick = () => {
      this.startPrayerSession(mysteryKey, 0);
    };

    this.showScreen('detail');
  }

  renderSchedule() {
    const list = document.getElementById('schedule-list-container');
    if (!list) return;
    list.innerHTML = '';

    const todayIdx = this.getTodayDayIndex();

    // Reorder days starting with Monday (Sen) to Sunday (Min) like the image: Sen, Sel, Rab, Kam, Jum, Sab, Min
    const orderedIndices = [1, 2, 3, 4, 5, 6, 0];

    orderedIndices.forEach(idx => {
      const dayData = ROSARY_DATA.daysOfWeek[idx];
      const mystery = ROSARY_DATA.mysteries[dayData.mysteryKey];
      const isToday = idx === todayIdx;
      const dayAbbr = this.lang === 'id' ? dayData.id : dayData.en;

      const card = document.createElement('div');
      card.className = `card-schedule-item ${isToday ? 'is-today' : ''}`;
      card.innerHTML = `
        <div class="schedule-item-left">
          <div class="schedule-accent-bar" style="background-color: ${mystery.accentColor};"></div>
          <div class="day-badge-box">${dayAbbr}</div>
          <div class="schedule-item-info">
            <h4>${mystery.name[this.lang]}</h4>
            ${isToday ? `<span class="badge-today-tag"><i class="bi bi-circle-fill" style="font-size: 6px;"></i> ${this.t('todayBadge')}</span>` : ''}
          </div>
        </div>
        <button class="schedule-play-btn" title="${this.t('startPrayingBtn')}" aria-label="${this.t('startPrayingBtn')}">
          <i class="bi bi-play-fill"></i>
        </button>
      `;

      card.onclick = () => {
        this.openMysteryDetail(dayData.mysteryKey);
      };

      list.appendChild(card);
    });
  }

  renderSettings() {
    // Populate or sync settings checkboxes & radio buttons
    const chimeCheck = document.getElementById('chk-audio-chime');
    if (chimeCheck) chimeCheck.checked = this.isChimeEnabled;

    const ttsCheck = document.getElementById('chk-voice-tts');
    if (ttsCheck) ttsCheck.checked = this.isTtsEnabled;

    // Font size pill state
    document.querySelectorAll('.font-size-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-size') === this.fontSize);
    });
  }

  /* --------------------------------------------------------------------------
     PRAYER ENGINE & INTERACTIVE BEAD VISUALIZER
     -------------------------------------------------------------------------- */
  startPrayerSession(mysteryKey, startDecadeIndex = 0) {
    this.selectedMysteryKey = mysteryKey;
    this.prayerFlow.decadeIndex = startDecadeIndex;
    this.prayerFlow.stepType = 'hail_mary';
    this.prayerFlow.beadNumber = 1;
    this.prayerFlow.isPlaying = false;
    this.stopAutoPlay();

    this.showScreen('prayer');
    this.updatePrayerScreen(true);
  }

  updatePrayerScreen(playChimeSound = true) {
    const mystery = ROSARY_DATA.mysteries[this.selectedMysteryKey];
    if (!mystery) return;

    const currentDecade = mystery.decades[this.prayerFlow.decadeIndex];
    const decadeNum = this.prayerFlow.decadeIndex + 1;

    // Top Bar Meta
    document.getElementById('prayer-decade-tag').textContent = `${this.t('decadeLabel')}${decadeNum}`;
    document.getElementById('prayer-decade-title').textContent = currentDecade.shortTitle[this.lang];
    document.getElementById('prayer-bead-counter').textContent = `${this.prayerFlow.beadNumber} / 10`;

    // Prayer Card Content
    let prayerTag = '';
    let prayerText = '';
    let scriptureHtml = '';

    if (this.prayerFlow.stepType === 'hail_mary') {
      prayerTag = ROSARY_DATA.prayers.salamMaria.label[this.lang];
      prayerText = `"${ROSARY_DATA.prayers.salamMaria.text[this.lang]}"`;
      
      if (this.prayerFlow.beadNumber === 1) {
        scriptureHtml = `
          <div class="prayer-scripture-box">
            <div class="scripture-ref-title"><i class="bi bi-book me-1"></i> ${currentDecade.scripture.ref} &bull; ${this.t('fruitTitle')}: <strong>${currentDecade.fruit[this.lang]}</strong></div>
            <div>${currentDecade.scripture.text[this.lang]}</div>
          </div>
        `;
      }
    } else if (this.prayerFlow.stepType === 'our_father') {
      prayerTag = ROSARY_DATA.prayers.bapaKami.label[this.lang];
      prayerText = `"${ROSARY_DATA.prayers.bapaKami.text[this.lang]}"`;
    } else if (this.prayerFlow.stepType === 'glory_be') {
      prayerTag = `${ROSARY_DATA.prayers.kemuliaan.label[this.lang]} & ${ROSARY_DATA.prayers.doaFatima.label[this.lang]}`;
      prayerText = `"${ROSARY_DATA.prayers.kemuliaan.text[this.lang]}"\n\n"${ROSARY_DATA.prayers.doaFatima.text[this.lang]}"`;
    }

    document.getElementById('prayer-tag-text').textContent = prayerTag;
    document.getElementById('prayer-body-text').innerHTML = prayerText.replace(/\n/g, '<br>');
    document.getElementById('prayer-scripture-insert').innerHTML = scriptureHtml;

    // Render Semicircular Bead Arc
    this.renderBeadArc();

    // Sound & Haptics
    if (playChimeSound && window.rosaryAudio) {
      window.rosaryAudio.playChime(this.prayerFlow.beadNumber === 10 ? 'decade' : 'bead');
      window.rosaryAudio.vibrate(35);
    }

    // Audio Playback trigger if isPlaying
    if (this.prayerFlow.isPlaying) {
      this.playCurrentStepAudio(prayerText);
    }
  }

  getCurrentStepAudioSrc() {
    if (this.prayerFlow.stepType === 'hail_mary') {
      return ROSARY_DATA.prayers.salamMaria.audio ? ROSARY_DATA.prayers.salamMaria.audio[this.lang] : null;
    } else if (this.prayerFlow.stepType === 'our_father') {
      return ROSARY_DATA.prayers.bapaKami.audio ? ROSARY_DATA.prayers.bapaKami.audio[this.lang] : null;
    } else if (this.prayerFlow.stepType === 'glory_be') {
      return ROSARY_DATA.prayers.kemuliaan.audio ? ROSARY_DATA.prayers.kemuliaan.audio[this.lang] : null;
    }
    return null;
  }

  playCurrentStepAudio(prayerText) {
    if (!window.rosaryAudio) return;

    const audioSrc = this.getCurrentStepAudioSrc();

    // Try playing MP3 first
    window.rosaryAudio.playMp3(
      audioSrc,
      // onEnded: when MP3 finishes, step to next bead
      () => {
        if (this.prayerFlow.isPlaying) {
          setTimeout(() => this.nextStep(), 800);
        }
      },
      // onFallback: if MP3 file is not found, fallback to TTS or auto-advance timer
      () => {
        if (window.rosaryAudio.isTtsEnabled) {
          window.rosaryAudio.speakText(prayerText, this.lang, () => {
            if (this.prayerFlow.isPlaying) {
              setTimeout(() => this.nextStep(), 1200);
            }
          });
        } else {
          // Clear any existing timer
          if (this.prayerFlow.autoPlayTimer) clearTimeout(this.prayerFlow.autoPlayTimer);
          this.prayerFlow.autoPlayTimer = setTimeout(() => {
            if (this.prayerFlow.isPlaying) {
              this.nextStep();
            }
          }, 6500);
        }
      }
    );
  }

  /**
   * Generates the authentic parabolic arc with 10 beads mirroring reference screenshot 3
   */
  renderBeadArc() {
    const track = document.getElementById('beads-arc-track');
    if (!track) return;
    track.innerHTML = '';

    const totalBeads = 10;
    const currentBead = this.prayerFlow.beadNumber;

    for (let i = 1; i <= totalBeads; i++) {
      const bead = document.createElement('div');
      bead.className = 'rosary-bead';
      bead.setAttribute('data-bead', i);

      const t = (i - 1) / (totalBeads - 1);
      const normalizedX = (t - 0.5) * 2;

      const xPercent = t * 84 + 8;
      const curveHeight = 85;
      const yOffset = Math.pow(normalizedX, 2) * curveHeight + 15;

      bead.style.left = `${xPercent}%`;
      bead.style.top = `${yOffset}px`;
      bead.style.transform = 'translate(-50%, -50%)';

      if (i < currentBead) {
        bead.classList.add('bead-completed');
        bead.innerHTML = '<i class="bi bi-check" style="font-size: 13px; font-weight: bold;"></i>';
      } else if (i === currentBead) {
        bead.classList.add('bead-active');
        bead.textContent = i;
      } else {
        bead.classList.add('bead-upcoming');
      }

      bead.onclick = () => {
        this.jumpToBead(i);
      };

      track.appendChild(bead);
    }
  }

  jumpToBead(beadNumber) {
    this.prayerFlow.stepType = 'hail_mary';
    this.prayerFlow.beadNumber = beadNumber;
    this.updatePrayerScreen(true);
  }

  nextStep() {
    if (this.prayerFlow.beadNumber < 10) {
      this.prayerFlow.beadNumber++;
      this.updatePrayerScreen(true);
    } else {
      if (this.prayerFlow.decadeIndex < 4) {
        this.prayerFlow.decadeIndex++;
        this.prayerFlow.beadNumber = 1;
        this.updatePrayerScreen(true);
      } else {
        this.completePrayer();
      }
    }
  }

  prevStep() {
    if (this.prayerFlow.beadNumber > 1) {
      this.prayerFlow.beadNumber--;
      this.updatePrayerScreen(true);
    } else {
      if (this.prayerFlow.decadeIndex > 0) {
        this.prayerFlow.decadeIndex--;
        this.prayerFlow.beadNumber = 10;
        this.updatePrayerScreen(true);
      }
    }
  }

  togglePlayPause() {
    this.prayerFlow.isPlaying = !this.prayerFlow.isPlaying;
    const playBtn = document.getElementById('btn-play-pause-icon');
    
    if (this.prayerFlow.isPlaying) {
      if (playBtn) playBtn.className = 'bi bi-pause-fill';
      this.updatePrayerScreen(false);
    } else {
      if (playBtn) playBtn.className = 'bi bi-play-fill';
      this.stopAutoPlay();
    }
  }

  stopAutoPlay() {
    if (this.prayerFlow.autoPlayTimer) {
      clearTimeout(this.prayerFlow.autoPlayTimer);
      this.prayerFlow.autoPlayTimer = null;
    }
    if (window.rosaryAudio) {
      window.rosaryAudio.pauseMp3();
      window.rosaryAudio.stopSpeaking();
    }
    const playBtn = document.getElementById('btn-play-pause-icon');
    if (playBtn) playBtn.className = 'bi bi-play-fill';
  }

  completePrayer() {
    this.stopAutoPlay();
    if (window.rosaryAudio) {
      window.rosaryAudio.playChime('complete');
    }
    this.showScreen('completed');
  }

  /* --------------------------------------------------------------------------
     NAVIGATION & SCREEN ROUTER
     -------------------------------------------------------------------------- */
  showScreen(screenId) {
    this.previousScreen = this.currentScreen;
    this.currentScreen = screenId;

    // Hide all screens
    document.querySelectorAll('.screen-view').forEach(s => {
      s.classList.remove('active');
    });

    // Show target screen
    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
      target.classList.add('active');
    }

    // Scroll to top of app content
    const content = document.querySelector('.app-content');
    if (content) content.scrollTop = 0;

    // Update bottom nav tab state
    document.querySelectorAll('.nav-tab-item').forEach(tab => {
      const tabTarget = tab.getAttribute('data-screen');
      tab.classList.toggle('active', tabTarget === screenId);
    });
  }

  /* --------------------------------------------------------------------------
     SETTINGS, PREFERENCES & THEMES
     -------------------------------------------------------------------------- */
  setLanguage(newLang) {
    if (newLang !== 'id' && newLang !== 'en') return;
    this.lang = newLang;
    localStorage.setItem('rosary_lang', newLang);
    this.renderAll();
    
    // If in prayer screen or detail screen, re-render them
    if (this.currentScreen === 'detail') {
      this.openMysteryDetail(this.selectedMysteryKey);
    } else if (this.currentScreen === 'prayer') {
      this.updatePrayerScreen(false);
    }
  }

  setTheme(newTheme) {
    this.theme = newTheme;
    localStorage.setItem('rosary_theme', newTheme);
    this.applyTheme(newTheme);
    this.updateI18nLabels();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  setFontSize(size) {
    this.fontSize = size;
    localStorage.setItem('rosary_font_size', size);
    this.applyFontSize(size);
    this.renderSettings();
  }

  applyFontSize(size) {
    const root = document.documentElement;
    if (size === 'large') {
      root.style.setProperty('--prayer-font-size', '1.45rem');
    } else if (size === 'xlarge') {
      root.style.setProperty('--prayer-font-size', '1.65rem');
    }
  }

  handleKeyboard(e) {
    if (this.currentScreen === 'prayer') {
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlayPause();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.nextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.prevStep();
      }
    }
  }

  bindEvents() {
    // Splash Screen Dismiss
    const splashOverlay = document.getElementById('splash-overlay');
    const btnEnter = document.getElementById('btn-enter-app');
    if (btnEnter && splashOverlay) {
      btnEnter.onclick = () => {
        splashOverlay.classList.add('hidden');
        if (window.rosaryAudio) {
          window.rosaryAudio.initAudioContext();
          window.rosaryAudio.playChime('bead');
        }
      };
      // Auto-hide splash after 3 seconds if untouched
      setTimeout(() => {
        if (!splashOverlay.classList.contains('hidden')) {
          splashOverlay.classList.add('hidden');
        }
      }, 2500);
    }

    // Bottom Navigation tabs
    document.querySelectorAll('.nav-tab-item').forEach(btn => {
      btn.onclick = () => {
        const screen = btn.getAttribute('data-screen');
        if (screen) this.showScreen(screen);
      };
    });

    // Back buttons
    document.querySelectorAll('.btn-back').forEach(btn => {
      btn.onclick = () => {
        this.stopAutoPlay();
        if (this.currentScreen === 'prayer') {
          this.showScreen('detail');
        } else {
          this.showScreen('home');
        }
      };
    });

    // Prayer Screen Controls
    const btnPrev = document.getElementById('btn-prayer-prev');
    if (btnPrev) btnPrev.onclick = () => this.prevStep();

    const btnNext = document.getElementById('btn-prayer-next');
    if (btnNext) btnNext.onclick = () => this.nextStep();

    const btnPlayPause = document.getElementById('btn-prayer-play-pause');
    if (btnPlayPause) btnPlayPause.onclick = () => this.togglePlayPause();

    // Top Utility Bar / Settings Lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.onclick = () => this.setLanguage(btn.getAttribute('data-lang'));
    });

    // Top Utility Bar / Settings Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.onclick = () => {
        const targetTheme = btn.getAttribute('data-theme-val') || (this.theme === 'light' ? 'dark' : 'light');
        this.setTheme(targetTheme);
      };
    });

    // Font size buttons
    document.querySelectorAll('.font-size-btn').forEach(btn => {
      btn.onclick = () => this.setFontSize(btn.getAttribute('data-size'));
    });

    // Toggles
    const chkChime = document.getElementById('chk-audio-chime');
    if (chkChime) {
      chkChime.onchange = (e) => {
        this.isChimeEnabled = e.target.checked;
        localStorage.setItem('rosary_chime', this.isChimeEnabled);
        if (window.rosaryAudio) window.rosaryAudio.isChimeEnabled = this.isChimeEnabled;
      };
    }

    const chkTts = document.getElementById('chk-voice-tts');
    if (chkTts) {
      chkTts.onchange = (e) => {
        this.isTtsEnabled = e.target.checked;
        localStorage.setItem('rosary_tts', this.isTtsEnabled);
        if (window.rosaryAudio) window.rosaryAudio.isTtsEnabled = this.isTtsEnabled;
      };
    }

    // Completion screen actions
    const btnCompleteHome = document.getElementById('btn-completed-home');
    if (btnCompleteHome) {
      btnCompleteHome.onclick = () => this.showScreen('home');
    }
    const btnCompletePrayAgain = document.getElementById('btn-completed-again');
    if (btnCompletePrayAgain) {
      btnCompletePrayAgain.onclick = () => this.startPrayerSession(this.selectedMysteryKey, 0);
    }
  }
}

// Instantiate on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  window.app = new RosaryApp();
});
