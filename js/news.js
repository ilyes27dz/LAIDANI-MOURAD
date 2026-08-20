// ============================================================
// NEWS.JS — News & Parliamentary Activities
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const newsGrid = document.getElementById('newsGrid');
    const categoryPills = document.querySelectorAll('.pill');
    const searchInput = document.getElementById('newsSearch');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const modal = document.getElementById('articleModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Modal elements
    const mCategory = document.getElementById('modalCategory');
    const mDate = document.getElementById('modalDate');
    const mTitle = document.getElementById('modalTitle');
    const mBody = document.getElementById('modalBody');

    let currentCategory = 'all';
    let currentSearch = '';
    let visibleCount = 6;

    const getNewsData = () => {
        return (typeof getNews === 'function') ? getNews() : (window.DEFAULT_NEWS || []);
    };

    const renderNews = () => {
        const allData = getNewsData();
        
        let filtered = allData.filter(item => {
            const matchCat = (currentCategory === 'all' || item.category === currentCategory);
            const query = currentSearch.toLowerCase();
            const matchSearch = !query || 
                (item.title && item.title.toLowerCase().includes(query)) ||
                (item.excerpt && item.excerpt.toLowerCase().includes(query)) ||
                (item.content && item.content.toLowerCase().includes(query));
            return matchCat && matchSearch;
        });

        if (!newsGrid) return;
        newsGrid.innerHTML = '';

        if (filtered.length === 0) {
            newsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding: 60px 20px; color: rgba(255,255,255,0.4);">
                    <div style="font-size: 48px; margin-bottom: 12px;">📰</div>
                    <div style="font-size: 18px; font-weight: 600;">لا توجد أخبار تطابق معايير البحث</div>
                    <p style="font-size: 14px; margin-top: 6px;">جرّب اختيار تصنيف آخر أو مسح كلمة البحث</p>
                </div>
            `;
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        const getCategoryIconSvg = (cat) => {
            switch(cat) {
                case 'برلمان':
                    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 18h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2L2 7h20L12 2z"/></svg>`;
                case 'ميداني':
                    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
                case 'صحة':
                    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
                case 'اقتصاد':
                    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
                case 'فلاحة':
                    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/><path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4"/></svg>`;
                case 'وطني':
                    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`;
                default:
                    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
            }
        };

        itemsToShow.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.style.animationDelay = `${index * 0.08}s`;
            
            const iconSvg = getCategoryIconSvg(item.category);
            
            card.innerHTML = `
                <div class="card-icon-header">
                    <div class="news-emblem-badge">
                        ${iconSvg}
                    </div>
                    <span class="news-category-badge">${item.category}</span>
                </div>
                <div class="card-body">
                    <h3>${item.title}</h3>
                    <p>${item.excerpt}</p>
                    <div class="news-card-footer">
                        <span class="news-date">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:6px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            ${formatDate(item.date)}
                        </span>
                        <button class="read-more" onclick="openArticleModal(${item.id})">
                            اقرأ البيان الكامل
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                        </button>
                    </div>
                </div>
            `;
            newsGrid.appendChild(card);
        });

        if (loadMoreBtn) {
            if (visibleCount >= filtered.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
    };

    window.openArticleModal = (id) => {
        const item = getNewsData().find(n => n.id === Number(id));
        if (!item || !modal) return;

        if (mCategory) mCategory.textContent = item.category;
        if (mDate) mDate.textContent = formatDate(item.date);
        if (mTitle) mTitle.textContent = item.title;
        if (mBody) {
            mBody.innerHTML = `
                <div style="font-size: 16px; line-height: 1.8; color: #e2e8f0; margin-bottom: 24px; white-space: pre-line;">
                    ${item.content || item.excerpt}
                </div>
                <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                    <span style="color:var(--gold); font-size:13px;">المكتب الإعلامي للنائب البرلماني الأستاذ مراد لعيداني</span>
                    <button class="btn btn-sm btn-outline" onclick="window.print()">🖨️ طباعة المقال</button>
                </div>
            `;
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    // Events
    categoryPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            categoryPills.forEach(p => p.classList.remove('active'));
            const target = e.target.closest('.pill');
            if (target) {
                target.classList.add('active');
                currentCategory = target.dataset.category;
                visibleCount = 6;
                renderNews();
            }
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.trim();
            visibleCount = 6;
            renderNews();
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 6;
            renderNews();
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Check if URL hash has specific news id
    const hash = window.location.hash;
    if (hash && hash.startsWith('#news-')) {
        const id = hash.replace('#news-', '');
        setTimeout(() => {
            openArticleModal(id);
        }, 300);
    }

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Initial render
    renderNews();
});

