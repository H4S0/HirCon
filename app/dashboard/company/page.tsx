'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardNavbar from '@/app/components/DashboardNavbar';
import { Button } from '@/components/ui/button';
import JobCreating from '@/app/components/forms/JobCreating';
import JobAlert from '@/app/components/JobAlert';
import Image from 'next/image';

export interface CompanyProps {
  id: string;
  companyName: string;
  industry: string;
  location: string;
  companyDescription: string;
  companySize: number;
  website: string;
  image: string;
}

export interface JobAlertProps {
  id: string;
  jobTitle: string;
  salary: string;
  jobDescription: string;
  location: string;
  remote: string;
  jobType: string;
  level: string;
}

const CompanyPage = () => {
  const [data, setData] = useState<CompanyProps[]>([]);
  const [loading, setLoading] = useState(true); // loading state
  const [jobAlertData, setJobAlertData] = useState<JobAlertProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/jobAlert');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        setJobAlertData(data);
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setLoading(false); // stop loading after data is fetched
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/gettingCompany');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setLoading(false);
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
                <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {company.image ? (
                    <Image
                      src={company.image}
                      width={96}
                      height={96}
                      alt="company-logo"
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm font-semibold">
                      Company Logo
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{company.companyName}</h1>
                  <p className="text-gray-500">{company.industry}</p>
                  <p className="text-gray-500">{company.location}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <JobCreating />
                  <Link href={`/dashboard/company/companyEdit/${company.id}`}>
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
          <JobAlert data={jobAlertData} currentRoute="/dashboard/company" />
        </div>
      ) : (
        <Link href={'/dashboard/company/new'}>New Company</Link>
      )}
    </div>
  );
};

export default CompanyPage;
