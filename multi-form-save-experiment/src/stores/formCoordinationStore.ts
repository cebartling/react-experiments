import { create } from 'zustand';
import type { FormId } from '../types/form-coordination';

interface FormCoordinationStoreState {
  dirtyForms: Set<FormId>;
  markFormDirty: (formId: FormId) => void;
  markFormClean: (formId: FormId) => void;
  resetAllDirtyState: () => void;
}

export const useFormCoordinationStore = create<FormCoordinationStoreState>((set) => ({
  dirtyForms: new Set<FormId>(),

  markFormDirty: (formId: FormId) => {
    set((state) => {
      const next = new Set(state.dirtyForms);
      next.add(formId);
      return { dirtyForms: next };
    });
  },

  markFormClean: (formId: FormId) => {
    set((state) => {
      const next = new Set(state.dirtyForms);
      next.delete(formId);
      return { dirtyForms: next };
    });
  },

  resetAllDirtyState: () => {
    set({ dirtyForms: new Set() });
  },
}));

/**
 * Selector to check if any forms are dirty.
 * Use this with useFormCoordinationStore for reactive updates.
 */
export const selectIsDirty = (state: FormCoordinationStoreState): boolean =>
  state.dirtyForms.size > 0;
