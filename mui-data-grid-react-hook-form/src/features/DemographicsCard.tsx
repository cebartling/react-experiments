import { TextInput } from '../components';
import { useForm } from 'react-hook-form';

export function DemographicsCard() {
  const { register, handleSubmit, reset, control, setValue } = useForm();

  return (
    <div>
      <h2>Demographics</h2>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <TextInput name="firstName" control={control} label="First Name" />
        <TextInput name="lastName" control={control} label="Last Name" />
        <TextInput name="email" control={control} label="Email" />
        <TextInput name="phone" control={control} label="Phone" />
        <TextInput name="address" control={control} label="Address" />
        <TextInput name="city" control={control} label="City" />
        <TextInput name="state" control={control} label="State" />
        <TextInput name="zip" control={control} label="Zip" />
      </form>
    </div>
  );
}
