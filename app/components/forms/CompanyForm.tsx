'use client';

import React, {useActionState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {useForm} from "@conform-to/react";
import {CreateCompany} from "@/app/actions";
import {parseWithZod} from "@conform-to/zod";
import {companySchema} from "@/app/utils/zodSchemas";


const CompanyForm = () => {
    const [lastResult, action] = useActionState(CreateCompany, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: companySchema,
            });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create New Company</h2>
            <form className="space-y-4" id={form.id} onSubmit={form.onSubmit} action={action}>
                {/* Company Name */}
                <div>
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

                {/* Industry */}
                <div>
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

                {/* Location */}
                <div>
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

                {/* Company Size */}
                <div>
                    <Label htmlFor="companySize">Company Size</Label>
                    <Input
                        type="number"
                        key={fields.companySize.key}
                        name={fields.companySize.name}
                        defaultValue={fields.companySite.initialValue}
                        placeholder="Number of employees"
                        min="1"
                    />
                </div>

                <div>
                    <Label htmlFor="companySize">Website</Label>
                    <Input
                        type="text"
                        key={fields.website.key}
                        name={fields.website.name}
                        defaultValue={fields.website.initialValue}
                        placeholder="Number of employees"
                        min="1"
                    />
                </div>

                {/* Description */}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        key={fields.companyDescription.key}
                        name={fields.companyDescription.name}
                        defaultValue={fields.companySize.initialValue}
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
