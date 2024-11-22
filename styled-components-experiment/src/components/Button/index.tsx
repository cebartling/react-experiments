import React from 'react';
import styled from 'styled-components';

// Styled Button
const StyledButton = styled.button`
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.secondary};
    }
`;

// Button Component
type ButtonProps = {
    label: string;
    onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({label, onClick}) => {
    return <StyledButton onClick={onClick}>{label}</StyledButton>;
};