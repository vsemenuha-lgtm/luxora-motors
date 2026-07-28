import json
import random

good_images = [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800",
    "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=800",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800",
    "https://images.unsplash.com/photo-1503376712341-ea47535b46b1?q=80&w=800",
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800"
]

with open('src/data/cars.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON part
json_str = content.replace('export const cars = ', '').strip()
if json_str.endswith(';'):
    json_str = json_str[:-1]

try:
    cars = json.loads(json_str)
    for car in cars:
        car['image'] = random.choice(good_images)
        car['images'] = [car['image']] + [img for img in good_images if img != car['image']][:4]

    new_content = "export const cars = " + json.dumps(cars, indent=2) + ";\n"
    with open('src/data/cars.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Success")
except Exception as e:
    print("Error:", e)
