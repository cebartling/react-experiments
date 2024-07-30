import { useForm } from 'react-hook-form';

import cn from '../../util/cn';

type DataGridFormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
};

export default function DataGridForm() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, isSubmitted },
  } = useForm<DataGridFormData>({
    // resolver: zodResolver(schema),
    // reValidateMode: 'onChange',
    // shouldFocusError: true,
  });

  const onSubmit = handleSubmit((data: DataGridFormData) => {
    console.log(data);
  });

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={onSubmit}
        noValidate={true}
        className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${cn({
          'needs-validation': true,
          'was-validated': isSubmitted,
        })}`}
      ></form>
    </div>
  );
}
