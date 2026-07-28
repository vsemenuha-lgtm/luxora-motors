import React from 'react';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';
import { useCarContext } from '../context/CarContext';
import './FeaturedCars.css';

const FeaturedCars = () => {
  const { cars } = useCarContext();
  const featured = cars.filter(car => car.featured).slice(0, 3);

  return (
    <section className="featured-cars">
      <div className="container">
        <div className="featured-header">
          <div>
            <span className="text-gold subtitle">OUR COLLECTION</span>
            <h2 className="title">Featured Luxury Cars</h2>
          </div>
          <Link to="/inventory" className="view-all-link">
            VIEW ALL INVENTORY &rarr;
          </Link>
        </div>
        
        <div className="cars-grid">
          {featured.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
