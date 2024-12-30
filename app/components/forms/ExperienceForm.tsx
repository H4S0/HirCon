'use client';

import React, { useActionState, useState } from 'react';
import { DeleteExperience, updateExperience } from '@/app/actions';
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
  const [company, setCompany] = useState(data.company);
  const [role, setRole] = useState(data.role);
  const [roleDescription, setRoleDescription] = useState(data.roleDescription);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);

  const [lastResult, action] = useActionState(updateExperience, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: experienceSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <Card className="max-w-md w-full shadow-lg">
      <CardHeader>
        <h1 className="text-lg font-bold">Edit Experience</h1>
      </CardHeader>
      <CardContent>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <input type="hidden" name="experienceId" value={experienceId} />

          <div className="mb-4">
            <Label htmlFor="company">Company/Institution:</Label>
            <Input
              id={fields.company.name}
              name={fields.company.name}
              defaultValue={company}
              required
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="role">Role:</Label>
            <Input
              id={fields.role.name}
              name={fields.role.name}
              defaultValue={role}
              required
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="roleDescription">Role Description:</Label>
            <Textarea
              id={fields.roleDescription.name}
              name={fields.roleDescription.name}
              defaultValue={roleDescription}
              required
              onChange={(e) => setRoleDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="startDate">Start Date:</Label>
            <Input
              id={fields.startYear.name}
              name={fields.startYear.name}
              type="date"
              defaultValue={startDate}
              required
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="endDate">End Date:</Label>
            <Input
              id={fields.endYear.name}
              name={fields.endYear.name}
              type="date"
              defaultValue={endDate}
              required
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <CardFooter>
            <div className="grid gap-2 mt-5 w-full">
              <Button type="submit" className="w-full">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  const formData = new FormData();

                  formData.append('experienceId', experienceId);
                  await DeleteExperience(undefined, formData);
                }}
              >
                Delete education
              </Button>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
