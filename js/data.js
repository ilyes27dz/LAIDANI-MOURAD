// ============================================================
// DATA.JS â€” Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø­Ù„ÙŠØ© Ù„Ù„Ù…ÙˆÙ‚Ø¹ Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ Ø§Ù„Ø±Ø³Ù…ÙŠ
// Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ: Ø§Ù„Ø£Ø³ØªØ§Ø° Ù…Ø±Ø§Ø¯ Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠ (LAIDANI Mourad)
// ============================================================

// â”€â”€â”€ Ù…Ø³Ø­ Ø§Ù„ÙƒØ§Ø´ Ø§Ù„Ù‚Ø¯ÙŠÙ… Ù„Ø¶Ù…Ø§Ù† Ø¸Ù‡ÙˆØ± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØµØ­ÙŠØ­Ø© â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// (ÙŠÙ…Ø³Ø­ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø© ÙÙ‚Ø·ØŒ ØªÙØ¹Ø§Ø¯ ÙƒØªØ§Ø¨ØªÙ‡Ø§ Ø£Ø¯Ù†Ø§Ù‡ Ø¨Ø§Ù„ØµØ­ÙŠØ­)
(function() {
  try {
    var stored = localStorage.getItem('dz_deputy');
    if (stored) {
      var d = JSON.parse(stored);
      // Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ø§Ø³Ù… Ø£Ùˆ Ø§Ù„ÙˆÙ„Ø§ÙŠØ© Ù‚Ø¯ÙŠÙ…Ø§Ù‹ â†’ Ø§Ù…Ø³Ø­ Ø§Ù„ÙƒØ§Ø´ ÙÙˆØ±Ø§Ù‹
      if (!d.name || d.name.indexOf('Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠ') === -1 ||
          !d.region || d.region.indexOf('Ù…Ø³ØªØºØ§Ù†Ù…') === -1 ||
          !d.mandate || d.mandate.indexOf('2026') === -1) {
        localStorage.removeItem('dz_deputy');
      }
    }
  } catch(e) { localStorage.removeItem('dz_deputy'); }

  // Ù…Ø³Ø­ Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ ÙˆØ§Ù„Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„ÙˆÙ‡Ù…ÙŠØ© (Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠØ©) Ù…Ù† Ø§Ù„ÙƒØ§Ø´
  try {
    var storedC = localStorage.getItem('dz_complaints');
    if (storedC && storedC.includes('DZ-2026-00101')) {
      localStorage.setItem('dz_complaints', '[]');
    }
    var storedM = localStorage.getItem('dz_messages');
    if (storedM && storedM.includes('ÙŠÙˆØ³Ù Ø¨Ø±Ø§Ù‡ÙŠÙ…ÙŠ')) {
      localStorage.setItem('dz_messages', '[]');
    }
  } catch(e) {}
})();

