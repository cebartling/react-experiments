import React from 'react';

export interface PopupProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  popupMode?: 'popup' | 'hint' | 'modal';
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  position?: {
    x?: number;
    y?: number;
  };
  dimensions?: {
    width?: number;
    height?: number;
  };
}

export interface StyledFallbackPopupProps {
  $isOpen: boolean;
  $position?: PopupProps['position'];
  $dimensions?: PopupProps['dimensions'];
}
