import React from 'react';
import { applicationProps } from './JobAlert';
import { Button } from '@/components/ui/button';

const CheckingApplication = ({
  applicationData,
  isOpen,
  onClose,
}: {
  applicationData: applicationProps[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
        <div className="space-y-4 overflow-y-auto max-h-80">
          {applicationData.length > 0 ? (
            applicationData.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-md shadow-sm space-y-2"
              >
                <p className="font-medium">Name: {item.fullName}</p>
                <p>Email: {item.email}</p>
                <p>Cover Letter:</p>
                <p className="text-gray-700 text-sm">{item.coverLetter}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No applications available.</p>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckingApplication;
