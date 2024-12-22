'use client';

import React, { useActionState, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@conform-to/react';
import { CreateCompany } from '@/app/actions';
import { parseWithZod } from '@conform-to/zod';
import { companySchema } from '@/app/utils/zodSchemas';
import { UploadDropzone } from '@/app/utils/UploadthingComponents';
import Image from 'next/image';

const CompanyForm = () => {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const [lastResult, action] = useActionState(CreateCompany, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: companySchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="max-w-7xl mx-auto  p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-5 text-center">
        Create New Company
      </h2>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
      >
        <div className="flex flex-col">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            type="text"
            key={fields.companyName.key}
            name={fields.companyName.name}
            defaultValue={fields.companyName.initialValue}
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="industry">Industry</Label>
          <Input
            type="text"
            key={fields.industry.key}
            name={fields.industry.name}
            defaultValue={fields.industry.initialValue}
            placeholder="e.g., Technology, Finance"
            required
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            key={fields.location.key}
            name={fields.location.name}
            defaultValue={fields.location.initialValue}
            placeholder="City / Country"
            required
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="companySize">Company Size</Label>
          <Input
            type="number"
            key={fields.companySize.key}
            name={fields.companySize.name}
            defaultValue={fields.companySize.initialValue}
            placeholder="Number of employees"
            min="1"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="website">Website</Label>
          <Input
            type="text"
            key={fields.website.key}
            name={fields.website.name}
            defaultValue={fields.website.initialValue}
            placeholder="Website URL"
          />
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col">
          <Label htmlFor="description">Description</Label>
          <Textarea
            key={fields.companyDescription.key}
            name={fields.companyDescription.name}
            defaultValue={fields.companySize.initialValue}
            placeholder="Describe the company"
            rows={4}
          />
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col">
          <Label>Cover Image</Label>
          <input
            type="hidden"
            name={fields.coverImage.name}
            key={fields.coverImage.key}
            defaultValue={fields.coverImage.initialValue}
            value={imageUrl}
          />
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Uploaded Image"
              className="object-cover w-[200px] h-[200px] rounded-lg"
              width={200}
              height={200}
            />
          ) : (
            <UploadDropzone
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
              }}
              endpoint="imageUploader"
            />
          )}
          <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <Button type="submit" className="w-full">
            Create Company
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
