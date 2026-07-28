import json
import re
from duckduckgo_search import DDGS
import time

def fetch_images(query, max_results=4):
    print(f"Searching images for: {query}")
    try:
        results = DDGS().images(query, max_results=max_results)
        return [r['image'] for r in results]
    except Exception as e:
        print(f"Error for {query}: {e}")
        return []

# Read current cars.js
with open('src/data/cars.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON array
match = re.search(r'export const cars = (\[.*\]);', content, re.DOTALL)
if not match:
    print("Could not find cars array")
    exit(1)

cars_json_str = match.group(1)
# Handle potential JS specific issues like trailing commas or unquoted keys (though it's valid JSON from my previous script)
cars = json.loads(cars_json_str)

for car in cars:
    query = f"{car['brand']} {car['model']} high resolution car photography"
    images = fetch_images(query, 4)
    if len(images) > 0:
        # Keep the main image if it's already a good one, or just replace all
        car['images'] = [car['image']] + images
    time.sleep(1) # Prevent rate limiting

new_content = "export const cars = " + json.dumps(cars, indent=2) + ";\n"
with open('src/data/cars.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully updated cars.js with real images!")
