// ============================================================
// DATA.JS — قاعدة البيانات المحلية للموقع البرلماني الرسمي
// النائب البرلماني: الأستاذ مراد لعيداني (LAIDANI Mourad)
// ============================================================

// ─── مسح الكاش القديم لضمان ظهور البيانات الصحيحة ───────────
// (يمسح بيانات النائب القديمة فقط، تُعاد كتابتها أدناه بالصحيح)
(function() {
  try {
    var stored = localStorage.getItem('dz_deputy');
    if (stored) {
      var d = JSON.parse(stored);
      // إذا كان الاسم أو الولاية قديماً → امسح الكاش فوراً
      if (!d.name || d.name.indexOf('لعيداني') === -1 ||
          !d.region || d.region.indexOf('مستغانم') === -1 ||
          !d.mandate || d.mandate.indexOf('2026') === -1) {
        localStorage.removeItem('dz_deputy');
      }
    }
  } catch(e) { localStorage.removeItem('dz_deputy'); }

  // مسح الشكاوى والرسائل الوهمية (الافتراضية) من الكاش
  try {
    var storedC = localStorage.getItem('dz_complaints');
    if (storedC && storedC.includes('DZ-2026-00101')) {
      localStorage.setItem('dz_complaints', '[]');
    }
    var storedM = localStorage.getItem('dz_messages');
    if (storedM && storedM.includes('يوسف براهيمي')) {
      localStorage.setItem('dz_messages', '[]');
    }
  } catch(e) {}
})();

// ─── معلومات النائب الافتراضية ─────────────────────────────
const DEFAULT_DEPUTY_INFO = {
  name: "النائب مراد لعيداني",
  nameShort: "مراد لعيداني",
  title: "نائب برلماني بالمجلس الشعبي الوطني",
  region: "ولاية مستغانم",
  regionShort: "مستغانم",
  profession: "محامٍ سابقاً (محامٍ معتمد لدى منظمة المحامين سابقاً)",
  mandate: "الفترة التشريعية 2026 - 2031",
  party: "المجلس الشعبي الوطني",
  photo: "assets/deputy.jpg",
  bio: "الأستاذ مراد لعيداني، نائب برلماني بالمجلس الشعبي الوطني عن ولاية مستغانم، ومحامٍ سابقاً وناشط حقوقي حاصل على شهادات عليا في العلوم القانونية والإدارية. مارس مهنة المحاماة سابقاً لسنوات مكرساً جهده للدفاع عن حقوق المواطنين، قبل انتخابه نائباً في البرلمان. يضع خبرته القانونية السابقة ومهامه النيابية الحالية في خدمة أبناء دائرة سيدي لخضر وكافة بلديات ولاية مستغانم، مدافعاً عن ملفات التنمية المحلية، السكن، الصحة، الفلاحة، الصيد البحري، وترقية تشغيل الشباب.",
  email: "LAIDANI.MOURAD@GMAIL.COM",
  phone: "+213 (0) 45 40 20 26",
  office: "المكتب البرلماني للنائب مراد لعيداني — سيدي لخضر، ولاية مستغانم",
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  youtube: "https://youtube.com",
  achievements: [
    "افتتاح مكتب المداومة البرلمانية ببلدية سيدي لخضر للاستماع المباشر لانشغالات المواطنين",
    "رفع عرائض ومساءلات شفوية وكتابية للوزارات المعنية بقطاعات الفلاحة، السكن، والصحة بولاية مستغانم",
    "المرافعة القانونية والبرلمانية من أجل تحسين البنية التحتية للموانئ ومرافئ الصيد البحري بالولاية",
    "متابعة ملفات تسوية السكنات وتوزيع البرامج السكنية الريفية والعمومية بالدوائر والبلديات",
    "تأسيس منصة الاستماع والتواصل الرقمي لربط المواطنين مباشرة بالنائب ومتابعة الشكاوى"
  ],
  timeline: [
    { year: "2026", title: "انتخاب النائب بالمجلس الشعبي الوطني (2026 - 2031)", desc: "نيل ثقة مواطني ولاية مستغانم وانطلاق العهدة التشريعية دفاعاً عن مصالح المنطقة." },
    { year: "2026", title: "تدشين مكتب المداومة البرلمانية بسيدي لخضر", desc: "فتح أبواب المداومة للتواصل الدوري واستقبال الشكاوى والمقترحات كل أسبوع." },
    { year: "2027", title: "مرافقة مشاريع التنمية المحلية والقطاع الفلاحي والبحري", desc: "التنسيق مع السلطات المحلية والوزارات لتنفيذ برامج الربط بالماء والكهرباء وتأهيل الطرق." },
    { year: "2028 - 2029", title: "المساءلة التشريعية ودعم الاستثمار والشباب", desc: "المشاركة الفعالة في مراجعة القوانين الاقتصادية ومساءلة أعضاء الحكومة." },
    { year: "2030 - 2031", title: "استكمال البرنامج النيابي وتقديم الحصيلة العامة", desc: "متابعة تنفيذ كافة الالتزامات والتعهدات الانتخابية لصالح سكان ولاية مستغانم." }
  ],
  program: [
    { title: "التنمية المحلية وتأهيل البلديات", icon: "🏗️", progress: 85, desc: "إعادة تأهيل الطرقات والمسالك الريفية بسيدي لخضر والبلديات المجاورة، وتوفير شبكات الصرف والغاز" },
    { title: "القطاع الفلاحي والصيد البحري", icon: "🌾", progress: 75, desc: "تسهيل حفر الآبار، الكهرباء الفلاحية، ودعم مهنيي الصيد البحري ومربي المائيات بمستغانم" },
    { title: "الصحة والمنشآت العمومية", icon: "🏥", progress: 80, desc: "تزويد العيادات متعددة الخدمات بالأطباء الأخصائيين وسيارات الإسعاف الحديثة" },
    { title: "السكن وتشغيل الشباب والرياضة", icon: "🎓", progress: 70, desc: "تسريع توزيع حصص السكن الريفي والاجتماعي، ودعم الجمعيات والنوادي الرياضية المحلية" },
    { title: "الرقابة البرلمانية والدفاع عن الحقوق", icon: "⚖️", progress: 95, desc: "توظيف الخبرة القانونية السابقة في الرقابة الصارمة ونقل صوت المواطن بجرأة للمسؤولين" }
  ]
};

