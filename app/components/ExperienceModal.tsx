import {
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React from 'react';
import { DatePicker } from './DatePicker';
import { Button } from '@/components/ui/button';

const ExperienceModal = () => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Add Experience</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="grid gap-6 mt-5">
                <div className="grid gap-2">
                  <Label>Company name</Label>
                  <Input />
                </div>
                <div className="grid gap-2">
                  <Label>Add your role</Label>
                  <Input placeholder="Add your role" />
                </div>
                <div className="grid gap-3">
                  <Label>Starting date</Label>
                  <DatePicker />
                </div>
                <div className="grid gap-3">
                  <Label>End date</Label>
                  <DatePicker />
                </div>
                <div>
                  <Label>Short description abour your role</Label>
                  <Input placeholder="Describe your role" />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExperienceModal;
