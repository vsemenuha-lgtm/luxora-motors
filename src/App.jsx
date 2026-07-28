import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { CarProvider } from './context/CarContext';

// Lazy load pages for better performance
const Inventory = lazy(() => import('./pages/Inventory'));
const Admin = lazy(() => import('./pages/Admin'));
const CarDetails = lazy(() => import('./pages/CarDetails'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Simple loading fallback
const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0a', color: '#c5a059' }}>
    Loading...
  </div>
);

function App() {
  return (
    <CarProvider>
      <Router>
        <div className="app">
          <Header />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/car/:id" element={<CarDetails />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </CarProvider>
  );
}

export default App;
