// ============================================================
// ADMIN.JS — Full Administrative Logic for Parliamentary Website
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Check initial login state
    if (typeof isAdminLoggedIn === 'function' && isAdminLoggedIn()) {
        showDashboard();
    } else {
        loginSection.style.display = 'flex';
        dashboardSection.style.display = 'none';
    }

    // Login Submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pwd = document.getElementById('adminPassword').value.trim();
            if (typeof adminLogin === 'function' && adminLogin(pwd)) {
                showDashboard();
                if (typeof showToast === 'function') showToast('مرحباً بك في لوحة الإدارة البرلمانية 👋', 'success');
            } else {
                const err = document.getElementById('loginError');
                if (err) err.style.display = 'block';
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (typeof adminLogout === 'function') adminLogout();
            location.reload();
        });
    }

    // Tab Navigation
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            const pane = document.getElementById(target);
            if (pane) pane.classList.add('active');
        });
    });

    // ── Load Everything on Login ──
    function showDashboard() {
        if (loginSection) loginSection.style.display = 'none';
        if (dashboardSection) dashboardSection.style.display = 'block';
        loadDashboardStats();
        renderAdminComplaints();
        renderAdminMessages();
        renderAdminNews();
        renderAdminArchive();
        populateSettingsForm();
        // Also kick off async cloud load
        setTimeout(() => {
            if (typeof loadDashboardStatsAsync === 'function') loadDashboardStatsAsync();
        }, 500);
    }

    // ── 1. Statistics ──
    function loadDashboardStats() {
        const stats = typeof getStats === 'function' ? getStats() : { total: 0, newCount: 0, pending: 0, resolved: 0 };
        const messages = typeof getMessages === 'function' ? getMessages() : [];
        const unreadCount = messages.filter(m => !m.read).length;

        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        setVal('statTotalComplaints', stats.total);
        setVal('statNewComplaints', stats.newCount);
        setVal('statPendingComplaints', stats.pending);
        setVal('statResolvedComplaints', stats.resolved);
        setVal('statNewMessages', messages.length);
        setVal('unreadCountBadge', unreadCount);
    }

    // ── 2. Complaints Management ──
    const complaintSearch = document.getElementById('adminComplaintSearch');
    const complaintFilter = document.getElementById('adminComplaintFilter');
    const exportCsvBtn = document.getElementById('exportCsvBtn');

    if (complaintSearch) complaintSearch.addEventListener('input', renderAdminComplaints);
    if (complaintFilter) complaintFilter.addEventListener('change', renderAdminComplaints);
    if (exportCsvBtn) exportCsvBtn.addEventListener('click', exportComplaintsToCSV);

    async function renderAdminComplaints() {
        const listElem = document.getElementById('adminComplaintsList');
        if (!listElem) return;

        listElem.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--gold);padding:16px;">⏳ جاري تحميل الشكاوى من السحابة...</td></tr>`;

        const query = (complaintSearch ? complaintSearch.value : '').toLowerCase().trim();
        const filterVal = complaintFilter ? complaintFilter.value : 'all';

        let complaints = [];
        if (window.db && typeof window.db.getComplaints === 'function') {
            complaints = await window.db.getComplaints();
        } else if (typeof getComplaints === 'function') {
            complaints = getComplaints();
        }

        if (filterVal !== 'all') {
            complaints = complaints.filter(c => c.status === filterVal);
        }

        if (query) {
            complaints = complaints.filter(c => 
                (c.id && c.id.toLowerCase().includes(query)) ||
                (c.name && c.name.toLowerCase().includes(query)) ||
                (c.subject && c.subject.toLowerCase().includes(query)) ||
                (c.location && c.location.toLowerCase().includes(query))
            );
        }

        if (complaints.length === 0) {
            listElem.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-4" style="color:rgba(255,255,255,0.4);">
                        لا توجد شكاوى أو انشغالات تطابق البحث
                    </td>
                </tr>
            `;
            return;
        }

        listElem.innerHTML = complaints.map(c => {
            const statusObj = getStatusLabel(c.status);
            const dateStr = formatDate(c.created_at || c.createdAt || c.date);
            return `
                <tr>
                    <td><strong style="color:var(--gold);">${c.id}</strong></td>
                    <td><small>${dateStr}</small></td>
                    <td><strong>${c.name}</strong><br><small class="text-muted">${c.phone || '-'}</small></td>
                    <td>${c.location || 'غير محدد'}</td>
                    <td>${c.subject}</td>
                    <td><span class="badge-tag" style="background:rgba(255,255,255,0.08);">${c.type || 'عام'}</span></td>
                    <td><span class="badge-tag ${statusObj.class}">${statusObj.icon} ${statusObj.text}</span></td>
                    <td>
                        <div class="action-btn-group">
                            <button class="btn btn-xs btn-primary" onclick="openComplaintModal('${c.id}')">معاينة / رد</button>
                            <button class="btn btn-xs btn-danger" onclick="handleDeleteComplaint('${c.id}')">🗑️</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Export CSV
    function exportComplaintsToCSV() {
        const complaints = getComplaints();
        if (!complaints.length) {
            alert('لا توجد شكاوى لتصديرها');
            return;
        }
        let csvContent = "\uFEFFالرقم المرجعي,التاريخ,المواطن,الهاتف,البريد,المنطقة,القطاع,الموضوع,الحالة,الرد الرسمي\n";
        complaints.forEach(c => {
            const row = [
                `"${c.id}"`,
                `"${c.createdAt || ''}"`,
                `"${c.name || ''}"`,
                `"${c.phone || ''}"`,
                `"${c.email || ''}"`,
                `"${c.location || ''}"`,
                `"${c.sector || ''}"`,
                `"${(c.subject || '').replace(/"/g, '""')}"`,
                `"${c.status || ''}"`,
                `"${(c.officialResponse || '').replace(/"/g, '""')}"`
            ];
            csvContent += row.join(",") + "\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `تقرير_الشكاوى_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // ── 3. Messages Management ──
    async function renderAdminMessages() {
        const container = document.getElementById('adminMessagesList');
        if (!container) return;

        container.innerHTML = `<div style="text-align:center;color:var(--gold);padding:24px;">⏳ جاري تحميل الرسائل من السحابة...</div>`;

        let messages = [];
        if (window.db && typeof window.db.getMessages === 'function') {
            messages = await window.db.getMessages();
        } else if (typeof getMessages === 'function') {
            messages = getMessages();
        }

        if (messages.length === 0) {
            container.innerHTML = `<div class="text-center py-4 text-muted">صندوق الرسائل فارغ حالياً.</div>`;
            return;
        }

        container.innerHTML = messages.map(m => `
            <div class="message-card ${m.is_read || m.read ? '' : 'unread'}">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <div>
                        <strong style="font-size:1.1rem; color:var(--white);">${m.name}</strong>
                        ${!(m.is_read || m.read) ? '<span class="badge-tag badge-new" style="margin-right:8px;">جديدة</span>' : ''}
                    </div>
                    <small class="text-muted">${formatDate(m.created_at || m.date)}</small>
                </div>
                <div class="mb-1" style="color:var(--gold); font-size:0.95rem;">
                    📌 ${m.subject || 'بدون موضوع'}
                </div>
                <p style="color:#cbd5e1; line-height:1.6; margin-bottom:1rem; background:rgba(0,0,0,0.2); padding:0.8rem; border-radius:6px;">
                    ${m.message}
                </p>
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-1">
                    <div class="text-muted" style="font-size:0.85rem;">
                        📞 ${m.phone || 'غير مسجل'} &nbsp;|&nbsp; ✉️ ${m.email || 'غير مسجل'}
                    </div>
                    <div class="action-btn-group">
                        ${m.email ? `<a href="mailto:${m.email}?subject=رد من المكتب البرلماني للنائب مراد لعيداني: ${encodeURIComponent(m.subject || '')}" class="btn btn-xs btn-primary">رد عبر البريد 📧</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Async stats loader (reads from Supabase or fallback)
    async function loadDashboardStatsAsync() {
        let complaints = [];
        let messages = [];
        if (window.db) {
            [complaints, messages] = await Promise.all([
                window.db.getComplaints ? window.db.getComplaints() : Promise.resolve([]),
                window.db.getMessages ? window.db.getMessages() : Promise.resolve([])
            ]);
        } else {
            complaints = typeof getComplaints === 'function' ? getComplaints() : [];
            messages = typeof getMessages === 'function' ? getMessages() : [];
        }
        const total = complaints.length;
        const pending = complaints.filter(c => c.status === 'pending').length;
        const resolved = complaints.filter(c => c.status === 'resolved').length;
        const newC = complaints.filter(c => c.status === 'new').length;
        const unread = messages.filter(m => !(m.is_read || m.read)).length;

        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        setVal('statTotalComplaints', total);
        setVal('statNewComplaints', newC);
        setVal('statPendingComplaints', pending);
        setVal('statResolvedComplaints', resolved);
        setVal('statNewMessages', messages.length);
        setVal('unreadCountBadge', unread);
    }



    // ── 4. News Management ──
    const addNewsForm = document.getElementById('addNewsForm');
    if (addNewsForm) {
        addNewsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newItem = {
                title: document.getElementById('newsTitle').value.trim(),
                category: document.getElementById('newsCategory').value,
                date: document.getElementById('newsDate').value || new Date().toISOString().split('T')[0],
                excerpt: document.getElementById('newsExcerpt').value.trim(),
                content: document.getElementById('newsContent').value.trim(),
                icon: document.getElementById('newsIcon').value.trim() || '📰',
                color: document.getElementById('newsColor').value
            };

            if (typeof addNews === 'function') {
                addNews(newItem);
                addNewsForm.reset();
                renderAdminNews();
                if (typeof showToast === 'function') showToast('تم نشر الخبر في الموقع بنجاح! 📰', 'success');
                else alert('تم نشر الخبر بنجاح');
            }
        });
    }

    function renderAdminNews() {
        const container = document.getElementById('adminNewsList');
        if (!container || typeof getNews !== 'function') return;

        const news = getNews();
        if (news.length === 0) {
            container.innerHTML = `<div class="text-center py-3 text-muted">لا توجد أخبار منشورة حالياً.</div>`;
            return;
        }

        container.innerHTML = news.map(n => `
            <div class="admin-item-card">
                <div class="d-flex align-items-center gap-1" style="flex:1;">
                    <div style="font-size:1.8rem;">${n.icon || '📰'}</div>
                    <div>
                        <h4>${n.title}</h4>
                        <small class="text-muted">${formatDate(n.date)} &nbsp;|&nbsp; <span class="badge-tag" style="background:rgba(255,255,255,0.06);">${n.category}</span></small>
                    </div>
                </div>
                <div>
                    <button class="btn btn-xs btn-danger" onclick="handleDeleteNews(${n.id})">حذف 🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // ── 5. Archive Management ──
    const addArchiveForm = document.getElementById('addArchiveForm');
    if (addArchiveForm) {
        addArchiveForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const item = {
                type: document.getElementById('archiveType').value,
                title: document.getElementById('archiveTitle').value.trim(),
                refNo: document.getElementById('archiveRefNo').value.trim(),
                targetMinistry: document.getElementById('archiveMinistry').value.trim(),
                summary: document.getElementById('archiveSummary').value.trim(),
                tags: document.getElementById('archiveTags').value.split(',').map(t => t.trim()).filter(Boolean),
                date: document.getElementById('archiveDate').value || new Date().toISOString().split('T')[0]
            };

            if (typeof addArchive === 'function') {
                addArchive(item);
                addArchiveForm.reset();
                renderAdminArchive();
                if (typeof showToast === 'function') showToast('تم توثيق النشاط في الأرشيف البرلماني! 🏛️', 'success');
                else alert('تم توثيق النشاط في الأرشيف بنجاح');
            }
        });
    }

    function renderAdminArchive() {
        const container = document.getElementById('adminArchiveList');
        if (!container || typeof getArchive !== 'function') return;

        const archive = getArchive();
        if (archive.length === 0) {
            container.innerHTML = `<div class="text-center py-3 text-muted">الأرشيف البرلماني فارغ حالياً.</div>`;
            return;
        }

        container.innerHTML = archive.map(a => {
            const typeObj = getTypeLabel(a.type);
            return `
                <div class="admin-item-card">
                    <div class="d-flex align-items-center gap-1" style="flex:1;">
                        <div style="font-size:1.6rem;">${typeObj.icon}</div>
                        <div>
                            <h4>${a.title}</h4>
                            <small class="text-muted">
                                ${formatDate(a.date)} &nbsp;|&nbsp; 
                                <span class="badge-tag" style="background:rgba(201,162,39,0.1); color:var(--gold);">${typeObj.text}</span>
                                ${a.refNo ? `&nbsp;|&nbsp; <code style="color:#94a3b8;">${a.refNo}</code>` : ''}
                            </small>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-xs btn-danger" onclick="handleDeleteArchive(${a.id})">حذف 🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ── 6. Deputy Profile Settings ──
    function populateSettingsForm() {
        const info = typeof getDeputyInfo === 'function' ? getDeputyInfo() : window.DEPUTY_INFO;
        if (!info) return;

        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el && val !== undefined) el.value = val;
        };

        setVal('deputyName', info.name);
        setVal('deputyNameShort', info.nameShort);
        setVal('deputyTitle', info.title || 'نائب بالمجلس الشعبي الوطني');
        setVal('deputyRegion', info.region);
        setVal('deputyMandate', info.mandate);
        setVal('deputyParty', info.party);
        setVal('deputyBio', info.bio);
        setVal('deputyEmail', info.email);
        setVal('deputyPhone', info.phone);
        setVal('deputyOffice', info.office);
    }

    const updateDeputyForm = document.getElementById('updateDeputyForm');
    if (updateDeputyForm) {
        updateDeputyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const current = typeof getDeputyInfo === 'function' ? getDeputyInfo() : {};
            const updated = {
                ...current,
                name: document.getElementById('deputyName').value.trim(),
                nameShort: document.getElementById('deputyNameShort').value.trim(),
                title: document.getElementById('deputyTitle').value.trim(),
                region: document.getElementById('deputyRegion').value.trim(),
                mandate: document.getElementById('deputyMandate').value.trim(),
                party: document.getElementById('deputyParty').value.trim(),
                bio: document.getElementById('deputyBio').value.trim(),
                email: document.getElementById('deputyEmail').value.trim(),
                phone: document.getElementById('deputyPhone').value.trim(),
                office: document.getElementById('deputyOffice').value.trim()
            };

            if (typeof saveDeputyInfo === 'function') {
                saveDeputyInfo(updated);
                if (typeof showToast === 'function') showToast('تم تحديث بيانات النائب بنجاح! 💾', 'success');
                else alert('تم تحديث البيانات بنجاح');
            }
        });
    }

    // Expose Global Action Handlers
    window.handleDeleteComplaint = function(id) {
        if (confirm(`هل أنت متأكد من رغبتك في حذف الشكوى رقم ${id}؟`)) {
            if (typeof deleteComplaint === 'function') {
                deleteComplaint(id);
                renderAdminComplaints();
                loadDashboardStats();
            }
        }
    };

    window.handleDeleteMessage = function(id) {
        if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
            if (typeof deleteMessage === 'function') {
                deleteMessage(id);
                renderAdminMessages();
                loadDashboardStats();
            }
        }
    };

    window.handleToggleMessageRead = function(id) {
        if (typeof toggleMessageRead === 'function') {
            toggleMessageRead(id);
            renderAdminMessages();
            loadDashboardStats();
        }
    };

    window.handleDeleteNews = function(id) {
        if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
            if (typeof deleteNews === 'function') {
                deleteNews(id);
                renderAdminNews();
            }
        }
    };

    window.handleDeleteArchive = function(id) {
        if (confirm('هل أنت متأكد من حذف هذا السجل من الأرشيف؟')) {
            if (typeof deleteArchive === 'function') {
                deleteArchive(id);
                renderAdminArchive();
            }
        }
    };
});

