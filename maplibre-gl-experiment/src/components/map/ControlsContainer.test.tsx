import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ControlsContainer } from './ControlsContainer';

describe('ControlsContainer', () => {
   beforeEach(() => {
      vi.clearAllMocks();
      vi.useRealTimers();
   });

   it('should render with children', () => {
      render(
         <ControlsContainer>
            <div>Test Content</div>
         </ControlsContainer>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
   });

   it('should start with the accordion expanded', () => {
      render(
         <ControlsContainer>
            <div>Test Content</div>
         </ControlsContainer>
      );

      const accordionButton = screen.getByRole('button', { expanded: true });
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
   });

   it('should collapse the accordion when header is clicked', async () => {
      const user = userEvent.setup();
      render(
         <ControlsContainer>
            <div>Test Content</div>
         </ControlsContainer>
      );

      const accordionButton = screen.getByRole('button', { expanded: true });

      await user.click(accordionButton);

      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');
   });

   it('should expand the accordion when clicked while collapsed', async () => {
      const user = userEvent.setup();
      render(
         <ControlsContainer>
            <div>Test Content</div>
         </ControlsContainer>
      );

      const accordionButton = screen.getByRole('button', { expanded: true });

      // Collapse first
      await user.click(accordionButton);
      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');

      // Expand again
      await user.click(accordionButton);
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
   });

   it('should toggle accordion multiple times', async () => {
      const user = userEvent.setup();
      render(
         <ControlsContainer>
            <div>Test Content</div>
         </ControlsContainer>
      );

      const accordionButton = screen.getByRole('button', { expanded: true });

      // Toggle multiple times
      await user.click(accordionButton); // collapse
      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(accordionButton); // expand
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');

      await user.click(accordionButton); // collapse
      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(accordionButton); // expand
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
   });

   it('should render correct aria-controls attribute', () => {
      render(
         <ControlsContainer>
            <div>Test Content</div>
         </ControlsContainer>
      );

      const accordionButton = screen.getByRole('button', { expanded: true });
      expect(accordionButton).toHaveAttribute('aria-controls', 'controls-content');
   });

   it('should have correct element with id matching aria-controls', () => {
      render(
         <ControlsContainer>
            <div>Test Content</div>
         </ControlsContainer>
      );

      const controlledElement = document.getElementById('controls-content');
      expect(controlledElement).toBeInTheDocument();
   });

   it('should render multiple children', () => {
      render(
         <ControlsContainer>
            <div>First Child</div>
            <div>Second Child</div>
            <div>Third Child</div>
         </ControlsContainer>
      );

      expect(screen.getByText('First Child')).toBeInTheDocument();
      expect(screen.getByText('Second Child')).toBeInTheDocument();
      expect(screen.getByText('Third Child')).toBeInTheDocument();
   });
});
