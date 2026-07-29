import React, { createContext, useContext, useState, useEffect } from 'react';
import { cars as defaultCars } from '../data/cars';

const CarContext = createContext();

export const useCarContext = () => useContext(CarContext);

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem('luxora_cars');
    if (savedCars) {
      try {
        return JSON.parse(savedCars);
      } catch (e) {
        console.error("Error parsing cars from localStorage", e);
      }
    }
    return defaultCars;
  });

  useEffect(() => {
    localStorage.setItem('luxora_cars', JSON.stringify(cars));
  }, [cars]);

  const addCar = (newCar) => {
    setCars(prevCars => [
      ...prevCars,
      {
        ...newCar,
        id: Date.now(), // Generate a unique ID
      }
    ]);
  };

  const removeCar = (carId) => {
    setCars(prevCars => prevCars.filter(car => car.id !== carId));
  };

  return (
    <CarContext.Provider value={{ cars, addCar, removeCar }}>
      {children}
    </CarContext.Provider>
  );
};
