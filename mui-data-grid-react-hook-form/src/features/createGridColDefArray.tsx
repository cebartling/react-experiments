import { HiddenInput, TextInput } from '../components';
import { GridColDef, GridRenderCellParams, GridRenderEditCellParams } from '@mui/x-data-grid';
import { Control, FieldValues, UseFormRegister } from 'react-hook-form';

export function createGridColDefArray(control: Control, register: UseFormRegister<FieldValues>) {
  return [
    {
      field: 'id',
      headerName: 'ID',
      width: 75,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="align-middle">
            <HiddenInput path={`form.${params.id}.id` as const}
                         register={register}
                         params={params}
                         options={{ valueAsNumber: true }} />
            <span>{params.value}</span>
          </div>
        );
      },
    } as GridColDef,
    {
      field: 'firstName',
      headerName: 'First name',
      width: 200,
      editable: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="align-middle">
            <HiddenInput path={`form.${params.id}.firstName` as const}
                         register={register}
                         params={params}
            />
            <span>{params.value}</span>
          </div>
        );
      },
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
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="align-middle">
            <HiddenInput path={`form.${params.id}.lastName` as const}
                         register={register}
                         params={params}
            />
            <span>{params.value}</span>
          </div>
        );
      },
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
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="align-middle">
            <HiddenInput path={`form.${params.id}.email` as const}
                         register={register}
                         params={params}
            />
            <span>{params.value}</span>
          </div>
        );
      },
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
