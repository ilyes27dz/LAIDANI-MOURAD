// ── Complaints Page JS ──

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderRecentComplaints();
  handleHashTab();
});

function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const btn = document.querySelector(`[data-tab="${tab}"]`);
  const content = document.getElementById(`tab-${tab}`);
  if (btn) btn.classList.add('active');
  if (content) content.classList.add('active');
}

function handleHashTab() {
  const hash = window.location.hash;
  const tempId = sessionStorage.getItem('temp_track_id');
  if (tempId) {
    sessionStorage.removeItem('temp_track_id');
    switchTab('track');
    setTimeout(() => {
      const input = document.getElementById('trackRefFull');
      if (input) {
        input.value = tempId;
        trackFull();
      }
    }, 200);
    return;
  }
  if (hash === '#track') switchTab('track');
  else if (hash === '#suggest') switchTab('suggest');
}

// دوائر وبلديات ولاية مستغانم (32 بلدية موزعة على 10 دوائر)
const MOSTAGANEM_COMMUNES = {
  "دائرة سيدي لخضر": ["سيدي لخضر", "بن عبد المالك رمضان", "حجاج"],
  "دائرة مستغانم": ["مستغانم"],
  "دائرة حاسي مماش": ["حاسي مماش", "ستيديا", "مزغران"],
  "دائرة عين تادلس": ["عين تادلس", "صيادة", "سيدي بلعطار", "وادي الخير"],
  "دائرة عشعاشة": ["عشعاشة", "خضرة", "نكمارية", "أولاد بوغالم"],
  "دائرة سيدي علي": ["سيدي علي", "أولاد مع الله", "تزغين"],
  "دائرة بوقيرات": ["بوقيرات", "السوافلية", "الصفصاف", "عين سيدي شريف"],
  "دائرة خير الدين": ["خير الدين", "عين بودينار", "صيادة القديمة"],
  "دائرة ماسرى": ["ماسرى", "الطواهرية", "منصورة", "عين سيدي شريف"],
  "دائرة عين النويصي": ["عين النويصي", "فرناكة", "الحسيان"]
};

function updateCommunes() {
  const dairaSelect = document.getElementById('cDaira');
  const communeSelect = document.getElementById('cCommune');
  if (!dairaSelect || !communeSelect) return;

  const selectedDaira = dairaSelect.value;
  communeSelect.innerHTML = '<option value="">— اختر البلدية —</option>';

  if (selectedDaira && MOSTAGANEM_COMMUNES[selectedDaira]) {
    MOSTAGANEM_COMMUNES[selectedDaira].forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      communeSelect.appendChild(opt);
    });
  }
}

// Submit Complaint
async function submitComplaint(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<span>⏳ جاري الإرسال وحفظ الطلب في السحابة...</span>';

  const daira = document.getElementById('cDaira') ? document.getElementById('cDaira').value : '';
  const commune = document.getElementById('cCommune') ? document.getElementById('cCommune').value : '';
  const address = document.getElementById('cAddress') ? document.getElementById('cAddress').value : '';
  const fullLocation = `بلدية ${commune} (${daira}) — ${address}`;

  const data = {
    name: document.getElementById('cName').value,
    phone: document.getElementById('cPhone').value,
    email: document.getElementById('cEmail').value,
    location: fullLocation,
    type: document.getElementById('cType').value,
    subject: document.getElementById('cSubject').value,
    details: document.getElementById('cDetails').value
  };

  let complaint = null;
  if (window.db && typeof window.db.addComplaint === 'function') {
    complaint = await window.db.addComplaint(data);
  } else {
    complaint = addComplaint(data);
  }

  document.getElementById('complaintForm').classList.add('hidden');
  const success = document.getElementById('submitSuccess');
  success.classList.remove('hidden');
  document.getElementById('refNumber').textContent = complaint.id;

  renderRecentComplaints();
  showToast('تم تقديم شكواك وحفظها بنجاح! ✅', 'success');
}

