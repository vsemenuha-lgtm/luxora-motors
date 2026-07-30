import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarContext } from '../context/CarContext';
import { ArrowLeft, Check, Gauge, Settings2, Zap, Car, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const { cars } = useCarContext();
  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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

  const allImages = car ? (car.images || [car.image]) : [];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  if (!car) {
    return (
      <div className="car-details-loading">
        <h2>Loading car details...</h2>
        <Link to="/inventory" className="btn btn-primary mt-4">Back to Inventory</Link>
      </div>
    );
  }

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
          <div 
            className="main-image-container" 
            onClick={() => openLightbox(allImages.indexOf(activeImage))}
            style={{ cursor: 'pointer' }}
          >
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

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={32} />
          </button>
          
          <button 
            className="lightbox-nav prev" 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft size={48} />
          </button>

          <div 
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndHandler}
          >
            <img src={allImages[lightboxIndex]} alt={`Gallery view ${lightboxIndex + 1}`} />
            <div className="lightbox-counter">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </div>

          <button 
            className="lightbox-nav next" 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
