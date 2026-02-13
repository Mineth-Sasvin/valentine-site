// =====================
// FINAL script.js (NO TOP POPUPS)
// Everything opens in its own place (inline + anchored popover)
// =====================

window.addEventListener("load", () => window.scrollTo(0, 0));
const $ = (id) => document.getElementById(id);

// ====== EDIT THESE ======
const CONFIG = {
  hisName: "My Love",

  timeline: [
    { title: "The day we met", text: "I still remember the feeling… like the universe said ‘pay attention’." },
    { title: "Our first date", text: "I smiled the whole day. You made everything feel easy." },
    { title: "My favorite memory", text: "One of many… but this one lives in my heart forever." },
    { title: "The moment I knew", text: "I realized I didn’t just like you… I chose you." },
  ],

  photos: [
    { src: "assets/photos/p1.jpeg", caption: "Our first spark", note: "This moment started something beautiful in my heart." },
    { src: "assets/photos/p2.jpeg", caption: "My safe place", note: "When I’m with you, everything feels calm and right." },
    { src: "assets/photos/p3.jpeg", caption: "That smile", note: "Your smile is my favorite kind of magic." },
    { src: "assets/photos/p4.jpeg", caption: "Us", note: "If I had to choose again… I’d still choose you." },
    { src: "assets/photos/p5.jpeg", caption: "Golden memory", note: "This day lives in my mind like a warm sunset." },
    { src: "assets/photos/p6.jpeg", caption: "Little world", note: "I love our little world… it’s my happiest place." },
    { src: "assets/photos/p7.jpeg", caption: "My favorite chapter", note: "Every day with you feels like a beautiful chapter." },
    { src: "assets/photos/p8.jpeg", caption: "Forever mood", note: "I’m grateful for you — today, tomorrow, always." }
  ],

  videos: [{ type: "local", src: "assets/videos/v1.mp4" }],

  openWhen: [
    { title: "Open when you miss me", message: "Close your eyes for 5 seconds… I’m sending you a hug. I’m always with you. ❤️" },
    { title: "Open when you feel stressed", message: "Breathe in… breathe out… You’ve got this. I believe in you more than you know. 💗" },
    { title: "Open when you want to smile", message: "You’re adorable. Yes, you. And I’m so lucky to love you. 😊" },
    { title: "Open when you need motivation", message: "You’re stronger than you think. Keep going — I’m cheering for you. ✨" },
  ],

  finalTypedText: "No matter what happens, no matter how busy life gets… I choose you. Today, tomorrow, and always. ❤️",
  finalSurpriseTitle: "One Last Promise ❤️",
  finalSurpriseMessage: "I promise to love you gently, support you loudly, and choose you even on the hard days. Happy Valentine’s Day, my love. 💗"
};

const LOVE_LETTER = `You and I have been bickering over for almost a year now. You often say that you love me, to which I'll respond, I love you more.

But after today, I think I can finally explain to you what I mean when I say it. So my love, when I say I love you more, I don't mean I love you more than you love me. I mean I love you more than the bad days ahead of us.

I love you more than any fight we'll ever have. I love you more than any amount of distance keeping us apart. And I love you more than any obstacle that would try to come between us.

I love you more than anything. So from now on, know that when I say I love you, I don't just say it out of habit. I say it as a reminder to you of this day, those promises, and you're the best goddamn thing that's ever happened to me.

My darling mage pana, I adore you.`;

// ---------- Elements ----------
const content = $("content");
const openBtn = $("openSurprise");
const musicBtn = $("toggleMusic");
const music = $("bgMusic");

// ---------- Password gate ----------
const correctPassword = "1421";
const passwordGate = $("passwordGate");
const passwordInput = $("passwordInput");
const unlockBtn = $("unlockBtn");
const errorMsg = $("errorMsg");
const countdownContainer = $("countdownContainer");
const countdownNumber = $("countdownNumber");

unlockBtn?.addEventListener("click", () => {
  if ((passwordInput?.value || "") === correctPassword) {
    errorMsg.textContent = "";
    startCountdown();
  } else {
    errorMsg.textContent = "That’s not the right code ❤️";
  }
});

passwordInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockBtn?.click();
});

function startCountdown(){
  countdownContainer.classList.remove("hidden");
  let count = 3;
  countdownNumber.textContent = count;

  const interval = setInterval(() => {
    count--;
    countdownNumber.textContent = count;
    if (count === 0){
      clearInterval(interval);
      passwordGate.style.opacity = "0";
      passwordGate.style.transition = "opacity .9s ease";
      setTimeout(() => passwordGate.style.display = "none", 900);
    }
  }, 1000);
}

// ---------- Names ----------
$("hisName").textContent = CONFIG.hisName;
$("toName").textContent = CONFIG.hisName;

// ---------- Music fade-in (iPhone safe) ----------
let musicStartedOnce = false;
async function startMusicIfPossible(){
  if (!music || musicStartedOnce) return;
  try{
    music.volume = 0;
    await music.play();
    musicStartedOnce = true;
    musicBtn.textContent = "Pause Music ❚❚";

    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      if (v >= 0.55){ v = 0.55; clearInterval(fade); }
      music.volume = v;
    }, 160);
  }catch(_e){}
}

musicBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!music) return;
  try{
    if (music.paused){
      music.volume = 0.55;
      await music.play();
      musicStartedOnce = true;
      musicBtn.textContent = "Pause Music ❚❚";
    } else {
      music.pause();
      musicBtn.textContent = "Play Music ♪";
    }
  }catch(_e){}
});

// ---------- Open Surprise ----------
openBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  content.classList.remove("hidden");
  startTypewriter();
  startMusicIfPossible();
  setupRevealObserver();
  // Don’t scroll to top; just gently move to next section
  document.querySelector(".section")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

// ---------- Cinematic blur on scroll ----------
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) document.body.classList.add("scrolled");
  else document.body.classList.remove("scrolled");
});

// ---------- Scroll reveal (starts after content shown) ----------
let observerStarted = false;
function setupRevealObserver(){
  if (observerStarted) return;
  observerStarted = true;

  const revealElements = document.querySelectorAll(".section, .final");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

// =====================
// POPOVER (anchored to clicked item)
// =====================
let pop = null;

function ensurePopover(){
  if (pop) return pop;
  pop = document.createElement("div");
  pop.className = "popover hidden";
  pop.innerHTML = `
    <button class="popover-x" type="button" aria-label="Close">✕</button>
    <div class="popover-title"></div>
    <div class="popover-body"></div>
  `;
  document.body.appendChild(pop);

  pop.querySelector(".popover-x").addEventListener("click", () => hidePopover());
  document.addEventListener("click", (e) => {
    if (!pop.classList.contains("hidden") && !pop.contains(e.target)) hidePopover();
  });

  return pop;
}

function showPopover(anchorEl, title, text){
  const p = ensurePopover();
  p.querySelector(".popover-title").textContent = title;
  p.querySelector(".popover-body").textContent = text;

  p.classList.remove("hidden");

  // Position near anchor (no scrolling!)
  const r = anchorEl.getBoundingClientRect();
  const pad = 12;

  // default below
  let top = r.bottom + pad;
  let left = r.left;

  // keep inside screen
  const width = Math.min(340, window.innerWidth - 24);
  p.style.width = width + "px";

  // if goes out right, shift left
  if (left + width > window.innerWidth - 12) left = window.innerWidth - width - 12;
  if (left < 12) left = 12;

  // if goes out bottom, show above
  const estimatedHeight = 190;
  if (top + estimatedHeight > window.innerHeight - 12) {
    top = r.top - pad - estimatedHeight;
  }
  if (top < 12) top = 12;

  p.style.left = left + "px";
  p.style.top = top + "px";
}

function hidePopover(){
  if (!pop) return;
  pop.classList.add("hidden");
}

// Reposition on resize/scroll if open
window.addEventListener("resize", () => { if (pop && !pop.classList.contains("hidden")) hidePopover(); });
window.addEventListener("scroll", () => { if (pop && !pop.classList.contains("hidden")) hidePopover(); }, { passive:true });

// =====================
// Build Sections
// =====================

// Timeline
const timeline = $("timeline");
timeline.innerHTML = "";
CONFIG.timeline.forEach(item => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h3>${item.title}</h3><p class="muted">${item.text}</p>`;
  timeline.appendChild(div);
});

// Gallery (opens POPOVER near photo)
const gallery = $("gallery");
gallery.innerHTML = "";

const angles = ["-3.5deg","2.2deg","-1.8deg","3.2deg","-2.6deg","1.6deg","-3deg","2.8deg"];
const lifts  = ["0px","6px","2px","8px","1px","7px","3px","5px"];

CONFIG.photos.forEach((p, idx) => {
  const card = document.createElement("div");
  card.className = "polaroid";
  card.style.setProperty("--r", angles[idx]);
  card.style.setProperty("--y", lifts[idx]);

  card.innerHTML = `
    <div class="polaroid-sticker">❤</div>
    <img src="${p.src}" alt="memory photo ${idx+1}">
    <div class="label">${p.caption}</div>
  `;

  card.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    showPopover(card, p.caption, p.note);
  });

  gallery.appendChild(card);
});

// Videos
const videos = $("videos");
videos.innerHTML = "";
CONFIG.videos.forEach(v => {
  const wrapper = document.createElement("div");
  wrapper.className = "video-wrapper";

  if (v.type === "local"){
    const el = document.createElement("video");
    el.controls = true;
    el.playsInline = true;
    el.src = v.src;
    wrapper.appendChild(el);
  }

  if (v.type === "youtube"){
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${v.id}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    wrapper.appendChild(iframe);
  }

  videos.appendChild(wrapper);
});

// Open When letters (INLINE expand inside card)
const letters = $("letters");
letters.innerHTML = "";

function closeAllLetters(except = null){
  document.querySelectorAll(".letter.open").forEach(el => {
    if (el !== except) el.classList.remove("open");
  });
}

CONFIG.openWhen.forEach((l) => {
  const wrap = document.createElement("div");
  wrap.className = "letter";
  wrap.innerHTML = `
    <button type="button" class="letter-btn">
      <div class="letter-header">
        <strong>${l.title}</strong>
        <span class="letter-icon">💌</span>
      </div>
      <div class="letter-content"><p>${l.message}</p></div>
    </button>
  `;

  wrap.querySelector(".letter-btn").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const willOpen = !wrap.classList.contains("open");
    closeAllLetters(willOpen ? wrap : null);
    wrap.classList.toggle("open");

    // NO scroll-to-top. If needed, only a tiny adjust (stay near)
    if (wrap.classList.contains("open")) {
      wrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  letters.appendChild(wrap);
});

// Love letter (opens INLINE - not modal)
const loveLetterCard = $("loveLetterCard");
loveLetterCard.innerHTML = loveLetterCard.innerHTML + `
  <div class="inline-letter hidden" id="inlineLoveLetter">
    <div class="inline-letter-title">A Letter For You 💌</div>
    <div class="inline-letter-body">${LOVE_LETTER.replace(/\n/g, "<br>")}</div>
    <div class="inline-letter-sign">— Your Valentine 💗</div>
  </div>
`;

const inlineLove = $("inlineLoveLetter");
loveLetterCard.addEventListener("click", (e) => {
  e.preventDefault();
  inlineLove.classList.toggle("hidden");
  loveLetterCard.classList.toggle("open");
  inlineLove.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Hold heart secret (beat while holding + burst + pop sound)
const holdHeart = $("holdHeart");
const popSfx = $("popSfx");

let holdTimer = null;
let unlockedOnce = false;

function playPop(){
  if (!popSfx) return;
  try{
    popSfx.currentTime = 0;
    popSfx.volume = 0.7;
    popSfx.play();
  }catch(_e){}
}

function burstAt(el){
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;

  const pieces = 14;
  for (let i=0; i<pieces; i++){
    const p = document.createElement("div");
    p.className = "burst";

    // random direction
    const angle = Math.random() * Math.PI * 2;
    const dist  = 40 + Math.random() * 55;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    p.style.left = cx + "px";
    p.style.top  = cy + "px";
    p.style.setProperty("--dx", dx + "px");
    p.style.setProperty("--dy", dy + "px");

    // random size + soft pink/white glow
    const size = 6 + Math.random() * 10;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.background = Math.random() > 0.35 ? "rgba(255,77,125,0.95)" : "rgba(255,255,255,0.9)";

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

function startHold(){
  if (!holdHeart) return;
  holdHeart.classList.add("is-holding");

  // easier on phones: 2 seconds
  holdTimer = setTimeout(() => {
    if (unlockedOnce) return;
    unlockedOnce = true;

    holdHeart.classList.remove("is-holding");
    playPop();
    burstAt(holdHeart);

    // show message near heart (uses your popover system)
    showPopover(
      holdHeart,
      "You found it ❤️",
      "If you stayed this long… it means you truly felt this. And that means everything to me."
    );
  }, 2000);
}

function endHold(){
  if (!holdHeart) return;
  holdHeart.classList.remove("is-holding");
  if (holdTimer) clearTimeout(holdTimer);
}

if (holdHeart){
  holdHeart.addEventListener("mousedown", startHold);
  holdHeart.addEventListener("mouseup", endHold);
  holdHeart.addEventListener("mouseleave", endHold);

  holdHeart.addEventListener("touchstart", startHold, { passive:true });
  holdHeart.addEventListener("touchend", endHold);
  holdHeart.addEventListener("touchcancel", endHold);
}


// Final surprise (INLINE - not modal)
const finalBtn = $("finalSurprise");
const finalSection = document.querySelector(".final");

const finalBox = document.createElement("div");
finalBox.className = "final-box hidden";
finalBox.innerHTML = `
  <div class="final-box-title">${CONFIG.finalSurpriseTitle}</div>
  <div class="final-box-body">${CONFIG.finalSurpriseMessage}</div>
`;
finalSection.appendChild(finalBox);

finalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  finalBox.classList.toggle("hidden");
  finalBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Typewriter
let typedStarted = false;
function startTypewriter(){
  if (typedStarted) return;
  typedStarted = true;

  const el = $("typewriter");
  el.textContent = "";
  const text = CONFIG.finalTypedText;
  let i = 0;

  const timer = setInterval(() => {
    el.textContent += text[i] || "";
    i++;
    if (i >= text.length) clearInterval(timer);
  }, 28);
}

// Floating hearts (7-click secret popover near clicked heart)
const heartsBox = document.querySelector(".hearts");
let heartClicks = 0;

function spawnHeart(){
  if (!heartsBox) return;
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = Math.random() > 0.5 ? "❤" : "💗";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = (14 + Math.random() * 22) + "px";
  h.style.animationDuration = (5 + Math.random() * 4) + "s";

  h.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    heartClicks++;
    if (heartClicks === 7){
      showPopover(h, "Secret unlocked ✨", "If you’re reading this… I love you more than words can explain. ❤️");
    }
  });

  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), 9000);
}

const isMobile = window.matchMedia("(max-width: 520px)").matches;
setInterval(spawnHeart, isMobile ? 520 : 360);
