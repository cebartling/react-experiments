import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import cn from '../../util/cn';

type CheckoutFormData = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  termsAndConditions: boolean;
};

export default function CheckoutForm() {
  const methods = useForm<CheckoutFormData>();
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
          className={cn({
            row: true,
            'g-3': true,
            'needs-validation': true,
            'was-validated': isFormSubmitted,
          })}
        >
          <div className="col-12">
            <label htmlFor="address1Input" className="form-label">
              Address 1
            </label>
            <input
              {...methods.register('address1')}
              type="text"
              className="form-control"
              id="address1Input"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-12">
            <label htmlFor="address2Input" className="form-label">
              Apartment number
            </label>
            <input
              {...methods.register('address2')}
              type="text"
              className="form-control"
              id="address1Input"
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="cityInput" className="form-label">
              City
            </label>
            <input
              {...methods.register('city')}
              type="text"
              className="form-control"
              id="cityInput"
              required
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="stateInput" className="form-label">
              State
            </label>
            <select {...methods.register('state')} className="form-select" id="stateInput" required>
              <option selected disabled value="">
                Choose...
              </option>
              <option>...</option>
            </select>
            <div className="invalid-feedback">Please select a valid state.</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="zipCodeInput" className="form-label">
              Zip code
            </label>
            <input
              {...methods.register('zipCode')}
              type="text"
              className="form-control"
              id="zipCodeInput"
              required
            />
            <div className="invalid-feedback">Please provide a valid zip.</div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                {...methods.register('termsAndConditions')}
                className="form-check-input"
                type="checkbox"
                value=""
                id="termsAndConditionsInput"
                required
              />
              <label className="form-check-label" htmlFor="termsAndConditionsInput">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">You must agree before submitting.</div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
