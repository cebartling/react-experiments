import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFormCoordinationStore, selectIsDirty } from './formCoordinationStore';

function resetStore() {
  const store = useFormCoordinationStore.getState();
  store.resetAllDirtyState();
  store.clearValidationErrors();
  // Reset form registry
  useFormCoordinationStore.setState({ formRegistry: new Map(), isValidating: false });
}

describe('formCoordinationStore', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('markFormDirty', () => {
    it('adds form ID to the dirty forms set', () => {
      const { markFormDirty } = useFormCoordinationStore.getState();

      markFormDirty('form-1');

      const state = useFormCoordinationStore.getState();
      expect(state.dirtyForms.has('form-1')).toBe(true);
      expect(state.dirtyForms.size).toBe(1);
    });

    it('can mark multiple forms as dirty', () => {
      const { markFormDirty } = useFormCoordinationStore.getState();

      markFormDirty('form-1');
      markFormDirty('form-2');
      markFormDirty('form-3');

      const state = useFormCoordinationStore.getState();
      expect(state.dirtyForms.size).toBe(3);
      expect(state.dirtyForms.has('form-1')).toBe(true);
      expect(state.dirtyForms.has('form-2')).toBe(true);
      expect(state.dirtyForms.has('form-3')).toBe(true);
    });

    it('does not duplicate form IDs when marked dirty multiple times', () => {
      const { markFormDirty } = useFormCoordinationStore.getState();

      markFormDirty('form-1');
      markFormDirty('form-1');
      markFormDirty('form-1');

      const state = useFormCoordinationStore.getState();
      expect(state.dirtyForms.size).toBe(1);
    });
  });

  describe('markFormClean', () => {
    it('removes form ID from the dirty forms set', () => {
      const { markFormDirty, markFormClean } = useFormCoordinationStore.getState();

      markFormDirty('form-1');
      markFormClean('form-1');

      const state = useFormCoordinationStore.getState();
      expect(state.dirtyForms.has('form-1')).toBe(false);
      expect(state.dirtyForms.size).toBe(0);
    });

    it('does not throw when removing a form ID that is not in the set', () => {
      const { markFormClean } = useFormCoordinationStore.getState();

      expect(() => markFormClean('nonexistent')).not.toThrow();
    });

    it('only removes the specified form ID', () => {
      const { markFormDirty, markFormClean } = useFormCoordinationStore.getState();

      markFormDirty('form-1');
      markFormDirty('form-2');
      markFormClean('form-1');

      const state = useFormCoordinationStore.getState();
      expect(state.dirtyForms.has('form-1')).toBe(false);
      expect(state.dirtyForms.has('form-2')).toBe(true);
      expect(state.dirtyForms.size).toBe(1);
    });
  });

  describe('selectIsDirty', () => {
    it('returns true when at least one form is dirty', () => {
      const { markFormDirty } = useFormCoordinationStore.getState();

      markFormDirty('form-1');

      const state = useFormCoordinationStore.getState();
      expect(selectIsDirty(state)).toBe(true);
    });

    it('returns false when no forms are dirty', () => {
      const state = useFormCoordinationStore.getState();
      expect(selectIsDirty(state)).toBe(false);
    });

    it('returns false after all forms are marked clean', () => {
      const { markFormDirty, markFormClean } = useFormCoordinationStore.getState();

      markFormDirty('form-1');
      markFormDirty('form-2');
      markFormClean('form-1');
      markFormClean('form-2');

      const state = useFormCoordinationStore.getState();
      expect(selectIsDirty(state)).toBe(false);
    });
  });

  describe('resetAllDirtyState', () => {
    it('clears all form IDs from the dirty set', () => {
      const { markFormDirty, resetAllDirtyState } = useFormCoordinationStore.getState();

      markFormDirty('form-1');
      markFormDirty('form-2');
      markFormDirty('form-3');
      resetAllDirtyState();

      const state = useFormCoordinationStore.getState();
      expect(state.dirtyForms.size).toBe(0);
      expect(selectIsDirty(state)).toBe(false);
    });

    it('can be called on an already empty set without error', () => {
      const { resetAllDirtyState } = useFormCoordinationStore.getState();

      expect(() => resetAllDirtyState()).not.toThrow();
      expect(useFormCoordinationStore.getState().dirtyForms.size).toBe(0);
    });
  });

  describe('registerForm', () => {
    it('adds entry to the form registry', () => {
      const { registerForm } = useFormCoordinationStore.getState();
      const mockValidate = vi.fn().mockResolvedValue({ valid: true, errors: [] });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate,
      });

      const state = useFormCoordinationStore.getState();
      expect(state.formRegistry.has('form-1')).toBe(true);
      expect(state.formRegistry.get('form-1')?.displayName).toBe('Form One');
    });

    it('can register multiple forms', () => {
      const { registerForm } = useFormCoordinationStore.getState();
      const mockValidate = vi.fn().mockResolvedValue({ valid: true, errors: [] });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate,
      });
      registerForm({
        formId: 'form-2',
        displayName: 'Form Two',
        validate: mockValidate,
      });

      const state = useFormCoordinationStore.getState();
      expect(state.formRegistry.size).toBe(2);
    });

    it('overwrites existing entry with same formId', () => {
      const { registerForm } = useFormCoordinationStore.getState();
      const mockValidate = vi.fn().mockResolvedValue({ valid: true, errors: [] });

      registerForm({
        formId: 'form-1',
        displayName: 'Original Name',
        validate: mockValidate,
      });
      registerForm({
        formId: 'form-1',
        displayName: 'Updated Name',
        validate: mockValidate,
      });

      const state = useFormCoordinationStore.getState();
      expect(state.formRegistry.size).toBe(1);
      expect(state.formRegistry.get('form-1')?.displayName).toBe('Updated Name');
    });
  });

  describe('unregisterForm', () => {
    it('removes entry from the form registry', () => {
      const { registerForm, unregisterForm } = useFormCoordinationStore.getState();
      const mockValidate = vi.fn().mockResolvedValue({ valid: true, errors: [] });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate,
      });
      unregisterForm('form-1');

      const state = useFormCoordinationStore.getState();
      expect(state.formRegistry.has('form-1')).toBe(false);
    });

    it('does not throw when removing a non-existent form', () => {
      const { unregisterForm } = useFormCoordinationStore.getState();

      expect(() => unregisterForm('nonexistent')).not.toThrow();
    });

    it('only removes the specified form', () => {
      const { registerForm, unregisterForm } = useFormCoordinationStore.getState();
      const mockValidate = vi.fn().mockResolvedValue({ valid: true, errors: [] });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate,
      });
      registerForm({
        formId: 'form-2',
        displayName: 'Form Two',
        validate: mockValidate,
      });
      unregisterForm('form-1');

      const state = useFormCoordinationStore.getState();
      expect(state.formRegistry.has('form-1')).toBe(false);
      expect(state.formRegistry.has('form-2')).toBe(true);
    });
  });

  describe('validateAllDirtyForms', () => {
    it('only validates dirty forms', async () => {
      const { registerForm, markFormDirty, validateAllDirtyForms } =
        useFormCoordinationStore.getState();
      const mockValidate1 = vi.fn().mockResolvedValue({ valid: true, errors: [] });
      const mockValidate2 = vi.fn().mockResolvedValue({ valid: true, errors: [] });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate1,
      });
      registerForm({
        formId: 'form-2',
        displayName: 'Form Two',
        validate: mockValidate2,
      });

      markFormDirty('form-1');
      // form-2 is NOT marked dirty

      await validateAllDirtyForms();

      expect(mockValidate1).toHaveBeenCalled();
      expect(mockValidate2).not.toHaveBeenCalled();
    });

    it('collects all errors from multiple forms', async () => {
      const { registerForm, markFormDirty, validateAllDirtyForms } =
        useFormCoordinationStore.getState();
      const mockValidate1 = vi.fn().mockResolvedValue({
        valid: false,
        errors: [{ field: 'name', message: 'Name is required' }],
      });
      const mockValidate2 = vi.fn().mockResolvedValue({
        valid: false,
        errors: [{ field: 'email', message: 'Invalid email' }],
      });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate1,
      });
      registerForm({
        formId: 'form-2',
        displayName: 'Form Two',
        validate: mockValidate2,
      });

      markFormDirty('form-1');
      markFormDirty('form-2');

      await validateAllDirtyForms();

      const state = useFormCoordinationStore.getState();
      expect(state.validationErrors).toHaveLength(2);
      expect(state.validationErrors[0].formName).toBe('Form One');
      expect(state.validationErrors[1].formName).toBe('Form Two');
    });

    it('returns true when all forms are valid', async () => {
      const { registerForm, markFormDirty, validateAllDirtyForms } =
        useFormCoordinationStore.getState();
      const mockValidate = vi.fn().mockResolvedValue({ valid: true, errors: [] });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate,
      });

      markFormDirty('form-1');

      const result = await validateAllDirtyForms();

      expect(result).toBe(true);
    });

    it('returns false when any form is invalid', async () => {
      const { registerForm, markFormDirty, validateAllDirtyForms } =
        useFormCoordinationStore.getState();
      const mockValidateValid = vi.fn().mockResolvedValue({ valid: true, errors: [] });
      const mockValidateInvalid = vi.fn().mockResolvedValue({
        valid: false,
        errors: [{ field: 'name', message: 'Required' }],
      });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidateValid,
      });
      registerForm({
        formId: 'form-2',
        displayName: 'Form Two',
        validate: mockValidateInvalid,
      });

      markFormDirty('form-1');
      markFormDirty('form-2');

      const result = await validateAllDirtyForms();

      expect(result).toBe(false);
    });

    it('sets isValidating to true while validating', async () => {
      const { registerForm, markFormDirty, validateAllDirtyForms } =
        useFormCoordinationStore.getState();

      let capturedIsValidating = false;
      const mockValidate = vi.fn().mockImplementation(async () => {
        capturedIsValidating = useFormCoordinationStore.getState().isValidating;
        return { valid: true, errors: [] };
      });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate,
      });

      markFormDirty('form-1');

      await validateAllDirtyForms();

      expect(capturedIsValidating).toBe(true);
    });

    it('sets isValidating to false after validation completes', async () => {
      const { registerForm, markFormDirty, validateAllDirtyForms } =
        useFormCoordinationStore.getState();
      const mockValidate = vi.fn().mockResolvedValue({ valid: true, errors: [] });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate,
      });

      markFormDirty('form-1');

      await validateAllDirtyForms();

      const state = useFormCoordinationStore.getState();
      expect(state.isValidating).toBe(false);
    });

    it('runs validation in parallel for all dirty forms', async () => {
      const { registerForm, markFormDirty, validateAllDirtyForms } =
        useFormCoordinationStore.getState();

      const callOrder: string[] = [];

      const mockValidate1 = vi.fn().mockImplementation(async () => {
        callOrder.push('start-1');
        await new Promise((resolve) => setTimeout(resolve, 50));
        callOrder.push('end-1');
        return { valid: true, errors: [] };
      });

      const mockValidate2 = vi.fn().mockImplementation(async () => {
        callOrder.push('start-2');
        await new Promise((resolve) => setTimeout(resolve, 50));
        callOrder.push('end-2');
        return { valid: true, errors: [] };
      });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate1,
      });
      registerForm({
        formId: 'form-2',
        displayName: 'Form Two',
        validate: mockValidate2,
      });

      markFormDirty('form-1');
      markFormDirty('form-2');

      await validateAllDirtyForms();

      // Both should start before either ends (parallel execution)
      expect(callOrder[0]).toBe('start-1');
      expect(callOrder[1]).toBe('start-2');
    });
  });

  describe('clearValidationErrors', () => {
    it('resets the validation errors array', async () => {
      const { registerForm, markFormDirty, validateAllDirtyForms, clearValidationErrors } =
        useFormCoordinationStore.getState();
      const mockValidate = vi.fn().mockResolvedValue({
        valid: false,
        errors: [{ field: 'name', message: 'Required' }],
      });

      registerForm({
        formId: 'form-1',
        displayName: 'Form One',
        validate: mockValidate,
      });

      markFormDirty('form-1');
      await validateAllDirtyForms();

      clearValidationErrors();

      const state = useFormCoordinationStore.getState();
      expect(state.validationErrors).toHaveLength(0);
    });
  });
});
