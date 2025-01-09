import React from 'react';
import JobList from '../components/landingpage/JobList';
import Navbar from '../components/landingpage/LandingPageNavbar';

const Jobs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Navbar />
      <JobList />
    </div>
  );
};

export default Jobs;
