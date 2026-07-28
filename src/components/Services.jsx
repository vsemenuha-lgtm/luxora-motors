import React from 'react';
import { Diamond, CheckCircle, ConciergeBell, ShieldCheck } from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: <Diamond size={32} />,
    title: "Premium Collection",
    desc: "Handpicked luxury cars from the world's most prestigious brands."
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Certified Quality",
    desc: "All vehicles undergo a rigorous inspection for uncompromised quality."
  },
  {
    icon: <ConciergeBell size={32} />,
    title: "Concierge Service",
    desc: "Personalized assistance for a seamless and luxurious journey."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Aftercare Support",
    desc: "Reliable maintenance and support long after you drive away."
  }
];

const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <div className="section-header">
          <span className="text-gold subtitle">EXPERIENCE EXCELLENCE</span>
          <h2 className="title">Premium Services</h2>
          <p className="desc">Every detail is crafted to deliver the ultimate luxury<br/>car ownership experience.</p>
        </div>
        
        <div className="services-grid">
          {services.map((svc, i) => (
            <div className="service-card glass-panel" key={i}>
              <div className="service-icon text-gold">
                {svc.icon}
              </div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
