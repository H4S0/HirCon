import { Building2, MailSearch, StickyNote } from 'lucide-react';
import React from 'react';

const Process = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="py-8 px-4 text-center">
        <div className="inline-block bg-gray-700 text-white px-4 py-2 rounded-sm">
          <h1 className="text-3xl font-bold">How It Works</h1>
        </div>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl">
          Discover how our simple three-step process helps you connect with
          qualified professionals quickly and efficiently. Create, post, and
          hire—all with ease.
        </p>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto p-6">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {/* Card 1 */}
          <div className="relative p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md">
              <Building2 className="w-12 h-12 text-gray-800" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Create Free Company
            </h2>
            <p className="text-gray-600">
              Create your free job post today and start receiving competitive
              quotes from qualified professionals within just a few hours.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md">
              <StickyNote className="w-12 h-12 text-gray-800" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Post a Job
            </h2>
            <p className="text-gray-600">
              Share your job details and requirements with a wide pool of
              skilled professionals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md">
              <MailSearch className="w-12 h-12 text-gray-800" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Hire
            </h2>
            <p className="text-gray-600">
              Review quotes, compare professionals, and hire the best fit for
              your project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
