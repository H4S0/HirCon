'use client';

import { updateExperience } from '@/app/actions';
import { experienceSchema } from '@/app/utils/zodSchemas';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useActionState, useState } from 'react';

interface ExperienceDataProps {
  company: string;
  role: string;
  roleDescription: string;
  startDate: string;
  endDate: string;
}

const ExperienceForm = ({
  data,
  experienceId,
}: {
  data: ExperienceDataProps;
  experienceId: string;
}) => {
  const [company, setCompany] = useState<string | undefined>(data.company);
  const [role, setRole] = useState<string | undefined>(data.role);
  const [roleDescription, setRoleDescripiton] = useState<string | undefined>(
    data.roleDescription
  );
  const [startDate, setStartDate] = useState<string | undefined>(
    data.startDate
  );
  const [endDate, setEndDate] = useState<string | undefined>(data.endDate);
  const [lastResult, action] = useActionState(updateExperience, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: experienceSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <>
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <h1 className="text-lg font-bold">Edit Experience</h1>
        </CardHeader>
        <CardContent>
          {data ? (
            <form id={form.id} onSubmit={form.onSubmit} action={action}>
              <input type="hidden" name="experienceId" value={experienceId} />

              {/* Company/Institution */}
              <div className="mb-4">
                <Label htmlFor="company">Company/Institution:</Label>
                <Input
                  id={fields.company.name}
                  name={fields.company.name}
                  defaultValue={fields.company.initialValue}
                  required
                  className="mt-1"
                  value={company}
                />
              </div>

              {/* Role */}
              <div className="mb-4">
                <Label htmlFor="role">Role:</Label>
                <Input
                  id={fields.role.name}
                  name={fields.role.name}
                  defaultValue={fields.role.initialValue}
                  required
                  className="mt-1"
                  value={role}
                />
              </div>

              {/* Role Description */}
              <div className="mb-4">
                <Label htmlFor="roleDescription">Role Description:</Label>
                <Textarea
                  id={fields.roleDescription.name}
                  name={fields.roleDescription.name}
                  defaultValue={fields.roleDescription.initialValue}
                  required
                  className="mt-1"
                  rows={4}
                  value={roleDescription}
                />
              </div>

              {/* Start Date */}
              <div className="mb-4">
                <Label htmlFor="startDate">Start Date:</Label>
                <Input
                  id={fields.startYear.name}
                  name={fields.startYear.name}
                  type="date"
                  defaultValue={fields.startYear.initialValue}
                  required
                  className="mt-1"
                  value={startDate}
                />
              </div>

              {/* End Date */}
              <div className="mb-4">
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                  id={fields.endYear.name}
                  name={fields.endYear.name}
                  type="date"
                  defaultValue={fields.endYear.initialValue}
                  required
                  className="mt-1"
                  value={endDate}
                />
              </div>
            </form>
          ) : (
            <p>No experience details found.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" form="edit-experience-form" className="w-full">
            Save
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ExperienceForm;
