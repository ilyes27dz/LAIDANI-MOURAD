document.addEventListener('DOMContentLoaded', () => {
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Official SVG Icons for Parliamentary Media
    const getMediaIcon = (type) => {
        switch(type) {
            case 'parliament':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M4 18h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2L2 7h20L12 2z"/></svg>`;
            case 'field':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
            case 'citizens':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
            case 'economy':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
            case 'education':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;
            case 'finance':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
            case 'environment':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/><path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4"/></svg>`;
            case 'national':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`;
            case 'health':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
            case 'law':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
            case 'speech':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
            case 'tv':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`;
            case 'question':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
            case 'report':
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`;
            default:
                return `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
        }
    };

    // Official Photos Data (12 items)
    const photos = [
        { id: 1, title: 'جلسة استماع ومساءلة بالمجلس الشعبي الوطني', category: 'النشاط البرلماني', date: '15 أوت 2026', type: 'parliament', height: '280px' },
        { id: 2, title: 'زيارة ميدانية للمشاريع التنموية بدائرة سيدي لخضر', category: 'خرجة ميدانية', date: '10 أوت 2026', type: 'field', height: '320px' },
        { id: 3, title: 'لقاء دوري مع مواطني ولاية مستغانم بمقر المداومة', category: 'استماع واستقبال', date: '05 أوت 2026', type: 'citizens', height: '260px' },
        { id: 4, title: 'المشاركة في منتدى ترقية الاستثمار والاقتصاد الوطني', category: 'الشؤون الاقتصادية', date: '28 جويلية 2026', type: 'economy', height: '300px' },
        { id: 5, title: 'تكريم المتفوقين الأوائل في شهادة البكالوريا بالولاية', category: 'التربية والتعليم', date: '20 جويلية 2026', type: 'education', height: '270px' },
        { id: 6, title: 'اجتماع لجنة المالية والميزانية لدراسة قانون المالية', category: 'العمل التشريعي', date: '12 جويلية 2026', type: 'finance', height: '290px' },
        { id: 7, title: 'حملة تشجير وتوسيع الغطاء النباتي بمستغانم', category: 'البيئة والغابات', date: '05 جويلية 2026', type: 'environment', height: '310px' },
        { id: 8, title: 'مراسم افتتاح الدورة البرلمانية العادية بمقر المجلس', category: 'مراسم رسمية', date: '02 جويلية 2026', type: 'national', height: '280px' },
        { id: 9, title: 'تفقد العيادات متعددة الخدمات والمرافق الصحية', category: 'قطاع الصحة', date: '25 جوان 2026', type: 'health', height: '290px' },
        { id: 10, title: 'جلسة عمل مع جمعيات المجتمع المدني والشباب', category: 'المجتمع المدني', date: '18 جوان 2026', type: 'citizens', height: '300px' },
        { id: 11, title: 'مداخلة حول التعديلات القانونية وحماية حقوق المواطن', category: 'الشؤون القانونية', date: '10 جوان 2026', type: 'law', height: '270px' },
        { id: 12, title: 'زيارة تفقدية لمؤسسات تربوية ومجمعات مدرسية جديدة', category: 'المنشآت العمومية', date: '01 جوان 2026', type: 'education', height: '300px' }
    ];

    // Official Videos Data (6 items)
    const videos = [
        { id: 1, title: 'تدخل النائب الأستاذ مراد لعيداني حول حماية القدرة الشرائية ومشاريع مستغانم', category: 'مداخلة برلمانية', date: '14 أوت 2026', type: 'speech', ytid: 'dQw4w9WgXcQ' },
        { id: 2, title: 'تغطية إعلامية رسمية للزيارة التفقدية لمشاريع دائرة سيدي لخضر', category: 'تقرير تلفزيوني', date: '02 أوت 2026', type: 'tv', ytid: 'dQw4w9WgXcQ' },
        { id: 3, title: 'حوار خاص: استراتيجية دفع عجلة التنمية الفلاحية والساحلية بالولاية', category: 'لقاء إعلامي', date: '20 جويلية 2026', type: 'tv', ytid: 'dQw4w9WgXcQ' },
        { id: 4, title: 'سؤال شفوي لوزير السكن بخصوص تسريع برامج السكن الريفي', category: 'مساءلة وزارية', date: '08 جويلية 2026', type: 'question', ytid: 'dQw4w9WgXcQ' },
        { id: 5, title: 'كلمة النائب بمناسبة إحياء الذكرى الوطنية لعيدي الاستقلال والشباب', category: 'خطاب وطني', date: '05 جويلية 2026', type: 'national', ytid: 'dQw4w9WgXcQ' },
        { id: 6, title: 'عرض الحصيلة النيابية لنشاطات النائب خلال الدورة البرلمانية', category: 'تقرير الحصيلة', date: '30 جوان 2026', type: 'report', ytid: 'dQw4w9WgXcQ' }
    ];

    // Render Photos
    const photosGrid = document.getElementById('photosGrid');
    if (photosGrid) {
        photosGrid.innerHTML = '';
        photos.forEach((photo, index) => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.setAttribute('data-index', index);
            
            card.innerHTML = `
                <div class="photo-placeholder-official" style="min-height: ${photo.height};">
                    <div class="media-emblem-seal">
                        ${getMediaIcon(photo.type)}
                    </div>
                    <span class="media-tag-badge">${photo.category}</span>
                </div>
                <div class="photo-overlay-official">
                    <span class="media-category-label">${photo.category}</span>
                    <h3>${photo.title}</h3>
                    <p class="media-date">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        ${photo.date}
                    </p>
                </div>
            `;
            photosGrid.appendChild(card);
        });
    }

    // Render Videos
    const videosGrid = document.getElementById('videosGrid');
    if (videosGrid) {
        videosGrid.innerHTML = '';
        videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.setAttribute('data-ytid', video.ytid);
            
            card.innerHTML = `
                <div class="video-thumbnail-official">
                    <div class="media-emblem-seal">
                        ${getMediaIcon(video.type)}
                    </div>
                    <div class="play-button-official" title="مشاهدة الفيديو">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                    <span class="media-tag-badge">${video.category}</span>
                </div>
                <div class="video-info">
                    <span class="media-category-label">${video.category}</span>
                    <h3>${video.title}</h3>
                    <p class="media-date">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        ${video.date}
                    </p>
                </div>
            `;
            videosGrid.appendChild(card);
        });
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImgContainer = document.getElementById('lightboxImgContainer');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const navPrev = document.querySelector('.lightbox-nav.prev');
    const navNext = document.querySelector('.lightbox-nav.next');
    
    let currentPhotoIndex = 0;

    function openLightbox(index) {
        currentPhotoIndex = index;
        updateLightbox();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function updateLightbox() {
        const photo = photos[currentPhotoIndex];
        if (!photo) return;
        lightboxImgContainer.innerHTML = `
            <div style="width:140px; height:140px; border-radius:28px; background:linear-gradient(135deg, rgba(0,98,51,0.5), rgba(0,30,15,0.9)); border:2px solid var(--gold); display:flex; align-items:center; justify-content:center; color:var(--gold); box-shadow:0 10px 40px rgba(0,0,0,0.6), inset 0 0 25px rgba(201,162,39,0.2);">
                ${getMediaIcon(photo.type)}
            </div>
            <div style="margin-top:20px; font-size:14px; color:var(--gold); font-weight:700; text-transform:uppercase; letter-spacing:1px;">
                ${photo.category}
            </div>
        `;
        lightboxCaption.innerHTML = `<h3 style="color:#fff; margin-bottom:6px; font-size:18px;">${photo.title}</h3><span style="color:#94a3b8; font-size:14px;">📅 ${photo.date}</span>`;
    }

    // Photo Click Event
    document.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.getAttribute('data-index'));
            openLightbox(index);
        });
    });

    // Close Lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Navigation
    navPrev.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex > 0) ? currentPhotoIndex - 1 : photos.length - 1;
        updateLightbox();
    });

    navNext.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex < photos.length - 1) ? currentPhotoIndex + 1 : 0;
        updateLightbox();
    });

    // Video Modal Functionality
    const videoModal = document.getElementById('videoModal');
    const videoClose = document.querySelector('.video-close');
    const videoIframe = document.getElementById('videoIframe');

    // Video Click Event
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const ytid = card.getAttribute('data-ytid');
            videoIframe.src = `https://www.youtube.com/embed/${ytid}?autoplay=1`;
            videoModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Video Modal
    videoClose.addEventListener('click', () => {
        videoModal.style.display = 'none';
        videoIframe.src = ''; // Stop video
        document.body.style.overflow = 'auto';
    });

    // Keyboard Navigation for Lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                currentPhotoIndex = (currentPhotoIndex < photos.length - 1) ? currentPhotoIndex + 1 : 0;
                updateLightbox();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                currentPhotoIndex = (currentPhotoIndex > 0) ? currentPhotoIndex - 1 : photos.length - 1;
                updateLightbox();
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
        if (videoModal && videoModal.style.display === 'block' && e.key === 'Escape') {
            videoModal.style.display = 'none';
            videoIframe.src = '';
            document.body.style.overflow = 'auto';
        }
    });
});

