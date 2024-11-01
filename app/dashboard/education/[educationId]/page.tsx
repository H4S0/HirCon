import prisma from '@/app/utils/db';
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select } from '@radix-ui/react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Params {
  educationId: string;
}

async function getEducationById(educationId: string) {
  const data = await prisma.education.findUnique({
    where: { id: educationId },
    select: {
      institution: true,
      startDate: true,
      endDate: true,
      degree: true,
    },
  });
  return data;
}

const EditEducationPage = async ({ params }: { params: Params }) => {
  const { educationId } = await params;
  const educationData = await getEducationById(educationId);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <h1 className="text-lg font-bold">Edit Education</h1>
        </CardHeader>
        <CardContent>
          {educationData ? (
            <form id="edit-education-form">
              <input type="hidden" name="id" value={educationId} />

              <div className="mb-4">
                <Label htmlFor="institution">Institution:</Label>
                <Input
                  id="institution"
                  name="institution"
                  defaultValue={educationData.institution}
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="startDate">Start Date:</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  defaultValue={educationData.startDate} // Format the start date
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  defaultValue={educationData.endDate} // Format the end date
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="degree">Degree:</Label>
                <Select
                  id="degree"
                  name="degree"
                  defaultValue={educationData.degree}
                  required
                  className="mt-1"
                >
                  <option value="HIGH_SCHOOL_DIPLOMA">
                    High School Diploma
                  </option>
                  <option value="BACHELORS">Bachelors</option>
                  <option value="MASTERS">Masters</option>
                  <option value="DOCTORATE">Doctorate</option>
                </Select>
              </div>
            </form>
          ) : (
            <p>No education details found.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" form="edit-education-form" className="w-full">
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditEducationPage;
