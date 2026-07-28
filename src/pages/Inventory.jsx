import React, { useState } from 'react';
import CarCard from '../components/CarCard';
import { useCarContext } from '../context/CarContext';
import './Inventory.css';

const Inventory = () => {
  const { cars } = useCarContext();
  const [filter, setFilter] = useState('all');

  const filteredCars = cars.filter(car => {
    if (filter === 'rent') return car.rentPrice > 0;
    if (filter === 'buy') return car.price > 0;
    return true;
  });

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div className="container">
          <h1 className="title">Our Inventory</h1>
          <p className="desc">Explore our full collection of premium vehicles for rent and purchase.</p>
        </div>
      </div>
      
      <div className="container inventory-content">
        <div className="inventory-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            ALL VEHICLES
          </button>
          <button 
            className={`filter-btn ${filter === 'rent' ? 'active' : ''}`}
            onClick={() => setFilter('rent')}
          >
            FOR RENT
          </button>
          <button 
            className={`filter-btn ${filter === 'buy' ? 'active' : ''}`}
            onClick={() => setFilter('buy')}
          >
            FOR SALE
          </button>
        </div>
        
        <div className="cars-grid">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
