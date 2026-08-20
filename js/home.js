// ── Home Page JS ──
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCounters();
  renderNewsPreview();
  updateComplaintStats();
});

function renderNewsPreview() {
  const container = document.getElementById('newsPreview');
  if (!container) return;

  const getCategoryIconSvg = (cat) => {
    switch(cat) {
      case 'برلمان':
        return `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M4 18h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2L2 7h20L12 2z"/></svg>`;
      case 'ميداني':
        return `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
      case 'صحة':
        return `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
      case 'اقتصاد':
        return `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
      case 'فلاحة':
        return `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/><path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4"/></svg>`;
      case 'وطني':
        return `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2z"/></svg>`;
    }
  };

  const news = getNews().slice(0, 3);
  container.innerHTML = news.map(item => `
    <a href="news.html#news-${item.id}" class="news-card" style="text-decoration:none;color:inherit;">
      <div class="news-card-img" style="background: radial-gradient(circle at 50% 30%, rgba(0, 98, 51, 0.45) 0%, rgba(10, 15, 30, 0.95) 100%); border-bottom:1px solid rgba(201,162,39,0.25);">
        <div style="width:64px; height:64px; border-radius:16px; background:linear-gradient(135deg, rgba(0,98,51,0.5), rgba(0,40,20,0.85)); border:1.5px solid rgba(201,162,39,0.5); display:flex; align-items:center; justify-content:center; color:var(--gold); box-shadow:0 6px 20px rgba(0,0,0,0.4);">
          ${getCategoryIconSvg(item.category)}
        </div>
      </div>
      <div class="news-card-body">
        <div class="news-cat">${item.category}</div>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <div class="news-meta">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>${formatDate(item.date)}</span>
        </div>
      </div>
    </a>
  `).join('');
}

function updateComplaintStats() {
  const stats = getStats();
  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) animateCounter(el, val, 1500);
  };
  setEl('totalComplaints', stats.total);
  setEl('pendingComplaints', stats.pending);
  setEl('resolvedComplaints', stats.resolved);
}

// Quick Track Widget on Home Page
window.trackRequest = async function() {
  const input = document.getElementById('trackRef');
  const result = document.getElementById('trackResult');
  if (!input || !result) return;

  const ref = input.value.trim().toUpperCase();
  if (!ref) {
    result.classList.remove('hidden');
    result.innerHTML = `<div style="color:#f87171; font-size:14px; padding:10px;">⚠️ يرجى إدخال الرقم المرجعي للطلب</div>`;
    return;
  }

  result.classList.remove('hidden');
  result.innerHTML = `<div style="color:var(--gold); font-size:13px; padding:10px;">⏳ جاري فحص حالة الطلب من السحابة...</div>`;

  let complaint = null;
  if (window.db && typeof window.db.getComplaintById === 'function') {
    complaint = await window.db.getComplaintById(ref);
  } else if (typeof getComplaintById === 'function') {
    complaint = getComplaintById(ref);
  }

  if (!complaint) {
    result.innerHTML = `
      <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:8px; padding:12px; margin-top:12px;">
        <strong style="color:#f87171; font-size:14px;">لم يتم العثور على طلب بهذا الرقم.</strong>
        <p style="color:rgba(255,255,255,0.6); font-size:12px; margin-top:4px;">تأكد من كتابة الرقم بشكل صحيح (مثال: DZ-2026-XXXX)</p>
      </div>
    `;
    return;
  }

  const status = getStatusLabel(complaint.status);
  result.innerHTML = `
    <div style="background:rgba(0,98,51,0.2); border:1px solid rgba(0,168,84,0.3); border-radius:8px; padding:14px; margin-top:14px; text-align:right;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:700; color:var(--gold); font-size:14px;">${complaint.id}</span>
        <span class="status-badge ${status.class}" style="font-size:12px;">${status.icon} ${status.text}</span>
      </div>
      <div style="font-size:14px; font-weight:600; color:#fff; margin-bottom:6px;">${complaint.subject}</div>
      <div style="font-size:12px; color:rgba(255,255,255,0.5); margin-bottom:10px;">📅 تاريخ التسجيل: ${formatDate(complaint.createdAt)}</div>
      <a href="complaints.html#track" onclick="sessionStorage.setItem('temp_track_id', '${complaint.id}')" class="btn btn-sm btn-primary" style="display:inline-block; width:100%; text-align:center; font-size:13px; text-decoration:none;">
        عرض المسار الكامل والرد الرسمي ←
      </a>
    </div>
  `;
};

