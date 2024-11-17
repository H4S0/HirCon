import { CreateJobAlert } from '@/app/actions';
import { jobAlertSchema } from '@/app/utils/zodSchemas';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useActionState } from 'react';

const JobCreating = () => {
  const [lastResult, action] = useActionState(CreateJobAlert, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: jobAlertSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Create job alert</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form
            className="grid gap-5"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="grid gap-6 mt-5">
                  <div className="grid gap-2">
                    <Label>Role</Label>
                    <Input
                      key={fields.jobTitle.key}
                      name={fields.jobTitle.name}
                      defaultValue={fields.jobTitle.initialValue}
                      placeholder="Add role name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Role Description</Label>
                    <Textarea
                      key={fields.jobDescription.key}
                      name={fields.jobDescription.name}
                      defaultValue={fields.jobDescription.initialValue}
                      placeholder="Add your role"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Level</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Junior</SelectItem>
                        <SelectItem value="dark">Medior</SelectItem>
                        <SelectItem value="system">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label>Salary per year</Label>
                    <Input
                      type="text"
                      key={fields.salary.key}
                      name={fields.salary.name}
                      defaultValue={fields.salary.initialValue}
                      placeholder="Add your salary per year"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Location</Label>
                    <Input
                      placeholder="Describe your role"
                      key={fields.location.key}
                      name={fields.location.name}
                      defaultValue={fields.location.initialValue}
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
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobCreating;
