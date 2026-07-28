import React, { useState } from 'react';
import { useCarContext } from '../context/CarContext';
import './Admin.css';

const Admin = () => {
  const { addCar } = useCarContext();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
    rentPrice: '',
    engine: '',
    hp: '',
    seats: '',
    image: '',
    featured: false
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formatting data before saving
    const newCar = {
      ...formData,
      price: Number(formData.price),
      rentPrice: Number(formData.rentPrice),
      hp: Number(formData.hp),
      seats: Number(formData.seats),
    };

    addCar(newCar);
    setSuccessMessage('Vehicle successfully added to inventory!');
    
    // Reset form
    setFormData({
      brand: '',
      model: '',
      price: '',
      rentPrice: '',
      engine: '',
      hp: '',
      seats: '',
      image: '',
      featured: false
    });

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <h1 className="title">Admin Panel</h1>
          <p className="desc">Add new luxury vehicles to the inventory.</p>
        </div>
      </div>

      <div className="container admin-content">
        {successMessage && <div className="alert-success">{successMessage}</div>}
        
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required placeholder="e.g. Porsche" />
            </div>
            
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required placeholder="e.g. 911 Turbo S" />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="price">Purchase Price ($)</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required placeholder="e.g. 207000" />
            </div>
            
            <div className="form-group">
              <label htmlFor="rentPrice">Rent Price ($/day)</label>
              <input type="number" id="rentPrice" name="rentPrice" value={formData.rentPrice} onChange={handleChange} required placeholder="e.g. 1600" />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="engine">Engine</label>
              <input type="text" id="engine" name="engine" value={formData.engine} onChange={handleChange} required placeholder="e.g. 3.8L Flat-6" />
            </div>
            
            <div className="form-group">
              <label htmlFor="hp">Horsepower (HP)</label>
              <input type="number" id="hp" name="hp" value={formData.hp} onChange={handleChange} required placeholder="e.g. 640" />
            </div>
            
            <div className="form-group">
              <label htmlFor="seats">Seats</label>
              <input type="number" id="seats" name="seats" value={formData.seats} onChange={handleChange} required placeholder="e.g. 4" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input type="url" id="image" name="image" value={formData.image} onChange={handleChange} required placeholder="https://..." />
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} />
            <label htmlFor="featured">Feature on Home Page</label>
          </div>

          <button type="submit" className="btn btn-primary submit-btn">ADD VEHICLE &rarr;</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
