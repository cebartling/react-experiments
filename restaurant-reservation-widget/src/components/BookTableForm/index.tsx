import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Input from '../Input';
import Button from "../Button";

type Inputs = {
  people: number;
  date: string;
  time: string;
};

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const FullWidthRow = styled.div`
  grid-column: 1 / -1;
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
          <div>
            <label htmlFor="people">People</label>
          </div>
          <div>
            <Input
              type="text"
              defaultValue="1"
              {...register('people', { required: true })}
            />
            {errors.people && <span>This field is required</span>}
          </div>

          <div>
            <label htmlFor="date">Date</label>
          </div>
          <div>
            <Input
              type="text"
              defaultValue="12/08/2024"
              {...register('date', { required: true })}
            />
            {errors.date && <span>This field is required</span>}
          </div>

          <div>
            <label htmlFor="time">Time</label>
          </div>
          <div>
            <Input
              type="text"
              defaultValue="7:00 PM"
              {...register('time', { required: true })}
            />
            {errors.time && <span>This field is required</span>}
          </div>

          <FullWidthRow>
            <Button type="submit">Confirm reservation</Button>
          </FullWidthRow>
        </FormContainer>
      </form>
    </div>
  );
};

export default BookTableForm;