// â”€â”€â”€ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠØ© â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_DEPUTY_INFO = {
  name: "Ø§Ù„Ù†Ø§Ø¦Ø¨ Ù…Ø±Ø§Ø¯ Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠ",
  nameShort: "Ù…Ø±Ø§Ø¯ Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠ",
  title: "Ù†Ø§Ø¦Ø¨ Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ Ø¨Ø§Ù„Ù…Ø¬Ù„Ø³ Ø§Ù„Ø´Ø¹Ø¨ÙŠ Ø§Ù„ÙˆØ·Ù†ÙŠ",
  region: "ÙˆÙ„Ø§ÙŠØ© Ù…Ø³ØªØºØ§Ù†Ù…",
  regionShort: "Ù…Ø³ØªØºØ§Ù†Ù…",
  profession: "Ù…Ø­Ø§Ù…Ù Ø³Ø§Ø¨Ù‚Ø§Ù‹ (Ù…Ø­Ø§Ù…Ù Ù…Ø¹ØªÙ…Ø¯ Ù„Ø¯Ù‰ Ù…Ù†Ø¸Ù…Ø© Ø§Ù„Ù…Ø­Ø§Ù…ÙŠÙ† Ø³Ø§Ø¨Ù‚Ø§Ù‹)",
  mandate: "Ø§Ù„ÙØªØ±Ø© Ø§Ù„ØªØ´Ø±ÙŠØ¹ÙŠØ© 2026 - 2031",
  party: "Ø§Ù„Ù…Ø¬Ù„Ø³ Ø§Ù„Ø´Ø¹Ø¨ÙŠ Ø§Ù„ÙˆØ·Ù†ÙŠ",
  photo: "assets/deputy.jpg",
  bio: "Ø§Ù„Ø£Ø³ØªØ§Ø° Ù…Ø±Ø§Ø¯ Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠØŒ Ù†Ø§Ø¦Ø¨ Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ Ø¨Ø§Ù„Ù…Ø¬Ù„Ø³ Ø§Ù„Ø´Ø¹Ø¨ÙŠ Ø§Ù„ÙˆØ·Ù†ÙŠ Ø¹Ù† ÙˆÙ„Ø§ÙŠØ© Ù…Ø³ØªØºØ§Ù†Ù…ØŒ ÙˆÙ…Ø­Ø§Ù…Ù Ø³Ø§Ø¨Ù‚Ø§Ù‹ ÙˆÙ†Ø§Ø´Ø· Ø­Ù‚ÙˆÙ‚ÙŠ Ø­Ø§ØµÙ„ Ø¹Ù„Ù‰ Ø´Ù‡Ø§Ø¯Ø§Øª Ø¹Ù„ÙŠØ§ ÙÙŠ Ø§Ù„Ø¹Ù„ÙˆÙ… Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© ÙˆØ§Ù„Ø¥Ø¯Ø§Ø±ÙŠØ©. Ù…Ø§Ø±Ø³ Ù…Ù‡Ù†Ø© Ø§Ù„Ù…Ø­Ø§Ù…Ø§Ø© Ø³Ø§Ø¨Ù‚Ø§Ù‹ Ù„Ø³Ù†ÙˆØ§Øª Ù…ÙƒØ±Ø³Ø§Ù‹ Ø¬Ù‡Ø¯Ù‡ Ù„Ù„Ø¯ÙØ§Ø¹ Ø¹Ù† Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ù…ÙˆØ§Ø·Ù†ÙŠÙ†ØŒ Ù‚Ø¨Ù„ Ø§Ù†ØªØ®Ø§Ø¨Ù‡ Ù†Ø§Ø¦Ø¨Ø§Ù‹ ÙÙŠ Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†. ÙŠØ¶Ø¹ Ø®Ø¨Ø±ØªÙ‡ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© Ø§Ù„Ø³Ø§Ø¨Ù‚Ø© ÙˆÙ…Ù‡Ø§Ù…Ù‡ Ø§Ù„Ù†ÙŠØ§Ø¨ÙŠØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ© ÙÙŠ Ø®Ø¯Ù…Ø© Ø£Ø¨Ù†Ø§Ø¡ Ø¯Ø§Ø¦Ø±Ø© Ø³ÙŠØ¯ÙŠ Ù„Ø®Ø¶Ø± ÙˆÙƒØ§ÙØ© Ø¨Ù„Ø¯ÙŠØ§Øª ÙˆÙ„Ø§ÙŠØ© Ù…Ø³ØªØºØ§Ù†Ù…ØŒ Ù…Ø¯Ø§ÙØ¹Ø§Ù‹ Ø¹Ù† Ù…Ù„ÙØ§Øª Ø§Ù„ØªÙ†Ù…ÙŠØ© Ø§Ù„Ù…Ø­Ù„ÙŠØ©ØŒ Ø§Ù„Ø³ÙƒÙ†ØŒ Ø§Ù„ØµØ­Ø©ØŒ Ø§Ù„ÙÙ„Ø§Ø­Ø©ØŒ Ø§Ù„ØµÙŠØ¯ Ø§Ù„Ø¨Ø­Ø±ÙŠØŒ ÙˆØªØ±Ù‚ÙŠØ© ØªØ´ØºÙŠÙ„ Ø§Ù„Ø´Ø¨Ø§Ø¨.",
  email: "LAIDANI.MOURAD@GMAIL.COM",
  phone: "+213 (0) 45 40 20 26",
  office: "Ø§Ù„Ù…ÙƒØªØ¨ Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ Ù„Ù„Ù†Ø§Ø¦Ø¨ Ù…Ø±Ø§Ø¯ Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠ â€” Ø³ÙŠØ¯ÙŠ Ù„Ø®Ø¶Ø±ØŒ ÙˆÙ„Ø§ÙŠØ© Ù…Ø³ØªØºØ§Ù†Ù…",
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  youtube: "https://youtube.com",
  achievements: [
    "Ø§ÙØªØªØ§Ø­ Ù…ÙƒØªØ¨ Ø§Ù„Ù…Ø¯Ø§ÙˆÙ…Ø© Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠØ© Ø¨Ø¨Ù„Ø¯ÙŠØ© Ø³ÙŠØ¯ÙŠ Ù„Ø®Ø¶Ø± Ù„Ù„Ø§Ø³ØªÙ…Ø§Ø¹ Ø§Ù„Ù…Ø¨Ø§Ø´Ø± Ù„Ø§Ù†Ø´ØºØ§Ù„Ø§Øª Ø§Ù„Ù…ÙˆØ§Ø·Ù†ÙŠÙ†",
    "Ø±ÙØ¹ Ø¹Ø±Ø§Ø¦Ø¶ ÙˆÙ…Ø³Ø§Ø¡Ù„Ø§Øª Ø´ÙÙˆÙŠØ© ÙˆÙƒØªØ§Ø¨ÙŠØ© Ù„Ù„ÙˆØ²Ø§Ø±Ø§Øª Ø§Ù„Ù…Ø¹Ù†ÙŠØ© Ø¨Ù‚Ø·Ø§Ø¹Ø§Øª Ø§Ù„ÙÙ„Ø§Ø­Ø©ØŒ Ø§Ù„Ø³ÙƒÙ†ØŒ ÙˆØ§Ù„ØµØ­Ø© Ø¨ÙˆÙ„Ø§ÙŠØ© Ù…Ø³ØªØºØ§Ù†Ù…",
    "Ø§Ù„Ù…Ø±Ø§ÙØ¹Ø© Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© ÙˆØ§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠØ© Ù…Ù† Ø£Ø¬Ù„ ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø¨Ù†ÙŠØ© Ø§Ù„ØªØ­ØªÙŠØ© Ù„Ù„Ù…ÙˆØ§Ù†Ø¦ ÙˆÙ…Ø±Ø§ÙØ¦ Ø§Ù„ØµÙŠØ¯ Ø§Ù„Ø¨Ø­Ø±ÙŠ Ø¨Ø§Ù„ÙˆÙ„Ø§ÙŠØ©",
    "Ù…ØªØ§Ø¨Ø¹Ø© Ù…Ù„ÙØ§Øª ØªØ³ÙˆÙŠØ© Ø§Ù„Ø³ÙƒÙ†Ø§Øª ÙˆØªÙˆØ²ÙŠØ¹ Ø§Ù„Ø¨Ø±Ø§Ù…Ø¬ Ø§Ù„Ø³ÙƒÙ†ÙŠØ© Ø§Ù„Ø±ÙŠÙÙŠØ© ÙˆØ§Ù„Ø¹Ù…ÙˆÙ…ÙŠØ© Ø¨Ø§Ù„Ø¯ÙˆØ§Ø¦Ø± ÙˆØ§Ù„Ø¨Ù„Ø¯ÙŠØ§Øª",
    "ØªØ£Ø³ÙŠØ³ Ù…Ù†ØµØ© Ø§Ù„Ø§Ø³ØªÙ…Ø§Ø¹ ÙˆØ§Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„Ø±Ù‚Ù…ÙŠ Ù„Ø±Ø¨Ø· Ø§Ù„Ù…ÙˆØ§Ø·Ù†ÙŠÙ† Ù…Ø¨Ø§Ø´Ø±Ø© Ø¨Ø§Ù„Ù†Ø§Ø¦Ø¨ ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰"
  ],
  timeline: [
    { year: "2026", title: "Ø§Ù†ØªØ®Ø§Ø¨ Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø¨Ø§Ù„Ù…Ø¬Ù„Ø³ Ø§Ù„Ø´Ø¹Ø¨ÙŠ Ø§Ù„ÙˆØ·Ù†ÙŠ (2026 - 2031)", desc: "Ù†ÙŠÙ„ Ø«Ù‚Ø© Ù…ÙˆØ§Ø·Ù†ÙŠ ÙˆÙ„Ø§ÙŠØ© Ù…Ø³ØªØºØ§Ù†Ù… ÙˆØ§Ù†Ø·Ù„Ø§Ù‚ Ø§Ù„Ø¹Ù‡Ø¯Ø© Ø§Ù„ØªØ´Ø±ÙŠØ¹ÙŠØ© Ø¯ÙØ§Ø¹Ø§Ù‹ Ø¹Ù† Ù…ØµØ§Ù„Ø­ Ø§Ù„Ù…Ù†Ø·Ù‚Ø©." },
    { year: "2026", title: "ØªØ¯Ø´ÙŠÙ† Ù…ÙƒØªØ¨ Ø§Ù„Ù…Ø¯Ø§ÙˆÙ…Ø© Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠØ© Ø¨Ø³ÙŠØ¯ÙŠ Ù„Ø®Ø¶Ø±", desc: "ÙØªØ­ Ø£Ø¨ÙˆØ§Ø¨ Ø§Ù„Ù…Ø¯Ø§ÙˆÙ…Ø© Ù„Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„Ø¯ÙˆØ±ÙŠ ÙˆØ§Ø³ØªÙ‚Ø¨Ø§Ù„ Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ ÙˆØ§Ù„Ù…Ù‚ØªØ±Ø­Ø§Øª ÙƒÙ„ Ø£Ø³Ø¨ÙˆØ¹." },
    { year: "2027", title: "Ù…Ø±Ø§ÙÙ‚Ø© Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„ØªÙ†Ù…ÙŠØ© Ø§Ù„Ù…Ø­Ù„ÙŠØ© ÙˆØ§Ù„Ù‚Ø·Ø§Ø¹ Ø§Ù„ÙÙ„Ø§Ø­ÙŠ ÙˆØ§Ù„Ø¨Ø­Ø±ÙŠ", desc: "Ø§Ù„ØªÙ†Ø³ÙŠÙ‚ Ù…Ø¹ Ø§Ù„Ø³Ù„Ø·Ø§Øª Ø§Ù„Ù…Ø­Ù„ÙŠØ© ÙˆØ§Ù„ÙˆØ²Ø§Ø±Ø§Øª Ù„ØªÙ†ÙÙŠØ° Ø¨Ø±Ø§Ù…Ø¬ Ø§Ù„Ø±Ø¨Ø· Ø¨Ø§Ù„Ù…Ø§Ø¡ ÙˆØ§Ù„ÙƒÙ‡Ø±Ø¨Ø§Ø¡ ÙˆØªØ£Ù‡ÙŠÙ„ Ø§Ù„Ø·Ø±Ù‚." },
    { year: "2028 - 2029", title: "Ø§Ù„Ù…Ø³Ø§Ø¡Ù„Ø© Ø§Ù„ØªØ´Ø±ÙŠØ¹ÙŠØ© ÙˆØ¯Ø¹Ù… Ø§Ù„Ø§Ø³ØªØ«Ù…Ø§Ø± ÙˆØ§Ù„Ø´Ø¨Ø§Ø¨", desc: "Ø§Ù„Ù…Ø´Ø§Ø±ÙƒØ© Ø§Ù„ÙØ¹Ø§Ù„Ø© ÙÙŠ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù‚ÙˆØ§Ù†ÙŠÙ† Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ÙŠØ© ÙˆÙ…Ø³Ø§Ø¡Ù„Ø© Ø£Ø¹Ø¶Ø§Ø¡ Ø§Ù„Ø­ÙƒÙˆÙ…Ø©." },
    { year: "2030 - 2031", title: "Ø§Ø³ØªÙƒÙ…Ø§Ù„ Ø§Ù„Ø¨Ø±Ù†Ø§Ù…Ø¬ Ø§Ù„Ù†ÙŠØ§Ø¨ÙŠ ÙˆØªÙ‚Ø¯ÙŠÙ… Ø§Ù„Ø­ØµÙŠÙ„Ø© Ø§Ù„Ø¹Ø§Ù…Ø©", desc: "Ù…ØªØ§Ø¨Ø¹Ø© ØªÙ†ÙÙŠØ° ÙƒØ§ÙØ© Ø§Ù„Ø§Ù„ØªØ²Ø§Ù…Ø§Øª ÙˆØ§Ù„ØªØ¹Ù‡Ø¯Ø§Øª Ø§Ù„Ø§Ù†ØªØ®Ø§Ø¨ÙŠØ© Ù„ØµØ§Ù„Ø­ Ø³ÙƒØ§Ù† ÙˆÙ„Ø§ÙŠØ© Ù…Ø³ØªØºØ§Ù†Ù…." }
  ],
  program: [
    { title: "Ø§Ù„ØªÙ†Ù…ÙŠØ© Ø§Ù„Ù…Ø­Ù„ÙŠØ© ÙˆØªØ£Ù‡ÙŠÙ„ Ø§Ù„Ø¨Ù„Ø¯ÙŠØ§Øª", icon: "ðŸ—ï¸", progress: 85, desc: "Ø¥Ø¹Ø§Ø¯Ø© ØªØ£Ù‡ÙŠÙ„ Ø§Ù„Ø·Ø±Ù‚Ø§Øª ÙˆØ§Ù„Ù…Ø³Ø§Ù„Ùƒ Ø§Ù„Ø±ÙŠÙÙŠØ© Ø¨Ø³ÙŠØ¯ÙŠ Ù„Ø®Ø¶Ø± ÙˆØ§Ù„Ø¨Ù„Ø¯ÙŠØ§Øª Ø§Ù„Ù…Ø¬Ø§ÙˆØ±Ø©ØŒ ÙˆØªÙˆÙÙŠØ± Ø´Ø¨ÙƒØ§Øª Ø§Ù„ØµØ±Ù ÙˆØ§Ù„ØºØ§Ø²" },
    { title: "Ø§Ù„Ù‚Ø·Ø§Ø¹ Ø§Ù„ÙÙ„Ø§Ø­ÙŠ ÙˆØ§Ù„ØµÙŠØ¯ Ø§Ù„Ø¨Ø­Ø±ÙŠ", icon: "ðŸŒ¾", progress: 75, desc: "ØªØ³Ù‡ÙŠÙ„ Ø­ÙØ± Ø§Ù„Ø¢Ø¨Ø§Ø±ØŒ Ø§Ù„ÙƒÙ‡Ø±Ø¨Ø§Ø¡ Ø§Ù„ÙÙ„Ø§Ø­ÙŠØ©ØŒ ÙˆØ¯Ø¹Ù… Ù…Ù‡Ù†ÙŠÙŠ Ø§Ù„ØµÙŠØ¯ Ø§Ù„Ø¨Ø­Ø±ÙŠ ÙˆÙ…Ø±Ø¨ÙŠ Ø§Ù„Ù…Ø§Ø¦ÙŠØ§Øª Ø¨Ù…Ø³ØªØºØ§Ù†Ù…" },
    { title: "Ø§Ù„ØµØ­Ø© ÙˆØ§Ù„Ù…Ù†Ø´Ø¢Øª Ø§Ù„Ø¹Ù…ÙˆÙ…ÙŠØ©", icon: "ðŸ¥", progress: 80, desc: "ØªØ²ÙˆÙŠØ¯ Ø§Ù„Ø¹ÙŠØ§Ø¯Ø§Øª Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø¨Ø§Ù„Ø£Ø·Ø¨Ø§Ø¡ Ø§Ù„Ø£Ø®ØµØ§Ø¦ÙŠÙŠÙ† ÙˆØ³ÙŠØ§Ø±Ø§Øª Ø§Ù„Ø¥Ø³Ø¹Ø§Ù Ø§Ù„Ø­Ø¯ÙŠØ«Ø©" },
    { title: "Ø§Ù„Ø³ÙƒÙ† ÙˆØªØ´ØºÙŠÙ„ Ø§Ù„Ø´Ø¨Ø§Ø¨ ÙˆØ§Ù„Ø±ÙŠØ§Ø¶Ø©", icon: "ðŸŽ“", progress: 70, desc: "ØªØ³Ø±ÙŠØ¹ ØªÙˆØ²ÙŠØ¹ Ø­ØµØµ Ø§Ù„Ø³ÙƒÙ† Ø§Ù„Ø±ÙŠÙÙŠ ÙˆØ§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØŒ ÙˆØ¯Ø¹Ù… Ø§Ù„Ø¬Ù…Ø¹ÙŠØ§Øª ÙˆØ§Ù„Ù†ÙˆØ§Ø¯ÙŠ Ø§Ù„Ø±ÙŠØ§Ø¶ÙŠØ© Ø§Ù„Ù…Ø­Ù„ÙŠØ©" },
    { title: "Ø§Ù„Ø±Ù‚Ø§Ø¨Ø© Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠØ© ÙˆØ§Ù„Ø¯ÙØ§Ø¹ Ø¹Ù† Ø§Ù„Ø­Ù‚ÙˆÙ‚", icon: "âš–ï¸", progress: 95, desc: "ØªÙˆØ¸ÙŠÙ Ø§Ù„Ø®Ø¨Ø±Ø© Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© Ø§Ù„Ø³Ø§Ø¨Ù‚Ø© ÙÙŠ Ø§Ù„Ø±Ù‚Ø§Ø¨Ø© Ø§Ù„ØµØ§Ø±Ù…Ø© ÙˆÙ†Ù‚Ù„ ØµÙˆØª Ø§Ù„Ù…ÙˆØ§Ø·Ù† Ø¨Ø¬Ø±Ø£Ø© Ù„Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠÙ†" }
  ]
};

