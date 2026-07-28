import fs from 'fs';
import path from 'path';

const headers = {
  'User-Agent': 'LuxoraMotors/1.0 (test@example.com)'
};

import { execSync } from 'child_process';

async function downloadFile(url, dest) {
  try {
    const curlCmd = `curl.exe -s -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" -o "${dest}" "${url}"`;
    execSync(curlCmd, { stdio: 'ignore' });
    
    // verify file size
    const stats = fs.statSync(dest);
    if (stats.size > 1000) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(`Failed to download ${url}`);
    return false;
  }
}

const carsData = [
  { id: 1, brand: "Aston Martin", page: "Aston_Martin_DB11" },
  { id: 2, brand: "Rolls-Royce", page: "Rolls-Royce_Ghost" },
  { id: 3, brand: "Ferrari", page: "Ferrari_812_Superfast" },
  { id: 4, brand: "Lamborghini", page: "Lamborghini_Aventador" },
  { id: 5, brand: "Bentley", page: "Bentley_Continental_GT" },
  { id: 6, brand: "Porsche", page: "Porsche_911" },
  { id: 7, brand: "McLaren", page: "McLaren_720S" },
  { id: 8, brand: "Rolls-Royce", page: "Rolls-Royce_Cullinan" },
  { id: 9, brand: "Ferrari", page: "Ferrari_F8" },
  { id: 10, brand: "Mercedes-Benz", page: "Mercedes-Benz_G-Class" },
  { id: 11, brand: "Lamborghini", page: "Lamborghini_Urus" },
  { id: 12, brand: "Aston Martin", page: "Aston_Martin_Vantage_(2018)" },
  { id: 13, brand: "Porsche", page: "Porsche_Taycan" },
  { id: 14, brand: "Rolls-Royce", page: "Rolls-Royce_Phantom_VIII" },
  { id: 15, brand: "McLaren", page: "McLaren_Artura" },
  { id: 16, brand: "Bentley", page: "Bentley_Bentayga" },
  { id: 17, brand: "Ferrari", page: "Ferrari_SF90_Stradale" },
  { id: 18, brand: "Lamborghini", page: "Lamborghini_Huracán" },
  { id: 19, brand: "Mercedes-Maybach", page: "Mercedes-Benz_S-Class_(W223)" },
  { id: 20, brand: "Aston Martin", page: "Aston_Martin_DBS_Superleggera" },
  { id: 21, brand: "Porsche", page: "Porsche_Panamera" }
];

async function main() {
  const publicCarsDir = path.join('public', 'cars');
  if (!fs.existsSync(publicCarsDir)) {
    fs.mkdirSync(publicCarsDir, { recursive: true });
  }

  console.log('Skipping video download, already downloaded via yt-dlp');

  const fileUrl = 'file://' + path.resolve('src/data/cars.js');
  const { cars: carsJson } = await import(fileUrl);

  for (const car of carsData) {
    console.log(`Fetching image for ${car.brand} ${car.model}...`);
    try {
      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(car.page)}`;
      const res = await fetch(apiUrl, { headers });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const summary = await res.json();
      
      if (summary.thumbnail && summary.thumbnail.source) {
        const filename = `car_${car.id}.jpg`;
        const success = await downloadFile(summary.thumbnail.source, path.join(publicCarsDir, filename));
        
        if (success) {
          const carIndex = carsJson.findIndex(c => c.id === car.id);
          if (carIndex !== -1) {
            carsJson[carIndex].image = `cars/${filename}`;
            carsJson[carIndex].images = [`cars/${filename}`];
          }
          console.log(`Saved ${filename}`);
        }
      } else {
        console.log(`No image found for ${car.page}`);
      }
    } catch (err) {
      console.log(`Error with ${car.brand} ${car.model}: ${err.message}`);
    }
    
    // Wait to avoid rate limit
    await new Promise(r => setTimeout(r, 1500));
  }

  const updatedContent = `export const cars = ${JSON.stringify(carsJson, null, 2)};\n`;
  fs.writeFileSync('src/data/cars.js', updatedContent, 'utf-8');
  console.log('Done mapping cars!');
}

main();
