import React from 'react';
import './Contact.css';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="contact-page container">
      <div className="page-header text-center">
        <h1 className="page-title">CONTACT <span className="text-gold">US</span></h1>
        <p className="page-subtitle">Schedule a private viewing or inquire about our collection.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info glass-panel">
          <h2 className="contact-heading">Get in Touch</h2>
          <p className="contact-desc">Our concierge team is available to assist you with any inquiries regarding our inventory or services.</p>
          
          <div className="info-list">
            <div className="info-item">
              <MapPin className="text-gold" size={24} />
              <div>
                <h4>Boutique Showroom</h4>
                <p>100 Prestige Way<br/>Beverly Hills, CA 90210</p>
              </div>
            </div>
            
            <div className="info-item">
              <Phone className="text-gold" size={24} />
              <div>
                <h4>VIP Line</h4>
                <p>+1 (800) LUX-AUTO</p>
              </div>
            </div>
            
            <div className="info-item">
              <Mail className="text-gold" size={24} />
              <div>
                <h4>Direct Email</h4>
                <p>concierge@luxoramotors.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <Clock className="text-gold" size={24} />
              <div>
                <h4>Viewing Hours</h4>
                <p>Monday - Saturday: By Appointment Only<br/>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper glass-panel">
          <h2 className="contact-heading">Send an Inquiry</h2>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" required />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" className="form-control" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea className="form-control" rows="4" placeholder="How can we assist you?" required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary w-100 mt-2">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
