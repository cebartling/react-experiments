import styled from "styled-components";

const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
`;

interface InputProps {
  placeholder?: string;
  defaultValue?: string;
  type: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, type, value, onChange }: InputProps) => {
  return <StyledInput placeholder={placeholder} type={type} value={value} onChange={onChange} />;
};

export default Input;