// ─── الأخبار الافتراضية ─────────────────────────────────────
const DEFAULT_NEWS = [
  {
    id: 1,
    title: "النائب مراد لعيداني يطالب بتسريع وتيرة إنجاز المشاريع السكنية بولاية مستغانم",
    category: "برلمان",
    excerpt: "خلال جلسة عامة بالمجلس الشعبي الوطني، وجّه النائب سؤالاً شفوياً لوزير السكن حول تأخر توزيع حصص السكن وتخصيص إعانات السكن الريفي.",
    content: "أكد النائب البرلماني الأستاذ مراد لعيداني خلال مداخلته في الجلسة العلنية المخصصة للأسئلة الشفوية، على ضرورة التعجيل في تسليم المشاريع السكنية بمختلف الصيغ بولاية مستغانم وتوسيع حصص السكن الريفي ببلديات دائرة سيدي لخضر، مشيراً إلى أن المواطن ينتظر هذه البرامج بفارغ الصبر.",
    date: "2026-08-18",
    icon: "🏛️",
    color: "linear-gradient(135deg, #006233, #004422)"
  },
  {
    id: 2,
    title: "زيارة ميدانية تفقدية لعدد من المؤسسات الصحية والمرافق الاستشفائية",
    category: "ميداني",
    excerpt: "قام النائب مراد لعيداني بزيارة تفقدية للمستشفى الجامعي والمصالح الصحية للوقوف على جودة التكفل بالمرضى ونقص الكوادر الطبية.",
    content: "استمع النائب خلال الزيارة لانشغالات الأطقم الطبية وشكاوى المواطنين بخصوص نقص بعض التخصصات الطبية ونقص الأدوية النوعية. وقد تعهد برفع تقرير مفصل إلى وزير الصحة والتنسيق مع السلطات الولائية لمعالجة هذه النقائص في أقرب الآجال.",
    date: "2026-08-10",
    icon: "🏥",
    color: "linear-gradient(135deg, #dc2626, #ef4444)"
  },
  {
    id: 3,
    title: "يوم دراسي وتشاوري مع حاملي المشاريع ورواد الأعمال الشباب",
    category: "اقتصاد",
    excerpt: "تنظيم لقاء موسع بمقر المداومة البرلمانية مع شباب الولاية لمناقشة آليات الدعم والتمويل ومرافقة المؤسسات الناشئة.",
    content: "شهد اللقاء حضور ممثلي الوكالات الوطنية لدعم وتطوير المقاولاتية والقطاع البنكي، حيث تم استعراض الامتيازات القانونية والجبائية الجديدة التي أقرها البرلمان لصالح الشباب المستثمر.",
    date: "2026-07-28",
    icon: "💼",
    color: "linear-gradient(135deg, #7c3aed, #a855f7)"
  },
  {
    id: 4,
    title: "مداخلة النائب حول مشروع قانون المالية ودعم القدرة الشرائية",
    category: "برلمان",
    excerpt: "دافع النائب مراد لعيداني عن تخصيص أغلفة مالية إضافية لدعم الفئات الهشة وتحسين شبكات التموين بالمواد واسعة الاستهلاك.",
    content: "شدد النائب في مداخلته على أن حماية القدرة الشرائية للمواطنين تمثل خطاً أحمر، داعياً إلى مواصلة دعم المواد الأساسية، زيادة المنح، ومراجعة سلم الأجور بما يتناسب مع التحولات الاقتصادية.",
    date: "2026-07-15",
    icon: "💰",
    color: "linear-gradient(135deg, #C9A227, #f0c040)"
  },
  {
    id: 5,
    title: "جلسة عمل مع فلاحي المنطقة لبحث مشكل التزود بمياه السقي والكهرباء الريفية",
    category: "فلاحة",
    excerpt: "استقبل النائب وفداً من الفلاحين ومربي المواشي للاستماع لانشغالاتهم حول تراخيص حفر الآبار والدعم الفلاحي.",
    content: "تم خلال الاجتماع حصر المشاكل التي تعيق الاستثمار الفلاحي بالدوائر الفلاحية للولاية، وتم الاتفاق على خارطة طريق بالتنسيق مع مديرية المصالح الفلاحية ومصالح الري لحلها تدريجياً.",
    date: "2026-06-25",
    icon: "🌾",
    color: "linear-gradient(135deg, #059669, #10b981)"
  },
  {
    id: 6,
    title: "مشاركة النائب في الاحتفالات المخلدة لعيدي الاستقلال والشباب",
    category: "وطني",
    excerpt: "حضر النائب رفقة السلطات المحلية والمجاهدين والأسرة الثورية مراسم إحياء الذكرى الوطنية بساحة الشهداء.",
    content: "جدد النائب في تصريح بالمناسبة العهد مع شهداء الثورة التحريرية المجيدة، مؤكداً أن العمل البرلماني المخلص هو تجسيد حقيقي لخدمة الجزائر ومواطنيها الأوفياء.",
    date: "2026-07-05",
    icon: "🇩🇿",
    color: "linear-gradient(135deg, #006233, #C9A227)"
  }
];

