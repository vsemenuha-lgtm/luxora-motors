import React from 'react';
import { Shield } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo" style={{ marginBottom: '1.5rem' }}>
              <Shield className="logo-icon" size={40} />
              <div className="logo-text">
                <h2 style={{ fontSize: '1.5rem' }}>LUXORA</h2>
                <span style={{ fontSize: '0.75rem' }}>MOTORS</span>
              </div>
            </div>
            <p className="footer-desc">
              Experience the pinnacle of automotive engineering and luxury. Your dream car is just a reservation away.
            </p>
          </div>
          
          <div className="footer-links-group">
            <div className="footer-column">
              <h4>Why Choose Luxora Motors?</h4>
              <ul>
                <li><span className="text-gold">Exclusive Selection:</span> Access the rarest luxury vehicles.</li>
                <li><span className="text-gold">Unmatched Quality:</span> Highest standards of excellence.</li>
                <li><span className="text-gold">Client First:</span> Your satisfaction is our priority.</li>
                <li><span className="text-gold">Worldwide Delivery:</span> Delivered to your doorstep.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Luxora Motors. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy coming soon!'); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service coming soon!'); }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
