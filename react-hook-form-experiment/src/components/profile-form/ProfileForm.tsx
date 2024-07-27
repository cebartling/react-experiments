import classNames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ProfileFormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
};

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ProfileFormData>();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const onSubmit = handleSubmit((data) => {
    setFormSubmitted(true);
    console.log(data);
  });


  console.log(watch("firstName"));
  console.log(watch("lastName"));
  console.log(watch("emailAddress"));

  return (
    <div className="p-2">
      <form
        onSubmit={onSubmit}
        noValidate={true}
        className={classNames({
          row: true,
          "needs-validation": true,
          "was-validated": formSubmitted
        })}
      >
        <div className="row">
          <div className="form-floating mb-3 col-sm-6">
            <input
              {...register("firstName")}
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
            {errors.firstName ? errors.firstName.message : null}
          </div>
        </div>
        <div className="row">
          <div className="form-floating mb-3 col-sm-6">
            <input
              {...register("lastName")}
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
            {errors.lastName ? errors.lastName.message : null}
          </div>
        </div>
        <div className="row">
          <div className="form-floating mb-3 col-sm-6">
            <input
              {...register("emailAddress")}
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
            {errors.emailAddress ? errors.emailAddress.message : null}
          </div>
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
