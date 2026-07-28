import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Admin from './pages/Admin';
import CarDetails from './pages/CarDetails';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import { CarProvider } from './context/CarContext';

function App() {
  return (
    <CarProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/car/:id" element={<CarDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CarProvider>
  );
}

export default App;
