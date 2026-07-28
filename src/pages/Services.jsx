import React from 'react';
import { ShieldCheck, Settings, Truck, Star, Wrench, Headphones } from 'lucide-react';
import './Services.css';

const Services = () => {
  const servicesList = [
    {
      icon: <ShieldCheck size={40} className="service-icon text-gold" />,
      title: "Concierge Purchasing",
      description: "Our dedicated concierge team will locate any specific make and model worldwide, managing the entire acquisition process on your behalf."
    },
    {
      icon: <Wrench size={40} className="service-icon text-gold" />,
      title: "Bespoke Customization",
      description: "From custom leather interiors to performance tuning, our master technicians tailor your vehicle to your exact specifications."
    },
    {
      icon: <Truck size={40} className="service-icon text-gold" />,
      title: "Secure Global Delivery",
      description: "We offer fully enclosed, climate-controlled transport to safely deliver your exotic vehicle to any destination globally."
    },
    {
      icon: <Star size={40} className="service-icon text-gold" />,
      title: "Premium Detailing",
      description: "Our meticulous detailing service uses only the finest products and ceramic coatings to protect and enhance your vehicle's finish."
    },
    {
      icon: <Settings size={40} className="service-icon text-gold" />,
      title: "Performance Maintenance",
      description: "Comprehensive servicing and performance diagnostics to ensure your supercar operates at peak efficiency."
    },
    {
      icon: <Headphones size={40} className="service-icon text-gold" />,
      title: "24/7 VIP Support",
      description: "Unparalleled after-sales support with a dedicated hotline exclusively for Luxora Motors clientele."
    }
  ];

  return (
    <div className="services-page container">
      <div className="page-header text-center">
        <h1 className="page-title">OUR <span className="text-gold">SERVICES</span></h1>
        <p className="page-subtitle">Exceeding expectations with unparalleled automotive services.</p>
      </div>

      <div className="services-grid">
        {servicesList.map((service, index) => (
          <div key={index} className="service-card glass-panel">
            <div className="service-icon-wrapper">
              {service.icon}
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
