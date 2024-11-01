import prisma from '@/app/utils/db';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

interface Params {
  experienceId: string;
}

async function getUserExperienceId(experienceId: string) {
  const userExperience = await prisma.experience.findUnique({
    where: {
      id: experienceId,
    },
    select: {
      company: true,
      role: true,
      roleDescription: true,
      startDate: true,
      endDate: true,
    },
  });
  return userExperience;
}

const EditExperiencePage = async ({ params }: { params: Params }) => {
  const { experienceId } = await params;
  const experienceData = await getUserExperienceId(experienceId);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <h1 className="text-lg font-bold">Edit Experience</h1>
        </CardHeader>
        <CardContent>
          {experienceData ? (
            <form id="edit-experience-form">
              <input type="hidden" name="id" value={experienceId} />

              {/* Company/Institution */}
              <div className="mb-4">
                <Label htmlFor="company">Company/Institution:</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={experienceData.company}
                  required
                  className="mt-1"
                />
              </div>

              {/* Role */}
              <div className="mb-4">
                <Label htmlFor="role">Role:</Label>
                <Input
                  id="role"
                  name="role"
                  defaultValue={experienceData.role}
                  required
                  className="mt-1"
                />
              </div>

              {/* Role Description */}
              <div className="mb-4">
                <Label htmlFor="roleDescription">Role Description:</Label>
                <Textarea
                  id="roleDescription"
                  name="roleDescription"
                  defaultValue={experienceData.roleDescription}
                  required
                  className="mt-1"
                  rows={4}
                />
              </div>

              {/* Start Date */}
              <div className="mb-4">
                <Label htmlFor="startDate">Start Date:</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  defaultValue={experienceData.startDate}
                  required
                  className="mt-1"
                />
              </div>

              {/* End Date */}
              <div className="mb-4">
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  defaultValue={experienceData.endDate}
                  required
                  className="mt-1"
                />
              </div>
            </form>
          ) : (
            <p>No experience details found.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" form="edit-experience-form" className="w-full">
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditExperiencePage;
