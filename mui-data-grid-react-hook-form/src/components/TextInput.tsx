import { Control, Controller, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export type TextInputProps = {
  name: string;
  control: Control<FieldValues, any>;
  label: string;
};

export function TextInput({ name, control, label }: TextInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        // formState: UseFormStateReturn,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
