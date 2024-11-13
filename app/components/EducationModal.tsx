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
