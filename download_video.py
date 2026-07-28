import urllib.request

url = 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-a-dark-tunnel-42686-large.mp4'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        with open('src/assets/hero-video.mp4', 'wb') as f:
            f.write(response.read())
    print("Downloaded successfully")
except Exception as e:
    print("Error:", e)
