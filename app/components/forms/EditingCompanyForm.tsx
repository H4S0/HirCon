'use client';

import { UpdateCompany } from '@/app/actions';
import { companySchema } from '@/app/utils/zodSchemas';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useActionState, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { UploadDropzone } from '@/app/utils/UploadthingComponents';

interface companyDataProps {
  companyName: string;
  location: string;
  industry: string;
  website: string;
  companyDescription: string;
  imageUrl: string;
  companySize: number;
}

const CompanyForm = ({
  data,
  companyId,
}: {
  data: companyDataProps;
  companyId: string;
}) => {
  const [companyName, setCompanyName] = useState(data.companyName);
  const [location, setLocation] = useState(data.location);
  const [industry, setIndustry] = useState(data.industry);
  const [website, setWebsite] = useState(data.website);
  const [imageUrl, setImageUrl] = useState<string>(data.imageUrl || '');
  const [companySize, setCompanySize] = useState(data.companySize);

  const [companyDescription, setCompanyDescription] = useState(
    data.companyDescription
  );
  const [lastResult, action] = useActionState(UpdateCompany, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: companySchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await UpdateCompany(undefined, formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <h1 className="text-lg font-bold">Edit Company</h1>
        </CardHeader>
        <CardContent>
          {data ? (
            <form id={form.id} onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="name">Company Name:</Label>
                <Input
                  id={fields.companyName.name}
                  name={fields.companyName.name}
                  value={companyName}
                  required
                  className="mt-1"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="location">Location:</Label>
                <Input
                  id={fields.location.name}
                  name={fields.location.name}
                  value={location}
                  required
                  className="mt-1"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="companySize">Company Size</Label>
                <Input
                  type="number"
                  key={fields.companySize.key}
                  name={fields.companySize.name}
                  defaultValue={companySize}
                  placeholder="Number of employees"
                  required
                  onChange={(e) => setCompanySize(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="industry">Industry:</Label>
                <Input
                  id={fields.industry.name}
                  name={fields.industry.name}
                  defaultValue={industry}
                  required
                  className="mt-1"
                  onChange={(e) => setIndustry(e.target.value)}
                ></Input>
              </div>

              <div className="mb-4">
                <Label htmlFor="website">Website:</Label>
                <Input
                  id={fields.website.name}
                  name={fields.website.name}
                  defaultValue={website}
                  required
                  className="mt-1"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="companyDescription">Company description</Label>
                <Textarea
                  id={fields.companyDescription.name}
                  name={fields.companyDescription.name}
                  defaultValue={companyDescription}
                  required
                  className="mt-1"
                  onChange={(e) => setCompanyDescription(e.target.value)}
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
                <p className="text-red-500 text-sm">
                  {fields.coverImage.errors}
                </p>
              </div>

              <CardFooter>
                <input type="hidden" name="companyId" value={companyId} />
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          ) : (
            <p>No company details found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyForm;
