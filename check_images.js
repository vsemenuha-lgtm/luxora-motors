import { cars } from './src/data/cars.js';
import https from 'https';

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', () => resolve({ url, status: 'ERROR' }));
  });
};

async function main() {
  const uniqueUrls = [...new Set(cars.map(c => c.image))];
  for (const url of uniqueUrls) {
    const res = await checkUrl(url);
    console.log(`[${res.status}] ${res.url}`);
  }
}
main();
