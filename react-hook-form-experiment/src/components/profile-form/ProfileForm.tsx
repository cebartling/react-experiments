import * as React from 'react';
import { useForm } from 'react-hook-form';

type ProfileFormData = {
    firstName: string;
    lastName: string;
    emailAddress: string;
};

export default function ProfileForm() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>();

    const onSubmit = handleSubmit((data) => console.log(data));

    return (
        <form onSubmit={onSubmit}>
            <label>First Name</label>
            <input {...register('firstName')} />
            <label>Last Name</label>
            <input {...register('lastName')} />
            <label>Email address</label>
            <input {...register('emailAddress')} />
            {/*<button*/}
            {/*    type="button"*/}
            {/*    onClick={() => {*/}
            {/*        setValue('lastName', 'luo'); // ✅*/}
            {/*        // setValue("firstName", true); // ❌: true is not string*/}
            {/*        // errors.bill; // ❌: property bill does not exist*/}
            {/*    }}*/}
            {/*>*/}
            {/*    SetValue*/}
            {/*</button>*/}
            <button type="submit">Save</button>
        </form>
    );
}
