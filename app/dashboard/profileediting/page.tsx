'use client';

import React, { useState } from 'react';
import { useForm } from '@conform-to/react';
import { profileSchema } from '@/app/utils/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { UpdateProfile } from '@/app/actions';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EducationModal from '@/app/components/EducationModal';
import ExperienceModal from '@/app/components/ExperienceModal';
import { Textarea } from '@/components/ui/textarea';
import DashboardNavbar from '@/app/components/DashboardNavbar';

const ProfileUpdating = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputSkill, setInputSkill] = useState('');
  const [lastResult, action] = useState();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: profileSchema,
      });
    },
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onSubmit',
  });

  const addSkill = () => {
    if (inputSkill && !skills.includes(inputSkill)) {
      setSkills([...skills, inputSkill]);
      setInputSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.currentTarget);
    formData.append('skills', JSON.stringify(skills));

    const prevState = lastResult;

    // Explicitly submit only when the button is clicked
    await UpdateProfile(prevState, formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="grid gap-3">
                <h2>Setup profile</h2>
                <p className="font-semibold">
                  Click the submit button below once you're done...
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          <form id={form.id} onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex flex-col gap-y-6">
                <div className="grid gap-3">
                  <Label className="font-semibold">Description</Label>
                  <Textarea
                    key={fields.description.key}
                    name={fields.description.name}
                    defaultValue={fields.description.initialValue} // Fully control the description value
                    placeholder="Describe yourself"
                    className="w-full h-32"
                  />
                  <p className="text-red-500 text-sm">
                    {fields.description.errors}
                  </p>
                </div>

                <div className="grid gap-3">
                  <label
                    htmlFor="skillsInput"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Add Skill
                  </label>
                  <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 items-center">
                    <Input
                      type="text"
                      id="skillsInput"
                      className="p-2 border rounded-md flex-1"
                      value={inputSkill}
                      onChange={(e) => setInputSkill(e.target.value)}
                      placeholder="Type a skill..."
                    />
                    <Button type="button" onClick={addSkill}>
                      Add
                    </Button>
                    <p>{fields.skills.errors}</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label className="font-semibold">Type your Location</Label>
                  <Input placeholder="City / Country" />
                </div>
                <div className="mt-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full m-1"
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => removeSkill(skill)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div>
                  <EducationModal />
                </div>
                <div>
                  <ExperienceModal />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileUpdating;
