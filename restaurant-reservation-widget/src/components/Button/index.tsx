import styled from 'styled-components';
import { ReactNode } from 'react';

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Button = ({
  children,
    type,
  onClick,
}: {
  children: ReactNode | string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}) => {
  return <StyledButton type={type} onClick={onClick ? onClick : undefined}>{children}</StyledButton>;
};

export default Button;
