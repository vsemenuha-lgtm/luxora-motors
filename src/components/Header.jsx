import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        
        <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
        
        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link to="/inventory" onClick={() => setMenuOpen(false)}>INVENTORY</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>SERVICES</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>
          <Link to="/admin" className="text-gold" onClick={() => setMenuOpen(false)}>ADMIN</Link>
          <button className="btn btn-outline mobile-only-btn" onClick={() => { alert('Booking a test drive coming soon!'); setMenuOpen(false); }}>BOOK A TEST DRIVE</button>
        </nav>
        
        <button className="btn btn-outline desktop-only-btn" onClick={() => alert('Booking a test drive coming soon!')}>BOOK A TEST DRIVE</button>
      </div>
    </header>
  );
};

export default Header;
