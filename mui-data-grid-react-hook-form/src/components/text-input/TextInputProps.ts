import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { GridRenderEditCellParams } from '@mui/x-data-grid';

export type TextInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>> = {
  name: TName;
  fieldName: string;
  control: Control<TFieldValues>;
  label: string;
  params: GridRenderEditCellParams;
  options?: RegisterOptions<TFieldValues, TName>;
};
