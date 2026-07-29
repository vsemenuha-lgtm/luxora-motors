import React, { useState } from 'react';
import { useCarContext } from '../context/CarContext';
import './Admin.css';

const Admin = () => {
  const { cars, addCar, removeCar, updateCar } = useCarContext();
  const [editingCarId, setEditingCarId] = useState(null);
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

  const handleEdit = (car) => {
    setEditingCarId(car.id);
    setFormData({
      brand: car.brand || '',
      model: car.model || '',
      price: car.price || '',
      rentPrice: car.rentPrice || '',
      engine: car.engine || '',
      hp: car.hp || '',
      seats: car.seats || '',
      image: car.image || '',
      featured: car.featured || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingCarId(null);
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
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setFormData(prev => ({
            ...prev,
            image: dataUrl
          }));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formatting data before saving
    const carData = {
      ...formData,
      price: Number(formData.price),
      rentPrice: Number(formData.rentPrice),
      hp: Number(formData.hp),
      seats: Number(formData.seats),
    };

    if (editingCarId) {
      updateCar({ ...carData, id: editingCarId });
      setSuccessMessage('Vehicle successfully updated!');
      setEditingCarId(null);
    } else {
      addCar(carData);
      setSuccessMessage('Vehicle successfully added to inventory!');
    }
    
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
            <label htmlFor="imageFile">Image (Upload File)</label>
            <div className="image-input-container">
              <input type="file" id="imageFile" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff' }} />
            </div>
            {formData.image && (
              <div style={{ marginTop: '15px' }}>
                <p style={{ marginBottom: '5px', fontSize: '0.9rem', color: '#aaa' }}>Image Preview:</p>
                <img src={formData.image} alt="Preview" style={{ maxHeight: '200px', objectFit: 'contain', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} />
            <label htmlFor="featured">Feature on Home Page</label>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button type="submit" className="btn btn-primary submit-btn">
              {editingCarId ? 'UPDATE VEHICLE' : 'ADD VEHICLE'} &rarr;
            </button>
            {editingCarId && (
              <button type="button" className="btn btn-secondary submit-btn" onClick={cancelEdit} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                CANCEL
              </button>
            )}
          </div>
        </form>

        <div className="admin-inventory-list" style={{ marginTop: '4rem' }}>
          <h2 className="title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Manage Inventory</h2>
          {cars && cars.length > 0 ? (
            <div className="admin-car-grid">
              {cars.map(car => (
                <div key={car.id} className="admin-car-card">
                  <div className="admin-car-image" style={{ backgroundImage: `url(${car.image})` }}></div>
                  <div className="admin-car-details">
                    <h3>{car.brand} {car.model}</h3>
                    <p style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>${car.price.toLocaleString()}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn-edit" onClick={() => handleEdit(car)} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px' }}>Edit</button>
                      <button className="btn-delete" onClick={() => removeCar(car.id)} style={{ flex: 1 }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No vehicles in inventory.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
