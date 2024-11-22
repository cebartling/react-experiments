import React from 'react';
import styled from 'styled-components';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  elevation?: 'low' | 'medium' | 'high';
  onClick?: () => void;
  width?: string;
  height?: string;
}

const StyledCard = styled.div<
  Pick<CardProps, 'elevation' | 'width' | 'height'>
>`
  background: ${({ theme }) => theme.colors?.background || '#ffffff'};
  border-radius: 8px;
  padding: 24px;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  transition: all 0.3s ease;

  ${({ elevation }) => {
    switch (elevation) {
      case 'high':
        return `
          box-shadow: 0 16px 24px rgba(0, 0, 0, 0.14), 0 6px 12px rgba(0, 0, 0, 0.12);
        `;
      case 'medium':
        return `
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.10), 0 4px 8px rgba(0, 0, 0, 0.08);
        `;
      case 'low':
      default:
        return `
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04);
        `;
    }
  }}
  &:hover {
    transform: ${({ onClick }) => (onClick ? 'translateY(-2px)' : 'none')};
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  }
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || '#000000'};
`;

const Subtitle = styled.p`
  margin: 0 0 16px 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors?.textSecondary || '#666666'};
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors?.text || '#000000'};
`;

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  elevation = 'low',
  onClick,
  width,
  height,
}) => {
  return (
    <StyledCard
      elevation={elevation}
      onClick={onClick}
      width={width}
      height={height}
    >
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Content>{children}</Content>
    </StyledCard>
  );
};
