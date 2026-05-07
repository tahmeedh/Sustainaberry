/* ============================================================
   SUSTAINABERRY — Farm Game Logic
   ============================================================ */

let score = 0;
const scoreEl = document.getElementById('scoreValue');

const berryData = {
  raspberry: {
    icon: '🍓',
    name: 'Sustainaberry Raspberry',
    desc: 'Our signature crimson raspberries grown in rich volcanic soil with zero pesticides. Sweet, tart, and bursting with natural flavour.',
    tags: ['🌿 Organic Certified', '💧 Drip Irrigated', '☀️ Solar Grown', '📦 Zero Waste Pack']
  },
  blueberry: {
    icon: '🫐',
    name: 'Sustainaberry Blueberry',
    desc: 'High-altitude blueberries packed with antioxidants. Our best-seller — the perfect balance of sweet and tangy with every single bite.',
    tags: ['🏔️ High Altitude', '🍃 Clean Air Zone', '💊 Antioxidant Rich', '⭐ Best Seller']
  },
  strawberry: {
    icon: '🍓',
    name: 'Sustainaberry Strawberry',
    desc: 'Classic hand-picked strawberries with a fragrance that takes you back to summer fields. No shortcuts, just pure berry perfection.',
    tags: ['✋ Hand Picked', '🌸 Pollinator Friendly', '🍯 Naturally Sweet', '🏡 Family Farm']
  },
  blackberry: {
    icon: '🍇',
    name: 'Sustainaberry Blackberry',
    desc: 'Bold, deep, and intensely juicy. Our blackberries thrive in shaded trellises, developing a complex flavour impossible to resist.',
    tags: ['🌑 Shade Grown', '💜 Rich Flavour', '🧬 Superfood', '🌧️ Rain Fed']
  },
  cranberry: {
    icon: '🍒',
    name: 'Sustainaberry Cranberry',
    desc: 'Tart and vibrant, harvested from naturally flooded bogs. High in vitamin C and packed with immune-boosting goodness.',
    tags: ['💧 Wetland Grown', '🛡️ Immune Boost', '🍊 High Vitamin C', '❄️ Winter Harvest']
  }
};

// ── Flying items init ──────────────────────────────────────
const FLYING_ITEMS = ['🍓','🫐','🍒','🍇','🍃','🌿','🌸','✨','🍑','⭐','🌺','🫐'];

function initFlyingItems() {
  const layer = document.getElementById('flyingLayer');
  FLYING_ITEMS.forEach((emoji, i) => {
    const el = document.createElement('div');
    el.className = 'fly-item';
    el.textContent = emoji;
    const top = 5 + Math.random() * 62;
    const dur = 6 + Math.random() * 14;
    const delay = -(Math.random() * dur);
    const size = 16 + Math.random() * 20;
    el.style.top = `${top}%`;
    el.style.fontSize = `${size}px`;
    el.style.animationDuration = `${dur}s`;
    el.style.animationDelay = `${delay}s`;
    layer.appendChild(el);
  });
}

// Spawn a fresh random berry periodically
function spawnFlyingBerry() {
  const layer = document.getElementById('flyingLayer');
  const emoji = FLYING_ITEMS[Math.floor(Math.random() * FLYING_ITEMS.length)];
  const el = document.createElement('div');
  el.className = 'fly-item';
  el.textContent = emoji;
  const dur = 5 + Math.random() * 10;
  el.style.top = `${5 + Math.random() * 60}%`;
  el.style.fontSize = `${18 + Math.random() * 14}px`;
  el.style.animationDuration = `${dur}s`;
  el.style.animationDelay = '0s';
  layer.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}

