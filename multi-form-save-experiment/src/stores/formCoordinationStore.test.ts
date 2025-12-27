import { describe, it, expect, beforeEach } from 'vitest';
import { useFormCoordinationStore, selectIsDirty } from './formCoordinationStore';

describe('formCoordinationStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useFormCoordinationStore.getState().resetAllDirtyState();
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
});
