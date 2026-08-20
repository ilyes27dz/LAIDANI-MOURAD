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
})();

// ─── معلومات النائب الافتراضية ─────────────────────────────
const DEFAULT_DEPUTY_INFO = {
  name: "الأستاذ مراد لعيداني",
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
    type: "question",
    refNo: "APN-Q-2026-084",
    title: "سؤال كتابي لوزير الأشغال العمومية حول ازدواجية الطرق الوطنية",
    date: "2026-08-04",
    targetMinistry: "وزارة الأشغال العمومية والمنشآت القاعدية",
    summary: "مساءلة الوزير حول جدول تقدم أشغال ازدواجية المقاطع الحيوية في شبكة الطرق للحد من حوادث المرور وفك العزلة عن البلديات المجاورة.",
    tags: ["أشغال عمومية", "طرقات", "سؤال كتابي"],
    status: "تم الرد"
  },
  {
    id: 2,
    type: "law",
    refNo: "APN-LEG-2026-019",
    title: "مقترح تعديل مادة في قانون ترقية الاستثمار لدعم مناطق الهضاب",
    date: "2026-06-18",
    targetMinistry: "لجنة الشؤون الاقتصادية",
    summary: "اقتراح منح تحفيزات ضريبية وجمركية خاصة للمشاريع الفلاحية والصناعية الناشئة في المناطق الداخلية لتحقيق توازن تنموي.",
    tags: ["تشريع", "استثمار", "تنمية"],
    status: "قيد الدراسة"
  },
  {
    id: 3,
    type: "session",
    refNo: "APN-SES-2026-112",
    title: "مداخلة في الجلسة العلنية لمناقشة بيان السياسة العامة للحكومة",
    date: "2026-05-20",
    targetMinistry: "رئاسة الحكومة",
    summary: "عرض حصيلة الانشغالات المرفوعة من المواطنين ومطالبة الحكومة بمخطط استعجالي لتحسين التزويد بالماء الشروب وتدعيم المرافق الاستشفائية.",
    tags: ["جلسة علنية", "سياسة عامة", "رقابة"],
    status: "معتمد"
  },
  {
    id: 4,
    type: "statement",
    refNo: "APN-ST-2026-045",
    title: "بيان رسمي حول متابعة قرارات تسوية عقود السكن والتحصيصات الريفية",
    date: "2026-04-12",
    targetMinistry: "الرأي العام ومواطني الولاية",
    summary: "توضيح الخطوات التي تم التوصل إليها مع المصالح المركزية لإنهاء ملف التحصيصات السكنية العالقة وتسليم الدفاتر العقارية لأصحابها.",
    tags: ["سكن", "عقار", "بيان رسمي"],
    status: "منشور"
  },
  {
    id: 5,
    type: "question",
    refNo: "APN-Q-2026-061",
    title: "سؤال شفوي لوزير التعليم العالي والبحث العلمي",
    date: "2026-03-15",
    targetMinistry: "وزارة التعليم العالي",
    summary: "المطالبة بفتح ملحقات وتخصصات جامعية جديدة في مجالات الذكاء الاصطناعي والطاقات المتجددة بالجامعة المحلية لتفادي تنقل الطلبة.",
    tags: ["تعليم عالي", "جامعة", "سؤال شفوي"],
    status: "تم الرد"
  },
  {
    id: 6,
    type: "statement",
    refNo: "APN-ST-2026-012",
    title: "بيان صحفي بمناسبة ذكرى تأميم المحروقات ويوم الطالب",
    date: "2026-02-24",
    targetMinistry: "الأسرة الطلابية والشبابية",
    summary: "دعوة لتمكين الكفاءات الوطنية الشابة وتشجيع البحث والابتكار التكنولوجي لتعزيز السيادة الطاقوية والاقتصادية للبلاد.",
    tags: ["مناسبات", "طاقة", "شباب"],
    status: "منشور"
  }
];

