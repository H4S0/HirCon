import React from 'react';

import DashboardNavbar from '@/app/components/DashboardNavbar';
import CompanyForm from '@/app/components/forms/CompanyForm';

const NewCompanyRoute = () => {
  return (
    <>
      <DashboardNavbar />
      <CompanyForm />
    </>
  );
};

export default NewCompanyRoute;
