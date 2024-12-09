import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';

type Inputs = {
  people: number;
  date: string;
  time: string;
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

const BookTableForm = ({ onClick }: { onClick: () => void }) => {
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
      <h3>Book a table</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGrid>
          <FormGridCell>
            <label htmlFor="people">People</label>
          </FormGridCell>
          <FormGridCell>
            <Input
              type="text"
              defaultValue="1"
              {...register('people', { required: true })}
            />
          </FormGridCell>
          <FormGridCell>
            {errors.people && <span>This field is required</span>}
          </FormGridCell>

          <FormGridCell>
            <label htmlFor="date">Date</label>
          </FormGridCell>
          <FormGridCell>
            <Input
              type="text"
              defaultValue="12/08/2024"
              {...register('date', { required: true })}
            />
          </FormGridCell>
          <FormGridCell>
            {errors.date && <span>This field is required</span>}
          </FormGridCell>

          <FormGridCell>
            <label htmlFor="time">Time</label>
          </FormGridCell>
          <FormGridCell>
            <Input
              type="text"
              defaultValue="7:00 PM"
              {...register('time', { required: true })}
            />
          </FormGridCell>
          <FormGridCell>
            {errors.time && <span>This field is required</span>}
          </FormGridCell>

          <FullWidthRow>
            <Button type="submit">Confirm reservation</Button>
          </FullWidthRow>
        </FormGrid>
      </form>
    </div>
  );
};

export default BookTableForm;
