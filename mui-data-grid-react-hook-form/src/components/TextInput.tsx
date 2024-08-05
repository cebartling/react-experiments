import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { TextInputProps } from './TextInputProps.ts';

export function TextInput({
  name,
  fieldName,
  control,
  label,
  params,
}: TextInputProps) {
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