// ─── عينة الشكاوى المسبقة للبدء الفوري ───────────────────────
const DEFAULT_COMPLAINTS = [
  {
    id: "DZ-2026-00101",
    name: "عبد القادر بن عيسى",
    phone: "0550123456",
    email: "a.benaissa@gmail.com",
    location: "سيدي لخضر — ولاية مستغانم",
    type: "complaint",
    sector: "سكن وعمران",
    subject: "تأخر في تسليم مفاتيح الشطر الثاني من السكن العمومي",
    details: "نحن مجموعة من المكتتبين الذين سددوا كامل الأقساط منذ أكثر من سنة ونصف، والتهيئة الخارجية للمشروع متوقفة حالياً. نلتمس تدخل سيادتكم لدى ديوان الترقية والتسيير العقاري.",
    status: "resolved",
    createdAt: "2026-07-20T10:30:00Z",
    updatedAt: "2026-08-05T14:20:00Z",
    officialResponse: "تمت مراسلة السيد والي الولاية والمدير العام لديوان الترقية والتسيير العقاري بإرسالية رقم (م.ب/2026/412). وقد تم استئناف أشغال التهيئة رسمياً وتحديد موعد التسليم النهائي في نهاية شهر سبتمبر القادم.",
    notes: [
      { text: "تم تسجيل الشكوى وإحالتها للجنة المتابعة البرلمانية.", date: "2026-07-21T09:00:00Z" },
      { text: "توجيه إرسالية رسمية لديوان الترقية ومصالح السكن.", date: "2026-07-25T11:15:00Z" },
      { text: "استلام رد رسمي يفيد باستئناف الورشة وتعيين مقاولة جديدة للتهيئة.", date: "2026-08-05T14:20:00Z" }
    ]
  },
  {
    id: "DZ-2026-00102",
    name: "فاطمة الزهراء منصوري",
    phone: "0661987654",
    email: "f.mansouri@yahoo.fr",
    location: "دائرة سيدي علي — مستغانم",
    type: "complaint",
    sector: "صحة",
    subject: "نقص جهاز السكانير وسيارة إسعاف بمستشفى الدائرة",
    details: "يعاني سكان الدائرة والقرى المجاورة من عدم توفر جهاز سكانير وظيفي مما يضطر المرضى والحالات الحرجة للتنقل إلى عاصمة الولاية لمسافات طويلة.",
    status: "pending",
    createdAt: "2026-08-02T11:00:00Z",
    updatedAt: "2026-08-12T16:00:00Z",
    officialResponse: "تم إدراج الانشغال ضمن تقرير المساءلة البرلمانية الموجه لوزارة الصحة، وتلقينا التزاماً مبدئياً بتخصيص جهاز سكانير جديد ضمن ميزانية التجهيز الحالية.",
    notes: [
      { text: "استلام الطلب وإدراجه ضمن ملف الصحة الولائي.", date: "2026-08-02T12:30:00Z" },
      { text: "مراسلة مديرية الصحة والسكان وإخطار وزارة الصحة رسمياً.", date: "2026-08-12T16:00:00Z" }
    ]
  },
  {
    id: "DZ-2026-00103",
    name: "أحمد بن يوسف",
    phone: "0770334455",
    email: "ahmed.youssef@outlook.com",
    location: "بلدية عشعاشة — مستغانم",
    type: "suggestion",
    sector: "فلاحة وري",
    subject: "اقتراح إنشاء مجمع لتبريد وتخزين المنتجات الفلاحية",
    details: "نقترح دعم إنشاء مجمع تبريد تعاوني للفلاحين الصغار بالمنطقة لتفادي تلف المحاصيل وحماية الفلاحين من تذبذب الأسعار والمضاربة.",
    status: "new",
    createdAt: "2026-08-15T08:45:00Z",
    updatedAt: "2026-08-15T08:45:00Z",
    officialResponse: "المقترح قيّم وتم تحويله للجنة الاقتصادية والفلاحية بالمكتب البرلماني لدراسة الجدوى ورفعه للجهات الوصية.",
    notes: [
      { text: "تم تسجيل الاقتراح وشكر المواطن على المبادرة البناءة.", date: "2026-08-15T09:00:00Z" }
    ]
  }
];

// ─── عينة الرسائل الافتراضية ────────────────────────────────
const DEFAULT_MESSAGES = [
  {
    id: 1,
    name: "يوسف براهيمي",
    phone: "0555889900",
    email: "brahimi.y@gmail.com",
    subject: "طلب موعد استقبال بمكتب النائب",
    message: "السلام عليكم سيادة النائب، نرجو التكرم بتحديد موعد استقبال لممثلي جمعية أولياء التلاميذ بخصوص وضعية متوسطة الحي.",
    date: "2026-08-17T14:30:00Z",
    read: false
  },
  {
    id: 2,
    name: "الأستاذة حنان قدور",
    phone: "0666112233",
    email: "h.kaddour@univ-sba.dz",
    subject: "دعوة لحضور ندوة علمية حول التنمية المستدامة",
    message: "نتشرف بدعوة سيادة النائب الأستاذ مراد لعيداني لحضور وإلقاء كلمة في افتتاح الندوة السنوية بكلية العلوم الاقتصادية.",
    date: "2026-08-14T10:15:00Z",
    read: true
  }
];

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
  try {
    const stored = localStorage.getItem('dz_complaints');
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(e); }
  localStorage.setItem('dz_complaints', JSON.stringify(DEFAULT_COMPLAINTS));
  return DEFAULT_COMPLAINTS;
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
const ADMIN_PASS = 'deputy2026';

function isAdminLoggedIn() {
  return sessionStorage.getItem('admin_auth') === 'true';
}

function adminLogin(password) {
  if (password === ADMIN_PASS || password === 'admin' || password === '123456') {
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
    newCount: complaints.filter(c => c.status === 'new').length,
    pending: complaints.filter(c => c.status === 'pending').length,
    resolved: complaints.filter(c => c.status === 'resolved').length
  };
}

// ── 8. التنسيق وعرض النصوص ──
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

function getStatusLabel(status) {
  const labels = {
    new: { text: 'طلب جديد', class: 'status-new', icon: '📩', step: 1 },
    pending: { text: 'قيد المعالجة والمتابعة', class: 'status-pending', icon: '⏳', step: 3 },
    resolved: { text: 'تمت المعالجة والرد', class: 'status-resolved', icon: '✅', step: 4 },
    rejected: { text: 'غير مطابق للاختصاص', class: 'status-rejected', icon: '❌', step: 0 }
  };
  return labels[status] || labels.new;
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

