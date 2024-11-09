import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
const CompanyForm = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Company</h2>
      <form className="space-y-4">
        {/* Company Name */}
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            type="text"
            id="companyName"
            placeholder="Enter company name"
            required
          />
        </div>

        {/* Industry */}
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            type="text"
            id="industry"
            placeholder="e.g., Technology, Finance"
            required
          />
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            placeholder="City / Country"
            required
          />
        </div>

        {/* Company Size */}
        <div>
          <Label htmlFor="companySize">Company Size</Label>
          <Input
            type="number"
            id="companySize"
            placeholder="Number of employees"
            min="1"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the company"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Create Company
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
