'use client';

import React, { useEffect, useState } from 'react';
import JobAlert from '../JobAlert';
import { Input } from '@/components/ui/input';

const JobList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); 

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/gettingJobAlert');

        if (!response.ok) {
          throw new Error('Failed to fetch job alerts.');
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading job alerts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  const filteredData = data.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.level.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  if (filteredData.length === 0) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          No job alerts match your search.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Job Alerts
      </h2>
      <div className="max-w-2xl mx-auto mb-6">
        <Input
          placeholder="Search for a job (title, location, or level)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <JobAlert data={filteredData} currentRoute="/" />
    </div>
  );
};

export default JobList;