function resetForm() {
  document.getElementById('complaintForm').reset();
  document.getElementById('complaintForm').classList.remove('hidden');
  document.getElementById('submitSuccess').classList.add('hidden');
  const btn = document.getElementById('submitBtn');
  btn.disabled = false;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> إرسال الشكوى`;
}

// Track
function trackFull() {
  const input = document.getElementById('trackRefFull');
  const result = document.getElementById('trackResultFull');
  const ref = input.value.trim();

  if (!ref) { showToast('يرجى إدخال الرقم المرجعي', 'warning'); return; }

  const complaint = getComplaintById(ref);
  result.classList.remove('hidden');

  if (!complaint) {
    result.innerHTML = `
      <div style="text-align:center;padding:32px;">
        <div style="font-size:48px;margin-bottom:16px;">🔍</div>
        <div style="font-size:18px;font-weight:600;color:#f87171;margin-bottom:8px;">لم يُعثر على هذا الطلب</div>
        <p style="color:rgba(255,255,255,0.4);font-size:14px;">تأكد من الرقم المرجعي. مثال: DZ-2026-00001</p>
      </div>
    `;
    return;
  }

  const status = getStatusLabel(complaint.status);
  const steps = [
    { label: 'تم الاستلام', done: true, desc: 'توثيق الطلب وتسجيله' },
    { label: 'دراسة الملف', done: complaint.status !== 'new', desc: 'فحص الوثائق والتأكد من الاختصاص' },
    { label: 'المتابعة والمساءلة', done: complaint.status === 'pending' || complaint.status === 'resolved', desc: 'مراسلة الإدارة أو الوزارة المعنية' },
    { label: 'المعالجة والرد', done: complaint.status === 'resolved', desc: 'استلام الإجابة وتبليغ المواطن' }
  ];

  result.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:16px;">
      <div>
        <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:4px;">الرقم المرجعي للطلب</div>
        <div style="font-size:22px;font-weight:900;color:var(--gold);direction:ltr;font-family:monospace;">${complaint.id}</div>
      </div>
      <span class="status-badge ${status.class}" style="font-size:14px;padding:8px 20px;border-radius:20px;">${status.icon} ${status.text}</span>
    </div>

    <div style="margin-bottom:20px;background:rgba(255,255,255,0.02);padding:16px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);">
      <div style="font-size:12px;color:var(--gold);margin-bottom:4px;">موضوع الانشغال / الشكوى</div>
      <div style="font-size:17px;font-weight:700;color:var(--white);">${complaint.subject}</div>
      ${complaint.details ? `<p style="font-size:14px;color:#94a3b8;margin-top:8px;line-height:1.6;">${complaint.details}</p>` : ''}
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:12px;margin-bottom:24px;background:rgba(0,0,0,0.2);padding:12px;border-radius:8px;">
      <div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);">صاحب الطلب</div>
        <div style="font-size:13px;font-weight:600;">${complaint.name || 'مواطن'}</div>
      </div>
      <div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);">المنطقة / البلدية</div>
        <div style="font-size:13px;font-weight:600;">${complaint.location || 'ولاية مستغانم'}</div>
      </div>
      <div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);">تاريخ التسجيل</div>
        <div style="font-size:13px;">${formatDate(complaint.createdAt)}</div>
      </div>
      <div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);">آخر تحديث</div>
        <div style="font-size:13px;color:#38bdf8;">${formatDate(complaint.updatedAt || complaint.createdAt)}</div>
      </div>
    </div>

    <!-- Interactive Progress Steps -->
    <div style="margin-bottom:28px;">
      <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:12px;">مراحل مسار معالجة الطلب:</div>
      <div style="display:flex;gap:0;position:relative;">
        ${steps.map((s, i) => `
          <div style="flex:1;text-align:center;position:relative;">
            ${i < steps.length - 1 ? `<div style="position:absolute;top:16px;right:50%;width:100%;height:3px;background:${steps[i+1].done ? 'var(--green)' : 'rgba(255,255,255,0.1)'};z-index:0;"></div>` : ''}
            <div style="width:34px;height:34px;border-radius:50%;background:${s.done ? 'var(--green)' : '#1e293b'};border:2px solid ${s.done ? 'var(--gold)' : 'rgba(255,255,255,0.2)'};display:flex;align-items:center;justify-content:center;margin:0 auto 8px;position:relative;z-index:1;font-size:14px;color:#fff;">
              ${s.done ? '✓' : (i + 1)}
            </div>
            <div style="font-size:12px;font-weight:600;color:${s.done ? 'var(--gold)' : 'rgba(255,255,255,0.4)'};">${s.label}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:2px;">${s.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Official Response Box -->
    ${complaint.officialResponse ? `
      <div style="background:rgba(0,98,51,0.18);border:1px solid rgba(0,168,84,0.35);border-right:4px solid var(--gold);border-radius:8px;padding:16px 20px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="font-size:20px;">🏛️</span>
          <strong style="color:var(--gold);font-size:15px;">الرد والبيان الرسمي من المكتب البرلماني للنائب:</strong>
        </div>
        <p style="color:#f1f5f9;font-size:14px;line-height:1.7;white-space:pre-line;">${complaint.officialResponse}</p>
      </div>
    ` : ''}

    ${complaint.notes && complaint.notes.length ? `
      <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:16px;">
        <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:10px;">سجل التحديثات والملاحظات:</div>
        ${complaint.notes.map(n => `
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:10px 14px;margin-bottom:8px;">
            <div style="font-size:13px;color:#cbd5e1;">📌 ${n.text}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:4px;">📅 ${formatDate(n.date)}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

// Render Recent Complaints
function renderRecentComplaints() {
  const container = document.getElementById('recentComplaints');
  if (!container) return;

  const complaints = getComplaints().slice(0, 10);
  if (!complaints.length) {
    container.innerHTML = '<div class="ci-empty">لا توجد طلبات مقدمة بعد</div>';
    return;
  }

  container.innerHTML = complaints.map(c => {
    const s = getStatusLabel(c.status);
    return `
      <div class="complaint-item" onclick="fillTrackInput('${c.id}')" style="cursor:pointer;">
        <div class="ci-info">
          <div class="ci-ref">${c.id}</div>
          <div class="ci-subject">${c.subject}</div>
          <div class="ci-date">📅 ${formatDate(c.createdAt)}</div>
        </div>
        <span class="status-badge ${s.class}">${s.text}</span>
      </div>
    `;
  }).join('');
}

function fillTrackInput(id) {
  switchTab('track');
  const input = document.getElementById('trackRefFull');
  if (input) {
    input.value = id;
    trackFull();
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Submit Suggestion
function submitSuggestion(e) {
  e.preventDefault();
  setTimeout(() => {
    const data = {
      name: document.getElementById('sName').value || 'مجهول',
      category: document.getElementById('sCategory').value,
      subject: document.getElementById('sTitle').value,
      details: document.getElementById('sDetails').value,
      type: 'suggestion'
    };
    addComplaint(data);
    document.getElementById('suggestForm').classList.add('hidden');
    document.getElementById('suggestSuccess').classList.remove('hidden');
    showToast('تم إرسال اقتراحك بنجاح! 💡', 'success');
  }, 800);
}

function resetSuggestForm() {
  document.getElementById('suggestForm').reset();
  document.getElementById('suggestForm').classList.remove('hidden');
  document.getElementById('suggestSuccess').classList.add('hidden');
}
