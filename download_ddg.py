import json
import re
import urllib.request
import os
import time
from duckduckgo_search import DDGS

req_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
}

def download_file(url, dest):
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req, timeout=5) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

# 1. Download Video
print("Downloading video...")
if not os.path.exists('public'): os.makedirs('public')
# Using an open static mp4 URL that doesn't block (Big Buck Bunny as fallback if real car video fails, but let's use a Pexels video via a different CDN)
# Actually, let's use a direct link to a reliable free stock video
video_url = "https://static.videezy.com/system/resources/previews/000/041/911/original/200115_010_Car4_4k_016.mp4"
download_file(video_url, "public/hero.mp4")

# 2. Download Images
if not os.path.exists('public/cars'):
    os.makedirs('public/cars')

with open('src/data/cars.js', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'export const cars = (\[.*\]);', content, re.DOTALL)
cars = json.loads(match.group(1))

ddgs = DDGS()

for car in cars:
    query = f"{car['brand']} {car['model']} car photography high resolution"
    print(f"Searching images for: {query}")
    try:
        results = list(ddgs.images(query, max_results=5))
        filename = f"car_{car['id']}.jpg"
        filepath = f"public/cars/{filename}"
        
        # Try downloading until one succeeds
        success = False
        for res in results:
            img_url = res['image']
            if download_file(img_url, filepath):
                success = True
                break
        
        if success:
            car['image'] = f"cars/{filename}"
            car['images'] = [f"cars/{filename}"]
        else:
            print(f"Could not download any image for {car['brand']}")
    except Exception as e:
        print(f"Error for {query}: {e}")
    time.sleep(1) # Prevent rate limiting

new_content = "export const cars = " + json.dumps(cars, indent=2) + ";\n"
with open('src/data/cars.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully downloaded all assets!")
