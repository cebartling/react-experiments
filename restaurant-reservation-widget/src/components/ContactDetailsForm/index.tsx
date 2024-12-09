import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import styled from 'styled-components';

type Inputs = {
  name: string;
  phoneNumber: string;
};

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  gap: 1rem;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const FormGridCell = styled.div``;

const FullWidthRow = styled.div`
  grid-column: 1 / -1;
`;

const ContactDetailsForm = ({ onClick }: { onClick: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    onClick();
  };

  return (
    <div>
      <h3>Contact details</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGrid>
          <FormGridCell>
            <label htmlFor="name">Name</label>
          </FormGridCell>
          <FormGridCell>
            <Input type="text" {...register('name', { required: true })} />
          </FormGridCell>
          <FormGridCell>
            {errors.name && <span>This field is required</span>}
          </FormGridCell>

          <FormGridCell>
            <label htmlFor="phoneNumber">Phone number</label>
          </FormGridCell>
          <FormGridCell>
            <Input
              type="text"
              defaultValue="7:00 PM"
              {...register('phoneNumber', { required: true })}
            />
          </FormGridCell>
          <FormGridCell>
            {errors.phoneNumber && <span>This field is required</span>}
          </FormGridCell>

          <FullWidthRow>
            <Button type="submit">Confirm reservation</Button>
          </FullWidthRow>
        </FormGrid>
      </form>
    </div>
  );
};

export default ContactDetailsForm;
