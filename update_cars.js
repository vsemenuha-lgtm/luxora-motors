import fs from 'fs';

const cars = [
  {
    id: 1,
    brand: "Aston Martin",
    model: "DB11",
    price: 214000,
    rentPrice: 1500,
    engine: "5.2L V12",
    hp: 608,
    seats: 2,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 2,
    brand: "Rolls-Royce",
    model: "Ghost",
    price: 332000,
    rentPrice: 2500,
    engine: "6.75L V12",
    hp: 563,
    seats: 5,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 3,
    brand: "Ferrari",
    model: "812 Superfast",
    price: 412000,
    rentPrice: 3200,
    engine: "6.5L V12",
    hp: 789,
    seats: 2,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 4,
    brand: "Lamborghini",
    model: "Aventador SVJ",
    price: 517000,
    rentPrice: 4000,
    engine: "6.5L V12",
    hp: 759,
    seats: 2,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 5,
    brand: "Bentley",
    model: "Continental GT",
    price: 235000,
    rentPrice: 1800,
    engine: "4.0L V8",
    hp: 542,
    seats: 4,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    brand: "Porsche",
    model: "911 Turbo S",
    price: 207000,
    rentPrice: 1600,
    engine: "3.8L Flat-6",
    hp: 640,
    seats: 4,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    brand: "McLaren",
    model: "720S",
    price: 299000,
    rentPrice: 2200,
    engine: "4.0L V8",
    hp: 710,
    seats: 2,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    brand: "Rolls-Royce",
    model: "Cullinan",
    price: 348000,
    rentPrice: 2800,
    engine: "6.75L V12",
    hp: 563,
    seats: 5,
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    brand: "Ferrari",
    model: "F8 Tributo",
    price: 276000,
    rentPrice: 2300,
    engine: "3.9L V8",
    hp: 710,
    seats: 2,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    brand: "Mercedes-Benz",
    model: "G63 AMG",
    price: 156000,
    rentPrice: 1200,
    engine: "4.0L V8",
    hp: 577,
    seats: 5,
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    brand: "Lamborghini",
    model: "Urus",
    price: 225000,
    rentPrice: 1900,
    engine: "4.0L V8",
    hp: 641,
    seats: 5,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    brand: "Aston Martin",
    model: "Vantage",
    price: 142000,
    rentPrice: 1100,
    engine: "4.0L V8",
    hp: 503,
    seats: 2,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    brand: "Porsche",
    model: "Taycan Turbo S",
    price: 185000,
    rentPrice: 1400,
    engine: "Electric",
    hp: 750,
    seats: 4,
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 14,
    brand: "Rolls-Royce",
    model: "Phantom",
    price: 460000,
    rentPrice: 3500,
    engine: "6.75L V12",
    hp: 563,
    seats: 5,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 15,
    brand: "McLaren",
    model: "Artura",
    price: 233000,
    rentPrice: 1700,
    engine: "3.0L V6 Hybrid",
    hp: 671,
    seats: 2,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 16,
    brand: "Bentley",
    model: "Bentayga",
    price: 187000,
    rentPrice: 1500,
    engine: "4.0L V8",
    hp: 542,
    seats: 5,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 17,
    brand: "Ferrari",
    model: "SF90 Stradale",
    price: 507000,
    rentPrice: 3800,
    engine: "4.0L V8 Hybrid",
    hp: 986,
    seats: 2,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 18,
    brand: "Lamborghini",
    model: "Huracan EVO",
    price: 261000,
    rentPrice: 2100,
    engine: "5.2L V10",
    hp: 631,
    seats: 2,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 19,
    brand: "Mercedes-Maybach",
    model: "S 580",
    price: 184000,
    rentPrice: 1400,
    engine: "4.0L V8",
    hp: 496,
    seats: 5,
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 20,
    brand: "Aston Martin",
    model: "DBS Superleggera",
    price: 316000,
    rentPrice: 2400,
    engine: "5.2L V12",
    hp: 715,
    seats: 4,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 21,
    brand: "Porsche",
    model: "Panamera Turbo S",
    price: 186000,
    rentPrice: 1350,
    engine: "4.0L V8",
    hp: 620,
    seats: 4,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80"
  }
];

const mockImages = [
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80"
];

const updatedCars = cars.map(car => {
  return {
    ...car,
    images: [
      car.image,
      ...mockImages.filter(img => img !== car.image).slice(0, 4)
    ],
    description: "Experience the epitome of luxury and performance with the " + car.brand + " " + car.model + ". This vehicle combines cutting-edge technology with timeless design, offering an unparalleled driving experience. Crafted with precision, every detail inside and out reflects the heritage and excellence of " + car.brand + ".",
    specs: {
      acceleration: "0-60 mph in " + (Math.random() * (4.5 - 2.5) + 2.5).toFixed(1) + "s",
      topSpeed: Math.floor(Math.random() * (220 - 180) + 180) + " mph",
      transmission: "8-Speed Automatic",
      drivetrain: ["AWD", "RWD", "4WD"][Math.floor(Math.random() * 3)],
      fuelType: car.engine.includes("Electric") ? "Electric" : "Petrol"
    }
  }
});

const content = "export const cars = " + JSON.stringify(updatedCars, null, 2) + ";\n";
fs.writeFileSync('src/data/cars.js', content, 'utf-8');
console.log('Successfully updated cars.js');
