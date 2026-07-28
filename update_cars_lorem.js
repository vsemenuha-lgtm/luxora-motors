import fs from 'fs';

// Read current cars.js
let content = fs.readFileSync('src/data/cars.js', 'utf-8');

// Use a regex or simple eval if we just want to manipulate the array
// Since cars.js exports a JS array, we can use a dynamic import to load it, modify it, and write it back.
// But it's an ES module so we can just do this:

import { cars } from './src/data/cars.js';

const updatedCars = cars.map(car => {
  // Format brand and model for URLs (remove spaces and special characters if needed, but loremflickr handles commas)
  const brandParam = car.brand.replace(/\s+/g, '').toLowerCase();
  const modelParam = car.model.replace(/\s+/g, '').toLowerCase();
  
  // Generate 5 distinct image URLs using loremflickr
  // We use lock to ensure we get different images for the same keywords
  const generateImg = (lockId) => `https://loremflickr.com/800/600/${brandParam},${modelParam}/all?lock=${lockId}`;
  
  const newImages = [
    generateImg(car.id * 10 + 1),
    generateImg(car.id * 10 + 2),
    generateImg(car.id * 10 + 3),
    generateImg(car.id * 10 + 4),
    generateImg(car.id * 10 + 5)
  ];

  return {
    ...car,
    image: newImages[0], // Set the main image to the first one
    images: newImages
  };
});

// Write it back
const newContent = "export const cars = " + JSON.stringify(updatedCars, null, 2) + ";\n";
fs.writeFileSync('src/data/cars.js', newContent, 'utf-8');
console.log('Successfully updated cars.js with loremflickr URLs!');
