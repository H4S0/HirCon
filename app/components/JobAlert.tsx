import React, { useState } from 'react';
import { JobAlertProps } from '../dashboard/company/page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const JobAlert = ({ data }: { data: JobAlertProps[] }) => {
  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Job Alerts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <JobCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const JobCard = ({ item }: { item: JobAlertProps }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold ">{item.jobTitle}</h2>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Location:</span> {item.location}{' '}
        {item.remote === 'true' && (
          <span className="text-green-500">(Remote)</span>
        )}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Job Type:</span> {item.jobType}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Level:</span> {item.level}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Salary:</span> ${item.salary}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Remote:</span>
        {item.remote}
      </p>
      <p className={`text-gray-600 mb-4 ${expanded ? '' : 'line-clamp-3'}`}>
        {item.jobDescription}
      </p>
      <button
        className="text-blue-600 underline text-sm mb-4"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
      <Link href={`/dashboard/company/job/${item.id}`}>
        <Button className="w-full">Edit your job alert</Button>
      </Link>
    </div>
  );
};

export default JobAlert;
