import React from 'react';
import { Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card glass-panel">
      <Link to={`/car/${car.id}`} className="car-image-link" style={{display: 'block'}}>
        <div className="car-image">
          <img src={car.image.startsWith('http') ? car.image : `${import.meta.env.BASE_URL}${car.image}`} alt={`${car.brand} ${car.model}`} loading="lazy" />
          <button className="like-btn" onClick={(e) => { e.preventDefault(); alert('Added to favorites!'); }}>
            <Heart size={20} />
          </button>
        </div>
      </Link>
      
      <div className="car-info">
        <div className="car-header">
          <h3 className="car-title">{car.brand} {car.model}</h3>
          <span className="car-price">${car.price.toLocaleString()}</span>
        </div>
        
        <div className="car-specs">
          <div className="spec">
            <span className="spec-icon">⚙️</span>
            <span>{car.engine}</span>
          </div>
          <div className="spec">
            <span className="spec-icon">⚡</span>
            <span>{car.hp} HP</span>
          </div>
          <div className="spec">
            <User size={14} className="spec-icon" />
            <span>{car.seats} Seats</span>
          </div>
        </div>
        
        <div className="car-footer">
          <Link to={`/car/${car.id}`} className="view-details-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
            VIEW DETAILS &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
