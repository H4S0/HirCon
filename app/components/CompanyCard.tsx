import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
      <div className="flex gap-3 items-center justify-start pb-5">
        {company.image ? (
          <Image
            src={company.image}
            width={66}
            height={66}
            alt="company-logo"
            className="object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-500 text-sm font-semibold">
            Company Logo
          </span>
        )}
        <h2 className="text-2xl font-semibold text-gray-900">
          {company.companyName}
        </h2>
      </div>

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
