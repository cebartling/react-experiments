import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import styled from 'styled-components';

type Inputs = {
  people: number;
  date: string;
  time: string;
};

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const BookTableForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <h3>Book a table</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <FormRow>
            <label htmlFor="people">People</label>
            <Input
              type="text"
              defaultValue="1"
              {...register('people', { required: true })}
            />
            {errors.people && <span>This field is required</span>}
          </FormRow>

          <FormRow>
            <label htmlFor="people">Date</label>
            <Input
              type="text"
              defaultValue="1"
              {...register('date', { required: true })}
            />
            {errors.date && <span>This field is required</span>}
          </FormRow>

          <FormRow>
            <label htmlFor="people">Time</label>
            <Input
              type="text"
              defaultValue="1"
              {...register('time', { required: true })}
            />
            {errors.time && <span>This field is required</span>}
          </FormRow>

          <FormRow>
            <Button type="submit">Confirm reservation</Button>
          </FormRow>
        </FormContainer>
      </form>
    </div>
  );
};

export default BookTableForm;
