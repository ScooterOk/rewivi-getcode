import React from 'react';

import Layout from '../../components/Layout/Layout';
import JobListTable from '../../components/JobListTable';

import './style.scss';

const JobList = () => {
  return (
    <Layout className="job-list" isLogged={true}>
      <JobListTable />
    </Layout>
  );
};

export default JobList;
