import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background-video-wrapper">
        <video
          className="hero-background-video"
          src={`${import.meta.env.BASE_URL}hero.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        ></video>
      </div>
      <div className="hero-gradient"></div>
      
      <div className="container hero-content">
        <span className="hero-subtitle text-gold">DRIVE THE EXTRAORDINARY</span>
        <h1 className="hero-title">
          Luxury Redefined.
        </h1>
        <p className="hero-desc">
          Discover elite performance, unmatched comfort, and timeless design. Your dream car awaits.
        </p>
        
        <div className="hero-actions">
          <Link to="/inventory" className="btn btn-primary">EXPLORE INVENTORY &rarr;</Link>
          <button className="btn btn-outline play-btn" onClick={() => alert('Video coming soon!')}>
            <Play size={18} />
            WATCH VIDEO
          </button>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">50+</span>
            <span className="stat-label">PREMIUM BRANDS</span>
          </div>
          <div className="stat">
            <span className="stat-value">100+</span>
            <span className="stat-label">LUXURY MODELS</span>
          </div>
          <div className="stat">
            <span className="stat-value">10K+</span>
            <span className="stat-label">HAPPY CLIENTS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
