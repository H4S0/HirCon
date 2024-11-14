'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardNavbar from '@/app/components/DashboardNavbar';
import { Button } from '@/components/ui/button';

interface CompanyProps {
  id: string;
  companyName: string;
  industry: string;
  location: string;
  companyDescription: string;
  companySize: number;
  website: string;
}

const CompanyPage = () => {
  const [data, setData] = useState<CompanyProps[]>([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/gettingCompany');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        console.log('Data received on CompanyPage:', data);
        setData(data);
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setLoading(false); // stop loading after data is fetched
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading company information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <DashboardNavbar />

      {data && data.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          {data.map((company) => (
            <div key={company.id} className="mb-6">
              {' '}
              {/* Moved key to the top-level element */}
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500">
                  <span className="text-sm">Logo</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{company.companyName}</h1>
                  <p className="text-gray-500">{company.industry}</p>
                  <p className="text-gray-500">{company.location}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-full">
                    Create Job Alert
                  </Button>
                  <Link href={`/dashboard/company/edit/${company.id}`}>
                    <Button className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 w-full">
                      Edit Company
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">{company.companyDescription}</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Company Size
                    </h3>
                    <p className="text-lg font-semibold text-gray-700">
                      {company.companySize}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Website
                    </h3>
                    <a
                      href={company.website}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Link href={'/dashboard/company/new'}>New Company</Link>
      )}
    </div>
  );
};

export default CompanyPage;
