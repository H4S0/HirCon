import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
      {/* Company Name */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        {company.companyName}
      </h2>

      {/* Industry */}
      <p className="text-sm text-gray-700 mb-2">
        <strong className="font-medium text-gray-800">Industry:</strong>{' '}
        {company.industry}
      </p>

      {/* Location */}
      <p className="text-sm text-gray-700 mb-2">
        <strong className="font-medium text-gray-800">Location:</strong>{' '}
        {company.location}
      </p>

      {/* Company Size */}
      <p className="text-sm text-gray-700 mb-2">
        <strong className="font-medium text-gray-800">Size:</strong>{' '}
        {company.companySize} employees
      </p>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
        {company.companyDescription}
      </p>

      {/* Spacer to push the button to the bottom */}
      <div className="flex-grow"></div>

      {/* Visit Website Button */}
      {company.website && (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors mt-auto"
        >
          Visit Website
        </a>
      )}
    </div>
  );
};

export default CompanyCard;