// â”€â”€â”€ Ø§Ù„Ø£Ø®Ø¨Ø§Ø± Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠØ© â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_NEWS = [
  {
    id: 1,
    title: "Ø§Ù„Ù†Ø§Ø¦Ø¨ Ù…Ø±Ø§Ø¯ Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠ ÙŠØ·Ø§Ù„Ø¨ Ø¨ØªØ³Ø±ÙŠØ¹ ÙˆØªÙŠØ±Ø© Ø¥Ù†Ø¬Ø§Ø² Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„Ø³ÙƒÙ†ÙŠØ© Ø¨ÙˆÙ„Ø§ÙŠØ© Ù…Ø³ØªØºØ§Ù†Ù…",
    category: "Ø¨Ø±Ù„Ù…Ø§Ù†",
    excerpt: "Ø®Ù„Ø§Ù„ Ø¬Ù„Ø³Ø© Ø¹Ø§Ù…Ø© Ø¨Ø§Ù„Ù…Ø¬Ù„Ø³ Ø§Ù„Ø´Ø¹Ø¨ÙŠ Ø§Ù„ÙˆØ·Ù†ÙŠØŒ ÙˆØ¬Ù‘Ù‡ Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø³Ø¤Ø§Ù„Ø§Ù‹ Ø´ÙÙˆÙŠØ§Ù‹ Ù„ÙˆØ²ÙŠØ± Ø§Ù„Ø³ÙƒÙ† Ø­ÙˆÙ„ ØªØ£Ø®Ø± ØªÙˆØ²ÙŠØ¹ Ø­ØµØµ Ø§Ù„Ø³ÙƒÙ† ÙˆØªØ®ØµÙŠØµ Ø¥Ø¹Ø§Ù†Ø§Øª Ø§Ù„Ø³ÙƒÙ† Ø§Ù„Ø±ÙŠÙÙŠ.",
    content: "Ø£ÙƒØ¯ Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ Ø§Ù„Ø£Ø³ØªØ§Ø° Ù…Ø±Ø§Ø¯ Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠ Ø®Ù„Ø§Ù„ Ù…Ø¯Ø§Ø®Ù„ØªÙ‡ ÙÙŠ Ø§Ù„Ø¬Ù„Ø³Ø© Ø§Ù„Ø¹Ù„Ù†ÙŠØ© Ø§Ù„Ù…Ø®ØµØµØ© Ù„Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´ÙÙˆÙŠØ©ØŒ Ø¹Ù„Ù‰ Ø¶Ø±ÙˆØ±Ø© Ø§Ù„ØªØ¹Ø¬ÙŠÙ„ ÙÙŠ ØªØ³Ù„ÙŠÙ… Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„Ø³ÙƒÙ†ÙŠØ© Ø¨Ù…Ø®ØªÙ„Ù Ø§Ù„ØµÙŠØº Ø¨ÙˆÙ„Ø§ÙŠØ© Ù…Ø³ØªØºØ§Ù†Ù… ÙˆØªÙˆØ³ÙŠØ¹ Ø­ØµØµ Ø§Ù„Ø³ÙƒÙ† Ø§Ù„Ø±ÙŠÙÙŠ Ø¨Ø¨Ù„Ø¯ÙŠØ§Øª Ø¯Ø§Ø¦Ø±Ø© Ø³ÙŠØ¯ÙŠ Ù„Ø®Ø¶Ø±ØŒ Ù…Ø´ÙŠØ±Ø§Ù‹ Ø¥Ù„Ù‰ Ø£Ù† Ø§Ù„Ù…ÙˆØ§Ø·Ù† ÙŠÙ†ØªØ¸Ø± Ù‡Ø°Ù‡ Ø§Ù„Ø¨Ø±Ø§Ù…Ø¬ Ø¨ÙØ§Ø±Øº Ø§Ù„ØµØ¨Ø±.",
    date: "2026-08-18",
    icon: "ðŸ›ï¸",
    color: "linear-gradient(135deg, #006233, #004422)"
  },
  {
    id: 2,
    title: "Ø²ÙŠØ§Ø±Ø© Ù…ÙŠØ¯Ø§Ù†ÙŠØ© ØªÙÙ‚Ø¯ÙŠØ© Ù„Ø¹Ø¯Ø¯ Ù…Ù† Ø§Ù„Ù…Ø¤Ø³Ø³Ø§Øª Ø§Ù„ØµØ­ÙŠØ© ÙˆØ§Ù„Ù…Ø±Ø§ÙÙ‚ Ø§Ù„Ø§Ø³ØªØ´ÙØ§Ø¦ÙŠØ©",
    category: "Ù…ÙŠØ¯Ø§Ù†ÙŠ",
    excerpt: "Ù‚Ø§Ù… Ø§Ù„Ù†Ø§Ø¦Ø¨ Ù…Ø±Ø§Ø¯ Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠ Ø¨Ø²ÙŠØ§Ø±Ø© ØªÙÙ‚Ø¯ÙŠØ© Ù„Ù„Ù…Ø³ØªØ´ÙÙ‰ Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ ÙˆØ§Ù„Ù…ØµØ§Ù„Ø­ Ø§Ù„ØµØ­ÙŠØ© Ù„Ù„ÙˆÙ‚ÙˆÙ Ø¹Ù„Ù‰ Ø¬ÙˆØ¯Ø© Ø§Ù„ØªÙƒÙÙ„ Ø¨Ø§Ù„Ù…Ø±Ø¶Ù‰ ÙˆÙ†Ù‚Øµ Ø§Ù„ÙƒÙˆØ§Ø¯Ø± Ø§Ù„Ø·Ø¨ÙŠØ©.",
    content: "Ø§Ø³ØªÙ…Ø¹ Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø®Ù„Ø§Ù„ Ø§Ù„Ø²ÙŠØ§Ø±Ø© Ù„Ø§Ù†Ø´ØºØ§Ù„Ø§Øª Ø§Ù„Ø£Ø·Ù‚Ù… Ø§Ù„Ø·Ø¨ÙŠØ© ÙˆØ´ÙƒØ§ÙˆÙ‰ Ø§Ù„Ù…ÙˆØ§Ø·Ù†ÙŠÙ† Ø¨Ø®ØµÙˆØµ Ù†Ù‚Øµ Ø¨Ø¹Ø¶ Ø§Ù„ØªØ®ØµØµØ§Øª Ø§Ù„Ø·Ø¨ÙŠØ© ÙˆÙ†Ù‚Øµ Ø§Ù„Ø£Ø¯ÙˆÙŠØ© Ø§Ù„Ù†ÙˆØ¹ÙŠØ©. ÙˆÙ‚Ø¯ ØªØ¹Ù‡Ø¯ Ø¨Ø±ÙØ¹ ØªÙ‚Ø±ÙŠØ± Ù…ÙØµÙ„ Ø¥Ù„Ù‰ ÙˆØ²ÙŠØ± Ø§Ù„ØµØ­Ø© ÙˆØ§Ù„ØªÙ†Ø³ÙŠÙ‚ Ù…Ø¹ Ø§Ù„Ø³Ù„Ø·Ø§Øª Ø§Ù„ÙˆÙ„Ø§Ø¦ÙŠØ© Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© Ù‡Ø°Ù‡ Ø§Ù„Ù†Ù‚Ø§Ø¦Øµ ÙÙŠ Ø£Ù‚Ø±Ø¨ Ø§Ù„Ø¢Ø¬Ø§Ù„.",
    date: "2026-08-10",
    icon: "ðŸ¥",
    color: "linear-gradient(135deg, #dc2626, #ef4444)"
  },
  {
    id: 3,
    title: "ÙŠÙˆÙ… Ø¯Ø±Ø§Ø³ÙŠ ÙˆØªØ´Ø§ÙˆØ±ÙŠ Ù…Ø¹ Ø­Ø§Ù…Ù„ÙŠ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙˆØ±ÙˆØ§Ø¯ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ø´Ø¨Ø§Ø¨",
    category: "Ø§Ù‚ØªØµØ§Ø¯",
    excerpt: "ØªÙ†Ø¸ÙŠÙ… Ù„Ù‚Ø§Ø¡ Ù…ÙˆØ³Ø¹ Ø¨Ù…Ù‚Ø± Ø§Ù„Ù…Ø¯Ø§ÙˆÙ…Ø© Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠØ© Ù…Ø¹ Ø´Ø¨Ø§Ø¨ Ø§Ù„ÙˆÙ„Ø§ÙŠØ© Ù„Ù…Ù†Ø§Ù‚Ø´Ø© Ø¢Ù„ÙŠØ§Øª Ø§Ù„Ø¯Ø¹Ù… ÙˆØ§Ù„ØªÙ…ÙˆÙŠÙ„ ÙˆÙ…Ø±Ø§ÙÙ‚Ø© Ø§Ù„Ù…Ø¤Ø³Ø³Ø§Øª Ø§Ù„Ù†Ø§Ø´Ø¦Ø©.",
    content: "Ø´Ù‡Ø¯ Ø§Ù„Ù„Ù‚Ø§Ø¡ Ø­Ø¶ÙˆØ± Ù…Ù…Ø«Ù„ÙŠ Ø§Ù„ÙˆÙƒØ§Ù„Ø§Øª Ø§Ù„ÙˆØ·Ù†ÙŠØ© Ù„Ø¯Ø¹Ù… ÙˆØªØ·ÙˆÙŠØ± Ø§Ù„Ù…Ù‚Ø§ÙˆÙ„Ø§ØªÙŠØ© ÙˆØ§Ù„Ù‚Ø·Ø§Ø¹ Ø§Ù„Ø¨Ù†ÙƒÙŠØŒ Ø­ÙŠØ« ØªÙ… Ø§Ø³ØªØ¹Ø±Ø§Ø¶ Ø§Ù„Ø§Ù…ØªÙŠØ§Ø²Ø§Øª Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© ÙˆØ§Ù„Ø¬Ø¨Ø§Ø¦ÙŠØ© Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø© Ø§Ù„ØªÙŠ Ø£Ù‚Ø±Ù‡Ø§ Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù† Ù„ØµØ§Ù„Ø­ Ø§Ù„Ø´Ø¨Ø§Ø¨ Ø§Ù„Ù…Ø³ØªØ«Ù…Ø±.",
    date: "2026-07-28",
    icon: "ðŸ’¼",
    color: "linear-gradient(135deg, #7c3aed, #a855f7)"
  },
  {
    id: 4,
    title: "Ù…Ø¯Ø§Ø®Ù„Ø© Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø­ÙˆÙ„ Ù…Ø´Ø±ÙˆØ¹ Ù‚Ø§Ù†ÙˆÙ† Ø§Ù„Ù…Ø§Ù„ÙŠØ© ÙˆØ¯Ø¹Ù… Ø§Ù„Ù‚Ø¯Ø±Ø© Ø§Ù„Ø´Ø±Ø§Ø¦ÙŠØ©",
    category: "Ø¨Ø±Ù„Ù…Ø§Ù†",
    excerpt: "Ø¯Ø§ÙØ¹ Ø§Ù„Ù†Ø§Ø¦Ø¨ Ù…Ø±Ø§Ø¯ Ù„Ø¹ÙŠØ¯Ø§Ù†ÙŠ Ø¹Ù† ØªØ®ØµÙŠØµ Ø£ØºÙ„ÙØ© Ù…Ø§Ù„ÙŠØ© Ø¥Ø¶Ø§ÙÙŠØ© Ù„Ø¯Ø¹Ù… Ø§Ù„ÙØ¦Ø§Øª Ø§Ù„Ù‡Ø´Ø© ÙˆØªØ­Ø³ÙŠÙ† Ø´Ø¨ÙƒØ§Øª Ø§Ù„ØªÙ…ÙˆÙŠÙ† Ø¨Ø§Ù„Ù…ÙˆØ§Ø¯ ÙˆØ§Ø³Ø¹Ø© Ø§Ù„Ø§Ø³ØªÙ‡Ù„Ø§Ùƒ.",
    content: "Ø´Ø¯Ø¯ Ø§Ù„Ù†Ø§Ø¦Ø¨ ÙÙŠ Ù…Ø¯Ø§Ø®Ù„ØªÙ‡ Ø¹Ù„Ù‰ Ø£Ù† Ø­Ù…Ø§ÙŠØ© Ø§Ù„Ù‚Ø¯Ø±Ø© Ø§Ù„Ø´Ø±Ø§Ø¦ÙŠØ© Ù„Ù„Ù…ÙˆØ§Ø·Ù†ÙŠÙ† ØªÙ…Ø«Ù„ Ø®Ø·Ø§Ù‹ Ø£Ø­Ù…Ø±ØŒ Ø¯Ø§Ø¹ÙŠØ§Ù‹ Ø¥Ù„Ù‰ Ù…ÙˆØ§ØµÙ„Ø© Ø¯Ø¹Ù… Ø§Ù„Ù…ÙˆØ§Ø¯ Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ©ØŒ Ø²ÙŠØ§Ø¯Ø© Ø§Ù„Ù…Ù†Ø­ØŒ ÙˆÙ…Ø±Ø§Ø¬Ø¹Ø© Ø³Ù„Ù… Ø§Ù„Ø£Ø¬ÙˆØ± Ø¨Ù…Ø§ ÙŠØªÙ†Ø§Ø³Ø¨ Ù…Ø¹ Ø§Ù„ØªØ­ÙˆÙ„Ø§Øª Ø§Ù„Ø§Ù‚ØªØµØ§Ø¯ÙŠØ©.",
    date: "2026-07-15",
    icon: "ðŸ’°",
    color: "linear-gradient(135deg, #C9A227, #f0c040)"
  },
  {
    id: 5,
    title: "Ø¬Ù„Ø³Ø© Ø¹Ù…Ù„ Ù…Ø¹ ÙÙ„Ø§Ø­ÙŠ Ø§Ù„Ù…Ù†Ø·Ù‚Ø© Ù„Ø¨Ø­Ø« Ù…Ø´ÙƒÙ„ Ø§Ù„ØªØ²ÙˆØ¯ Ø¨Ù…ÙŠØ§Ù‡ Ø§Ù„Ø³Ù‚ÙŠ ÙˆØ§Ù„ÙƒÙ‡Ø±Ø¨Ø§Ø¡ Ø§Ù„Ø±ÙŠÙÙŠØ©",
    category: "ÙÙ„Ø§Ø­Ø©",
    excerpt: "Ø§Ø³ØªÙ‚Ø¨Ù„ Ø§Ù„Ù†Ø§Ø¦Ø¨ ÙˆÙØ¯Ø§Ù‹ Ù…Ù† Ø§Ù„ÙÙ„Ø§Ø­ÙŠÙ† ÙˆÙ…Ø±Ø¨ÙŠ Ø§Ù„Ù…ÙˆØ§Ø´ÙŠ Ù„Ù„Ø§Ø³ØªÙ…Ø§Ø¹ Ù„Ø§Ù†Ø´ØºØ§Ù„Ø§ØªÙ‡Ù… Ø­ÙˆÙ„ ØªØ±Ø§Ø®ÙŠØµ Ø­ÙØ± Ø§Ù„Ø¢Ø¨Ø§Ø± ÙˆØ§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ„Ø§Ø­ÙŠ.",
    content: "ØªÙ… Ø®Ù„Ø§Ù„ Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ Ø­ØµØ± Ø§Ù„Ù…Ø´Ø§ÙƒÙ„ Ø§Ù„ØªÙŠ ØªØ¹ÙŠÙ‚ Ø§Ù„Ø§Ø³ØªØ«Ù…Ø§Ø± Ø§Ù„ÙÙ„Ø§Ø­ÙŠ Ø¨Ø§Ù„Ø¯ÙˆØ§Ø¦Ø± Ø§Ù„ÙÙ„Ø§Ø­ÙŠØ© Ù„Ù„ÙˆÙ„Ø§ÙŠØ©ØŒ ÙˆØªÙ… Ø§Ù„Ø§ØªÙØ§Ù‚ Ø¹Ù„Ù‰ Ø®Ø§Ø±Ø·Ø© Ø·Ø±ÙŠÙ‚ Ø¨Ø§Ù„ØªÙ†Ø³ÙŠÙ‚ Ù…Ø¹ Ù…Ø¯ÙŠØ±ÙŠØ© Ø§Ù„Ù…ØµØ§Ù„Ø­ Ø§Ù„ÙÙ„Ø§Ø­ÙŠØ© ÙˆÙ…ØµØ§Ù„Ø­ Ø§Ù„Ø±ÙŠ Ù„Ø­Ù„Ù‡Ø§ ØªØ¯Ø±ÙŠØ¬ÙŠØ§Ù‹.",
    date: "2026-06-25",
    icon: "ðŸŒ¾",
    color: "linear-gradient(135deg, #059669, #10b981)"
  },
  {
    id: 6,
    title: "Ù…Ø´Ø§Ø±ÙƒØ© Ø§Ù„Ù†Ø§Ø¦Ø¨ ÙÙŠ Ø§Ù„Ø§Ø­ØªÙØ§Ù„Ø§Øª Ø§Ù„Ù…Ø®Ù„Ø¯Ø© Ù„Ø¹ÙŠØ¯ÙŠ Ø§Ù„Ø§Ø³ØªÙ‚Ù„Ø§Ù„ ÙˆØ§Ù„Ø´Ø¨Ø§Ø¨",
    category: "ÙˆØ·Ù†ÙŠ",
    excerpt: "Ø­Ø¶Ø± Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø±ÙÙ‚Ø© Ø§Ù„Ø³Ù„Ø·Ø§Øª Ø§Ù„Ù…Ø­Ù„ÙŠØ© ÙˆØ§Ù„Ù…Ø¬Ø§Ù‡Ø¯ÙŠÙ† ÙˆØ§Ù„Ø£Ø³Ø±Ø© Ø§Ù„Ø«ÙˆØ±ÙŠØ© Ù…Ø±Ø§Ø³Ù… Ø¥Ø­ÙŠØ§Ø¡ Ø§Ù„Ø°ÙƒØ±Ù‰ Ø§Ù„ÙˆØ·Ù†ÙŠØ© Ø¨Ø³Ø§Ø­Ø© Ø§Ù„Ø´Ù‡Ø¯Ø§Ø¡.",
    content: "Ø¬Ø¯Ø¯ Ø§Ù„Ù†Ø§Ø¦Ø¨ ÙÙŠ ØªØµØ±ÙŠØ­ Ø¨Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø© Ø§Ù„Ø¹Ù‡Ø¯ Ù…Ø¹ Ø´Ù‡Ø¯Ø§Ø¡ Ø§Ù„Ø«ÙˆØ±Ø© Ø§Ù„ØªØ­Ø±ÙŠØ±ÙŠØ© Ø§Ù„Ù…Ø¬ÙŠØ¯Ø©ØŒ Ù…Ø¤ÙƒØ¯Ø§Ù‹ Ø£Ù† Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ Ø§Ù„Ù…Ø®Ù„Øµ Ù‡Ùˆ ØªØ¬Ø³ÙŠØ¯ Ø­Ù‚ÙŠÙ‚ÙŠ Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ø¬Ø²Ø§Ø¦Ø± ÙˆÙ…ÙˆØ§Ø·Ù†ÙŠÙ‡Ø§ Ø§Ù„Ø£ÙˆÙÙŠØ§Ø¡.",
    date: "2026-07-05",
    icon: "ðŸ‡©ðŸ‡¿",
    color: "linear-gradient(135deg, #006233, #C9A227)"
  }
];

