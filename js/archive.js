// ============================================================
// ARCHIVE.JS — Parliamentary Archive & Records
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const archiveGrid = document.getElementById('archiveGrid');
    const archiveEmpty = document.getElementById('archiveEmpty');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('archiveSearch');
    const modal = document.getElementById('archiveModal');
    const closeModalBtn = document.getElementById('closeArchiveModal');

    // Modal elements
    const mType = document.getElementById('archiveModalType');
    const mDate = document.getElementById('archiveModalDate');
    const mTitle = document.getElementById('archiveModalTitle');
    const mBody = document.getElementById('archiveModalBody');

    let currentFilter = 'all';
    let currentSearch = '';

    const getArchiveData = () => {
        return (typeof getArchive === 'function') ? getArchive() : (window.DEFAULT_ARCHIVE || []);
    };

    const renderArchive = () => {
        const data = getArchiveData();
        const query = currentSearch.toLowerCase();
        
        let filtered = data.filter(item => {
            const matchFilter = currentFilter === 'all' || item.type === currentFilter;
            const matchSearch = !query || 
                (item.title && item.title.toLowerCase().includes(query)) ||
                (item.summary && item.summary.toLowerCase().includes(query)) ||
                (item.refNo && item.refNo.toLowerCase().includes(query)) ||
                (item.targetMinistry && item.targetMinistry.toLowerCase().includes(query)) ||
                (Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(query)));
            return matchFilter && matchSearch;
        });

        if (!archiveGrid) return;
        archiveGrid.innerHTML = '';

        if (filtered.length === 0) {
            archiveGrid.classList.add('hidden');
            if (archiveEmpty) archiveEmpty.classList.remove('hidden');
        } else {
            archiveGrid.classList.remove('hidden');
            if (archiveEmpty) archiveEmpty.classList.add('hidden');
            
            filtered.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'archive-card';
                card.style.animationDelay = `${index * 0.08}s`;
                card.style.cursor = 'pointer';
                
                const typeObj = getTypeLabel(item.type);
                const tagsList = Array.isArray(item.tags) ? item.tags : [];
                const tagsHtml = tagsList.map(tag => `<span class="tag-chip">#${tag}</span>`).join('');
                
                card.innerHTML = `
                    <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="type-badge ${typeObj.class}">${typeObj.icon} ${typeObj.text}</span>
                        ${item.refNo ? `<span style="font-size:11px; color:var(--gold); font-family:monospace;">${item.refNo}</span>` : ''}
                    </div>
                    <h3 style="margin-top:12px;">${item.title}</h3>
                    <p style="color:#94a3b8; line-height:1.6;">${item.summary}</p>
                    ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
                    <div class="card-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
                        <span>📅 ${formatDate(item.date)}</span>
                        <span style="color:var(--gold); font-size:13px; font-weight:600;">عرض الوثيقة ←</span>
                    </div>
                `;
                
                card.addEventListener('click', () => openArchiveModal(item.id));
                archiveGrid.appendChild(card);
            });
        }
    };

    window.openArchiveModal = (id) => {
        const item = getArchiveData().find(a => a.id === Number(id));
        if (!item || !modal) return;

        const typeObj = getTypeLabel(item.type);
        if (mType) mType.textContent = `${typeObj.icon} ${typeObj.text}`;
        if (mDate) mDate.textContent = formatDate(item.date);
        if (mTitle) mTitle.textContent = item.title;

        if (mBody) {
            const tagsList = Array.isArray(item.tags) ? item.tags : [];
            mBody.innerHTML = `
                <div style="background:rgba(0,0,0,0.25); padding:16px; border-radius:8px; margin-bottom:20px; border:1px solid rgba(255,255,255,0.06);">
                    ${item.refNo ? `<p style="margin-bottom:8px;"><strong>رقم التسجيل البرلماني:</strong> <code style="color:var(--gold); font-size:14px;">${item.refNo}</code></p>` : ''}
                    ${item.targetMinistry ? `<p style="margin-bottom:8px;"><strong>الجهة المعنية / المخاطبة:</strong> ${item.targetMinistry}</p>` : ''}
                    <p><strong>الصفة:</strong> الأستاذ مراد لعيداني — نائب بالمجلس الشعبي الوطني</p>
                </div>

                <div style="font-size:15px; line-height:1.8; color:#e2e8f0; margin-bottom:20px; white-space:pre-line;">
                    ${item.summary}
                </div>

                ${tagsList.length ? `
                    <div style="margin-bottom:20px;">
                        <span style="font-size:12px; color:rgba(255,255,255,0.5);">التصنيفات:</span>
                        ${tagsList.map(t => `<span class="tag-chip" style="margin-right:4px;">#${t}</span>`).join('')}
                    </div>
                ` : ''}

                <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="color:var(--gold); font-size:12px;">المجلس الشعبي الوطني الجزائري 🇩🇿</span>
                    <button class="btn btn-sm btn-outline" onclick="window.print()">🖨️ طباعة الوثيقة</button>
                </div>
            `;
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const closeArchiveModal = () => {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            const target = e.target.closest('.filter-btn');
            if (target) {
                target.classList.add('active');
                currentFilter = target.dataset.filter;
                renderArchive();
            }
        });
    });

    // Search Input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.trim();
            renderArchive();
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeArchiveModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeArchiveModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeArchiveModal();
        }
    });

    // Initial render
    renderArchive();
});

