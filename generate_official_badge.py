import urllib.request
import urllib.parse

# 1. Fetch clean SVG QR code data (inner path)
url = "https://laidani-mourad.vercel.app/"
api_svg = "https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=" + urllib.parse.quote(url) + "&format=svg"

req = urllib.request.Request(api_svg, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    raw_svg = resp.read().decode('utf-8')

# Extract path
import re
match = re.search(r'<path[^>]*d="([^"]+)"', raw_svg)
qr_path = match.group(1) if match else ""

# Create official badge SVG (800x1100 px)
official_svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1120" width="800" height="1120">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070c18"/>
      <stop offset="50%" stop-color="#0d1b2a"/>
      <stop offset="100%" stop-color="#050a12"/>
    </linearGradient>

    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3B0"/>
      <stop offset="35%" stop-color="#D4AF37"/>
      <stop offset="70%" stop-color="#AA771C"/>
      <stop offset="100%" stop-color="#F2D06B"/>
    </linearGradient>

    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#006233"/>
      <stop offset="100%" stop-color="#004422"/>
    </linearGradient>

    <!-- Filters for Luxury Drop Shadows -->
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Card Background -->
  <rect x="20" y="20" width="760" height="1080" rx="32" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="4" filter="url(#cardShadow)"/>
  
  <!-- Inner Decorative Border -->
  <rect x="36" y="36" width="728" height="1048" rx="24" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.6"/>

  <!-- Top Algerian Seal Header -->
  <g transform="translate(400, 110)">
    <!-- Shield / Seal -->
    <circle cx="0" cy="0" r="42" fill="url(#greenGrad)" stroke="url(#goldGrad)" stroke-width="3"/>
    
    <!-- APN Parliament Columns Icon Inside Seal -->
    <!-- Pediment -->
    <polygon points="-24,-6 0,-20 24,-6" fill="url(#goldGrad)"/>
    <!-- Architrave -->
    <rect x="-24" y="-5" width="48" height="4" fill="url(#goldGrad)"/>
    <!-- 4 Columns -->
    <rect x="-22" y="1" width="6" height="18" fill="url(#goldGrad)" rx="1"/>
    <rect x="-9" y="1" width="6" height="18" fill="url(#goldGrad)" rx="1"/>
    <rect x="4" y="1" width="6" height="18" fill="url(#goldGrad)" rx="1"/>
    <rect x="17" y="1" width="6" height="18" fill="url(#goldGrad)" rx="1"/>
    <!-- Base -->
    <rect x="-26" y="20" width="52" height="5" fill="url(#goldGrad)" rx="1"/>

    <!-- Scales of Justice (Legal Symbol) at Bottom of Seal -->
    <circle cx="0" cy="30" r="3" fill="#D4AF37"/>
  </g>

  <!-- Official Titles in Arabic Typography -->
  <text x="400" y="195" text-anchor="middle" font-family="'Cairo', 'Tajawal', Arial, sans-serif" font-size="16" font-weight="700" fill="#E2E8F0" letter-spacing="2">
    الجمهورية الجزائرية الديمقراطية الشعبية
  </text>
  
  <text x="400" y="225" text-anchor="middle" font-family="'Cairo', 'Tajawal', Arial, sans-serif" font-size="14" font-weight="600" fill="#D4AF37" letter-spacing="1">
    المجلس الشعبي الوطني — البرلمان الجزائري
  </text>

  <!-- Dividing Gold Line with Star -->
  <line x1="180" y1="250" x2="370" y2="250" stroke="url(#goldGrad)" stroke-width="2"/>
  <polygon points="400,242 403,248 409,248 404,252 406,258 400,254 394,258 396,252 391,248 397,248" fill="url(#goldGrad)"/>
  <line x1="430" y1="250" x2="620" y2="250" stroke="url(#goldGrad)" stroke-width="2"/>

  <!-- Politician Name & Title -->
  <text x="400" y="305" text-anchor="middle" font-family="'Cairo', 'Tajawal', Arial, sans-serif" font-size="34" font-weight="900" fill="url(#goldGrad)">
    الأستاذ مراد لعيداني
  </text>
  
  <text x="400" y="345" text-anchor="middle" font-family="'Cairo', 'Tajawal', Arial, sans-serif" font-size="17" font-weight="700" fill="#F8FAFC">
    نائب بالمجلس الشعبي الوطني (محامٍ سابقاً) — ولاية مستغانم
  </text>

  <!-- Subtitle Ribbon -->
  <g transform="translate(400, 390)">
    <rect x="-170" y="-18" width="340" height="36" rx="18" fill="url(#greenGrad)" stroke="url(#goldGrad)" stroke-width="1.5"/>
    <text x="0" y="5" text-anchor="middle" font-family="'Cairo', 'Tajawal', Arial, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">
      ⚖️ البوابة الرسمية للشكاوى، الأخبار والنشاط البرلماني
    </text>
  </g>

  <!-- QR Code White Card Container with Elegant Frame -->
  <g transform="translate(400, 650)">
    <!-- Shadow & Glow Base -->
    <rect x="-215" y="-215" width="430" height="430" rx="24" fill="#FFFFFF" stroke="url(#goldGrad)" stroke-width="5" filter="url(#goldGlow)"/>
    
    <!-- Inner Fine Border -->
    <rect x="-205" y="-205" width="410" height="410" rx="16" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4 4"/>

    <!-- QR Code SVG Elements Scaled to fit 360x360 -->
    <g transform="translate(-180, -180) scale(0.365)">
      <path fill="#070c18" d="{qr_path}"/>
    </g>

    <!-- Center Emblem Badge Over QR (Official Parliamentary Seal) -->
    <circle cx="0" cy="0" r="32" fill="#070c18" stroke="url(#goldGrad)" stroke-width="3"/>
    <polygon points="-12,-3 0,-10 12,-3" fill="url(#goldGrad)"/>
    <rect x="-12" y="-2" width="24" height="2" fill="url(#goldGrad)"/>
    <rect x="-10" y="1" width="3" height="9" fill="url(#goldGrad)"/>
    <rect x="-4" y="1" width="3" height="9" fill="url(#goldGrad)"/>
    <rect x="2" y="1" width="3" height="9" fill="url(#goldGrad)"/>
    <rect x="8" y="1" width="3" height="9" fill="url(#goldGrad)"/>
    <rect x="-13" y="11" width="26" height="3" fill="url(#goldGrad)"/>
  </g>

  <!-- Scanning Instructions & Call-to-action -->
  <g transform="translate(400, 930)">
    <text x="0" y="0" text-anchor="middle" font-family="'Cairo', 'Tajawal', Arial, sans-serif" font-size="18" font-weight="800" fill="#D4AF37">
      📷 امسح الرمز بكاميرا الهاتف لزيارة الموقع الرسمي مباشرة
    </text>
    <text x="0" y="32" text-anchor="middle" font-family="Arial, monospace" font-size="16" font-weight="700" fill="#38BDF8">
      https://laidani-mourad.vercel.app
    </text>
  </g>

  <!-- Bottom Legal & Official Notice -->
  <g transform="translate(400, 1030)">
    <line x1="-250" y1="0" x2="250" y2="0" stroke="url(#goldGrad)" stroke-width="1" opacity="0.4"/>
    <text x="0" y="24" text-anchor="middle" font-family="'Cairo', 'Tajawal', Arial, sans-serif" font-size="11" font-weight="600" fill="#94A3B8">
      الموقع الرسمي المعتمد للتواصل مع مواطني ولاية مستغانم ومتابعة الانشغالات والعرائض
    </text>
  </g>
</svg>
"""

with open("qr-code-parliamentary-card.svg", "w", encoding="utf-8") as f:
    f.write(official_svg)

print("SUCCESS_OFFICIAL_CARD_GENERATED")