// â”€â”€â”€ Ø§Ù„Ø£Ø±Ø´ÙŠÙ Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_ARCHIVE = [
  {
    id: 1,
    type: "law",
    refNo: "APN-LEG-2026-001",
    title: "التصويت على قانون الإعدام المتفق عليه مؤخراً",
    date: "2026-10-09",
    targetMinistry: "المجلس الشعبي الوطني",
    summary: "المشاركة الفعالة في صياغة والتصويت على قانون الإعدام الجديد للحد من الجرائم الخطيرة وحماية المجتمع، والذي تم الاتفاق عليه مؤخراً في الجلسة البرلمانية.",
    tags: ["تشريع", "قانون", "إعدام", "أمن"],
    status: "تم التصويت"
  }
];

// â”€â”€â”€ Ø¹ÙŠÙ†Ø© Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ Ø§Ù„Ù…Ø³Ø¨Ù‚Ø© Ù„Ù„Ø¨Ø¯Ø¡ Ø§Ù„ÙÙˆØ±ÙŠ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_COMPLAINTS = [];

// â”€â”€â”€ Ø¹ÙŠÙ†Ø© Ø§Ù„Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠØ© â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_MESSAGES = [];

// ============================================================
// Ø§Ù„Ø¯ÙˆØ§Ù„ Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙˆØ§Ù„ØªØ®Ø²ÙŠÙ† Ø§Ù„Ù…Ø­Ù„ÙŠ (LOCALSTORAGE CRUD)
// ============================================================

