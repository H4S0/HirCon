<<<<<<< HEAD
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
=======
import React, { useActionState, useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useForm } from '@conform-to/react';
import { educationSchema } from '@/app/utils/zodSchemas';
import { Button } from '@/components/ui/button';
import { parseWithZod } from '@conform-to/zod';
import { CreateEducation } from '../actions';

export interface Data {
  id: string;
  description: string;
  skills: string[];
  userId: string;
  createdAt: Date;
}

const EducationModal = () => {
  const [data, setData] = useState<Data[]>();
  const [lastResult, action] = useActionState(CreateEducation, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: educationSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = await CreateEducation(undefined, formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/gettingProfile');
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const checkingData = data?.map((item) => {
    return item.description;
  });

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Add Education</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          {checkingData == 0 ? (
            <>
              <p>Please make sure first to fill description!</p>
              <AlertDialogAction>Continute</AlertDialogAction>
            </>
          ) : (
            <form
              id={form.id}
              onSubmit={handleSubmit}
              action={action}
              className="grid gap-5"
            >
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to add this education?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="grid gap-6 mt-5">
                    <div className="grid gap-2">
                      <Label htmlFor={fields.institution.name}>
                        Institution name
                      </Label>
                      <Input
                        key={fields.institution.key}
                        name={fields.institution.name}
                        defaultValue={fields.institution.initialValue}
                        placeholder="Add Institution name"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Degree</Label>
                      <Select
                        name={fields.degree.name}
                        defaultValue={fields.degree.initialValue}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose your degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HIGH_SCHOOL_DIPLOMA">
                            High School Diploma
                          </SelectItem>
                          <SelectItem value="BACHELORS">
                            Bachelor's Degree
                          </SelectItem>
                          <SelectItem value="MASTERS">
                            Master's Degree
                          </SelectItem>
                          <SelectItem value="DOCTORATE">
                            Doctorate Degree
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor={fields.startYear.name}>
                        Starting date
                      </Label>
                      <Input
                        key={fields.startYear.key}
                        name={fields.startYear.name}
                        defaultValue={fields.startYear.initialValue}
                        placeholder="Insert start date"
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor={fields.endYear.name}>End date</Label>
                      <Input
                        key={fields.endYear.key}
                        name={fields.endYear.name}
                        defaultValue={fields.endYear.initialValue}
                        placeholder="Insert end date"
                      />
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit">Submit</Button>
              </AlertDialogFooter>
            </form>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EducationModal;
>>>>>>> 55459b7601ef0d30d860864321a4ad87c7e32571
