import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarContext } from '../context/CarContext';
import { ArrowLeft, Check, Gauge, Settings2, Zap, Car } from 'lucide-react';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const { cars } = useCarContext();
  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    // Find car by id (id is a string from params, we might need to convert it)
    const foundCar = cars.find(c => c.id.toString() === id);
    if (foundCar) {
      setCar(foundCar);
      if (foundCar.images && foundCar.images.length > 0) {
        setActiveImage(foundCar.images[0]);
      } else {
        setActiveImage(foundCar.image);
      }
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id, cars]);

  if (!car) {
    return (
      <div className="car-details-loading">
        <h2>Loading car details...</h2>
        <Link to="/inventory" className="btn btn-primary mt-4">Back to Inventory</Link>
      </div>
    );
  }

  const allImages = car.images || [car.image];

  return (
    <div className="car-details-page">
      <div className="container">
        <Link to="/inventory" className="back-link">
          <ArrowLeft size={20} />
          Back to Inventory
        </Link>
        
        <div className="car-details-header">
          <div>
            <h1 className="car-details-title">{car.brand} {car.model}</h1>
            <p className="car-details-subtitle">Experience luxury and power</p>
          </div>
          <div className="car-details-price-box glass-panel">
            <div className="price-tag">
              <span className="price-label">Purchase Price</span>
              <span className="price-value">${car.price.toLocaleString()}</span>
            </div>
            <div className="price-divider"></div>
            <div className="price-tag">
              <span className="price-label">Rental Price</span>
              <span className="price-value">${car.rentPrice.toLocaleString()} / day</span>
            </div>
            <button className="btn btn-primary mt-2 w-100" onClick={() => alert('Purchase inquiry sent!')}>
              INQUIRE NOW
            </button>
          </div>
        </div>

        <div className="car-details-gallery">
          <div className="main-image-container">
            <img src={activeImage} alt={`${car.brand} ${car.model}`} className="main-image" />
          </div>
          <div className="thumbnail-strip">
            {allImages.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="car-details-content">
          <div className="car-description section-panel">
            <h2>About this {car.brand}</h2>
            <p>{car.description || `Experience the epitome of luxury and performance with the ${car.brand} ${car.model}.`}</p>
          </div>
          
          <div className="car-specs-grid">
            <div className="spec-card glass-panel">
              <Gauge size={24} className="spec-card-icon" />
              <h4>Engine</h4>
              <p>{car.engine}</p>
            </div>
            <div className="spec-card glass-panel">
              <Zap size={24} className="spec-card-icon" />
              <h4>Horsepower</h4>
              <p>{car.hp} HP</p>
            </div>
            <div className="spec-card glass-panel">
              <Car size={24} className="spec-card-icon" />
              <h4>0-60 mph</h4>
              <p>{car.specs?.acceleration || "N/A"}</p>
            </div>
            <div className="spec-card glass-panel">
              <Settings2 size={24} className="spec-card-icon" />
              <h4>Top Speed</h4>
              <p>{car.specs?.topSpeed || "N/A"}</p>
            </div>
          </div>
          
          {car.specs && (
            <div className="car-full-specs section-panel">
              <h2>Technical Specifications</h2>
              <ul className="specs-list">
                <li><Check size={18} className="text-gold" /> <strong>Transmission:</strong> {car.specs.transmission}</li>
                <li><Check size={18} className="text-gold" /> <strong>Drivetrain:</strong> {car.specs.drivetrain}</li>
                <li><Check size={18} className="text-gold" /> <strong>Fuel Type:</strong> {car.specs.fuelType}</li>
                <li><Check size={18} className="text-gold" /> <strong>Seating Capacity:</strong> {car.seats}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