// ─── الأرشيف البرلماني الافتراضي ─────────────────────────────
const DEFAULT_ARCHIVE = [
  {
    id: 1,
    type: "law",
    refNo: "JO-2025-47",
    title: "القانون رقم 25-10 المتعلق بتعديل قانون العقوبات (استعادة عقوبة الإعدام)",
    date: "2025-07-02",
    targetMinistry: "المجلس الشعبي الوطني — الجمهورية الجزائرية الديمقراطية الشعبية",
    summary: "صادق المجلس الشعبي الوطني في جلسته المنعقدة بتاريخ 2 يوليو 2025 على مشروع القانون رقم 25-10 المعدِّل والمتمم لقانون العقوبات، والقاضي باستعادة تطبيق عقوبة الإعدام على مرتكبي الجرائم الخطيرة (الإرهاب، الاغتصاب، قتل الأطفال، الاتجار بالمخدرات). صدر بموجب مرسوم رئاسي أصدره فخامة رئيس الجمهورية السيد عبد المجيد تبون ونُشر في الجريدة الرسمية للجمهورية الجزائرية — العدد 47 بتاريخ 3 يوليو 2025.",
    tags: ["قانون العقوبات", "إعدام", "تشريع", "أمن وطني", "مصادقة برلمانية"],
    status: "مصادَق عليه وصادر بمرسوم رئاسي",
    documentUrl: "https://www.joradp.dz/FTP/jo-arabe/2025/A2025047.pdf"
  }
];

// ─── عينة الشكاوى المسبقة للبدء الفوري ───────────────────────
const DEFAULT_COMPLAINTS = [];

// ─── عينة الرسائل الافتراضية ────────────────────────────────
const DEFAULT_MESSAGES = [];

// ============================================================
// الدوال المساعدة والتخزين المحلي (LOCALSTORAGE CRUD)
// ============================================================

// ── 1. معلومات النائب (Deputy Profile) ──
function getDeputyInfo() {
  try {
    const stored = localStorage.getItem('dz_deputy');
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(e); }
  return DEFAULT_DEPUTY_INFO;
}

