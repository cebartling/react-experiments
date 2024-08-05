import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { TextInput } from '../components';

export type DemographicsFormData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const rows = [
  {
    id: 1,
    firstName: 'Kristoffer',
    lastName: 'Klaus',
    email: 'kris.klaus112@any-domain.com',
  },
  {
    id: 2,
    firstName: 'Connie',
    lastName: 'Clausen',
    email: 'connie.clausen@any-domain.com',
  },
  {
    id: 3,
    firstName: 'Catrina',
    lastName: 'Klasson',
    email: 'catrina.klasson@any-domain.com',
  },
];

export function DemographicsCard() {
  const { handleSubmit, control } = useForm();
  useFieldArray({
    control,
    name: 'form',
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'DB key', width: 75 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 200,
      editable: true,
      renderEditCell: (params) => {
        return (
          <TextInput
            name={`form.${params.id}.firstName` as const}
            fieldName={'firstName'}
            control={control}
            label={'First name'}
            params={params}
          />
        );
      },
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 200,
      editable: true,
      renderEditCell: (params) => {
        return (
          <TextInput
            name={`form.${params.id}.lastName` as const}
            fieldName={'lastName'}
            control={control}
            label={'Last name'}
            params={params}
          />
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email address',
      width: 400,
      editable: true,
      renderEditCell: (params) => {
        return (
          <TextInput
            name={`form.${params.id}.email` as const}
            fieldName={'email'}
            control={control}
            label={'Email address'}
            params={params}
          />
        );
      },
    },
  ];

  return (
    <div className="p-5">
      <h2>Demographics</h2>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="w-full h-[500px]">
          <DataGrid rows={rows} columns={columns} editMode="row" />
        </div>
        <div className="mt-4">
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </form>
      <DevTool
        control={control}
        placement={'bottom-right'}
        styles={{
          panel: {
            width: '400px',
          },
        }}
      />
    </div>
  );
}
