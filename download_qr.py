import sys

# Standard pure python QR matrix generator
# We can fetch SVG from public QR API or write standalone QR code SVG

import urllib.request

url = "https://laidani-mourad.vercel.app/"
api_url = "https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=" + urllib.parse.quote(url) + "&format=svg"

try:
    req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as response:
        svg_content = response.read().decode('utf-8')
        with open("qr-code-laidani-mourad.svg", "w", encoding="utf-8") as f:
            f.write(svg_content)
        print("SUCCESS_SVG_DOWNLOADED")
except Exception as e:
    print("API_ERROR:", e)

# Also create PNG version
api_png = "https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=" + urllib.parse.quote(url) + "&format=png"
try:
    req = urllib.request.Request(api_png, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as response:
        png_content = response.read()
        with open("qr-code-laidani-mourad.png", "wb") as f:
            f.write(png_content)
        print("SUCCESS_PNG_DOWNLOADED")
except Exception as e:
    print("API_PNG_ERROR:", e)
