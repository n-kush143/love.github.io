/* ==========================================================================
   ROMANTIC BIRTHDAY PORTFOLIO FOR PRIYA ❤️
   Interactive Logic, Scroll Observer, Web Audio Fallback & Easter Egg
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. CONFIGURATION & EDITABLE DATA
     ------------------------------------------------------------------------ */
  // You can set Sweetheart's birthday date here (Year, Month [0-indexed], Day, Hour, Minute)
  // Default is set to today's date so celebration banner displays immediately!
  const TODAY = new Date();
  const TARGET_BIRTHDAY = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), 0, 0, 0);
  
  /* ------------------------------------------------------------------------
     2. LIGHTWEIGHT PARTICLE & STAR FIELD (GPU & Mobile Optimized)
     ------------------------------------------------------------------------ */
  const starContainer = document.getElementById('star-container');
  const particleContainer = document.getElementById('particle-container');

  // Generate lightweight background stars
  function initStars() {
    const isMobile = window.innerWidth < 600;
    const starCount = isMobile ? 25 : 50;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.width = `${Math.random() * 2 + 1}px`;
      star.style.height = star.style.width;
      star.style.animationDelay = `${Math.random() * 3}s`;
      fragment.appendChild(star);
    }
    starContainer.appendChild(fragment);
  }

  // Floating heart particles (limited to 8 on screen for 4GB RAM phone smoothness)
  function createFloatingHeart() {
    if (document.hidden) return; // Save memory if tab inactive
    const heart = document.createElement('div');
    heart.className = 'floating-heart-particle';
    heart.textContent = ['❤️', '💖', '✨', '🌸'][Math.floor(Math.random() * 4)];
    heart.style.left = `${Math.random() * 92 + 4}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 5}s`;
    heart.style.fontSize = `${Math.random() * 0.8 + 0.8}rem`;

    particleContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 8000);
  }

  initStars();
  setInterval(createFloatingHeart, 1200);

  /* ------------------------------------------------------------------------
     3. CINEMATIC INTRO OPENING & 3773 PASSCODE SYSTEM
     ------------------------------------------------------------------------ */
  const btnOpenSurprise = document.getElementById('btn-open-surprise');
  const heroIntro = document.getElementById('hero-intro');
  const mainContent = document.getElementById('main-content');

  // Passcode elements
  const passcodeModal = document.getElementById('passcode-modal');
  const passcodeClose = document.getElementById('passcode-close');
  const passcodeError = document.getElementById('passcode-error');
  const pinDots = [
    document.getElementById('dot-0'),
    document.getElementById('dot-1'),
    document.getElementById('dot-2'),
    document.getElementById('dot-3')
  ];
  const keyBtns = document.querySelectorAll('.key-btn');

  const SECRET_PIN = '3773';
  let currentPin = '';
  let unlocked = false;

  btnOpenSurprise.addEventListener('click', () => {
    if (unlocked) {
      revealMainExperience();
    } else {
      openPasscodeModal();
    }
  });

  function openPasscodeModal() {
    passcodeModal.classList.add('active');
    passcodeModal.setAttribute('aria-hidden', 'false');
    resetPin();
  }

  function closePasscodeModal() {
    passcodeModal.classList.remove('active');
    passcodeModal.setAttribute('aria-hidden', 'true');
  }

  passcodeClose.addEventListener('click', closePasscodeModal);

  function resetPin() {
    currentPin = '';
    passcodeError.classList.add('hidden');
    passcodeError.textContent = '';
    updatePinDots();
  }

  function updatePinDots() {
    pinDots.forEach((dot, index) => {
      dot.className = 'pin-dot';
      if (index < currentPin.length) {
        dot.classList.add('filled');
      }
    });
  }

  function handleKeyPress(key) {
    if (unlocked) return;

    if (key === 'clear') {
      resetPin();
      return;
    }

    if (key === 'backspace') {
      if (currentPin.length > 0) {
        currentPin = currentPin.slice(0, -1);
        updatePinDots();
      }
      return;
    }

    if (/^[0-9]$/.test(key) && currentPin.length < 4) {
      currentPin += key;
      updatePinDots();

      if (currentPin.length === 4) {
        verifyPin();
      }
    }
  }

  function verifyPin() {
    if (currentPin === SECRET_PIN) {
      unlocked = true;
      pinDots.forEach(dot => dot.classList.add('success'));
      passcodeError.classList.remove('hidden');
      passcodeError.style.color = '#ffd700';
      passcodeError.textContent = 'Access Granted to My Heart! 💖';

      setTimeout(() => {
        closePasscodeModal();
        revealMainExperience();
      }, 700);
    } else {
      passcodeError.classList.remove('hidden');
      passcodeError.style.color = '#ff4d4d';
      passcodeError.textContent = 'Incorrect Passcode! Try again ❤️';

      setTimeout(() => {
        resetPin();
      }, 900);
    }
  }

  // Keypad On-Screen Clicks
  keyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      handleKeyPress(key);
    });
  });

  // Physical Keyboard Entry Support
  window.addEventListener('keydown', (e) => {
    if (!passcodeModal.classList.contains('active')) return;

    if (e.key >= '0' && e.key <= '9') {
      handleKeyPress(e.key);
    } else if (e.key === 'Backspace') {
      handleKeyPress('backspace');
    } else if (e.key === 'Escape') {
      closePasscodeModal();
    }
  });

  function revealMainExperience() {
    // Smooth fade out intro screen
    heroIntro.classList.add('fade-out');
    
    setTimeout(() => {
      heroIntro.style.display = 'none';
      mainContent.classList.remove('hidden-experience');
      mainContent.classList.add('visible');

      // Scroll to top of main content
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger line-by-line letter reveal & observers
      initScrollObservers();
      
      // Auto-start music audio if allowed
      tryPlayAudio();
    }, 600);
  }

  /* ------------------------------------------------------------------------
     4. SCROLL OBSERVER & LOVE LETTER REVEAL
     ------------------------------------------------------------------------ */
  function initScrollObservers() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
      root: null,
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // If this is the love letter section, reveal lines sequentially!
          if (entry.target.id === 'love-letter') {
            revealLetterLines();
          }

          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  }

  function revealLetterLines() {
    const lines = document.querySelectorAll('#letter-lines-container .letter-line');
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('revealed');
      }, index * 220); // Smooth line-by-line fade in
    });
  }

  /* ------------------------------------------------------------------------
     4.5 INTERACTIVE BLOW OUT CANDLE FEATURE
     ------------------------------------------------------------------------ */
  const btnBlowCandle = document.getElementById('btn-blow-candle');
  const candleFlame = document.getElementById('candle-flame');
  const wishGrantedMsg = document.getElementById('wish-granted-msg');

  if (btnBlowCandle) {
    btnBlowCandle.addEventListener('click', () => {
      candleFlame.classList.remove('burning');
      candleFlame.classList.add('blown-out');
      wishGrantedMsg.classList.remove('hidden');
      btnBlowCandle.style.display = 'none';

      // Spawn celebratory particles
      for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 120);
      }
    });
  }

  /* ------------------------------------------------------------------------
     4.6 OPEN WHEN ENVELOPES MODAL LOGIC
     ------------------------------------------------------------------------ */
  const envelopeCards = document.querySelectorAll('.envelope-card');
  const envelopeModal = document.getElementById('envelope-modal');
  const envelopeClose = document.getElementById('envelope-close');
  const envelopeModalIcon = document.getElementById('envelope-modal-icon');
  const envelopeModalTitle = document.getElementById('envelope-modal-title');
  const envelopeModalBody = document.getElementById('envelope-modal-body');
  const envelopeBackdrop = document.querySelector('.envelope-backdrop');

  const envelopeData = {
    miss: {
      icon: '💌',
      title: 'Open when you miss me…',
      text: 'याद रखना, हम चाहें कितनी भी दूरी पर क्यों न हों… मेरा दिल हर पल आपके ही पास धड़कता है। बस आँखें बंद करना और मुझे अपने साथ महसूस करना। ❤️'
    },
    low: {
      icon: '💖',
      title: 'Open when you feel low…',
      text: 'उदासी को अपनी प्यारी मुस्कान मत छीनने देना। आप मेरी पूरी दुनिया की सबसे ख़ास इंसान हैं, और मैं हमेशा आपके साथ हूँ, हर पल, हर मुश्किल में। ✨'
    },
    smile: {
      icon: '😊',
      title: 'Open when you need a smile…',
      text: 'क्या आपको पता है कि आपकी एक मुस्कान मेरी सारी परेशानियाँ मिटा देती है? तो चलिए, जल्दी से थोड़ा सा मुस्कुरा दीजिए! 😊❤️'
    },
    night: {
      icon: '🎂',
      title: 'Open on birthday night…',
      text: 'आज का दिन आपके नाम था… महादेव से दुआ है कि आने वाला हर दिन आपके लिए ढेरों खुशियाँ और सुकून लेकर आए। शुभ रात्रि मेरी जान, Happy Birthday! 🎂✨'
    }
  };

  envelopeCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-env');
      const data = envelopeData[type];
      if (data) {
        envelopeModalIcon.textContent = data.icon;
        envelopeModalTitle.textContent = data.title;
        envelopeModalBody.textContent = data.text;
        envelopeModal.classList.add('active');
        envelopeModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeEnvelopeModal() {
    envelopeModal.classList.remove('active');
    envelopeModal.setAttribute('aria-hidden', 'true');
  }

  if (envelopeClose) envelopeClose.addEventListener('click', closeEnvelopeModal);
  if (envelopeBackdrop) envelopeBackdrop.addEventListener('click', closeEnvelopeModal);

  /* ------------------------------------------------------------------------
     4.7 LOVE QUIZ LOGIC
     ------------------------------------------------------------------------ */
  const quizQTitle = document.getElementById('quiz-q-title');
  const quizOptions = document.getElementById('quiz-options');
  const quizQuestionBox = document.getElementById('quiz-question-box');
  const quizResultBox = document.getElementById('quiz-result-box');
  const quizStepBadge = document.querySelector('.quiz-step-badge');

  const quizQuestions = [
    {
      q: 'Who loves you the most in this entire world?',
      badge: 'Question 1 of 3',
      opts: ['Me ❤️', 'Definitely Me 💖', 'Me Forever 🫶']
    },
    {
      q: 'What is my favorite sight in the whole universe?',
      badge: 'Question 2 of 3',
      opts: ['Your Smile 😊', 'Your Gorgeous Eyes 🌙', 'You in Saree ✨']
    },
    {
      q: 'How long will I continue to love you?',
      badge: 'Question 3 of 3',
      opts: ['100 Years ⏳', 'Forever & Always ♾️', 'Until My Last Breath 💖']
    }
  ];

  let currentQuizStep = 0;

  function renderQuizQuestion() {
    if (currentQuizStep >= quizQuestions.length) {
      quizQuestionBox.classList.add('hidden');
      quizResultBox.classList.remove('hidden');
      return;
    }

    const qData = quizQuestions[currentQuizStep];
    quizStepBadge.textContent = qData.badge;
    quizQTitle.textContent = qData.q;
    quizOptions.innerHTML = '';

    qData.opts.forEach(optText => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;
      btn.addEventListener('click', () => {
        currentQuizStep++;
        renderQuizQuestion();
      });
      quizOptions.appendChild(btn);
    });
  }

  renderQuizQuestion();

  /* ------------------------------------------------------------------------
     4.8 TAP TOUCH HEART BLOSSOM EFFECT
     ------------------------------------------------------------------------ */
  window.addEventListener('pointerdown', (e) => {
    // Don't spawn on buttons or interactive cards to avoid clutter
    if (e.target.closest('button, a, input')) return;

    const particle = document.createElement('div');
    particle.className = 'tap-heart-particle';
    particle.textContent = ['❤️', '💖', '✨', '🌸'][Math.floor(Math.random() * 4)];
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1200);
  });
  const btnTapHeart = document.getElementById('btn-tap-heart');
  const heartRevealArea = document.getElementById('heart-reveal-area');
  const growingHeart = document.getElementById('growing-heart');
  const loveCounter = document.getElementById('love-counter');
  const msg1 = document.querySelector('.msg-1');
  const msg2 = document.querySelector('.msg-2');
  let heartTapped = false;

  btnTapHeart.addEventListener('click', () => {
    if (heartTapped) return;
    heartTapped = true;

    btnTapHeart.style.display = 'none';
    heartRevealArea.classList.remove('heart-reveal-hidden');
    heartRevealArea.classList.add('active');

    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 15) + 5;
      
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        loveCounter.textContent = '100% → ∞ % ❤️';
        growingHeart.style.transform = 'scale(1.5)';

        // Reveal text messages sequentially
        setTimeout(() => {
          msg1.classList.add('show');
        }, 400);
        setTimeout(() => {
          msg2.classList.add('show');
        }, 1200);
      } else {
        loveCounter.textContent = `${percent}%`;
        growingHeart.style.transform = `scale(${1 + percent / 200})`;
      }
    }, 60);
  });

  /* ------------------------------------------------------------------------
     6. MEMORY PHOTO GALLERY LIGHTBOX
     ------------------------------------------------------------------------ */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullSrc = item.getAttribute('data-full');
      const caption = item.getAttribute('data-caption');
      
      lightboxImg.src = fullSrc;
      lightboxCaption.textContent = caption;
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  /* ------------------------------------------------------------------------
     7. BIRTHDAY COUNTDOWN / TODAY BANNER LOGIC
     ------------------------------------------------------------------------ */
  const todayBanner = document.getElementById('today-banner');
  const countdownGrid = document.getElementById('countdown-grid');
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  function updateCountdown() {
    const now = new Date();
    const diff = TARGET_BIRTHDAY - now;

    // If today is on or past birthday date, show TODAY celebration banner!
    if (diff <= 0) {
      todayBanner.classList.remove('hidden');
      countdownGrid.classList.add('hidden');
    } else {
      todayBanner.classList.add('hidden');
      countdownGrid.classList.remove('hidden');

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      cdDays.textContent = String(d).padStart(2, '0');
      cdHours.textContent = String(h).padStart(2, '0');
      cdMins.textContent = String(m).padStart(2, '0');
      cdSecs.textContent = String(s).padStart(2, '0');
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ------------------------------------------------------------------------
     8. ONE LAST SURPRISE OVERLAY MODAL
     ------------------------------------------------------------------------ */
  const btnFinalSurprise = document.getElementById('btn-final-surprise');
  const surpriseOverlay = document.getElementById('surprise-overlay');
  const surpriseClose = document.getElementById('surprise-close');
  const surpriseBackdrop = document.querySelector('.surprise-backdrop');

  btnFinalSurprise.addEventListener('click', () => {
    surpriseOverlay.classList.add('active');
    surpriseOverlay.setAttribute('aria-hidden', 'false');

    // Extra burst of floating heart particles
    for (let i = 0; i < 10; i++) {
      setTimeout(createFloatingHeart, i * 150);
    }
  });

  function closeSurprise() {
    surpriseOverlay.classList.remove('active');
    surpriseOverlay.setAttribute('aria-hidden', 'true');
  }

  surpriseClose.addEventListener('click', closeSurprise);
  surpriseBackdrop.addEventListener('click', closeSurprise);

  /* ------------------------------------------------------------------------
     9. SECRET EASTER EGG (5 Taps Listener)
     ------------------------------------------------------------------------ */
  const easterTrigger = document.getElementById('easter-egg-trigger');
  const easterModal = document.getElementById('easter-egg-modal');
  const easterClose = document.getElementById('easter-close');
  let tapCount = 0;
  let tapTimer = null;

  easterTrigger.addEventListener('click', () => {
    tapCount++;
    
    // Heartbeat feedback animation
    easterTrigger.style.transform = 'scale(1.1)';
    setTimeout(() => { easterTrigger.style.transform = 'scale(1)'; }, 150);

    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => {
      tapCount = 0;
    }, 2500);

    if (tapCount >= 5) {
      tapCount = 0;
      easterModal.classList.add('active');
      easterModal.setAttribute('aria-hidden', 'false');
    }
  });

  easterClose.addEventListener('click', () => {
    easterModal.classList.remove('active');
    easterModal.setAttribute('aria-hidden', 'true');
  });

  /* ------------------------------------------------------------------------
     10. ROMANTIC AUDIO PLAYER (INVISIBLE MP4 VIDEO AUDIO + YT + FALLBACKS)
     ------------------------------------------------------------------------ */
  const btnToggleAudio = document.getElementById('btn-toggle-audio');
  const bgMusic = document.getElementById('bg-music');
  const romanticVideo = document.getElementById('romantic-video');
  const audioLabel = document.getElementById('audio-label');
  const audioVisualizer = document.getElementById('audio-visualizer');

  let isPlaying = false;
  let synthAudioCtx = null;
  let synthOscs = [];
  let ytPlayer = null;
  let ytReady = false;

  // Initialize YouTube IFrame API Player
  window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('yt-player', {
      height: '1',
      width: '1',
      videoId: 'yncD7sMITfY', // YouTube Video: Chahe Dukh Ho Chahe Sukh Ho
      playerVars: {
        'autoplay': 0,
        'controls': 0,
        'loop': 1,
        'playlist': 'yncD7sMITfY',
        'playsinline': 1
      },
      events: {
        'onReady': () => {
          ytReady = true;
          console.log('YouTube Audio Player Ready (yncD7sMITfY)');
        },
        'onStateChange': (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            setAudioState(true);
          } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            setAudioState(false);
          }
        }
      }
    });
  };

  function toggleAudio() {
    if (isPlaying) {
      pauseAudio();
    } else {
      tryPlayAudio();
    }
  }

  function tryPlayAudio() {
    // 1. Try side MP4 video audio first (User uploaded chahe_dukh_ho.mp4)
    if (romanticVideo) {
      romanticVideo.play().then(() => {
        setAudioState(true);
        return;
      }).catch(err => {
        console.log('Video play policy blocked/fallback...');
      });
    }

    // 2. Try YouTube Player
    if (ytReady && ytPlayer && typeof ytPlayer.playVideo === 'function') {
      try {
        ytPlayer.playVideo();
        setAudioState(true);
        return;
      } catch (e) {
        console.warn('YouTube play failed...');
      }
    }

    // 3. Try HTML5 audio fallback
    bgMusic.play().then(() => {
      setAudioState(true);
    }).catch(err => {
      console.log('HTML5 Audio fallback to Web Audio Synth ambient track...');
      startSynthMusic();
      setAudioState(true);
    });
  }

  function pauseAudio() {
    if (romanticVideo) {
      romanticVideo.pause();
    }
    if (ytReady && ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try { ytPlayer.pauseVideo(); } catch (e) {}
    }
    bgMusic.pause();
    stopSynthMusic();
    setAudioState(false);
  }

  function setAudioState(playing) {
    isPlaying = playing;
    if (playing) {
      audioLabel.textContent = 'Pause "Chahe Dukh Ho" ⏸️';
      audioVisualizer.classList.remove('paused');
    } else {
      audioLabel.textContent = 'Play "Chahe Dukh Ho" ❤️';
      audioVisualizer.classList.add('paused');
    }
  }

  // Web Audio Synth Fallback (Plays the melodic notes of "Chahe Dukh Ho Chahe Sukh Ho")
  function startSynthMusic() {
    if (synthAudioCtx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      synthAudioCtx = new AudioCtx();

      // Soft romantic warm frequencies matching Hum Mar Jayenge chord progression (C#m / B / A / G#m)
      const freqs = [185.00, 220.00, 277.18, 329.63, 370.00]; // F#3, A3, C#4, E4, F#4
      
      freqs.forEach(freq => {
        const osc = synthAudioCtx.createOscillator();
        const gain = synthAudioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, synthAudioCtx.currentTime);

        gain.gain.setValueAtTime(0.04, synthAudioCtx.currentTime); // Soft background volume

        osc.connect(gain);
        gain.connect(synthAudioCtx.destination);
        osc.start();

        synthOscs.push({ osc, gain });
      });
    } catch (e) {
      console.warn('Web Audio not supported');
    }
  }

  function stopSynthMusic() {
    if (synthAudioCtx) {
      synthOscs.forEach(item => {
        try { item.osc.stop(); } catch (e) {}
      });
      synthOscs = [];
      try { synthAudioCtx.close(); } catch (e) {}
      synthAudioCtx = null;
    }
  }

  btnToggleAudio.addEventListener('click', toggleAudio);

  /* ------------------------------------------------------------------------
     11. FLOATING BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const btnBackToTop = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btnBackToTop.classList.remove('hidden-btn');
    } else {
      btnBackToTop.classList.add('hidden-btn');
    }
  });

  btnBackToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
