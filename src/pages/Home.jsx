import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedCars from '../components/FeaturedCars';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <FeaturedCars />
    </main>
  );
};

export default Home;
