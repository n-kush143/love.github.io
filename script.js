/* ==========================================================================
   ROMANTIC BIRTHDAY PORTFOLIO FOR PRIYA ❤️
   Interactive Logic, Scroll Observer, Web Audio Fallback & Easter Egg
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. ACTIVITY TRACKER ENGINE (GMAIL / TELEGRAM / FORMSUBMIT / DISCORD)
     ------------------------------------------------------------------------ */
  window.GMAIL_CONFIG = {
    // Option A: FormSubmit (Zero Signup - Just put your Gmail here!)
    yourGmailAddress: '',                   // e.g. 'namitkushwaha@gmail.com'

    // Option B: Telegram Bot (Instant phone notification!)
    telegramBotToken: '',                   // e.g. '123456789:ABCdef...'
    telegramChatID: '',                     // e.g. '987654321'

    // Option C: Formspree / EmailJS / Web3Forms
    formspreeEndpoint: '',                  // e.g. 'https://formspree.io/f/xyz...'
    serviceID: 'YOUR_EMAILJS_SERVICE_ID',
    templateID: 'YOUR_EMAILJS_TEMPLATE_ID',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
  };

  function saveLocalLog(eventName, details) {
    try {
      const logs = JSON.parse(localStorage.getItem('sweetheart_activity_logs') || '[]');
      logs.unshift({
        time: new Date().toLocaleString(),
        event: eventName,
        details: typeof details === 'object' ? JSON.stringify(details, null, 2) : String(details)
      });
      localStorage.setItem('sweetheart_activity_logs', JSON.stringify(logs.slice(0, 100)));
    } catch (e) {
      console.log('Error saving local log:', e);
    }
  }

  function sendActivityToGmail(eventName, eventDetails) {
    console.log(`[Activity Logged]: ${eventName}`, eventDetails);
    saveLocalLog(eventName, eventDetails);
    
    const timestamp = new Date().toLocaleString();
    const formattedText = `💖 Sweetheart Activity Alert! 💖\n\n📌 Event: ${eventName}\n🕒 Time: ${timestamp}\n\n📝 Details:\n${typeof eventDetails === 'object' ? JSON.stringify(eventDetails, null, 2) : String(eventDetails)}`;

    // 1. FormSubmit (ZERO SIGNUP GMAIL - Instant email to your Gmail address)
    if (window.GMAIL_CONFIG.yourGmailAddress) {
      fetch(`https://formsubmit.co/ajax/${window.GMAIL_CONFIG.yourGmailAddress}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `💖 Activity Alert: ${eventName}`,
          Event: eventName,
          Timestamp: timestamp,
          Details: JSON.stringify(eventDetails)
        })
      }).catch(err => console.log('FormSubmit error:', err));
    }

    // 2. Telegram Bot (Instant Notification to your phone)
    if (window.GMAIL_CONFIG.telegramBotToken && window.GMAIL_CONFIG.telegramChatID) {
      const tgUrl = `https://api.telegram.org/bot${window.GMAIL_CONFIG.telegramBotToken}/sendMessage`;
      fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: window.GMAIL_CONFIG.telegramChatID,
          text: formattedText
        })
      }).catch(err => console.log('Telegram Notification error:', err));
    }

    // 3. Formspree Endpoint
    if (window.GMAIL_CONFIG.formspreeEndpoint) {
      fetch(window.GMAIL_CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_name: eventName, details: eventDetails, timestamp })
      }).catch(err => console.log('Formspree Notification error:', err));
    }

    // 4. EmailJS Integration
    if (window.emailjs && window.GMAIL_CONFIG.serviceID !== 'YOUR_EMAILJS_SERVICE_ID') {
      emailjs.send(window.GMAIL_CONFIG.serviceID, window.GMAIL_CONFIG.templateID, { event_name: eventName, details: JSON.stringify(eventDetails), timestamp }, window.GMAIL_CONFIG.publicKey)
        .catch(err => console.log('EmailJS Error:', err));
    }
  }

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
    tryPlayAudio();
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
      // Start invisible audio immediately on user click gesture!
      tryPlayAudio();
      
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
     4.9 ROMANTIC & FUNNY GAME LOGIC
     ------------------------------------------------------------------------ */
  // Game 1: The Playful Uncatchable NO Button
  const btnChoiceYes = document.getElementById('btn-choice-yes');
  const btnChoiceNo = document.getElementById('btn-choice-no');
  const noDodgeMsg = document.getElementById('no-dodge-msg');
  const yesVictoryBox = document.getElementById('yes-victory-box');
  const playfulContainer = document.getElementById('playful-btn-container');
  let noDodgeCount = 0;

  const dodgeMessages = [
    "Nice try! But you can't click No! 😜",
    "Nope! The 'No' button is escaping! 😂",
    "Oops! 'No' button broke down... You MUST click YES! ❤️"
  ];

  function dodgeNoButton() {
    noDodgeCount++;
    noDodgeMsg.classList.remove('hidden');
    noDodgeMsg.textContent = dodgeMessages[Math.min(noDodgeCount - 1, dodgeMessages.length - 1)];

    // Grow YES button to make it super easy and cute
    const newScale = 1 + noDodgeCount * 0.1;
    btnChoiceYes.style.transform = `scale(${newScale})`;

    if (noDodgeCount >= 3) {
      btnChoiceNo.style.display = 'none';
      return;
    }

    // Move NO button to random position inside container
    const containerRect = playfulContainer.getBoundingClientRect();
    const btnRect = btnChoiceNo.getBoundingClientRect();

    const maxLeft = (containerRect.width / 2) - btnRect.width;
    const maxTop = (containerRect.height / 2) - btnRect.height;

    const randomX = (Math.random() - 0.5) * maxLeft * 1.5;
    const randomY = (Math.random() - 0.5) * maxTop * 1.5;

    btnChoiceNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }

  if (btnChoiceNo) {
    btnChoiceNo.addEventListener('mouseenter', dodgeNoButton);
    btnChoiceNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeNoButton();
    });
  }

  if (btnChoiceYes) {
    btnChoiceYes.addEventListener('click', () => {
      playfulContainer.style.display = 'none';
      noDodgeMsg.style.display = 'none';
      yesVictoryBox.classList.remove('hidden');

      // Confetti heart burst
      for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 80);
      }
    });
  }

  // Game 2: Catch Falling Hearts Mini-Game
  const btnStartCatch = document.getElementById('btn-start-catch');
  const catchGameArea = document.getElementById('catch-game-area');
  const catchScoreEl = document.getElementById('catch-score');
  const catchTimerEl = document.getElementById('catch-timer');
  const catchVictoryBox = document.getElementById('catch-victory-box');

  let catchScore = 0;
  let catchTimeLeft = 15;
  let catchGameInterval = null;
  let catchSpawnInterval = null;
  let catchGameActive = false;

  if (btnStartCatch) {
    btnStartCatch.addEventListener('click', startCatchGame);
  }

  function startCatchGame() {
    if (catchGameActive) return;
    catchGameActive = true;
    catchScore = 0;
    catchTimeLeft = 15;

    btnStartCatch.style.display = 'none';
    catchVictoryBox.classList.add('hidden');
    catchScoreEl.textContent = `Hearts: 0 / 10`;
    catchTimerEl.textContent = `Time: 15s`;

    // Timer Interval
    catchGameInterval = setInterval(() => {
      catchTimeLeft--;
      catchTimerEl.textContent = `Time: ${catchTimeLeft}s`;

      if (catchTimeLeft <= 0) {
        endCatchGame(false);
      }
    }, 1000);

    // Heart Spawner Interval
    catchSpawnInterval = setInterval(spawnFallingHeartTarget, 700);
  }

  function spawnFallingHeartTarget() {
    if (!catchGameActive) return;

    const target = document.createElement('div');
    target.className = 'falling-heart-target';
    target.textContent = ['💖', '❤️', '💝', '✨'][Math.floor(Math.random() * 4)];

    const areaWidth = catchGameArea.clientWidth;
    const randomX = Math.random() * (areaWidth - 50) + 10;
    target.style.left = `${randomX}px`;

    target.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      catchScore++;
      catchScoreEl.textContent = `Hearts: ${catchScore} / 10`;
      target.remove();

      if (catchScore >= 10) {
        endCatchGame(true);
      }
    });

    catchGameArea.appendChild(target);

    setTimeout(() => {
      if (target.parentNode) target.remove();
    }, 2800);
  }

  function endCatchGame(won) {
    catchGameActive = false;
    clearInterval(catchGameInterval);
    clearInterval(catchSpawnInterval);

    // Clear falling hearts
    const targets = catchGameArea.querySelectorAll('.falling-heart-target');
    targets.forEach(t => t.remove());

    if (won) {
      catchGameArea.style.display = 'none';
      catchVictoryBox.classList.remove('hidden');
      for (let i = 0; i < 12; i++) {
        setTimeout(createFloatingHeart, i * 100);
      }
    } else {
      btnStartCatch.style.display = 'inline-block';
      btnStartCatch.querySelector('span').textContent = 'Try Again! 💖';
    }
  }

  // Game 3: Romantic & Cheeky Truth or Dare Game
  const btnTodTruth = document.getElementById('btn-tod-truth');
  const btnTodDare = document.getElementById('btn-tod-dare');
  const btnTodRandom = document.getElementById('btn-tod-random');
  const btnTodNext = document.getElementById('btn-tod-next');
  const btnTodHint = document.getElementById('btn-tod-hint');
  const todCardDisplay = document.getElementById('tod-card-display');
  const todTypeBadge = document.getElementById('tod-type-badge');
  const todPromptText = document.getElementById('tod-prompt-text');
  const todHintBox = document.getElementById('tod-hint-box');
  const todHintText = document.getElementById('tod-hint-text');

  const truths = [
    "अगर रात के अंधेरे में तुम्हें कुछ बहुत 'गरम' और 'मीठा' पीने का मन करे... तो तुम चाय मांगोगी या मेरे गले लगोगी? ☕😜",
    "ऐसी कौन सी चीज़ है जो दिखने में छोटी है, पर मेरे हाथ में आते ही 'बड़ी' हो जाती है? (Hint: हमारी खुशियाँ & चेहरे की मुस्कान!) 😂",
    "जब तुम पहली बार मेरे बहुत 'करीब' आई थीं... तो दिल की धड़कन तेज़ हुई थी या कुछ और 'खड़ा' हुआ था? (Hint: रोंगटे!) 😜",
    "तुम्हें मेरा कौन सा 'पार्ट' सबसे ज्यादा 'सख्त' लगता है? (Hint: मेरा इरादा तुम्हें खुश रखने का!) 💖",
    "रात को सोने से पहले तुम्हें किस चीज़ को 'दबाने' में सबसे ज्यादा मज़ा आता है? (Hint: मेरा हाथ या तकिया!) 😴❤️",
    "अगर मैं तुम्हें एक घंटे के लिए पूरी तरह 'नंगा' सच बोलने को कहूँ... तो तुम मेरे बारे में क्या बोलोगी? 🙈",
    "ऐसी कौन सी चीज़ है जिसे तुम जितना ज्यादा 'चाटोगी', वो उतनी ही ज्यादा 'मीठी' और 'पिघलती' जाएगी? (Hint: आइसक्रीम डेट!) 🍦😜",
    "जब मैं तुम्हें कसकर पकड़ता हूँ... तो तुम्हें ऊपर से 'गीला' महसूस होता है या अंदर से 'गरम'? (Hint: आँखों के आँसू या प्यार की गर्मी!) ❤️",
    "तुम्हें बिस्तर पर मेरे साथ 'ऊपर' रहना पसंद है या 'नीचे'? (Hint: चादर के अंदर या ऊपर!) 😂",
    "ऐसी कौन सी चीज़ है जो बहुत 'गहरी' है और जिसमें तुम रोज़ डूबना चाहती हो? (Hint: मेरी आँखें!) 🌙💖"
  ];

  const dares = [
    "Dare: 10 सेकंड तक मेरी आँखों में बिना पलक झपकाए देखो और फिर एक मीठा सा Kiss दो! 💋",
    "Dare: मुझे एक ऐसा रोमांटिक वॉइस मैसेज भेजो जिसमें तुम्हारी आवाज़ एकदम 'धीमी और गहरी' हो! 🎙️❤️",
    "Dare: अपनी सबसे ख़ास तस्वीर मुझे भेजो और कहो—'यह सिर्फ़ तुम्हारे लिए है'। 📸🙈",
    "Dare: अपने हाथ से मेरे सीने पर एक 'छोटा सा दिल' ड्रा करो! ✍️💖",
    "Dare: मुझे 15 सेकंड तक कसकर गले लगाओ और बिना बोले सिर्फ़ मेरी धड़कन सुनो! 🤗",
    "Dare: मेरे कान में झुककर एकदम धीरे से अपनी एक 'सीक्रेट ख़्वाहिश' बताओ! 🤫✨",
    "Dare: मेरे होंठों के बहुत करीब आओ, 5 सेकंड रुको, और फिर मुस्कुराकर पीछे हट जाओ! 😜💋",
    "Dare: अपना फोन उठाओ और मेरी तरफ देखकर कहो—'तुम सिर्फ़ मेरे हो'। 📱💖",
    "Dare: अगले 2 मिनट तक मेरे हाथ को अपने दोनों हाथों से 'दबाकर' रखो! 🤝❤️",
    "Dare: मुझे एक ऐसा फ्लर्टी मैसेज टाइप करके भेजो जो तुमने आज तक किसी को न भेजा हो! 💬🔥"
  ];

  let currentTodMode = 'truth';
  let currentTruthHint = '';

  function showTodPrompt(mode) {
    if (!todCardDisplay) return;
    todCardDisplay.classList.remove('hidden');
    if (todHintBox) todHintBox.classList.add('hidden');
    
    if (mode === 'truth') {
      currentTodMode = 'truth';
      todTypeBadge.textContent = 'Truth 😇 (सच्चाई)';
      todTypeBadge.className = 'tod-type-badge truth-style';
      const fullText = truths[Math.floor(Math.random() * truths.length)];
      
      // Extract Hint from parentheses if present
      const match = fullText.match(/(.*?)\s*\((Hint:.*?)\)/i);
      if (match) {
        todPromptText.textContent = match[1].trim();
        currentTruthHint = match[2].trim();
        if (btnTodHint) btnTodHint.classList.remove('hidden');
      } else {
        todPromptText.textContent = fullText;
        if (btnTodHint) btnTodHint.classList.add('hidden');
      }
    } else if (mode === 'dare') {
      currentTodMode = 'dare';
      todTypeBadge.textContent = 'Dare 😈 (चुनौती)';
      todTypeBadge.className = 'tod-type-badge dare-style';
      todPromptText.textContent = dares[Math.floor(Math.random() * dares.length)];
      if (btnTodHint) btnTodHint.classList.add('hidden');
    } else {
      const isTruth = Math.random() < 0.5;
      showTodPrompt(isTruth ? 'truth' : 'dare');
      return;
    }
  }

  if (btnTodHint) {
    btnTodHint.addEventListener('click', () => {
      if (todHintText && todHintBox) {
        todHintText.textContent = currentTruthHint;
        todHintBox.classList.remove('hidden');
      }
    });
  }

  if (btnTodTruth) btnTodTruth.addEventListener('click', () => showTodPrompt('truth'));
  if (btnTodDare) btnTodDare.addEventListener('click', () => showTodPrompt('dare'));
  if (btnTodRandom) btnTodRandom.addEventListener('click', () => showTodPrompt('random'));
  if (btnTodNext) btnTodNext.addEventListener('click', () => showTodPrompt(currentTodMode));

  /* ------------------------------------------------------------------------
     4.95 GAME 4: ROMANTIC DOUBLE MEANING TYPING QUESTION GAME ENGINE
     ------------------------------------------------------------------------ */
  const game4StepBadge = document.getElementById('game4-step-badge');
  const game4QTitle = document.getElementById('game4-q-title');
  const game4AnswerInput = document.getElementById('game4-answer-input');
  const game4HintBox = document.getElementById('game4-hint-box');
  const game4HintText = document.getElementById('game4-hint-text');
  const btnGame4Hint = document.getElementById('btn-game4-hint');
  const btnGame4Submit = document.getElementById('btn-game4-submit');
  const game4ReactionBox = document.getElementById('game4-reaction-box');
  const game4ReactionTitle = document.getElementById('game4-reaction-title');
  const game4ReactionText = document.getElementById('game4-reaction-text');
  const btnGame4Whatsapp = document.getElementById('btn-game4-whatsapp');

  const game4Questions = [
    { q: "जब हम अकेले होते हैं, तो तुम्हारा सबसे ज़्यादा ध्यान मेरे किस 'पार्ट' पर होता है? 🙈", hint: "मेरी मुस्कान या मेरी आँखें!" },
    { q: "ऐसी कौन सी चीज़ है जिसे तुम रात में बिस्तर पर 'पकड़कर' सोना चाहती हो? 😴❤️", hint: "मेरा हाथ या तकिया!" },
    { q: "अगर मैं तुम्हारे बहुत 'करीब' आ जाऊँ, तो तुम क्या बोलोगी—'और पास आओ' या 'थोड़ा रुको'? 😜", hint: "'और पास आओ, दूर मत जाना!'" },
    { q: "तुम्हें मेरा कौन सा अंदाज़ सबसे ज्यादा 'गरम' लगता है? ☕🔥", hint: "जब मैं तुम्हें प्यार से देखता हूँ!" },
    { q: "ऐसी कौन सी चीज़ है जो बहुत 'मुलायम' है और जिसे तुम बार-बार छूना चाहती हो? 🌸", hint: "मेरे गाल या मेरे हाथ!" },
    { q: "अगर तुम्हें मुझे किसी एक जगह पर 'किस' (Kiss) करने की खुली छूट मिले, तो तुम कहाँ करोगी? 💋", hint: "माथे पर या होंठों पर!" },
    { q: "ऐसी कौन सी इच्छा है जो तुम सिर्फ़ 'अंधेरे' में पूरी करना चाहती हो? 🌙✨", hint: "तारों के नीचे सुकून से गले लगना!" },
    { q: "जब मैं तुम्हें कसकर अपने गले लगाता हूँ, तो तुम्हारा मन 'क्या' करने को करता है? 🤗", hint: "समय को वहीं रोक देने का!" },
    { q: "तुम्हें मेरे होंठों का स्वाद कैसा लगता है—मीठा, नमकीन या बहुत ज्यादा 'एडिक्टिव'? 🍬", hint: "100% एडिक्टिव & मीठा!" },
    { q: "ऐसी कौन सी चीज़ है जो दिखने में छोटी है पर तुम्हारे दिल को बहुत 'बड़ा' सुकून देती है? 💖", hint: "हमारी प्यारी बातें & यादें!" },
    { q: "अगर हम किसी रोमांटिक आइलैंड पर अकेले फंस जाएं, तो तुम सबसे पहले 'क्या' करोगी? 🏝️", hint: "मेरा हाथ कसकर पकड़ोगी!" },
    { q: "तुम्हें रात में मेरे साथ 'बातों' में जागना पसंद है या 'हरकतों' में? 😜", hint: "देर रात तक प्यार भरी बातें!" },
    { q: "ऐसी कौन सी सीक्रेट बात है जो तुम मेरे कान में 'फुसफुसाकर' कहना चाहती हो? 🤫", hint: "'I love you so much!'" },
    { q: "जब मैं तुम्हारे बालों को पीछे करता हूँ, तो तुम्हें कैसी 'फीलिंग' आती है? 🌸", hint: "दिल में प्यारी सी घंटी बजती है!" },
    { q: "तुम्हें मुझसे 'गले' लगना ज्यादा पसंद है या मेरी गोद में 'सिर' रखकर सोना? 😴❤️", hint: "दोनों ही बेहद ख़ास हैं!" },
    { q: "अगर तुम्हें मुझे 1 मिनट के लिए 'कंट्रोल' करने की चाबी मिले, तो तुम मुझसे क्या करवाओगी? 🔑", hint: "मुझसे बहुत सारे Kiss लेगी!" },
    { q: "ऐसी कौन सी रोमांटिक जगह है जहाँ तुम मेरे साथ 'खो जाना' चाहती हो? 🌌", hint: "पहाड़ों या समंदर के किनारे!" },
    { q: "जब तुम मेरी आँखों में देखती हो, तो तुम्हें सबसे पहले 'क्या' दिखाई देता है? 🌙", hint: "आपके लिए मेरा बेपनाह प्यार!" },
    { q: "तुम्हें मेरी कौन सी 'अदा' सबसे ज्यादा नशीली (Addictive) लगती है? 🥂", hint: "मेरी धीमी सी मुस्कान!" },
    { q: "अगर इस पल मैं तुम्हारे सामने आ जाऊँ, तो तुम्हारा पहला 'रिएक्शन' क्या होगा? 💖✨", hint: "दौड़कर गले लग जाना!" }
  ];

  let game4CurrentIndex = 0;

  function renderGame4Question() {
    if (!game4QTitle) return;
    const item = game4Questions[game4CurrentIndex];
    game4StepBadge.textContent = `Question ${game4CurrentIndex + 1} of 20`;
    game4QTitle.textContent = item.q;
    game4AnswerInput.value = '';
    if (game4HintBox) game4HintBox.classList.add('hidden');
    if (game4ReactionBox) game4ReactionBox.classList.add('hidden');
  }

  if (btnGame4Hint) {
    btnGame4Hint.addEventListener('click', () => {
      if (game4HintText && game4HintBox) {
        game4HintText.textContent = game4Questions[game4CurrentIndex].hint;
        game4HintBox.classList.remove('hidden');
      }
    });
  }

  if (btnGame4Submit) {
    btnGame4Submit.addEventListener('click', () => {
      const qObj = game4Questions[game4CurrentIndex];
      const userAns = game4AnswerInput.value.trim() || "You are my favorite secret! ❤️";

      // Log activity to Gmail
      sendActivityToGmail('GAME4_TYPED_ANSWER', {
        questionIndex: game4CurrentIndex + 1,
        question: qObj.q,
        answer: userAns
      });

      // Show reaction
      game4ReactionTitle.textContent = "Answer Recorded! 💌";
      game4ReactionText.textContent = `Awww! You answered: "${userAns}" ❤️`;
      
      const whatsappText = `*Question ${game4CurrentIndex + 1}:* ${qObj.q}\n*Sweetheart's Answer:* ${userAns} ❤️`;
      btnGame4Whatsapp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;
      game4ReactionBox.classList.remove('hidden');

      // Heart burst
      for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 100);
      }

      // Next question auto increment after 3 seconds or on next click
      setTimeout(() => {
        game4CurrentIndex = (game4CurrentIndex + 1) % game4Questions.length;
        renderGame4Question();
      }, 3500);
    });
  }

  if (game4QTitle) renderGame4Question();

  /* ------------------------------------------------------------------------
     4.96 SECRET ACTIVITY LOCKER SYSTEM (PASSCODE: 6342)
     ------------------------------------------------------------------------ */
  const LOCKER_PIN = '6342';
  let lockerEnteredPin = '';

  const btnOpenLocker = document.getElementById('btn-open-locker');
  const lockerModal = document.getElementById('locker-modal');
  const lockerModalClose = document.getElementById('locker-modal-close');
  const lockerAuthView = document.getElementById('locker-auth-view');
  const lockerDashboardView = document.getElementById('locker-dashboard-view');
  const lockerPinError = document.getElementById('locker-pin-error');
  const lockerLogsList = document.getElementById('locker-logs-list');
  const btnCopyLogs = document.getElementById('btn-copy-logs');
  const btnClearLogs = document.getElementById('btn-clear-logs');

  if (btnOpenLocker) {
    btnOpenLocker.addEventListener('click', () => {
      lockerEnteredPin = '';
      updateLockerDots();
      lockerPinError.classList.add('hidden');
      lockerAuthView.classList.remove('hidden');
      lockerDashboardView.classList.add('hidden');
      lockerModal.classList.add('active');
      lockerModal.setAttribute('aria-hidden', 'false');
    });
  }

  function closeLockerModal() {
    if (lockerModal) {
      lockerModal.classList.remove('active');
      lockerModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (lockerModalClose) lockerModalClose.addEventListener('click', closeLockerModal);

  function updateLockerDots() {
    for (let i = 0; i < 4; i++) {
      const dot = document.getElementById(`locker-dot-${i}`);
      if (dot) {
        if (i < lockerEnteredPin.length) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      }
    }
  }

  function handleLockerKey(key) {
    if (key === 'clear') {
      lockerEnteredPin = '';
      updateLockerDots();
      return;
    }

    if (key === 'del') {
      lockerEnteredPin = lockerEnteredPin.slice(0, -1);
      updateLockerDots();
      return;
    }

    if (lockerEnteredPin.length < 4 && !isNaN(key)) {
      lockerEnteredPin += key;
      updateLockerDots();

      if (lockerEnteredPin.length === 4) {
        verifyLockerPin();
      }
    }
  }

  function verifyLockerPin() {
    if (lockerEnteredPin === LOCKER_PIN) {
      lockerAuthView.classList.add('hidden');
      lockerDashboardView.classList.remove('hidden');
      renderLockerLogs();
    } else {
      lockerPinError.classList.remove('hidden');
      setTimeout(() => {
        lockerEnteredPin = '';
        updateLockerDots();
        lockerPinError.classList.add('hidden');
      }, 900);
    }
  }

  function renderLockerLogs() {
    if (!lockerLogsList) return;
    try {
      const logs = JSON.parse(localStorage.getItem('sweetheart_activity_logs') || '[]');
      if (logs.length === 0) {
        lockerLogsList.innerHTML = `<p style="color: var(--text-muted); text-align: center;">No activity recorded yet! ❤️</p>`;
        return;
      }

      lockerLogsList.innerHTML = logs.map(item => `
        <div class="locker-log-item">
          <div class="locker-log-title">📌 ${item.event}</div>
          <div class="locker-log-time">🕒 ${item.time}</div>
          <div class="locker-log-details">${item.details}</div>
        </div>
      `).join('');
    } catch (e) {
      lockerLogsList.innerHTML = `<p style="color: var(--text-muted);">Error loading logs.</p>`;
    }
  }

  btnToggleAudio.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAudio();
  });

  // Auto-start audio on first user touch/click anywhere on page if not already playing
  function unlockAudioOnGesture() {
    if (!isPlaying) {
      tryPlayAudio();
    }
    window.removeEventListener('pointerdown', unlockAudioOnGesture);
  }
  window.addEventListener('pointerdown', unlockAudioOnGesture);

  if (lockerModal) {
    const keys = lockerModal.querySelectorAll('.keypad-btn');
    keys.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.getAttribute('data-key');
        handleLockerKey(key);
      });
    });
  }

  if (btnCopyLogs) {
    btnCopyLogs.addEventListener('click', () => {
      const logs = localStorage.getItem('sweetheart_activity_logs') || '[]';
      navigator.clipboard.writeText(logs).then(() => {
        btnCopyLogs.textContent = 'Copied! 📋';
        setTimeout(() => btnCopyLogs.textContent = 'Copy Logs 📋', 2000);
      });
    });
  }

  if (btnClearLogs) {
    btnClearLogs.addEventListener('click', () => {
      localStorage.removeItem('sweetheart_activity_logs');
      renderLockerLogs();
    });
  }
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

  async function tryPlayAudio() {
    // 1. Try HTML5 Audio element first (bg-music with MP4/MP3 sources)
    if (bgMusic) {
      try {
        bgMusic.volume = 1.0;
        bgMusic.muted = false;
        await bgMusic.play();
        setAudioState(true);
        console.log('Audio playing via bg-music element!');
        return;
      } catch (err) {
        console.log('bgMusic play blocked/error:', err);
      }
    }

    // 2. Try romanticVideo MP4 element
    if (romanticVideo) {
      try {
        romanticVideo.volume = 1.0;
        romanticVideo.muted = false;
        await romanticVideo.play();
        setAudioState(true);
        console.log('Audio playing via romanticVideo element!');
        return;
      } catch (err) {
        console.log('romanticVideo play blocked/error:', err);
      }
    }

    // 3. Try YouTube Player fallback
    if (ytReady && ytPlayer && typeof ytPlayer.playVideo === 'function') {
      try {
        ytPlayer.unMute();
        ytPlayer.setVolume(100);
        ytPlayer.playVideo();
        setAudioState(true);
        console.log('Audio playing via YouTube API.');
        return;
      } catch (e) {
        console.warn('YouTube play failed, falling back to Web Audio Synth...');
      }
    }

    // 4. Web Audio Synthesizer Fallback
    startSynthMusic();
    setAudioState(true);
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
