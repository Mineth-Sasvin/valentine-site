// =====================
// FINAL WORKING script.js (Elegant + Everything Works)
// =====================

window.scrollTo(0, 0);
const $ = (id) => document.getElementById(id);

// ====== Customize ======
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

  videos: [
    { type: "local", src: "assets/videos/v1.mp4" }
    // { type:"youtube", id:"VIDEO_ID" }
  ],

  openWhen: [
    { title: "Open when you miss me", message: "Close your eyes for 5 seconds… I’m sending you a hug. I’m always with you. ❤️" },
    { title: "Open when you feel stressed", message: "Breathe in… breathe out… You’ve got this. I believe in you more than you know. 💗" },
    { title: "Open when you want to smile", message: "You’re adorable. Yes, you. And I’m so lucky to love you. 😊" },
    { title: "Open when you need motivation", message: "You’re stronger than you think. Keep going — I’m cheering for you. ✨" },
  ],

  finalTypedText: "No matter what happens, no matter how busy life gets… I choose you. Today, tomorrow, and always. ❤️",
  finalSurpriseTitle: "My Promise ❤️",
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

const modal = $("modal");
const modalTitle = $("modalTitle");
const modalText = $("modalText");
const closeModal = $("closeModal");
const modalCard = modal ? modal.querySelector(".modal-card") : null;

// ---------- State ----------
let typedStarted = false;
let heartClicks = 0;
let musicStartedOnce = false;

// ---------- Modal helpers (FIXED: always works) ----------
function openModal(title, bodyHTML, letterMode = false){
  if (!modal) return;
  if (modalCard) modalCard.classList.toggle("letter-mode", !!letterMode);
  modalTitle.innerHTML = title;
  modalText.innerHTML = bodyHTML;
  modal.classList.remove("hidden");
}

function closeModalSafe(){
  if (!modal) return;
  modal.classList.add("hidden");
  if (modalCard) modalCard.classList.remove("letter-mode");
  modalTitle.innerHTML = "";
  modalText.innerHTML = "";
}

if (closeModal) closeModal.addEventListener("click", closeModalSafe);
if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModalSafe(); });

// ---------- Password gate ----------
const correctPassword = "1421";
const passwordGate = document.getElementById("passwordGate");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("errorMsg");
const countdownContainer = document.getElementById("countdownContainer");
const countdownNumber = document.getElementById("countdownNumber");

unlockBtn?.addEventListener("click", () => {
  if ((passwordInput?.value || "") === correctPassword){
    if (errorMsg) errorMsg.textContent = "";
    startCountdown();
  } else {
    if (errorMsg) errorMsg.textContent = "That’s not the right code ❤️";
  }
});

passwordInput?.addEventListener("keydown", (e) => { if (e.key === "Enter") unlockBtn?.click(); });

function startCountdown(){
  countdownContainer?.classList.remove("hidden");
  let count = 3;
  if (countdownNumber) countdownNumber.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (countdownNumber) countdownNumber.textContent = count;
    if (count === 0){
      clearInterval(interval);
      if (passwordGate){
        passwordGate.style.opacity = "0";
        passwordGate.style.transition = "opacity 0.9s ease";
        setTimeout(() => { passwordGate.style.display = "none"; }, 900);
      }
    }
  }, 1000);
}

// ---------- Set names ----------
$("hisName").textContent = CONFIG.hisName;
const toName = document.getElementById("toName");
if (toName) toName.textContent = CONFIG.hisName;

// ---------- Music fade-in (iPhone safe) ----------
async function startMusicIfPossible(){
  if (!music || musicStartedOnce) return;
  try{
    music.volume = 0;
    await music.play();
    musicStartedOnce = true;
    if (musicBtn) musicBtn.textContent = "Pause Music ❚❚";
    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      if (v >= 0.55){ v = 0.55; clearInterval(fade); }
      music.volume = v;
    }, 160);
  }catch(_e){
    // user can tap play
  }
}

musicBtn?.addEventListener("click", async () => {
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
  }catch(_e){
    openModal("Music tip ♪", `<p class="modal-p">Tap again — iPhone needs a user tap to play audio.</p>`);
  }
});

// ---------- Open Surprise ----------
openBtn?.addEventListener("click", () => {
  content?.classList.remove("hidden");
  content?.scrollIntoView({ behavior: "smooth" });
  startTypewriter();
  startMusicIfPossible();
  setupRevealObserver(); // IMPORTANT: reveal after content becomes visible
});

