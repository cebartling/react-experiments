import React from 'react';
import styled from 'styled-components';

// Styled Button
const StyledButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
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