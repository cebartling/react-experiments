import { TextInput } from '../components';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { Control } from 'react-hook-form';

export function createGridColDefArray(control: Control) {
  return [
    { field: 'id', headerName: 'DB key', width: 75 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 200,
      editable: true,
      renderEditCell: (params: GridRenderEditCellParams) => {
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
      renderEditCell: (params: GridRenderEditCellParams) => {
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
      renderEditCell: (params: GridRenderEditCellParams) => {
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
}
