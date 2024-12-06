import styled from "styled-components";

const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  font-size: 1.2rem;
  font-weight: 500;
`;

interface InputProps {
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  value?: string;
}

const Input = ({ placeholder, type, value, onChange }: InputProps) => {
  return <StyledInput placeholder={placeholder} type={type} value={value} onChange={onChange} />;
};

export default Input;