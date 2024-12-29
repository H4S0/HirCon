'use client';

import React, { useEffect, useState } from 'react';
import { JobAlertProps } from '../dashboard/company/page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { deleteJobAlert } from '../actions';
import JobApplyingModal from './JobApplyingModal';
import CheckingApplication from './CheckingApplication';

export interface applicationProps {
  fullName: string;
  email: string;
  coverLetter: string;
}

const JobAlert = ({
  data,
  currentRoute,
}: {
  data: JobAlertProps[];
  currentRoute: string;
}) => {
  const [application, setApplication] = useState<applicationProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/gettingApplication');
      const result = await response.json();
      setApplication(result);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 ">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <JobCard
            key={item.id}
            item={item}
            currentRoute={currentRoute}
            applicationItem={application}
          />
        ))}
      </div>
    </div>
  );
};

const JobCard = ({
  item,
  currentRoute,
  applicationItem,
}: {
  applicationItem: applicationProps[];
  item: JobAlertProps;
  currentRoute: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkingModal, setCheckingModal] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openCheckModal = () => setCheckingModal(true);
  const closeCheckModal = () => setCheckingModal(false);

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
          <div className="flex flex-col gap-2 ">
            <form action={deleteJobAlert} method="delete">
              <input type="hidden" name="jobAlertId" value={item.id} />
              <Button className="w-full">Delete your job alert</Button>
            </form>
            <Button onClick={openCheckModal}>View application</Button>
            <CheckingApplication
              isOpen={checkingModal}
              onClose={closeCheckModal}
              applicationData={applicationItem}
            />
          </div>
        ) : (
          <>
            <>
              <Button className="w-full" onClick={openModal}>
                Apply to Job
              </Button>
              <JobApplyingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                jobId={item.id}
              />
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default JobAlert;
