/**
 * Audio Helper for Rosario App
 * Provides:
 * 1. HTML5 MP3 Audio Player for prayer recitations & mystery reflections
 * 2. Web Audio API synthesized church bell chime (fallback / transition indicator)
 * 3. Web Speech API (Text-to-Speech) fallback reader
 */

class RosaryAudioHelper {
  constructor() {
    this.audioCtx = null;
    this.speechSynth = window.speechSynthesis || null;
    this.isChimeEnabled = true;
    this.isTtsEnabled = false;
    this.currentUtterance = null;
    
    // HTML5 MP3 Audio Player
    this.mp3Player = new Audio();
    this.currentAudioSrc = null;
    this.isAudioPlaying = false;
    this.onAudioEndedCallback = null;

    this.initMp3PlayerListeners();
  }

  // Initialize AudioContext on user interaction
  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initMp3PlayerListeners() {
    this.mp3Player.addEventListener('ended', () => {
      this.isAudioPlaying = false;
      if (this.onAudioEndedCallback) {
        this.onAudioEndedCallback();
      }
    });

    this.mp3Player.addEventListener('pause', () => {
      this.isAudioPlaying = false;
    });

    this.mp3Player.addEventListener('play', () => {
      this.isAudioPlaying = true;
    });
  }

  /**
   * Play an MP3 file (e.g., 'assets/audio/salam_maria_id.mp3')
   * @param {string} src - File path to the MP3
   * @param {Function} onEnded - Callback when the audio finishes
   * @param {Function} onFallback - Fallback if MP3 is missing or fails to load
   */
  playMp3(src, onEnded = null, onFallback = null) {
    this.stopSpeaking();
    this.onAudioEndedCallback = onEnded;

    if (!src) {
      if (onFallback) onFallback();
      return;
    }

    this.mp3Player.src = src;
    this.currentAudioSrc = src;

    const playPromise = this.mp3Player.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isAudioPlaying = true;
        })
        .catch((error) => {
          console.info(`[Rosario Audio] File "${src}" belum ada atau tidak dapat diputar. Menggunakan mode otomatis fallback.`, error);
          this.isAudioPlaying = false;
          if (onFallback) {
            onFallback();
          }
        });
    }

    // Set error handler for missing files
    this.mp3Player.onerror = () => {
      this.isAudioPlaying = false;
      if (onFallback) {
        onFallback();
      }
    };
  }

  pauseMp3() {
    if (this.mp3Player && !this.mp3Player.paused) {
      this.mp3Player.pause();
    }
    this.isAudioPlaying = false;
  }

  resumeMp3() {
    if (this.mp3Player && this.mp3Player.src) {
      this.mp3Player.play().then(() => {
        this.isAudioPlaying = true;
      }).catch(e => console.warn(e));
    }
  }

  stopMp3() {
    if (this.mp3Player) {
      this.mp3Player.pause();
      this.mp3Player.currentTime = 0;
    }
    this.isAudioPlaying = false;
    this.onAudioEndedCallback = null;
  }

  isMp3Active() {
    return this.isAudioPlaying || (!this.mp3Player.paused && this.mp3Player.currentTime > 0);
  }

  /**
   * Play a gentle Catholic sanctuary bell / chime
   * @param {string} type 'bead' | 'decade' | 'complete'
   */
  playChime(type = 'bead') {
    if (!this.isChimeEnabled) return;

    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      if (type === 'bead') {
        this.createChimeTone(880, 0.18, 1.2, now);
        this.createChimeTone(1320, 0.08, 0.9, now + 0.02);
      } else if (type === 'decade') {
        this.createChimeTone(740, 0.22, 1.8, now);
        this.createChimeTone(880, 0.18, 1.6, now + 0.05);
        this.createChimeTone(1108, 0.15, 1.4, now + 0.1);
      } else if (type === 'complete') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          this.createChimeTone(freq, 0.2, 2.0, now + (idx * 0.18));
        });
      }
    } catch (e) {
      console.warn("Audio chime playback notice:", e);
    }
  }

  createChimeTone(freq, volume, duration, startTime) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  /**
   * Speak prayer text aloud using Web Speech API
   */
  speakText(text, lang = 'id', onEnd = null) {
    if (!this.isTtsEnabled || !this.speechSynth) {
      if (onEnd) setTimeout(onEnd, 3500);
      return;
    }

    this.stopSpeaking();

    const cleanText = text.replace(/["“”«»]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const voices = this.speechSynth.getVoices();
    const targetLang = lang === 'id' ? 'id' : 'en';
    const voice = voices.find(v => v.lang.startsWith(targetLang));
    if (voice) {
      utterance.voice = voice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
  }

  stopSpeaking() {
    if (this.speechSynth && this.speechSynth.speaking) {
      this.speechSynth.cancel();
    }
    this.currentUtterance = null;
  }

  vibrate(pattern = 40) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }
}

window.rosaryAudio = new RosaryAudioHelper();
