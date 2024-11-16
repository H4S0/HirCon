'use client';

import { updateCompany } from '@/app/actions';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useState } from 'react';

interface companyDataProps {
  companyName: string;
  location: string;
  industry: string;
  website: string;
}

const CompanyForm = ({
  data,
  companyId,
}: {
  data: companyDataProps;
  companyId: string;
}) => {
  const [name, setName] = useState(data.companyName);
  const [location, setLocation] = useState(data.location);
  const [industry, setIndustry] = useState(data.industry);
  const [website, setWebsite] = useState(data.website);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: companySchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await updateCompany(companyId, formData); // Update the company with form data
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
              <input type="hidden" name="companyId" value={companyId} />

              {/* Company Name */}
              <div className="mb-4">
                <Label htmlFor="name">Company Name:</Label>
                <Input
                  id={fields.name.name}
                  name={fields.name.name}
                  defaultValue={name}
                  required
                  className="mt-1"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Location */}
              <div className="mb-4">
                <Label htmlFor="location">Location:</Label>
                <Input
                  id={fields.location.name}
                  name={fields.location.name}
                  defaultValue={location}
                  required
                  className="mt-1"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Industry */}
              <div className="mb-4">
                <Label htmlFor="industry">Industry:</Label>
                <Input
                  id={fields.industry.name}
                  name={fields.industry.name}
                  defaultValue={industry}
                  required
                  className="mt-1"
                  onChange={(value) => setIndustry(value)}
                ></Input>
              </div>

              {/* Website */}
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

              <CardFooter>
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
