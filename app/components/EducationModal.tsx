import React, { useActionState, useState } from 'react';
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
import { DatePicker } from './DatePicker';
import { useForm } from '@conform-to/react';
import { educationSchema, profileSchema } from '@/app/utils/zodSchemas';
import { Button } from '@/components/ui/button';
import { parseWithZod } from '@conform-to/zod';

const EducationModal = () => {
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
  const [degree, setDegree] = useState(fields.degree.initialValue);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>Add Education</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
              ></form>
              <div className="grid gap-6 mt-5">
                <div className="grid gap-2">
                  <Label>Institution name</Label>
                  <Input placeholder="Add Institution name" />
                </div>
                <div className="grid gap-2">
                  <Label>Degree</Label>
                  <Select
                    name={fields.degree.name}
                    value={degree}
                    onValueChange={(value) => {
                      setDegree(value);
                      fields.degree.value = value;
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
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
                <div className="grid gap-3">
                  <Label>Starting date</Label>
                  <Input
                    key={fields.startYear.key}
                    name={fields.startYear.name}
                    defaultValue={fields.startYear.initialValue}
                    placeholder="Insert start date"
                  />
                </div>
                <div className="grid gap-3">
                  <Label>End date</Label>
                  <Input
                    key={fields.endYear.key}
                    name={fields.endYear.name}
                    defaultValue={fields.endYear.initialValue}
                    placeholder="Insert start date"
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button>Submit</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EducationModal;
