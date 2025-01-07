import styled from 'styled-components';
import Button from '../Button';
import { useReducer, useRef } from 'react';
import Dialog from '../Dialog';
import BookTableForm from '../BookTableForm';
import ContactDetailsForm from '../ContactDetailsForm';

const StyledRestaurantReservationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
`;

interface ReservationState {
  currentView: 'bookTable' | 'contactDetails';
}

type ReservationAction = { type: 'bookTable' } | { type: 'contactDetails' };

const reducer = (
  _state: ReservationState,
  action: ReservationAction
): ReservationState => {
  switch (action.type) {
    case 'bookTable':
      return { currentView: 'bookTable' };
    case 'contactDetails':
      return { currentView: 'contactDetails' };
    default:
      throw new Error('Unsupported action type');
  }
};

const RestaurantReservationWidget = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, dispatch] = useReducer(reducer, { currentView: 'bookTable' });

  const handleClick = () => {
    dialogRef?.current?.showModal();
  };

  return (
    <StyledRestaurantReservationContainer>
      <Button onClick={handleClick}>Reserve a table</Button>
      <Dialog ref={dialogRef}>
        {state.currentView === 'bookTable' && (
          <BookTableForm onClick={() => dispatch({ type: 'contactDetails' })} />
        )}
        {state.currentView === 'contactDetails' && (
          <ContactDetailsForm onClick={() => dialogRef?.current?.close()} />
        )}
      </Dialog>
    </StyledRestaurantReservationContainer>
  );
};

export default RestaurantReservationWidget;
