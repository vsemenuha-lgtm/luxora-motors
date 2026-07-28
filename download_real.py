import urllib.request
import json
import time
import os

req_headers = {
    'User-Agent': 'LuxoraMotors/1.0 (test@example.com)'
}

def download_file(url, dest):
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

# 1. Download Video
print("Downloading video...")
# A reliable Pexels car video
video_url = "https://videos.pexels.com/video-files/5309381/5309381-hd_1920_1080_25fps.mp4"
download_file(video_url, "public/hero.mp4")

# 2. Download Images
print("Downloading images...")
if not os.path.exists('public/cars'):
    os.makedirs('public/cars')

carsData = [
  {"id": 1, "brand": "Aston Martin", "page": "Aston_Martin_DB11"},
  {"id": 2, "brand": "Rolls-Royce", "page": "Rolls-Royce_Ghost"},
  {"id": 3, "brand": "Ferrari", "page": "Ferrari_812_Superfast"},
  {"id": 4, "brand": "Lamborghini", "page": "Lamborghini_Aventador"},
  {"id": 5, "brand": "Bentley", "page": "Bentley_Continental_GT"},
  {"id": 6, "brand": "Porsche", "page": "Porsche_911"},
  {"id": 7, "brand": "McLaren", "page": "McLaren_720S"},
  {"id": 8, "brand": "Rolls-Royce", "page": "Rolls-Royce_Cullinan"},
  {"id": 9, "brand": "Ferrari", "page": "Ferrari_F8"},
  {"id": 10, "brand": "Mercedes-Benz", "page": "Mercedes-Benz_G-Class"},
  {"id": 11, "brand": "Lamborghini", "page": "Lamborghini_Urus"},
  {"id": 12, "brand": "Aston Martin", "page": "Aston_Martin_Vantage_(2018)"},
  {"id": 13, "brand": "Porsche", "page": "Porsche_Taycan"},
  {"id": 14, "brand": "Rolls-Royce", "page": "Rolls-Royce_Phantom_VIII"},
  {"id": 15, "brand": "McLaren", "page": "McLaren_Artura"},
  {"id": 16, "brand": "Bentley", "page": "Bentley_Bentayga"},
  {"id": 17, "brand": "Ferrari", "page": "Ferrari_SF90_Stradale"},
  {"id": 18, "brand": "Lamborghini", "page": "Lamborghini_Huracán"},
  {"id": 19, "brand": "Mercedes-Maybach", "page": "Mercedes-Benz_S-Class_(W223)"},
  {"id": 20, "brand": "Aston Martin", "page": "Aston_Martin_DBS_Superleggera"},
  {"id": 21, "brand": "Porsche", "page": "Porsche_Panamera"}
]

with open('src/data/cars.js', 'r', encoding='utf-8') as f:
    original = f.read()
    
# Extract JSON
import re
match = re.search(r'export const cars = (\[.*\]);', original, re.DOTALL)
cars_json = json.loads(match.group(1))

for car in carsData:
    print(f"Fetching {car['brand']}...")
    try:
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{car['page']}"
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if 'thumbnail' in data and 'source' in data['thumbnail']:
                img_url = data['thumbnail']['source']
                filename = f"car_{car['id']}.jpg"
                if download_file(img_url, f"public/cars/{filename}"):
                    # Update JSON
                    for c in cars_json:
                        if c['id'] == car['id']:
                            c['image'] = f"cars/{filename}"
                            c['images'] = [f"cars/{filename}"]
                            break
    except Exception as e:
        print(f"Error {car['brand']}: {e}")
    time.sleep(1)

new_content = "export const cars = " + json.dumps(cars_json, indent=2) + ";\n"
with open('src/data/cars.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done!")
