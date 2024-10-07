import React, { useActionState } from 'react';
import { useForm } from '@conform-to/react';
import { profileSchema } from '@/app/utils/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import Link from 'next/link';
import { UpdateProfile } from '@/app/actions/UpdateProfile';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectValue } from '@/components/ui/select';
import { SelectContent, SelectTrigger } from '@radix-ui/react-select';

const page = () => {
  const [lastResult, action] = useActionState(UpdateProfile, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: profileSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Setup your profile</CardTitle>
        </CardHeader>
        <CardDescription>
          Setup your Profile here. Click the button below once your done...
        </CardDescription>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-3">
                <Label>Add your current status here</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue>test</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem>Open To Work</SelectItem>
                    <SelectItem>Unemployed</SelectItem>
                    <SelectItem>Employed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default page;
