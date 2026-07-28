import fs from 'fs';
import https from 'https';
import path from 'path';

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    if (!url) return resolve(false);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const carsData = [
  { id: 1, brand: "Aston Martin", model: "DB11", page: "Aston_Martin_DB11" },
  { id: 2, brand: "Rolls-Royce", model: "Ghost", page: "Rolls-Royce_Ghost" },
  { id: 3, brand: "Ferrari", model: "812 Superfast", page: "Ferrari_812_Superfast" },
  { id: 4, brand: "Lamborghini", model: "Aventador SVJ", page: "Lamborghini_Aventador" },
  { id: 5, brand: "Bentley", model: "Continental GT", page: "Bentley_Continental_GT" },
  { id: 6, brand: "Porsche", model: "911 Turbo S", page: "Porsche_911" },
  { id: 7, brand: "McLaren", model: "720S", page: "McLaren_720S" },
  { id: 8, brand: "Rolls-Royce", model: "Cullinan", page: "Rolls-Royce_Cullinan" },
  { id: 9, brand: "Ferrari", model: "F8 Tributo", page: "Ferrari_F8" },
  { id: 10, brand: "Mercedes-Benz", model: "G63 AMG", page: "Mercedes-Benz_G-Class" },
  { id: 11, brand: "Lamborghini", model: "Urus", page: "Lamborghini_Urus" },
  { id: 12, brand: "Aston Martin", model: "Vantage", page: "Aston_Martin_Vantage_(2018)" },
  { id: 13, brand: "Porsche", model: "Taycan Turbo S", page: "Porsche_Taycan" },
  { id: 14, brand: "Rolls-Royce", model: "Phantom", page: "Rolls-Royce_Phantom_VIII" },
  { id: 15, brand: "McLaren", model: "Artura", page: "McLaren_Artura" },
  { id: 16, brand: "Bentley", model: "Bentayga", page: "Bentley_Bentayga" },
  { id: 17, brand: "Ferrari", model: "SF90 Stradale", page: "Ferrari_SF90_Stradale" },
  { id: 18, brand: "Lamborghini", model: "Huracan EVO", page: "Lamborghini_Huracán" },
  { id: 19, brand: "Mercedes-Maybach", model: "S 580", page: "Mercedes-Benz_S-Class_(W223)" },
  { id: 20, brand: "Aston Martin", model: "DBS Superleggera", page: "Aston_Martin_DBS_Superleggera" },
  { id: 21, brand: "Porsche", model: "Panamera Turbo S", page: "Porsche_Panamera" }
];

async function main() {
  const publicCarsDir = path.join('public', 'cars');
  if (!fs.existsSync(publicCarsDir)) {
    fs.mkdirSync(publicCarsDir, { recursive: true });
  }

  console.log('Downloading video...');
  await downloadFile('https://cdn.pixabay.com/video/2021/08/21/85806-591740924_tiny.mp4', 'public/hero.mp4');
  console.log('Video downloaded.');

  const fileUrl = 'file://' + path.resolve('src/data/cars.js');
  const { cars: carsJson } = await import(fileUrl);

  for (const car of carsData) {
    console.log(`Fetching image for ${car.brand} ${car.model}...`);
    try {
      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(car.page)}`;
      const getJson = (url) => new Promise((res, rej) => {
        https.get(url, { headers: { 'User-Agent': 'LuxoraMotors/1.0 (test@example.com)' } }, (response) => {
          let data = '';
          response.on('data', chunk => data += chunk);
          response.on('end', () => {
            try {
              res(JSON.parse(data));
            } catch (e) {
              res({ thumbnail: null }); // fallback on error
            }
          });
        }).on('error', rej);
      });
      
      const summary = await getJson(apiUrl);
      if (summary.thumbnail && summary.thumbnail.source) {
        const ext = summary.thumbnail.source.split('.').pop();
        const filename = `car_${car.id}.jpg`;
        await downloadFile(summary.thumbnail.source, path.join(publicCarsDir, filename));
        
        const carIndex = carsJson.findIndex(c => c.id === car.id);
        if (carIndex !== -1) {
          carsJson[carIndex].image = `cars/${filename}`;
          carsJson[carIndex].images = [`cars/${filename}`];
        }
        console.log(`Saved ${filename}`);
      } else {
        console.log(`No image found for ${car.page}`);
      }
    } catch (err) {
      console.log(`Error with ${car.brand} ${car.model}: ${err.message}`);
    }
    
    // Wait 1.5s to avoid rate limit
    await new Promise(r => setTimeout(r, 1500));
  }

  const updatedContent = `export const cars = ${JSON.stringify(carsJson, null, 2)};\n`;
  fs.writeFileSync('src/data/cars.js', updatedContent, 'utf-8');
  console.log('Done mapping cars!');
}

main();
