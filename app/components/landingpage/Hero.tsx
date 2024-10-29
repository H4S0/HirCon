import React from 'react';
import Navbar from '../LandingPageNavbar';
import { Input } from '@/components/ui/input';
const Hero = () => {
  return (
    <>
      <Navbar />
      <div>
        <div>
          <div>
            <p>Find Your</p>
            <p>Ideal Job</p>
          </div>
          <Input placeholder="Search job" />
          <div>
            <div>
              <p>8M+</p>
              <p>Matched Made</p>
            </div>
            <div>
              <p>Unlocking your potential</p>
              <p>View all job offers</p>
            </div>
          </div>
        </div>
        <h3>SLIKAA</h3>
      </div>
    </>
  );
};

export default Hero;