// â”€â”€ 1. Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù†Ø§Ø¦Ø¨ (Deputy Profile) â”€â”€
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

// â”€â”€ 2. Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ (Complaints) â”€â”€
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
      { text: "ØªÙ… ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø·Ù„Ø¨ Ø¨Ø§Ù„Ù†Ø¸Ø§Ù… Ø§Ù„Ø±Ù‚Ù…ÙŠ Ù„Ù…ÙƒØªØ¨ Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø¨Ù†Ø¬Ø§Ø­.", date: new Date().toISOString() }
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

// â”€â”€ 3. Ø§Ù„Ø£Ø®Ø¨Ø§Ø± (News) â”€â”€
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
    icon: item.icon || 'ðŸ“°',
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

// â”€â”€ 4. Ø§Ù„Ø£Ø±Ø´ÙŠÙ Ø§Ù„Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ (Archive) â”€â”€
function getArchive() {
  // إجبار إعادة ضبط الأرشيف ليكون فقط قانون الإعدام حسب طلب المستخدم
  const forcedReset = localStorage.getItem('archive_reset_death_penalty');
  if (!forcedReset) {
    localStorage.setItem('dz_archive', JSON.stringify(DEFAULT_ARCHIVE));
    localStorage.setItem('archive_reset_death_penalty', 'true');
  }

  try {
    const stored = localStorage.getItem('dz_archive');
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(e); }
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
    status: item.status || 'Ù…Ù†Ø´ÙˆØ±',
    tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(',').map(t => t.trim()) : ['Ø¨Ø±Ù„Ù…Ø§Ù†']),
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

