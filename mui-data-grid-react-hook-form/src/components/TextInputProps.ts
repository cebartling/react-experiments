import { Control } from 'react-hook-form';
import { GridRenderEditCellParams } from '@mui/x-data-grid';

export type TextInputProps = {
  name: string;
  fieldName: string;
  control: Control;
  label: string;
  params: GridRenderEditCellParams;
};
