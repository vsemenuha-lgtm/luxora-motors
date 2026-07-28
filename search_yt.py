import urllib.request
import re

html = urllib.request.urlopen('https://www.youtube.com/results?search_query=cinematic+dark+audi+r8').read().decode('utf-8')
video_ids = re.findall(r'"videoId":"([^"]{11})"', html)
print(video_ids[0] if video_ids else 'None')
