import styled from 'styled-components';
import Button from '../Button';


const StyledRestaurantReservationDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
`;

const RestaurantReservationWidget = () => {

  const handleClick = () => {
    console.log('Handling button click');
  };

  return (
    <StyledRestaurantReservationDiv>
      <Button onClick={handleClick}>Reserve a table</Button>
    </StyledRestaurantReservationDiv>
  );
}

export default RestaurantReservationWidget;