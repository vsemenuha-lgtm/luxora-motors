import React from 'react';
import './About.css';
import { Award, Globe, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page container">
      <div className="page-header text-center">
        <h1 className="page-title">ABOUT <span className="text-gold">US</span></h1>
        <p className="page-subtitle">Redefining luxury automotive retail since 1998.</p>
      </div>

      <div className="about-content">
        <div className="about-text glass-panel">
          <h2 className="about-heading">Our Heritage</h2>
          <p>
            Luxora Motors was founded with a singular vision: to provide an automotive purchasing experience as exquisite as the vehicles we curate. For over two decades, we have been the premier destination for discerning collectors and enthusiasts seeking the world's most exclusive automobiles.
          </p>
          <p>
            Our showroom is more than a dealership; it is a gallery of automotive art. We painstakingly source our inventory, ensuring every vehicle meets our uncompromising standards of provenance, condition, and pedigree.
          </p>
          
          <div className="stats-row">
            <div className="stat-item">
              <Award className="text-gold mb-2" size={32} />
              <h3 className="stat-number">25+</h3>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <Globe className="text-gold mb-2" size={32} />
              <h3 className="stat-number">50+</h3>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-item">
              <Users className="text-gold mb-2" size={32} />
              <h3 className="stat-number">10k+</h3>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </div>

        <div className="about-image">
          {/* We use a high quality unsplash image of a luxury showroom */}
          <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Luxora Showroom" className="showroom-img" />
          <div className="image-overlay glass-panel">
            <h3>The Luxora Standard</h3>
            <p>Every vehicle is a masterpiece.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
