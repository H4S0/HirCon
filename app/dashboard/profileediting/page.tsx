'use client';

import React, { useActionState, useState } from 'react';
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

const ProfileUpdating = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputSkill, setInputSkill] = useState('');
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
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append('skills', JSON.stringify(skills));

    const prevState = lastResult;

    await UpdateProfile(prevState, formData); // Directly call your action function (UpdateProfile)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Card>
        <CardHeader>
          <CardTitle>
            Setup your profile. Click the button below once you're done...
          </CardTitle>
        </CardHeader>

        <form id={form.id} onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-3">
                <Label>Description</Label>
                <Input
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={fields.description.initialValue} // Fully control the description value
                  placeholder="Describe yourself"
                  className="w-full"
                />
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="skillsInput"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Skill
                </label>
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                  <input
                    type="text"
                    id="skillsInput"
                    className="p-2 border rounded-md flex-1"
                    key={fields.skills.key}
                    name={fields.skills.name}
                    value={inputSkill}
                    placeholder="Type a skill..."
                  />
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded-md"
                    onClick={addSkill}
                  >
                    Add
                  </button>
                </div>
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
  );
};

export default ProfileUpdating;
