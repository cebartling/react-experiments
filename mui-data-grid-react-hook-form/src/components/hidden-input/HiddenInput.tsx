import { FieldPath, FieldValues } from 'react-hook-form';
import { HiddenInputProps } from './HiddenInputProps.ts';


export function HiddenInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
    path,
    register,
    params,
    options = {},
  }: HiddenInputProps<TFieldValues, TName>) {
  return (
    <input
      value={params.value}
      type="hidden"
      {...register(path, options)}
    />
  );
}
