'use client';

import { CreateApplication } from '@/app/actions';
import { applicationSchema } from '@/app/utils/zodSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useActionState, useState } from 'react';

export const JobApplyingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const [lastResult, action] = useActionState(CreateApplication, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: applicationSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

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
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <div className="flex flex-col mb-4">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              type="text"
              key={fields.fullName.key}
              name={fields.fullName.name}
              defaultValue={fields.fullName.initialValue}
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <Label>Email</Label>
            <Input
              type="text"
              key={fields.email.key}
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
              key={fields.coverLetter.key}
              name={fields.coverLetter.name}
              defaultValue={fields.coverLetter.initialValue}
              placeholder="Enter your cover letter"
              required
            />
          </div>
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
