import { forwardRef, ReactNode, Ref, RefObject, useEffect } from 'react';
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
    justify-content: space-between;
    margin-top: 20px;
`;

const StyledDialogHeader = styled.h2`
    font-family: sans-serif;
    font-size: 24px;
    font-weight: 600;
`;

export type DialogProps = {
  children: ReactNode;
};

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children }: DialogProps, dialogRef: Ref<HTMLDialogElement>) => {
    const closeDialog = () => {
      if (!dialogRef) {
        return;
      }
      (dialogRef as RefObject<HTMLDialogElement>).current?.close();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!dialogRef) {
        return;
      }
      if (e.target === (dialogRef as RefObject<HTMLDialogElement>).current) {
        closeDialog();
      }
    };

    useEffect(() => {
      if (dialogRef) {
        const dialog = (dialogRef as RefObject<HTMLDialogElement>).current;
        dialog?.addEventListener('click', handleClickOutside);
        return () => dialog?.removeEventListener('click', handleClickOutside);
      }
    }, []);

    return (
      <StyledDialog ref={dialogRef}>
        <StyledDialogHeader>Example Dialog</StyledDialogHeader>
        {children}
        <StyledButtonContainer>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={closeDialog}>Confirm</Button>
        </StyledButtonContainer>
      </StyledDialog>
    );
  }
);

export default Dialog;