// ── Complaint Modal Examination & Reply Logic ──
window.openComplaintModal = async function(id) {
    const modal = document.getElementById('complaintModal');
    const modalBody = document.getElementById('modalComplaintBody');
    const modalId = document.getElementById('modalComplaintId');

    if (!modal || !modalBody) return;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalBody.innerHTML = `<div style="text-align:center;padding:32px;color:var(--gold);">⏳ جاري جلب تفاصيل الطلب من السحابة...</div>`;

    let complaint = null;
    if (window.db && typeof window.db.getComplaintById === 'function') {
        complaint = await window.db.getComplaintById(id);
    } else if (typeof getComplaintById === 'function') {
        complaint = getComplaintById(id);
    }

    if (!complaint) {
        modalBody.innerHTML = `<div style="text-align:center;padding:32px;color:#f87171;">لم يتم العثور على الطلب.</div>`;
        return;
    }

    if (modalId) modalId.textContent = complaint.id;

    const statusObj = getStatusLabel(complaint.status);
    const dateStr = formatDate(complaint.created_at || complaint.createdAt || complaint.date);

    modalBody.innerHTML = `
        <div class="complaint-details-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1.2rem; margin-bottom:1.5rem;">
            <div>
                <p><strong>👤 المواطن:</strong> ${complaint.name}</p>
                <p><strong>📞 رقم الهاتف:</strong> ${complaint.phone || 'غير متوفر'}</p>
                <p><strong>✉️ البريد الإلكتروني:</strong> ${complaint.email || 'غير متوفر'}</p>
            </div>
            <div>
                <p><strong>📍 المنطقة / البلدية:</strong> ${complaint.location || 'غير محدد'}</p>
                <p><strong>🏛️ نوع الطلب:</strong> ${complaint.type || 'عام'}</p>
                <p><strong>📅 تاريخ التقديم:</strong> ${dateStr}</p>
            </div>
        </div>

        <div style="background:rgba(0,0,0,0.3); padding:1.2rem; border-radius:8px; margin-bottom:1.5rem; border:1px solid rgba(255,255,255,0.06);">
            <h4 style="color:var(--gold); margin-bottom:0.5rem;">📋 موضوع الطلب: ${complaint.subject}</h4>
            <p style="color:#e2e8f0; line-height:1.7; white-space:pre-line;">${complaint.details || 'لا توجد تفاصيل إضافية.'}</p>
        </div>

        ${complaint.officialResponse ? `
        <div style="background:rgba(0,98,51,0.18);border:1px solid rgba(0,168,84,0.35);border-right:4px solid var(--gold);border-radius:8px;padding:14px 18px;margin-bottom:1.5rem;">
            <strong style="color:var(--gold);">🏛️ الرد الرسمي الحالي:</strong>
            <p style="color:#f1f5f9;margin-top:8px;line-height:1.7;white-space:pre-line;">${complaint.officialResponse}</p>
        </div>
        ` : ''}

        <form id="modalResponseForm" onsubmit="handleSaveComplaintResponse(event, '${complaint.id}')">
            <div class="form-group mb-1">
                <label><strong>تحديث حالة الطلب:</strong></label>
                <select id="modalStatusSelect" class="form-control">
                    <option value="new" ${complaint.status === 'new' ? 'selected' : ''}>📩 طلب جديد (تم الاستلام)</option>
                    <option value="pending" ${complaint.status === 'pending' ? 'selected' : ''}>⏳ قيد المعالجة والمساءلة الإدارية</option>
                    <option value="resolved" ${complaint.status === 'resolved' ? 'selected' : ''}>✅ تمت المعالجة والرد النهائي</option>
                    <option value="rejected" ${complaint.status === 'rejected' ? 'selected' : ''}>❌ غير مطابق للاختصاص</option>
                </select>
            </div>

            <div class="form-group mb-2">
                <label><strong>الرد الإداري الرسمي للمكتب البرلماني (يظهر للمواطن عند تتبع طلبه):</strong></label>
                <textarea id="modalOfficialResponse" class="form-control" rows="4" placeholder="اكتب نص الرد الرسمي أو تفاصيل المراسلة الموجهة للهيئة المعنية...">${complaint.officialResponse || ''}</textarea>
            </div>

            <div class="form-group mb-2">
                <label><strong>إضافة ملاحظة متابعة داخلية جديدة:</strong></label>
                <input type="text" id="modalInternalNote" class="form-control" placeholder="مثال: تم الاتصال برئيس الدائرة لمتابعة الملف.">
            </div>

            <div class="d-flex justify-content-end gap-1">
                <button type="button" class="btn btn-outline" onclick="closeComplaintModal()">إلغاء</button>
                <button type="submit" class="btn btn-primary">💾 حفظ التحديث والرد الرسمي في السحابة</button>
            </div>
        </form>
    `;




window.closeComplaintModal = function() {
    const modal = document.getElementById('complaintModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
};

window.handleSaveComplaintResponse = async function(e, id) {
    e.preventDefault();
    const saveBtn = e.target.querySelector('button[type="submit"]');
    if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = '⏳ جاري الحفظ في السحابة...'; }

    const newStatus = document.getElementById('modalStatusSelect').value;
    const officialResp = document.getElementById('modalOfficialResponse').value.trim();
    const internalNote = document.getElementById('modalInternalNote').value.trim();

    // Save to Supabase cloud
    if (window.db && typeof window.db.updateComplaintStatus === 'function') {
        await window.db.updateComplaintStatus(id, newStatus, officialResp);
    } else if (typeof updateComplaintStatus === 'function') {
        updateComplaintStatus(id, newStatus, officialResp, internalNote);
    }

    closeComplaintModal();
    
    // Refresh Table and Stats
    await renderAdminComplaints();
    await loadDashboardStatsAsync();

    if (typeof showToast === 'function') showToast('تم حفظ الرد وتحديث حالة الطلب في السحابة بنجاح! ✅', 'success');
};