// ---------- Cinematic blur on scroll ----------
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) document.body.classList.add("scrolled");
  else document.body.classList.remove("scrolled");
});

// ---------- Scroll reveal (FIXED: starts AFTER content is shown) ----------
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

// ---------- Build Timeline ----------
const timeline = $("timeline");
if (timeline){
  timeline.innerHTML = "";
  CONFIG.timeline.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${item.title}</h3><p class="muted">${item.text}</p>`;
    timeline.appendChild(div);
  });
}

// ---------- Build Polaroid Gallery (PREMIUM + WORKING) ----------
const gallery = $("gallery");
if (gallery){
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

    card.addEventListener("click", () => {
      openModal(
        `<div class="modal-h">${p.caption}</div>`,
        `<p class="modal-p">${p.note}</p>`
      );
    });

    gallery.appendChild(card);
  });
}

// ---------- Build Videos (Cinematic wrapper, correct sizing) ----------
const videos = $("videos");
if (videos){
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

      el.addEventListener("error", () => {
        wrapper.remove();
        const msg = document.createElement("div");
        msg.className = "card";
        msg.innerHTML = `<h3>Video not found</h3><p class="muted">Add your video to <b>${v.src}</b>.</p>`;
        videos.appendChild(msg);
      });
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
}

// ---------- Build Open When Letters (FIXED: clickable + styled) ----------
const letters = $("letters");
if (letters){
  letters.innerHTML = "";
  CONFIG.openWhen.forEach(l => {
    const div = document.createElement("div");
    div.className = "letter";
    div.innerHTML = `
      <strong>${l.title}</strong>
      <span class="letter-sub">Tap to open 💌</span>
    `;
    div.addEventListener("click", () => {
      openModal(
        `<div class="modal-h">${l.title}</div>`,
        `<p class="modal-p">${l.message}</p>`,
        true
      );
    });
    letters.appendChild(div);
  });
}

// ---------- Love Letter (FIXED + elegant) ----------
document.getElementById("loveLetterCard")?.addEventListener("click", () => {
  openModal(
    `<div class="letter-title">A Letter For You 💌</div>`,
    `<div class="letter-body">${LOVE_LETTER.replace(/\n/g, "<br>")}</div>
     <div class="letter-sign">— Your Valentine 💗</div>`,
    true
  );
});

// ---------- Hold Heart (3 seconds) ----------
const holdHeart = $("holdHeart");
let holdTimer = null;

function startHold(){
  holdTimer = setTimeout(() => {
    openModal(
      `<div class="modal-h">You found it ❤️</div>`,
      `<p class="modal-p">If you stayed this long… it means you truly felt this. And that means everything to me.</p>`,
      true
    );
  }, 3000);
}
function endHold(){ if (holdTimer) clearTimeout(holdTimer); }

holdHeart?.addEventListener("mousedown", startHold);
holdHeart?.addEventListener("mouseup", endHold);
holdHeart?.addEventListener("mouseleave", endHold);
holdHeart?.addEventListener("touchstart", startHold, { passive: true });
holdHeart?.addEventListener("touchend", endHold);

// ---------- Final surprise ----------
$("finalSurprise")?.addEventListener("click", () => {
  openModal(`<div class="modal-h">${CONFIG.finalSurpriseTitle}</div>`, `<p class="modal-p">${CONFIG.finalSurpriseMessage}</p>`, true);
});

// ---------- Typewriter ----------
function startTypewriter(){
  if (typedStarted) return;
  typedStarted = true;
  const el = $("typewriter");
  if (!el) return;

  el.textContent = "";
  const text = CONFIG.finalTypedText;
  let i = 0;

  const timer = setInterval(() => {
    el.textContent += text[i] || "";
    i++;
    if (i >= text.length) clearInterval(timer);
  }, 28);
}

// ---------- Floating hearts (click 7 hearts = secret) ----------
const heartsBox = document.querySelector(".hearts");
function spawnHeart(){
  if (!heartsBox) return;
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = Math.random() > 0.5 ? "❤" : "💗";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = (14 + Math.random() * 22) + "px";
  h.style.animationDuration = (5 + Math.random() * 4) + "s";

  h.addEventListener("click", () => {
    heartClicks++;
    if (heartClicks === 7){
      openModal(`<div class="modal-h">Secret unlocked ✨</div>`, `<p class="modal-p">If you’re reading this… I love you more than words can explain. ❤️</p>`, true);
    }
  });

  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), 9000);
}

const isMobile = window.matchMedia("(max-width: 520px)").matches;
setInterval(spawnHeart, isMobile ? 520 : 360);
