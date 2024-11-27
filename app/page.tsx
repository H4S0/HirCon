import React from 'react';
import Hero from './components/landingpage/Hero';
import Process from './components/landingpage/Process';
import JobList from './components/landingpage/JobList';

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <Hero />
        <Process />
        <JobList />
      </div>
    </>
  );
}
