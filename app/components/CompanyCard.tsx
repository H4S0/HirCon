import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        {company.companyName}
      </h2>

      <p className="text-sm text-gray-700 mb-2">
        <strong className="font-medium text-gray-800">Industry:</strong>{' '}
        {company.industry}
      </p>

      <p className="text-sm text-gray-700 mb-2">
        <strong className="font-medium text-gray-800">Location:</strong>{' '}
        {company.location}
      </p>

      <p className="text-sm text-gray-700 mb-2">
        <strong className="font-medium text-gray-800">Size:</strong>{' '}
        {company.companySize} employees
      </p>

      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
        {company.companyDescription}
      </p>

      <div className="flex-grow"></div>

      {company.website && (
        <Link href={`/companies/${company.id}`}>
          <Button>View company</Button>
        </Link>
      )}
    </div>
  );
};

export default CompanyCard;
