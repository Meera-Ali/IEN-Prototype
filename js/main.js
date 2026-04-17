// ─── TOAST ───
const TOAST_ICONS = {
  success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>`,
  error:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  info:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  warning: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
};

function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${TOAST_ICONS[type]}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ─── THEME (applied before paint) ───
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

// ─── LUCIDE ICONS ───
(function () {
  const s = document.createElement('script');
  s.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
  s.onload = function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initIcons);
    } else {
      initIcons();
    }
  };
  document.head.appendChild(s);
})();

function icon(name, size) {
  return `<i data-lucide="${name}" width="${size}" height="${size}" stroke-width="1.75"></i>`;
}

function initIcons() {
  // Sidebar navigation icons
  const navMap = {
    '🏠': 'home', '➕': 'plus', '💬': 'message-square',
    '🕐': 'clock', '🎟️': 'ticket', '👤': 'user',
    '🛡️': 'shield', '🚪': 'log-out', '🔍': 'search',
  };
  document.querySelectorAll('.icon').forEach(el => {
    const name = navMap[el.textContent.trim()];
    if (name) el.innerHTML = icon(name, 17);
  });

  // Topbar notification bell with dropdown
  document.querySelectorAll('.topbar-notif').forEach(el => {
    const dot = el.querySelector('.notif-dot');
    el.innerHTML = icon('bell', 18);
    if (dot) el.appendChild(dot);

    const dropdown = document.createElement('div');
    dropdown.className = 'notif-dropdown';
    dropdown.innerHTML = `
      <div class="notif-dropdown-header">Notifications</div>
      <div class="notif-item unread">
        <div class="notif-dot-indicator"></div>
        <div class="notif-item-text">
          <p>A driver accepted your ride request.</p>
          <span>2 minutes ago</span>
        </div>
      </div>
      <div class="notif-item unread">
        <div class="notif-dot-indicator"></div>
        <div class="notif-item-text">
          <p>Your ride to University City is confirmed.</p>
          <span>15 minutes ago</span>
        </div>
      </div>
      <div class="notif-item">
        <div class="notif-dot-indicator" style="background:var(--border);"></div>
        <div class="notif-item-text">
          <p>You received a 5-star rating from your last ride.</p>
          <span>Yesterday</span>
        </div>
      </div>
    `;
    el.appendChild(dropdown);

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      if (isOpen) dot && (dot.style.display = 'none');
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
  });

  // Map placeholder
  document.querySelectorAll('.map-icon').forEach(el => {
    el.innerHTML = `<i data-lucide="map" width="38" height="38" stroke-width="1.25" style="opacity:0.35;"></i>`;
  });

  // Auth page logo
  const authIconMap = { '🎓': 'graduation-cap', '🚀': 'zap', '🔑': 'key' };
  document.querySelectorAll('.auth-logo').forEach(el => {
    const name = authIconMap[el.textContent.trim()];
    if (name) el.innerHTML = `<i data-lucide="${name}" width="44" height="44" stroke-width="1.5" style="color:var(--accent);"></i>`;
  });

  // Problem section (index.html)
  const problemMap = { '🚕': 'car', '🚌': 'bus', '😰': 'alert-circle' };
  document.querySelectorAll('.problem-icon').forEach(el => {
    const name = problemMap[el.textContent.trim()];
    if (name) el.innerHTML = `<i data-lucide="${name}" width="30" height="30" stroke-width="1.5"></i>`;
  });

  // Safety section
  const safetyMap = {
    '🎓': 'graduation-cap', '👥': 'users', '🪪': 'credit-card',
    '🔒': 'lock', '⭐': 'star', '📍': 'map-pin',
  };
  document.querySelectorAll('.safety-icon').forEach(el => {
    const name = safetyMap[el.textContent.trim()];
    if (name) el.innerHTML = `<i data-lucide="${name}" width="26" height="26" stroke-width="1.5"></i>`;
  });

  // Pricing car icons
  const pricingMap = { '⛽': 'fuel', '⚡': 'zap', '🎟️': 'ticket' };
  document.querySelectorAll('.car-icon').forEach(el => {
    const name = pricingMap[el.textContent.trim()];
    if (name) el.innerHTML = `<i data-lucide="${name}" width="30" height="30" stroke-width="1.5"></i>`;
  });

  // Eco badge leaf
  document.querySelectorAll('.eco-badge').forEach(el => {
    el.innerHTML = el.innerHTML.replace('🌱', `<i data-lucide="leaf" width="11" height="11" stroke-width="2"></i>`);
  });

  // Signup role icons
  const roleMap = { '🎒': 'backpack', '🚗': 'car' };
  document.querySelectorAll('.role-opt-icon').forEach(el => {
    const name = roleMap[el.textContent.trim()];
    if (name) el.innerHTML = `<i data-lucide="${name}" width="30" height="30" stroke-width="1.5"></i>`;
  });

  // Signup gender icons — standard gender symbols
  document.querySelectorAll('.gender-opt > span').forEach(el => {
    const t = el.textContent.trim();
    if (t === '👨‍🎓') el.innerHTML = `<span class="gender-symbol male">&#9794;</span>`;
    else if (t === '👩‍🎓') el.innerHTML = `<span class="gender-symbol female">&#9792;</span>`;
  });

  lucide.createIcons();
}

// ─── ACTIVE NAV + THEME TOGGLE + NAME INJECTION ───
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });

  // Inject saved name
  const name = localStorage.getItem('meshwar_name');
  if (name) {
    document.querySelectorAll('.sidebar-user-name').forEach(el => {
      el.textContent = name;
    });
    const greeting = document.getElementById('dash-greeting');
    if (greeting) {
      const hour = new Date().getHours();
      const tod = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
      greeting.textContent = `Good ${tod}, ${name}`;
    }
    const dayEl = document.getElementById('dash-day');
    if (dayEl) {
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const today = days[new Date().getDay()];
      dayEl.textContent = dayEl.textContent.replace('Monday', today);
    }
    document.querySelectorAll('.sidebar-bottom .avatar').forEach(el => {
      el.textContent = name.charAt(0).toUpperCase();
    });
    const fName = document.getElementById('f-name');
    if (fName) fName.value = name;
    const profileName = document.getElementById('profile-name');
    if (profileName) profileName.textContent = name;
    document.querySelectorAll('.avatar-lg').forEach(el => {
      if (el.textContent.trim() === 'S' || el.textContent.trim() === '——') {
        el.textContent = name.charAt(0).toUpperCase();
      }
    });
  }

  // Theme toggle button
  const SVG = {
    sun:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    moon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  };
  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  const themeContainers = [
    document.querySelector('.nav-links'),
    document.querySelector('.topbar-actions'),
    document.getElementById('nav-mobile-end'),
  ].filter(Boolean);

  const allToggleBtns = [];
  themeContainers.forEach(container => {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle light/dark mode');
    btn.innerHTML = isDark() ? SVG.sun : SVG.moon;
    btn.addEventListener('click', () => {
      if (isDark()) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        allToggleBtns.forEach(b => b.innerHTML = SVG.moon);
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        allToggleBtns.forEach(b => b.innerHTML = SVG.sun);
      }
    });
    container.appendChild(btn);
    allToggleBtns.push(btn);
  });
});
