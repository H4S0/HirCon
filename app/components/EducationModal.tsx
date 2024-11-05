'use client';

import { updateEducation } from '@/app/actions';
import { educationSchema } from '@/app/utils/zodSchemas';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useActionState, useState } from 'react';

interface educationDataProps {
  institution: string;
  startDate: string;
  endDate: string;
  degree: string;
}

const EducationForm = ({
  data,
  educationId,
}: {
  data: educationDataProps;
  educationId: string;
}) => {
  const [institution, setInstitution] = useState(data.institution);
  const [degree, setDegree] = useState(data.degree);
  const [startYear, setStartYear] = useState(data.startDate);
  const [endYear, setEndYear] = useState(data.endDate);
  const [lastResult, action] = useActionState(updateEducation, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      parseWithZod(formData, { schema: educationSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <>
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <h1 className="text-lg font-bold">Edit Education</h1>
        </CardHeader>
        <CardContent>
          {data ? (
            <form id={form.id} onSubmit={form.onSubmit} action={action}>
              <input type="hidden" name="educationId" value={educationId} />

              <div className="mb-4">
                <Label htmlFor="institution">Institution:</Label>
                <Input
                  id={fields.institution.name}
                  name={fields.institution.name}
                  defaultValue={institution}
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="startDate">Start Date:</Label>
                <Input
                  id={fields.startDate.name}
                  name={fields.startDate.name}
                  type="date"
                  defaultValue={startYear}
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                  id={fields.endDate.name}
                  name={fields.endDate.name}
                  type="date"
                  defaultValue={endYear}
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="degree">Degree:</Label>
                <Select
                  id={fields.degree.name}
                  name={fields.degree.name}
                  defaultValue={degree}
                  required
                  className="mt-1"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH_SCHOOL_DIPLOMA">
                      High School Diploma
                    </SelectItem>
                    <SelectItem value="BACHELORS">
                      Bachelor&apos;s Degree
                    </SelectItem>
                    <SelectItem value="MASTERS">
                      Master&apos;s Degree
                    </SelectItem>
                    <SelectItem value="DOCTORATE">Doctorate Degree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardFooter>
                <Button
                  type="submit"
                  form="edit-education-form"
                  className="w-full"
                >
                  Save
                </Button>
              </CardFooter>
            </form>
          ) : (
            <p>No education details found.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default EducationForm;
