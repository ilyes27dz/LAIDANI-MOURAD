// ── Complaints Page JS ──

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderRecentComplaints();
  handleHashTab();
  initPhoneValidation();
});

// ── التحقق من رقم الهاتف الجزائري ──
function initPhoneValidation() {
  const phoneInput = document.getElementById('cPhone');
  const phoneError = document.getElementById('phoneError');
  if (!phoneInput) return;

  // السماح فقط بالأرقام
  phoneInput.addEventListener('keypress', (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  });

  // منع اللصق غير الرقمي وتنظيف القيمة
  phoneInput.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    const digits = pasted.replace(/\D/g, '').slice(0, 10);
    phoneInput.value = digits;
    validatePhone(phoneInput, phoneError);
  });

  // التحقق أثناء الكتابة
  phoneInput.addEventListener('input', () => {
    // إزالة أي حرف غير رقمي
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    validatePhone(phoneInput, phoneError);
  });

  // التحقق عند مغادرة الحقل
  phoneInput.addEventListener('blur', () => {
    validatePhone(phoneInput, phoneError, true);
  });
}

function validatePhone(input, errorEl, strict = false) {
  const val = input.value;
  const algerianPattern = /^0[567]\d{8}$/;

  // إجباري — فارغ = خطأ عند التشديد
  if (val.length === 0) {
    if (strict) {
      if (errorEl) { errorEl.textContent = '⚠️ رقم الهاتف إجباري'; errorEl.style.display = 'block'; }
      input.style.borderColor = '#f87171';
    } else {
      if (errorEl) errorEl.style.display = 'none';
      input.style.borderColor = '';
    }
    return val.length > 0;
  }

  if (val.length === 10 && algerianPattern.test(val)) {
    if (errorEl) errorEl.style.display = 'none';
    input.style.borderColor = '#22c55e';
    return true;
  }

  if (strict || val.length === 10) {
    if (errorEl) { errorEl.textContent = '⚠️ رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 05 أو 06 أو 07'; errorEl.style.display = 'block'; }
    input.style.borderColor = '#f87171';
    return false;
  }

  // جاري الكتابة
  if (errorEl) errorEl.style.display = 'none';
  input.style.borderColor = '';
  return false;
}


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

  // التحقق من رقم الهاتف — إجباري
  const phoneInput = document.getElementById('cPhone');
  const phoneError = document.getElementById('phoneError');
  const algerianPattern = /^0[567]\d{8}$/;

  if (!phoneInput || phoneInput.value.length === 0) {
    if (phoneError) { phoneError.textContent = '⚠️ رقم الهاتف إجباري'; phoneError.style.display = 'block'; }
    if (phoneInput) { phoneInput.style.borderColor = '#f87171'; phoneInput.focus(); }
    showToast('⚠️ رقم الهاتف إجباري — يرجى إدخاله', 'warning');
    return;
  }
  if (!algerianPattern.test(phoneInput.value)) {
    if (phoneError) { phoneError.textContent = '⚠️ رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 05 أو 06 أو 07'; phoneError.style.display = 'block'; }
    phoneInput.style.borderColor = '#f87171';
    phoneInput.focus();
    showToast('⚠️ رقم الهاتف غير صحيح — يجب أن يكون 10 أرقام ويبدأ بـ 05 أو 06 أو 07', 'warning');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span>⏳ جاري الإرسال وحفظ الطلب في السحابة...</span>';

  const daira = document.getElementById('cDaira') ? document.getElementById('cDaira').value : '';
  const commune = document.getElementById('cCommune') ? document.getElementById('cCommune').value : '';
  const address = document.getElementById('cAddress') ? document.getElementById('cAddress').value : '';
  const fullLocation = `بلدية ${commune} (${daira}) — ${address}`;

  const fileInput = document.getElementById('cAttachments');
  let attachments = [];
  
  if (fileInput && fileInput.files.length > 0) {
    btn.innerHTML = '<span>⏳ جاري رفع المرفقات...</span>';
    const files = Array.from(fileInput.files).slice(0, 5); // حد أقصى 5 ملفات
    for (const file of files) {
      if (window.supabaseClient || (window.db && window.db.supabaseClient)) {
        const client = window.supabaseClient || (typeof supabase !== 'undefined' ? supabase.createClient("https://vvufhimhsrbsnmtuqouk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dWZoaW1oc3Jic25tdHVxb3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMzIwOTgsImV4cCI6MjEwMjgwODA5OH0.hGm4NUSHGeJeo6LR3W7RUhp9TvSzwYJfXe9Kd5broak") : null);
        if (client) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          try {
            const { data: uploadData, error: uploadError } = await client.storage.from('attachments').upload(fileName, file);
            if (!uploadError && uploadData) {
              const { data: urlData } = client.storage.from('attachments').getPublicUrl(fileName);
              if (urlData && urlData.publicUrl) {
                attachments.push({
                  name: file.name,
                  url: urlData.publicUrl,
                  type: file.type
                });
              }
            }
          } catch (e) { console.error('Upload error:', e); }
        }
      }
    }
  }

  btn.innerHTML = '<span>⏳ جاري حفظ الطلب في السحابة...</span>';

  const data = {
    name: document.getElementById('cName').value,
    phone: document.getElementById('cPhone').value,
    email: document.getElementById('cEmail').value,
    location: fullLocation,
    type: document.getElementById('cType').value,
    subject: document.getElementById('cSubject').value,
    details: document.getElementById('cDetails').value,
    attachments: attachments
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
  const refId = complaint.id;
  document.getElementById('refNumber').textContent = refId;

  // ── حفظ رقم التتبع محلياً على جهاز المواطن ──
  try {
    let myComplaints = JSON.parse(localStorage.getItem('my_complaints') || '[]');
    myComplaints.unshift({
      id: refId,
      subject: data.subject || '',
      name: data.name || '',
      date: new Date().toISOString()
    });
    // احتفظ بأحدث 20 فقط
    if (myComplaints.length > 20) myComplaints = myComplaints.slice(0, 20);
    localStorage.setItem('my_complaints', JSON.stringify(myComplaints));
  } catch(e) {}

  // ── إضافة أزرار النسخ والمشاركة ──
  const refEl = document.getElementById('refNumber');
  if (refEl && refEl.parentElement) {
    // إزالة أزرار قديمة إن وجدت
    const oldBtns = document.getElementById('refActionBtns');
    if (oldBtns) oldBtns.remove();

    const btnGroup = document.createElement('div');
    btnGroup.id = 'refActionBtns';
    btnGroup.style.cssText = 'display:flex;gap:10px;justify-content:center;margin-top:12px;flex-wrap:wrap;';

    // زر النسخ
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '📋 نسخ رقم التتبع';
    copyBtn.style.cssText = 'background:rgba(201,162,39,0.15);border:1px solid var(--gold);color:var(--gold);padding:8px 18px;border-radius:8px;cursor:pointer;font-family:inherit;font-size:0.9rem;transition:background 0.2s;';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(refId).then(() => {
        copyBtn.innerHTML = '✅ تم النسخ!';
        setTimeout(() => { copyBtn.innerHTML = '📋 نسخ رقم التتبع'; }, 2000);
      }).catch(() => {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = refId;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        copyBtn.innerHTML = '✅ تم النسخ!';
        setTimeout(() => { copyBtn.innerHTML = '📋 نسخ رقم التتبع'; }, 2000);
      });
    };

    // زر المشاركة
    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = '📤 مشاركة رقم التتبع';
    shareBtn.style.cssText = 'background:rgba(0,98,51,0.2);border:1px solid rgba(0,168,84,0.4);color:#4ade80;padding:8px 18px;border-radius:8px;cursor:pointer;font-family:inherit;font-size:0.9rem;transition:background 0.2s;';
    shareBtn.onclick = () => {
      const shareText = `رقم تتبع شكواي لدى مكتب النائب مراد لعيداني: ${refId}\nرابط التتبع: https://laidani-mourad.vercel.app/complaints.html#track`;
      if (navigator.share) {
        navigator.share({ title: 'رقم تتبع الشكوى', text: shareText });
      } else {
        navigator.clipboard.writeText(shareText).then(() => {
          shareBtn.innerHTML = '✅ تم النسخ!';
          setTimeout(() => { shareBtn.innerHTML = '📤 مشاركة رقم التتبع'; }, 2000);
        });
      }
    };

    btnGroup.appendChild(copyBtn);
    btnGroup.appendChild(shareBtn);
    refEl.parentElement.appendChild(btnGroup);
  }

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
async function trackFull() {
  const input = document.getElementById('trackRefFull');
  const result = document.getElementById('trackResultFull');
  const ref = input.value.trim();

  if (!ref) { showToast('يرجى إدخال الرقم المرجعي', 'warning'); return; }

  result.classList.remove('hidden');
  result.innerHTML = `
    <div style="text-align:center;padding:32px;">
      <div style="font-size:32px;margin-bottom:12px;">⏳</div>
      <div style="font-size:16px;color:var(--gold);">جاري فحص وتتبع الطلب من السحابة...</div>
    </div>
  `;

  let complaint = null;
  if (window.db && typeof window.db.getComplaintById === 'function') {
    complaint = await window.db.getComplaintById(ref);
  } else if (typeof getComplaintById === 'function') {
    complaint = getComplaintById(ref);
  }

  if (!complaint) {
    result.innerHTML = `
      <div style="text-align:center;padding:32px;">
        <div style="font-size:48px;margin-bottom:16px;">🔍</div>
        <div style="font-size:18px;font-weight:600;color:#f87171;margin-bottom:8px;">لم يُعثر على هذا الطلب</div>
        <p style="color:rgba(255,255,255,0.4);font-size:14px;">تأكد من الرقم المرجعي (مثال: DZ-2026-XXXX)</p>
      </div>
    `;
    return;
  }

  const status = getStatusLabel(complaint.status);
  const steps = [
    { label: 'مرسلة', done: true, desc: 'تم إرسال الطلب بنجاح' },
    { label: 'مُستلَمة', done: complaint.status !== 'new' && complaint.status !== 'sent', desc: 'تم استلام الطلب من طرف النائب' },
    { label: 'تحت المعاينة', done: complaint.status === 'reviewing' || complaint.status === 'pending' || complaint.status === 'responded' || complaint.status === 'resolved', desc: 'جاري دراسة الملف أو مراسلة الجهات' },
    { label: 'تم الرد', done: complaint.status === 'responded' || complaint.status === 'resolved' || complaint.status === 'rejected', desc: 'تم معالجة الطلب والرد عليه' }
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
      
      <!-- المرفقات -->
      ${complaint.attachments && complaint.attachments.length > 0 ? `
        <div style="margin-top:16px;border-top:1px solid rgba(255,255,255,0.05);padding-top:12px;">
          <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:8px;">المرفقات (${complaint.attachments.length}):</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            ${complaint.attachments.map(att => `
              <a href="${att.url}" target="_blank" style="display:inline-flex;flex-direction:column;align-items:center;background:rgba(0,0,0,0.3);padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);text-decoration:none;color:#fff;width:100px;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
                ${att.type.startsWith('image') ? 
                  `<img src="${att.url}" style="width:100%;height:60px;object-fit:cover;border-radius:4px;margin-bottom:6px;">` : 
                  `<div style="font-size:24px;margin-bottom:6px;height:60px;display:flex;align-items:center;justify-content:center;">🎥</div>`
                }
                <span style="font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${att.name}</span>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}
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

// ── طلباتي المحفوظة على الجهاز ──
function renderMyComplaints() {
  const container = document.getElementById('myComplaintsList');
  if (!container) return;

  let myComplaints = [];
  try {
    myComplaints = JSON.parse(localStorage.getItem('my_complaints') || '[]');
  } catch(e) { myComplaints = []; }

  if (myComplaints.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:32px;color:rgba(255,255,255,0.35);">
        <div style="font-size:40px;margin-bottom:10px;">📭</div>
        <p>لا توجد طلبات محفوظة على هذا الجهاز بعد.</p>
        <p style="font-size:0.82rem;margin-top:4px;">عند إرسال شكوى أو اقتراح، سيُحفظ رقم تتبعه هنا تلقائياً.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = myComplaints.map(c => `
    <div class="complaint-item" onclick="fillTrackInput('${c.id}')" style="cursor:pointer;">
      <div class="ci-info">
        <div class="ci-ref" style="color:var(--gold);">${c.id}</div>
        <div class="ci-subject">${c.subject || 'طلب/شكوى'}</div>
        <div class="ci-date" style="font-size:0.8rem;color:rgba(255,255,255,0.4);">📅 ${new Date(c.date).toLocaleDateString('ar-DZ')}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <button onclick="event.stopPropagation();copyRefId('${c.id}',this)" style="background:rgba(201,162,39,0.12);border:1px solid rgba(201,162,39,0.35);color:var(--gold);padding:5px 12px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:inherit;">📋 نسخ</button>
        <button onclick="event.stopPropagation();deleteMyComplaint('${c.id}')" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#f87171;padding:5px 12px;border-radius:6px;cursor:pointer;font-size:0.8rem;font-family:inherit;">🗑️</button>
      </div>
    </div>
  `).join('');
}

function copyRefId(id, btn) {
  navigator.clipboard.writeText(id).then(() => {
    btn.innerHTML = '✅';
    setTimeout(() => { btn.innerHTML = '📋 نسخ'; }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = id;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.innerHTML = '✅';
    setTimeout(() => { btn.innerHTML = '📋 نسخ'; }, 2000);
  });
}

function deleteMyComplaint(id) {
  try {
    let myComplaints = JSON.parse(localStorage.getItem('my_complaints') || '[]');
    myComplaints = myComplaints.filter(c => c.id !== id);
    localStorage.setItem('my_complaints', JSON.stringify(myComplaints));
    renderMyComplaints();
  } catch(e) {}
}

// تشغيل عند بدء الصفحة
document.addEventListener('DOMContentLoaded', () => {
  renderMyComplaints();
});
