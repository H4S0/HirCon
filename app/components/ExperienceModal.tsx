import {
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useActionState } from 'react';
import { DatePicker } from './DatePicker';
import { Button } from '@/components/ui/button';
import { CreateExperience } from '../actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { experienceSchema } from '../utils/zodSchemas';

const ExperienceModal = () => {
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
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Add Experience</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form id={form.id} onSubmit={handleSubmit} action={action}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="grid gap-6 mt-5">
                  <div className="grid gap-2">
                    <Label>Company name</Label>
                    <Input placeholder="Add Company name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Add your role</Label>
                    <Input placeholder="Add your role" />
                  </div>
                  <div className="grid gap-3">
                    <Label>Starting date</Label>
                    <DatePicker />
                  </div>
                  <div className="grid gap-3">
                    <Label>End date</Label>
                    <DatePicker />
                  </div>
                  <div className="grid gap-3">
                    <Label>Short description abour your role</Label>
                    <Input placeholder="Describe your role" />
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="grid grid-cols-2 gap-2 mt-5">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </div>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExperienceModal;
