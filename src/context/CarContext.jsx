import React, { createContext, useContext, useState, useEffect } from 'react';
import { cars as defaultCars } from '../data/cars';

const CarContext = createContext();

export const useCarContext = () => useContext(CarContext);

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem('luxora_cars');
    const version = localStorage.getItem('luxora_version');
    if (savedCars && version === '1.1') {
      try {
        return JSON.parse(savedCars);
      } catch (e) {
        console.error("Error parsing cars from localStorage", e);
      }
    }
    // If no version match or no saved cars, use defaults and set version
    localStorage.setItem('luxora_version', '1.1');
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
  const updateCar = (updatedCar) => {
    setCars(prevCars => prevCars.map(car => car.id === updatedCar.id ? updatedCar : car));
  };

  return (
    <CarContext.Provider value={{ cars, addCar, removeCar, updateCar }}>
      {children}
    </CarContext.Provider>
  );
};
