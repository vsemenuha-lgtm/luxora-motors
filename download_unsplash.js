import { execSync } from 'child_process';
import path from 'path';

const urls = [
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800",
  "https://images.unsplash.com/photo-1631835773820-21b920d32c02?q=80&w=800",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800",
  "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800",
  "https://images.unsplash.com/photo-1620013919163-f2cc1ff4aee9?q=80&w=800",
  "https://images.unsplash.com/photo-1503376712341-ea47535b46b1?q=80&w=800",
  "https://images.unsplash.com/photo-1620882672750-f8f8f2b714d6?q=80&w=800",
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
  "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800",
  "https://images.unsplash.com/photo-1520050735087-1ed65d9b0273?q=80&w=800",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800",
  "https://images.unsplash.com/photo-1542037104849-c124a91eb8f1?q=80&w=800",
  "https://images.unsplash.com/photo-1614124357700-1c6fc1c990b7?q=80&w=800",
  "https://images.unsplash.com/photo-1563720360341-2679235e8db2?q=80&w=800",
  "https://images.unsplash.com/photo-1596720230626-d18cf41f0224?q=80&w=800",
  "https://images.unsplash.com/photo-1632731885449-c967cae61f2f?q=80&w=800",
  "https://images.unsplash.com/photo-1614376483446-24ea942e6f49?q=80&w=800",
  "https://images.unsplash.com/photo-1600713735626-1736d933e49e?q=80&w=800",
  "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800",
  "https://images.unsplash.com/photo-1549429731-073c8808a65c?q=80&w=800",
  "https://images.unsplash.com/photo-1618210359050-711e74b8fbce?q=80&w=800"
];

for (let i = 0; i < urls.length; i++) {
  const dest = path.resolve(`public/cars/car_${i + 1}.jpg`);
  console.log(`Downloading image ${i + 1}...`);
  try {
    const curlCmd = `curl.exe -s -L -H "User-Agent: Mozilla/5.0" -o "${dest}" "${urls[i]}"`;
    execSync(curlCmd, { stdio: 'ignore' });
  } catch (e) {
    console.error(`Failed to download ${i + 1}`);
  }
}

console.log('All images downloaded successfully!');