// â”€â”€ 5. Ø§Ù„Ø±Ø³Ø§Ø¦Ù„ (Messages) â”€â”€
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

// â”€â”€ 6. Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø© Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠØ© (Admin Auth) â”€â”€
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

// â”€â”€ 7. Ø§Ù„Ø¥Ø­ØµØ§Ø¦ÙŠØ§Øª (Stats) â”€â”€
function getStats() {
  const complaints = getComplaints();
  return {
    total: complaints.length,
    newCount: complaints.filter(c => c.status === 'sent' || c.status === 'new').length,
    pending: complaints.filter(c => c.status === 'received' || c.status === 'reviewing' || c.status === 'pending').length,
    resolved: complaints.filter(c => c.status === 'responded' || c.status === 'resolved').length
  };
}

// â”€â”€ 8. Ø§Ù„ØªÙ†Ø³ÙŠÙ‚ ÙˆØ¹Ø±Ø¶ Ø§Ù„Ù†ØµÙˆØµ â”€â”€
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const d = date.toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' });
    const t = date.toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' });
    return `${d} Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø© ${t}`;
  } catch (e) {
    return dateStr;
  }
}

function getStatusLabel(status) {
  const labels = {
    new: { text: 'Ù…Ø±Ø³Ù„Ø©', class: 'status-new', icon: 'ðŸ“¤', step: 1 },
    sent: { text: 'Ù…Ø±Ø³Ù„Ø©', class: 'status-new', icon: 'ðŸ“¤', step: 1 },
    received: { text: 'Ù…ÙØ³ØªÙ„ÙŽÙ…Ø©', class: 'status-received', icon: 'ðŸ“¥', step: 2 },
    pending: { text: 'ØªØ­Øª Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø©', class: 'status-pending', icon: 'ðŸ”', step: 3 },
    reviewing: { text: 'ØªØ­Øª Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø©', class: 'status-pending', icon: 'ðŸ”', step: 3 },
    resolved: { text: 'ØªÙ… Ø§Ù„Ø±Ø¯', class: 'status-resolved', icon: 'âœ…', step: 4 },
    responded: { text: 'ØªÙ… Ø§Ù„Ø±Ø¯', class: 'status-resolved', icon: 'âœ…', step: 4 },
    rejected: { text: 'Ù…Ø±ÙÙˆØ¶Ø© / Ù„Ø§ ØªÙˆØ§ÙÙ‚ Ø§Ù„Ø§Ø®ØªØµØ§Øµ', class: 'status-rejected', icon: 'âŒ', step: 4 }
  };
  return labels[status] || labels.sent;
}

