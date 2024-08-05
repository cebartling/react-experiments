import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { createGridColDefArray } from './createGridColDefArray.tsx';
import { DemographicsFormData } from '../types';

const rows: DemographicsFormData[] = [
  {
    id: 1,
    firstName: 'Kristoffer',
    lastName: 'Klaus',
    email: 'kris.klaus112@any-domain.com',
  } as DemographicsFormData,
  {
    id: 2,
    firstName: 'Connie',
    lastName: 'Clausen',
    email: 'connie.clausen@any-domain.com',
  } as DemographicsFormData,
  {
    id: 3,
    firstName: 'Catrina',
    lastName: 'Klasson',
    email: 'catrina.klasson@any-domain.com',
  } as DemographicsFormData,
];

export function DemographicsCard() {
  const { handleSubmit, control } = useForm();
  useFieldArray({
    control,
    name: 'form',
  });
  const columns: GridColDef[] = createGridColDefArray(control);

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
      <DevTool control={control} placement="top-right" />
    </div>
  );
}