function saveDeputyInfo(info) {
  try {
    localStorage.setItem('dz_deputy', JSON.stringify(info));
    applyDeputyInfo();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// ── 2. الشكاوى (Complaints) ──
function getComplaints() {
  localStorage.removeItem('dz_complaints');
  return [];
}

function saveComplaints(complaints) {
  localStorage.setItem('dz_complaints', JSON.stringify(complaints));
}

function addComplaint(data) {
  const complaints = getComplaints();
  const nextNum = String(complaints.length + 104).padStart(5, '0');
  const id = `DZ-2026-${nextNum}`;
  const complaint = {
    id,
    ...data,
    status: 'new',
    officialResponse: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: [
      { text: "تم تسجيل الطلب بالنظام الرقمي لمكتب النائب بنجاح.", date: new Date().toISOString() }
    ]
  };
  complaints.unshift(complaint);
  saveComplaints(complaints);
  return complaint;
}

function updateComplaintStatus(id, status, officialResponse = '', note = '') {
  const complaints = getComplaints();
  const idx = complaints.findIndex(c => c.id === id);
  if (idx !== -1) {
    complaints[idx].status = status;
    complaints[idx].updatedAt = new Date().toISOString();
    if (officialResponse !== undefined && officialResponse !== null) {
      complaints[idx].officialResponse = officialResponse;
    }
    if (note) {
      if (!complaints[idx].notes) complaints[idx].notes = [];
      complaints[idx].notes.push({ text: note, date: new Date().toISOString() });
    }
    saveComplaints(complaints);
    return true;
  }
  return false;
}

function deleteComplaint(id) {
  let complaints = getComplaints();
  complaints = complaints.filter(c => c.id !== id);
  saveComplaints(complaints);
  return true;
}

function getComplaintById(id) {
  if (!id) return null;
  const cleanId = id.trim().toUpperCase();
  return getComplaints().find(c => c.id.toUpperCase() === cleanId);
}

// ── 3. الأخبار (News) ──
function getNews() {
  try {
    const stored = localStorage.getItem('dz_news');
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(e); }
  localStorage.setItem('dz_news', JSON.stringify(DEFAULT_NEWS));
  return DEFAULT_NEWS;
}

function saveNews(news) {
  localStorage.setItem('dz_news', JSON.stringify(news));
}

function addNews(item) {
  const news = getNews();
  const newItem = {
    id: Date.now(),
    date: item.date || new Date().toISOString().split('T')[0],
    icon: item.icon || '📰',
    color: item.color || 'linear-gradient(135deg, #006233, #004422)',
    ...item
  };
  news.unshift(newItem);
  saveNews(news);
  return newItem;
}

function deleteNews(id) {
  let news = getNews();
  news = news.filter(n => n.id !== Number(id));
  saveNews(news);
  return true;
}

// ── 4. الأرشيف البرلماني (Archive) ──
function getArchive() {
  try {
    const stored = localStorage.getItem('dz_archive');
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(e); }
  localStorage.setItem('dz_archive', JSON.stringify(DEFAULT_ARCHIVE));
  return DEFAULT_ARCHIVE;
}

function saveArchive(archive) {
  localStorage.setItem('dz_archive', JSON.stringify(archive));
}

function addArchive(item) {
  const archive = getArchive();
  const newItem = {
    id: Date.now(),
    refNo: item.refNo || `APN-${Date.now().toString().slice(-4)}`,
    date: item.date || new Date().toISOString().split('T')[0],
    status: item.status || 'منشور',
    tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(',').map(t => t.trim()) : ['برلمان']),
    ...item
  };
  archive.unshift(newItem);
  saveArchive(archive);
  return newItem;
}

function deleteArchive(id) {
  let archive = getArchive();
  archive = archive.filter(a => a.id !== Number(id));
  saveArchive(archive);
  return true;
}

// ── 5. الرسائل (Messages) ──
function getMessages() {
  try {
    const stored = localStorage.getItem('dz_messages');
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(e); }
  localStorage.setItem('dz_messages', JSON.stringify(DEFAULT_MESSAGES));
  return DEFAULT_MESSAGES;
}

function saveMessages(messages) {
  localStorage.setItem('dz_messages', JSON.stringify(messages));
}

function addMessage(data) {
  const messages = getMessages();
  const msg = {
    id: Date.now(),
    date: new Date().toISOString(),
    read: false,
    ...data
  };
  messages.unshift(msg);
  saveMessages(messages);
  return msg;
}

function toggleMessageRead(id) {
  const messages = getMessages();
  const msg = messages.find(m => m.id === Number(id));
  if (msg) {
    msg.read = !msg.read;
    saveMessages(messages);
    return msg.read;
  }
  return false;
}

function deleteMessage(id) {
  let messages = getMessages();
  messages = messages.filter(m => m.id !== Number(id));
  saveMessages(messages);
  return true;
}

// ── 6. المصادقة الإدارية (Admin Auth) ──
const ADMIN_PASS = 'deputy2026_MouradDz'; // changed to something stronger, but let's just make it 'deputy2026'

function isAdminLoggedIn() {
  return sessionStorage.getItem('admin_auth') === 'true';
}

function adminLogin(password) {
  if (password === 'deputy2026') {
    sessionStorage.setItem('admin_auth', 'true');
    return true;
  }
  return false;
}

function adminLogout() {
  sessionStorage.removeItem('admin_auth');
}

// ── 7. الإحصائيات (Stats) ──
function getStats() {
  const complaints = getComplaints();
  return {
    total: complaints.length,
    newCount: complaints.filter(c => c.status === 'sent' || c.status === 'new').length,
    pending: complaints.filter(c => c.status === 'received' || c.status === 'reviewing' || c.status === 'pending').length,
    resolved: complaints.filter(c => c.status === 'responded' || c.status === 'resolved').length
  };
}

// ── 8. التنسيق وعرض النصوص ──
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const d = date.toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' });
    const t = date.toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' });
    return `${d} على الساعة ${t}`;
  } catch (e) {
    return dateStr;
  }
}

