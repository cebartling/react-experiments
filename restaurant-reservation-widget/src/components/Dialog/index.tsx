import { ReactNode, useEffect, useRef } from 'react';
import Button from '../Button';
import styled from 'styled-components';

const StyledDialog = styled.dialog`
  padding: 20px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const StyledDialogHeader = styled.h2``;

const Dialog = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target === dialogRef.current) {
      closeDialog();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener('click', handleClickOutside);
    return () => dialog?.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div>
      <Button onClick={openDialog}>Open Dialog</Button>

      <StyledDialog ref={dialogRef}>
        <StyledDialogHeader>Example Dialog</StyledDialogHeader>
        {children}
        <StyledButtonContainer>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={closeDialog}>Confirm</Button>
        </StyledButtonContainer>
      </StyledDialog>
    </div>
  );
};

export default Dialog;