function getTypeLabel(type) {
  const labels = {
    statement: { text: 'ØªØµØ±ÙŠØ­ Ø±Ø³Ù…ÙŠ', icon: 'ðŸ—£ï¸', class: 'type-statement' },
    law: { text: 'Ù…Ù‚ØªØ±Ø­ Ù‚Ø§Ù†ÙˆÙ†', icon: 'ðŸ“œ', class: 'type-law' },
    session: { text: 'Ø¬Ù„Ø³Ø© ÙˆÙ…Ø¯Ø§Ø®Ù„Ø©', icon: 'ðŸ›ï¸', class: 'type-session' },
    question: { text: 'Ø³Ø¤Ø§Ù„ Ø¨Ø±Ù„Ù…Ø§Ù†ÙŠ', icon: 'â“', class: 'type-question' }
  };
  return labels[type] || { text: type, icon: 'ðŸ“„', class: 'type-statement' };
}

// â”€â”€ ØªØ·Ø¨ÙŠÙ‚ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù†Ø§Ø¦Ø¨ Ø¹Ù„Ù‰ Ø§Ù„ØµÙØ­Ø© ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ â”€â”€
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

// â”€â”€â”€ Ø¥Ø¹Ø§Ø¯Ø© ØªØ¹ÙŠÙŠÙ† Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø±Ø³Ù…ÙŠØ© Ø§Ù„ØµØ­ÙŠØ­Ø© Ø¯Ø§Ø¦Ù…Ø§Ù‹ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ÙŠØªÙ… ØªØ­Ø¯ÙŠØ« Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù†Ø§Ø¦Ø¨ ÙÙŠ ÙƒÙ„ ØªØ­Ù…ÙŠÙ„ Ù„Ø¶Ù…Ø§Ù† ØµØ­Ø© Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª
(function initStorage() {
  // â‘  Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù†Ø§Ø¦Ø¨: ØªÙØ­Ø¯ÙŽÙ‘Ø« Ø¯Ø§Ø¦Ù…Ø§Ù‹ Ø¨Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø±Ø³Ù…ÙŠØ© Ø§Ù„ØµØ­ÙŠØ­Ø©
  localStorage.setItem('dz_deputy', JSON.stringify(DEFAULT_DEPUTY_INFO));

  // â‘¡ Ø§Ù„Ø£Ø®Ø¨Ø§Ø± ÙˆØ§Ù„Ø£Ø±Ø´ÙŠÙ: ØªÙØ­Ø¯ÙŽÙ‘Ø« Ø¥Ø°Ø§ Ù„Ù… ØªÙƒÙ† Ù…ÙˆØ¬ÙˆØ¯Ø© Ø£Ùˆ Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ù‚Ø¯ÙŠÙ…Ø©
  const storedNews = localStorage.getItem('dz_news');
  if (!storedNews) localStorage.setItem('dz_news', JSON.stringify(DEFAULT_NEWS));

  const storedArchive = localStorage.getItem('dz_archive');
  if (!storedArchive) localStorage.setItem('dz_archive', JSON.stringify(DEFAULT_ARCHIVE));

  // â‘¢ Ø§Ù„Ø´ÙƒØ§ÙˆÙ‰ ÙˆØ§Ù„Ø±Ø³Ø§Ø¦Ù„: ØªÙØ­ÙØ¸ ÙÙ‚Ø· Ø¥Ù† Ù„Ù… ØªÙƒÙ† Ù…ÙˆØ¬ÙˆØ¯Ø©
  if (!localStorage.getItem('dz_complaints')) localStorage.setItem('dz_complaints', JSON.stringify(DEFAULT_COMPLAINTS));
  if (!localStorage.getItem('dz_messages')) localStorage.setItem('dz_messages', JSON.stringify(DEFAULT_MESSAGES));
})();

// Ø¥ØªØ§Ø­Ø© Ø§Ù„ÙƒØ§Ø¦Ù†Ø§Øª ÙˆØ§Ù„Ù…ØªØºÙŠØ±Ø§Øª Ø¹Ø§Ù…Ø©
window.DEPUTY_INFO = getDeputyInfo();
window.DEFAULT_NEWS = DEFAULT_NEWS;
window.DEFAULT_ARCHIVE = DEFAULT_ARCHIVE;

