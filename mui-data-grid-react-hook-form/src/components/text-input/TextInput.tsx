import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { TextInputProps } from './TextInputProps.ts';


export function TextInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>>({
  name,
  fieldName,
  control,
  label,
  params,
}: TextInputProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange },
        fieldState: { error },
        // formState: UseFormStateReturn,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="medium"
          error={!!error}
          defaultValue={params.value}
          fullWidth
          label={label}
          variant="standard"
          onChange={(e) => {
            onChange(e.target.value);
            params.api.setEditCellValue({
              id: params.id,
              field: fieldName,
              value: e.target.value,
            });
          }}
        />
      )}
    />
  );
}
