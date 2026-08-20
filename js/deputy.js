// ============================================================
// DEPUTY.JS — Deputy Biography, Career Timeline & Program
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const info = (typeof getDeputyInfo === 'function') ? getDeputyInfo() : window.DEPUTY_INFO;
    if (!info) return;

    // 1. Bio & Main Details
    const bioText = document.getElementById('bioText');
    if (bioText) bioText.textContent = info.bio;
    
    const keyFacts = document.getElementById('keyFacts');
    if (keyFacts) {
        keyFacts.innerHTML = `
            <div class="fact-card">
                <div class="fact-title">الاسم الكامل</div>
                <div class="fact-value">${info.name}</div>
            </div>
            <div class="fact-card">
                <div class="fact-title">الدائرة الانتخابية</div>
                <div class="fact-value">${info.region}</div>
            </div>
            <div class="fact-card">
                <div class="fact-title">العهدة التشريعية</div>
                <div class="fact-value">${info.mandate}</div>
            </div>
            <div class="fact-card">
                <div class="fact-title">المهنة السابقة</div>
                <div class="fact-value">محامٍ سابقاً</div>
            </div>
            <div class="fact-card">
                <div class="fact-title">الهيئة النيابية</div>
                <div class="fact-value">${info.party || 'المجلس الشعبي الوطني'}</div>
            </div>
            <div class="fact-card">
                <div class="fact-title">البريد الرسمي</div>
                <div class="fact-value" style="font-size:0.85rem; word-break:break-all;">${info.email}</div>
            </div>
            <div class="fact-card">
                <div class="fact-title">المكتب البرلماني</div>
                <div class="fact-value" style="font-size:0.85rem;">${info.office}</div>
            </div>
        `;
    }

    // 2. Program Cards with Animated Progress Bars
    const programGrid = document.getElementById('programGrid');
    if (programGrid && Array.isArray(info.program)) {
        programGrid.innerHTML = info.program.map(p => `
            <div class="program-card">
                <div class="program-icon">${p.icon || '📌'}</div>
                <h3 class="program-title">${p.title}</h3>
                <p style="color:#94a3b8; font-size:14px; margin-bottom:16px; line-height:1.6;">${p.desc || ''}</p>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" data-progress="${p.progress}" style="width:0%;"></div>
                    </div>
                    <div class="progress-text" style="color:var(--gold); font-weight:700; margin-top:8px;">${p.progress}% إنجاز التعهدات</div>
                </div>
            </div>
        `).join('');
    }

    // 3. Achievements List
    const achievementsList = document.getElementById('achievementsList');
    if (achievementsList && Array.isArray(info.achievements)) {
        achievementsList.innerHTML = info.achievements.map(a => `
            <li class="achievement-item">
                <div class="achievement-icon">✓</div>
                <div class="achievement-text" style="font-size:15px; color:#e2e8f0;">${a}</div>
            </li>
        `).join('');
    }

    // 4. Timeline
    const timelineElem = document.getElementById('timeline');
    const timelineData = info.timeline || [
        { year: '2026', title: 'انطلاق العهدة التشريعية 2026-2031', desc: 'نيل ثقة المواطنين في دائرة سيدي لخضر والبدء في رفع الانشغالات والتنسيق مع الهيئات التنفيذية.' },
        { year: '2026-2027', title: 'عضوية اللجنة القانونية والتشريعية', desc: 'الاستفادة من الخبرة القانونية والمهنة السابقة كمحامٍ لصياغة مقترحات تشريعية دقيقة.' },
        { year: '2027', title: 'إطلاق مبادرة الاستماع الشعبي', desc: 'إنشاء بوابة الشكاوى والتواصل المباشر لخدمة سكان ولاية مستغانم.' },
        { year: '2028', title: 'المصادقة على مشاريع التنمية المحلية', desc: 'تخصيص أغلفة مالية لمشاريع الطرقات والمياه والصحة بسيدي لخضر وضواحيها.' },
        { year: '2029-2031', title: 'مواصلة المتابعة والمساءلة التشريعية', desc: 'متابعة المشاريع قيد الإنجاز وحل الملفات العالقة للمواطنين حتى نهاية العهدة.' }
    ];

    if (timelineElem) {
        timelineElem.innerHTML = timelineData.map(t => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-date">${t.year}</div>
                    <h3 class="timeline-title">${t.title}</h3>
                    ${t.desc ? `<p style="color:#94a3b8; font-size:14px; margin-top:6px; line-height:1.6;">${t.desc}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    // 5. Trigger Progress Bar Animation
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(fill => {
            const progress = fill.getAttribute('data-progress') || 0;
            fill.style.width = `${progress}%`;
            fill.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }, 250);
});

