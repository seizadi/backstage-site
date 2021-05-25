import React from 'react';
import {Table, TableColumn, Progress, useApi} from '@backstage/core';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';
import { cmdbApiRef, CmdbApplications } from '../../api';

type DenseTableProps = {
  applications: CmdbApplications;
};

export const DenseTable = ( { applications }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Id', field: 'id' },
    { title: 'Name', field: 'name' },
  ];

  const data = applications.map(application => {
    return {
      id: application.id,
      name: application.name,
    };
  });

  return (
      <Table
          title="Example Application List (fetching data from Cmdb Server)"
          options={{ search: false, paging: false }}
          columns={columns}
          data={data}
      />
  );
};

export const CmdbFetchComponent = () => {
  const api = useApi(cmdbApiRef);

  const { value, loading, error } = useAsync(async () => {
    return await api.getApplications();
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable applications={value || []} />;
};
