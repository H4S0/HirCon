<<<<<<< HEAD
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
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
                  <SelectTrigger>
                    <SelectValue placeholder="degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH_SCHOOL_DIPLOMA">
                      High School Diploma
                    </SelectItem>
                    <SelectItem value="BACHELORS">Bachelor's Degree</SelectItem>
                    <SelectItem value="MASTERS">Master's Degree</SelectItem>
                    <SelectItem value="DOCTORATE">Doctorate Degree</SelectItem>
                  </SelectContent>
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
=======
import prisma from '@/app/utils/db';
import React from 'react';
import EducationForm from '@/app/components/forms/EducationForm';

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
      <EducationForm data={educationData} educationId={educationId} />
    </div>
  );
};

export default EditEducationPage;
>>>>>>> 55459b7601ef0d30d860864321a4ad87c7e32571
