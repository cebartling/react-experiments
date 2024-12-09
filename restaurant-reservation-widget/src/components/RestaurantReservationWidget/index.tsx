import styled from 'styled-components';
import Button from '../Button';
import { useRef } from 'react';
import Dialog from '../Dialog';
import BookTableForm from '../BookTableForm';

const StyledRestaurantReservationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
`;

const RestaurantReservationWidget = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    dialogRef?.current?.showModal();
  };

  const handleOnClickBookTableForm = () => {
    dialogRef?.current?.close();
  };

  return (
    <StyledRestaurantReservationContainer>
      <Button onClick={handleClick}>Reserve a table</Button>
      <Dialog ref={dialogRef}>
        <BookTableForm onClick={handleOnClickBookTableForm} />
      </Dialog>
    </StyledRestaurantReservationContainer>
  );
};

export default RestaurantReservationWidget;
