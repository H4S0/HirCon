import React, { useActionState, useState } from 'react';
import {
  AlertDialog,
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

const EducationModal = () => {
  const [lastResult, action] = useActionState(CreateEducation, undefined);

  // Check if the form state is getting updated
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      console.log('Form Data:', formData); // Debugging to check the form data
      return parseWithZod(formData, {
        schema: educationSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(e.currentTarget); // Create a FormData object from the form

    // Call the CreateEducation action directly and wait for the result
    const result = await CreateEducation(undefined, formData);
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>Add Education</AlertDialogTrigger>
        <AlertDialogContent>
          <form id={form.id} onSubmit={handleSubmit} action={action}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to add this education?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="grid gap-6 mt-5">
                  {/* Institution */}
                  <div className="grid gap-2">
                    <Label htmlFor={fields.institution.name}>
                      Institution name
                    </Label>
                    <Input
                      key={fields.institution.key}
                      name={fields.institution.name} // Ensure name is used correctly
                      defaultValue={fields.institution.initialValue}
                      placeholder="Add Institution name"
                    />
                  </div>
                  {/* Degree */}
                  <div className="grid gap-2">
                    <Label>Degree</Label>
                    <Select
                      name={fields.degree.name} // Use name from useForm
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
                        <SelectItem value="MASTERS">Master's Degree</SelectItem>
                        <SelectItem value="DOCTORATE">
                          Doctorate Degree
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Start Date */}
                  <div className="grid gap-3">
                    <Label htmlFor={fields.startYear.name}>Starting date</Label>
                    <Input
                      key={fields.startYear.key}
                      name={fields.startYear.name}
                      defaultValue={fields.startYear.initialValue}
                      placeholder="Insert start date"
                    />
                  </div>
                  {/* End Date */}
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
              <Button type="submit">Submit</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EducationModal;
