import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PopupProps, StyledFallbackPopupProps } from './types';

const StyledFallbackPopup = styled.div<StyledFallbackPopupProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 1000;

  ${({ $position }) =>
    $position &&
    `
    left: ${$position.x}px;
    top: ${$position.y}px;
  `}

  ${({ $dimensions }) =>
    $dimensions &&
    `
    ${$dimensions.width && `width: ${$dimensions.width}px;`}
    ${$dimensions.height && `height: ${$dimensions.height}px;`}
  `}
`;

const TriggerWrapper = styled.div`
  display: inline-block;
`;

export const Popup: React.FC<PopupProps> = ({
  trigger,
  children,
  popupMode = 'popup',
  defaultOpen = false,
  onOpen,
  onClose,
  position,
  dimensions,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [supportsPopup, setSupportsPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the browser supports the Popup API
    setSupportsPopup('HTMLPopupElement' in window);
  }, []);

  useEffect(() => {
    if (!supportsPopup) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popupRef.current &&
          !popupRef.current.contains(event.target as Node) &&
          !triggerRef.current?.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, supportsPopup]);

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();

    if (supportsPopup && popupRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      popupRef.current.showPopup();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();

    if (supportsPopup && popupRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      popupRef.current.hidePopup();
    }
  };

  const calculatePosition = () => {
    if (!position || !triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();

    return {
      left: position.x ?? triggerRect.left,
      top: position.y ?? triggerRect.bottom + 8,
    };
  };

  // Modern Popup API implementation
  if (supportsPopup) {
    return (
      <>
        <TriggerWrapper ref={triggerRef} onClick={handleOpen}>
          {trigger}
        </TriggerWrapper>
        <div
          ref={popupRef}
          popup={popupMode}
          defaultopen={defaultOpen ? 'true' : undefined}
          style={{
            ...(dimensions && {
              width: dimensions.width,
              height: dimensions.height,
            }),
          }}
        >
          {children}
          <button
            onClick={handleClose}
            aria-label="Close popup"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            ✕
          </button>
        </div>
      </>
    );
  }

  // Fallback implementation for unsupported browsers
  return (
    <>
      <TriggerWrapper ref={triggerRef} onClick={handleOpen}>
        {trigger}
      </TriggerWrapper>
      <StyledFallbackPopup
        ref={popupRef}
        $isOpen={isOpen}
        $position={position}
        $dimensions={dimensions}
        role="dialog"
        aria-modal={popupMode === 'modal'}
        style={calculatePosition()}
      >
        {children}
        <button
          onClick={handleClose}
          aria-label="Close popup"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ✕
        </button>
      </StyledFallbackPopup>
    </>
  );
};
