import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
};

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<ProfileFormData>();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const onSubmit = handleSubmit((data) => {
    setFormSubmitted(true);
    console.log(data);
  });

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={onSubmit}
        noValidate={true}
        className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${classNames({
          'needs-validation': true,
          'was-validated': formSubmitted,
        })}`}
      >
        <div className="mb-4">
          <label className="text-gray-700 font-bold mb-1" htmlFor="firstName">
            First name
          </label>
          <input
            {...register('firstName', { required: true })}
            className={classNames(
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
              {
                'border-red-500': errors.firstName,
              },
            )}
            id="firstName"
            type="text"
            placeholder="John"
            required={true}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="lastName">
            Last name
          </label>
          <input
            {...register('lastName', { required: true })}
            className={classNames(
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
              {
                'border-red-500': errors.lastName,
              },
            )}
            id="lastName"
            type="text"
            placeholder="Doe"
            required={true}
          />
          <p className="text-red-500 text-xs italic">
            {errors.lastName ? errors.lastName.message : null}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="emailAddress">
            Email address
          </label>
          <input
            {...register('emailAddress', { required: true })}
            className={classNames(
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
              {
                'border-red-500': errors.emailAddress,
              },
            )}
            id="emailAddress"
            type="text"
            placeholder="john.smith@mycompany.biz"
            required={true}
          />
          <p className="text-red-500 text-xs italic">
            {errors.emailAddress ? errors.emailAddress.message : null}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