// ── Harvest single plant ───────────────────────────────────
function harvestPlant(plant) {
  if (plant.classList.contains('cooldown')) return;

  const berries = plant.querySelectorAll('.crop-berries span');
  const rect    = plant.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top;

  plant.classList.add('shake');
  setTimeout(() => plant.classList.remove('shake'), 400);

  berries.forEach((b, i) => {
    setTimeout(() => spawnHarvestPop(b.textContent, cx + (i - 1) * 28, cy), i * 90);
  });

  addScore(berries.length, cx, cy - 20);

  plant.classList.add('cooldown');
  setTimeout(() => plant.classList.remove('cooldown'), 3200);
}

// ── Harvest all plants ─────────────────────────────────────
function harvestAll() {
  const plants = [...document.querySelectorAll('.crop-plant:not(.cooldown)')];
  plants.forEach((p, i) => setTimeout(() => harvestPlant(p), i * 260));
  if (plants.length > 0) {
    setTimeout(launchCelebration, plants.length * 260 + 600);
  }
}

// ── Flying berry on harvest ────────────────────────────────
function spawnHarvestPop(emoji, x, y) {
  const el = document.createElement('div');
  el.className = 'harvest-pop';
  el.textContent = emoji;
  el.style.cssText = `left:${x}px;top:${y}px;font-size:28px;`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

// ── Score update ───────────────────────────────────────────
function addScore(n, x, y) {
  score += n;
  scoreEl.textContent = score;
  scoreEl.classList.add('pop');
  setTimeout(() => scoreEl.classList.remove('pop'), 350);

  const pop = document.createElement('div');
  pop.className = 'score-pop';
  pop.textContent = `+${n}`;
  pop.style.cssText = `left:${x}px;top:${y}px;`;
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 1100);

  checkMilestone(score);
}

// ── Milestones ─────────────────────────────────────────────
const MILESTONES = {
  10:  '🌱 Berry Rookie!',
  25:  '🌿 Green Thumb!',
  50:  '🚜 Master Farmer!',
  100: '👑 Sustainability Champion!'
};

function checkMilestone(s) {
  const msg = MILESTONES[s];
  if (msg) showBanner(msg);
}

function showBanner(text) {
  const el = document.createElement('div');
  el.className = 'level-banner';
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2700);
}

// ── Celebration confetti ───────────────────────────────────
function launchCelebration() {
  const emojis = ['🎉','🎊','✨','⭐','🌟','🍓','🫐','🍒'];
  for (let i = 0; i < 22; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const dur = 1.5 + Math.random() * 2;
      el.style.cssText = `
        position:fixed;left:${Math.random() * 100}vw;top:-50px;
        font-size:${20 + Math.random() * 22}px;z-index:99999;
        pointer-events:none;animation:confettiFall ${dur}s ease-in forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 100);
    }, i * 80);
  }

  const style = document.createElement('style');
  style.textContent = `@keyframes confettiFall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`;
  document.head.appendChild(style);
  setTimeout(() => style.remove(), 6000);
}

// ── Berry modal ────────────────────────────────────────────
function openModal(type) {
  const d = berryData[type];
  document.getElementById('modalIcon').textContent  = d.icon;
  document.getElementById('modalTitle').textContent = d.name;
  document.getElementById('modalDesc').textContent  = d.desc;
  document.getElementById('modalTags').innerHTML    =
    d.tags.map(t => `<div class="modal-tag">${t}</div>`).join('');
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ── Keyboard ───────────────────────────────────────────────
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Navbar scroll tint ─────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ── Sparkle click effect on farm hero ─────────────────────
document.getElementById('farm-hero').addEventListener('click', e => {
  if (e.target.closest('.crop-plant') || e.target.closest('.hero-btns')) return;
  ['✨','⭐','🌟'].forEach((ch, i) => {
    const s = document.createElement('div');
    s.textContent = ch;
    s.style.cssText = `
      position:fixed;left:${e.clientX + (i-1)*18}px;top:${e.clientY}px;
      font-size:20px;pointer-events:none;z-index:9999;
      animation:hPop .9s ease-out forwards;
    `;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  });
});

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFlyingItems();
  setInterval(spawnFlyingBerry, 3800);
});
