import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreateExperience } from '../actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { experienceSchema } from '../utils/zodSchemas';
import { Data } from './EducationModal';

const ExperienceModal = () => {
  const [data, setData] = useState<Data[]>();
  const [lastResult, action] = useActionState(CreateExperience, undefined);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await CreateExperience(undefined, formData);
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
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Add Experience</Button>
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
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="grid gap-6 mt-5">
                    <div className="grid gap-2">
                      <Label>Company name</Label>
                      <Input
                        key={fields.company.key}
                        name={fields.company.name}
                        defaultValue={fields.company.initialValue}
                        placeholder="Add Company name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Add your role</Label>
                      <Input
                        key={fields.role.key}
                        name={fields.role.name}
                        defaultValue={fields.role.initialValue}
                        placeholder="Add your role"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label>Starting date</Label>
                      <Input
                        type="date"
                        name={fields.startYear.name}
                        key={fields.startYear.key}
                        defaultValue={fields.startYear.initialValue}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label>End date</Label>
                      <Input
                        type="date"
                        name={fields.endYear.name}
                        key={fields.endYear.key}
                        defaultValue={fields.endYear.initialValue}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label>Short description abour your role</Label>
                      <Input
                        placeholder="Describe your role"
                        key={fields.roleDescription.key}
                        name={fields.roleDescription.name}
                        defaultValue={fields.roleDescription.initialValue}
                      />
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button>Submit</Button>
              </AlertDialogFooter>
            </form>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExperienceModal;
