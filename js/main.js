// ============================================================
// MAIN.JS — Core Functionality
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initHamburger();
  initAOS();
  applyDeputyInfo();
  setActiveNavLink();
});

// ─── Loader ────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1600);
  document.body.style.overflow = 'hidden';
}

// ─── Navbar ────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ─── Hamburger ─────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  // إنشاء طبقة الخلفية (overlay) ديناميكياً
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  function toggleMenu(e) {
    if (e) e.stopPropagation();
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger.onclick = toggleMenu;
  overlay.onclick = closeMenu;

  // إغلاق بضغط Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}

// ─── Active Nav Link ────────────────────────────────────────
function setActiveNavLink() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─── AOS (Animate On Scroll) ────────────────────────────────
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ─── Counter Animation ─────────────────────────────────────
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('ar');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('ar');
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ─── Particles ─────────────────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${Math.random() > 0.5 ? 'rgba(0,168,84,0.6)' : 'rgba(201,162,39,0.5)'};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${4 + Math.random() * 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(p);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
      33% { transform: translateY(-20px) translateX(10px); opacity: 1; }
      66% { transform: translateY(10px) translateX(-10px); opacity: 0.4; }
    }
  `;
  document.head.appendChild(style);
}

// ─── Toast Notification ─────────────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${message}</span>`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ─── Track Request ──────────────────────────────────────────
function trackRequest() {
  const input = document.getElementById('trackRef');
  const result = document.getElementById('trackResult');
  if (!input || !result) return;

  const ref = input.value.trim();
  if (!ref) {
    showToast('يرجى إدخال الرقم المرجعي', 'warning');
    return;
  }

  const complaint = getComplaintById(ref);
  result.classList.remove('hidden');

  if (!complaint) {
    result.innerHTML = `
      <div style="color: #f87171; font-weight: 600;">❌ لم يتم العثور على طلب بهذا الرقم</div>
      <p style="font-size:13px;color:rgba(255,255,255,0.5);margin-top:8px;">تأكد من صحة الرقم المرجعي. مثال: DZ-2026-00001</p>
    `;
    return;
  }

  const status = getStatusLabel(complaint.status);
  result.innerHTML = `
    <div style="margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
      <strong style="color:#C9A227">${complaint.id}</strong>
      <span class="status-badge ${status.class}">${status.text}</span>
    </div>
    <div style="font-weight:600;margin-bottom:6px;">${complaint.subject}</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.5);">
      📅 تاريخ التقديم: ${formatDate(complaint.createdAt)}<br>
      🔄 آخر تحديث: ${formatDate(complaint.updatedAt)}
    </div>
    ${complaint.notes.length ? `<div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1);font-size:13px;color:#4ade80;">💬 ${complaint.notes[complaint.notes.length-1].text}</div>` : ''}
  `;
}
