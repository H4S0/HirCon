import { CreateApplication } from '@/app/actions';
import { applicationSchema } from '@/app/utils/zodSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useState } from 'react';

const JobApplyingModal = ({
  isOpen,
  onClose,
  jobId,
}: {
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: applicationSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(event.currentTarget);
    formData.set('jobId', jobId);

    try {
      const response = await CreateApplication(undefined, formData);

      if (response.message === 'You have successfully applied') {
        setErrorMessage('You have successfully applied');
      } else if (response.message === 'You have already applied') {
        setErrorMessage(response.message);
      } else if (response.status === 'error') {
        setErrorMessage('An unexpected error occurred.');
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Apply to Job</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {errorMessage === 'You have already applied' && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}

        <form id={form.id} onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              name={fields.fullName.name}
              defaultValue={fields.fullName.initialValue}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              name={fields.email.name}
              defaultValue={fields.email.initialValue}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <Label>Cover Letter</Label>
            <Input
              type="text"
              name={fields.coverLetter.name}
              defaultValue={fields.coverLetter.initialValue}
              placeholder="Enter your cover letter"
              required
            />
          </div>
          <input type="hidden" name="jobId" value={jobId} />
          <div className="flex justify-end">
            <Button type="submit" className="mr-2">
              Apply
            </Button>
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplyingModal;
