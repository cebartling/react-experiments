import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type ProfileFormData = {
    firstName: string;
    lastName: string;
    emailAddress: string;
};

export default function ProfileForm() {
    const methods = useForm<ProfileFormData>();
    let [isFormSubmitted, setFormSubmitted] = useState<boolean>(false);

    const onSubmit = methods.handleSubmit((data) => {
        setFormSubmitted(true);
        console.log(data);
    });

    return (
        <div className="p-2">
            <FormProvider {...methods}>
                <form
                    onSubmit={onSubmit}
                    noValidate={true}
                    className={classNames({
                        row: true,
                        'needs-validation': true,
                        'was-validated': isFormSubmitted,
                    })}
                >
                    <div className="row">
                        <div className="form-floating mb-3 col-sm-6">
                            <input
                                {...methods.register('firstName')}
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="John"
                                required={true}
                            />
                            <label htmlFor="firstName">Given name</label>
                        </div>
                        <div className="valid-feedback col-sm-6">Looks good!</div>
                        <div className="invalid-feedback col-sm-6">
                            {methods.formState.errors.firstName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-floating mb-3 col-sm-6">
                            <input
                                {...methods.register('lastName')}
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Smith"
                                required={true}
                            />
                            <label htmlFor="lastName">Surname</label>
                        </div>
                        <div className="valid-feedback col-sm-6">Looks good!</div>
                        <div className="invalid-feedback col-sm-6">
                            {methods.formState.errors.lastName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-floating mb-3 col-sm-6">
                            <input
                                {...methods.register('emailAddress')}
                                id="emailAddress"
                                type="email"
                                className="form-control"
                                placeholder="john.smith@mycompany.biz"
                                required={true}
                            />
                            <label htmlFor="emailAddress">Email address</label>
                        </div>
                        <div className="valid-feedback col-sm-6">Looks good!</div>
                        <div className="invalid-feedback col-sm-6">
                            {methods.formState.errors.emailAddress}
                        </div>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
