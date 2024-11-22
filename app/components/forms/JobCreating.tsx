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
import React, { useActionState, useState } from 'react';

const JobCreating = () => {
  const [isRemote, setIsRemote] = useState(false);
  const [lastResult, action] = useActionState(CreateJobAlert, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: jobAlertSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = await CreateJobAlert(undefined, formData);
  };

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
            onSubmit={handleSubmit}
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
                    <Select
                      key={fields.level.key}
                      name={fields.level.name}
                      defaultValue={fields.level.initialValue}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JUNIOR">Junior</SelectItem>
                        <SelectItem value="MEDIOR">Medior</SelectItem>
                        <SelectItem value="SENIOR">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Select
                      key={fields.jobType.key}
                      name={fields.jobType.name}
                      defaultValue={fields.jobType.initialValue}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FULL_TIME">Full-time</SelectItem>
                        <SelectItem value="PART_TIME">Part-time</SelectItem>
                        <SelectItem value="CONTRACT">Contract</SelectItem>
                        <SelectItem value="INTERNSHIP">Internship</SelectItem>
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

                  <div className="flex flex-col gap-4 items-start">
                    <Label>Location</Label>
                    <Input
                      placeholder="Describe your role"
                      key={fields.location.key}
                      name={fields.location.name}
                      defaultValue={fields.location.initialValue}
                      disabled={isRemote} // Disable the location field if remote is checked
                    />
                    <div className="grid gap-3">
                      <label>Remote</label>
                      <Select
                        key={fields.remote.key}
                        name={fields.remote.name}
                        defaultValue={fields.remote.initialValue}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AVAILABLE">Available</SelectItem>
                          <SelectItem value="NOT_AVAILABLE">
                            Not available
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Submit</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobCreating;
