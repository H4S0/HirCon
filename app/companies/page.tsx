'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/LandingPageNavbar';
import CompanyCard from '../components/CompanyCard';
import { Input } from '@/components/ui/input';
import { CompanyProps } from '../dashboard/company/page';

const Page = () => {
  const [companyData, setCompanyData] = useState<CompanyProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/gettingAllCompanies');
        if (!response.ok) {
          throw new Error('Failed to fetch company data.');
        }
        const result = await response.json();
        setCompanyData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredCompanies = companyData.filter((company) =>
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4 text-center mt-5">Companies</h1>

      <div className="max-w-2xl mx-auto mb-6">
        <Input
          placeholder="Search for a job (title, location, or level)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading && (
        <p className="text-center text-lg font-semibold">
          Loading companies...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 text-lg font-semibold">
          {error}
        </p>
      )}

      {!loading && !error && filteredCompanies.length === 0 && (
        <p className="text-center text-lg font-semibold">
          No companies found matching your search.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCompanies.map((company, index) => (
          <CompanyCard company={company} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Page;
