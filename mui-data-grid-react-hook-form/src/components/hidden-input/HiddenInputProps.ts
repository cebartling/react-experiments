import { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { GridRenderCellParams } from '@mui/x-data-grid';

export type HiddenInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>> = {
  path: TName;
  register: UseFormRegister<TFieldValues>;
  params: GridRenderCellParams;
  options?: RegisterOptions<TFieldValues, TName>;
};