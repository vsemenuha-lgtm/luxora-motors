import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <Shield className="logo-icon" size={32} />
          <div className="logo-text">
            <h2>LUXORA</h2>
            <span>MOTORS</span>
          </div>
        </Link>
        
        <nav className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/inventory">INVENTORY</Link>
          <Link to="/services">SERVICES</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/admin" className="text-gold">ADMIN</Link>
        </nav>
        
        <button className="btn btn-outline" onClick={() => alert('Booking a test drive coming soon!')}>BOOK A TEST DRIVE</button>
      </div>
    </header>
  );
};

export default Header;