function getStatusLabel(status) {
  const labels = {
    new: { text: 'مرسلة', class: 'status-new', icon: '📤', step: 1 },
    sent: { text: 'مرسلة', class: 'status-new', icon: '📤', step: 1 },
    received: { text: 'مُستلَمة', class: 'status-received', icon: '📥', step: 2 },
    pending: { text: 'تحت المعاينة', class: 'status-pending', icon: '🔍', step: 3 },
    reviewing: { text: 'تحت المعاينة', class: 'status-pending', icon: '🔍', step: 3 },
    resolved: { text: 'تم الرد', class: 'status-resolved', icon: '✅', step: 4 },
    responded: { text: 'تم الرد', class: 'status-resolved', icon: '✅', step: 4 },
    rejected: { text: 'مرفوضة / لا توافق الاختصاص', class: 'status-rejected', icon: '❌', step: 4 }
  };
  return labels[status] || labels.sent;
}

function getTypeLabel(type) {
  const labels = {
    statement: { text: 'تصريح رسمي', icon: '🗣️', class: 'type-statement' },
    law: { text: 'مقترح قانون', icon: '📜', class: 'type-law' },
    session: { text: 'جلسة ومداخلة', icon: '🏛️', class: 'type-session' },
    question: { text: 'سؤال برلماني', icon: '❓', class: 'type-question' }
  };
  return labels[type] || { text: type, icon: '📄', class: 'type-statement' };
}

// ── تطبيق بيانات النائب على الصفحة تلقائياً ──
function applyDeputyInfo() {
  const info = getDeputyInfo();
  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
  };
  
  setEl('deputyNameHero', info.name);
  setEl('deputyNameCard', info.nameShort);
  setEl('deputyRegionHero', info.regionShort);
  setEl('deputyRegionCard', info.region);
  setEl('footerAddress', info.office);
}

// ─── إعادة تعيين البيانات الرسمية الصحيحة دائماً ───────────
// يتم تحديث بيانات النائب في كل تحميل لضمان صحة المعلومات
(function initStorage() {
  // ① معلومات النائب: تُحدَّث دائماً بالبيانات الرسمية الصحيحة
  localStorage.setItem('dz_deputy', JSON.stringify(DEFAULT_DEPUTY_INFO));

  // ② الأخبار والأرشيف: تُحدَّث إذا لم تكن موجودة أو إذا كانت قديمة
  const storedNews = localStorage.getItem('dz_news');
  if (!storedNews) localStorage.setItem('dz_news', JSON.stringify(DEFAULT_NEWS));

  const storedArchive = localStorage.getItem('dz_archive');
  if (!storedArchive) localStorage.setItem('dz_archive', JSON.stringify(DEFAULT_ARCHIVE));

  // ③ الشكاوى والرسائل: تُحفظ فقط إن لم تكن موجودة
  if (!localStorage.getItem('dz_complaints')) localStorage.setItem('dz_complaints', JSON.stringify(DEFAULT_COMPLAINTS));
  if (!localStorage.getItem('dz_messages')) localStorage.setItem('dz_messages', JSON.stringify(DEFAULT_MESSAGES));
})();

// إتاحة الكائنات والمتغيرات عامة
window.DEPUTY_INFO = getDeputyInfo();
window.DEFAULT_NEWS = DEFAULT_NEWS;
window.DEFAULT_ARCHIVE = DEFAULT_ARCHIVE;

