import React, { useState } from 'react';
import { JobAlertProps } from '../dashboard/company/[companyId]/page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const JobAlert = ({
  data,
  currentRoute,
}: {
  data: JobAlertProps[];
  currentRoute: string;
}) => {
  return (
    <div className="p-4 min-h-screen">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <JobCard key={item.id} item={item} currentRoute={currentRoute} />
        ))}
      </div>
    </div>
  );
};

const JobCard = ({
  item,
  currentRoute,
}: {
  item: JobAlertProps;
  currentRoute: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const isCompanyDashboard = currentRoute === '/dashboard/company';

  return (
    <div className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition flex flex-col h-full">
      <h2 className="text-xl font-semibold">{item.jobTitle}</h2>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Location:</span> {item.location}{' '}
        {item.remote === 'true' && (
          <span className="text-green-500">(Remote)</span>
        )}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Job Type:</span>{' '}
        {item.jobType === 'FULL_TIME'
          ? 'Full time'
          : item.jobType === 'PART_TIME'
          ? 'Part time'
          : item.jobType === 'CONTRACT'
          ? 'Contract'
          : 'Internship'}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Level:</span>{' '}
        {item.level.charAt(0).toUpperCase() + item.level.slice(1).toLowerCase()}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Salary:</span> ${item.salary}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Remote:</span>{' '}
        {item.remote === 'AVAILABLE' ? 'Available' : 'Not available'}
      </p>

      {/* Flex-grow pushes this content up, so button stays at bottom */}
      <p
        className={`text-gray-600 mb-4 ${
          expanded ? '' : 'line-clamp-3'
        } flex-grow`}
      >
        {item.jobDescription}
      </p>
      <button
        className="text-blue-600 underline text-sm mb-4"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>

      <div className="mt-auto">
        {isCompanyDashboard ? (
          <Link href={`/dashboard/company/job/${item.id}`}>
            <Button className="w-full">Edit your job alert</Button>
          </Link>
        ) : (
          <Link href={`/apply/job/${item.id}`}>
            <Button className="w-full">Apply to Job</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobAlert;
