import classNames from 'classnames';
import * as React from 'react';
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
        // setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>();
    let [isFormSubmitted, setFormSubmitted] = useState<boolean>(false);

    const onSubmit = handleSubmit((data) => {
        setFormSubmitted(true);
        console.log(data);
    });

    return (
        <div className="p-2">
            <form
                onSubmit={onSubmit}
                noValidate={true}
                className={classNames({
                    'needs-validation': true,
                    'was-validated': isFormSubmitted,
                })}
            >
                <div className="form-floating mb-3">
                    <input
                        {...register('firstName')}
                        id="firstName "
                        type="text"
                        className="form-control"
                        placeholder="John"
                        required={true}
                    />
                    <label htmlFor="firstName">Given name</label>
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Given name is a required field!</div>
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...register('lastName')}
                        id="lastName"
                        type="text"
                        className="form-control"
                        placeholder="Smith"
                        required={true}
                    />
                    <label htmlFor="lastName">Surname</label>
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Surname is a required field!</div>
                </div>
                <div className="form-floating mb-3">
                    <input
                        {...register('emailAddress')}
                        id="emailAddress"
                        type="email"
                        className="form-control"
                        placeholder="john.smith@mycompany.biz"
                        required={true}
                    />
                    <label htmlFor="emailAddress">Email address</label>
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Email address is a required field!</div>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
