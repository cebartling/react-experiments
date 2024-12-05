import styled from 'styled-components';
import Button from '../Button';
import { useRef } from 'react';
import Dialog from "../Dialog";

const StyledRestaurantReservationDiv = styled.div`
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

  return (
    <StyledRestaurantReservationDiv>
      <Button onClick={handleClick}>Reserve a table</Button>
      <Dialog ref={dialogRef}>
        <p>Would you like to reserve a table?</p>
      </Dialog>
    </StyledRestaurantReservationDiv>
  );
};

export default RestaurantReservationWidget;
