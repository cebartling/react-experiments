import { create } from 'zustand';
import type {
  FormId,
  FormRegistryEntry,
  FormValidationSummary,
} from '../types/form-coordination';

interface FormCoordinationStoreState {
  // Dirty state
  dirtyForms: Set<FormId>;
  markFormDirty: (formId: FormId) => void;
  markFormClean: (formId: FormId) => void;
  resetAllDirtyState: () => void;

  // Form registry
  formRegistry: Map<FormId, FormRegistryEntry>;
  registerForm: (entry: FormRegistryEntry) => void;
  unregisterForm: (formId: FormId) => void;

  // Validation state
  isValidating: boolean;
  validationErrors: FormValidationSummary[];
  validateAllDirtyForms: () => Promise<boolean>;
  clearValidationErrors: () => void;
}

export const useFormCoordinationStore = create<FormCoordinationStoreState>((set, get) => ({
  // Dirty state
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

  // Form registry
  formRegistry: new Map<FormId, FormRegistryEntry>(),

  registerForm: (entry: FormRegistryEntry) => {
    set((state) => {
      const next = new Map(state.formRegistry);
      next.set(entry.formId, entry);
      return { formRegistry: next };
    });
  },

  unregisterForm: (formId: FormId) => {
    set((state) => {
      const next = new Map(state.formRegistry);
      next.delete(formId);
      return { formRegistry: next };
    });
  },

  // Validation state
  isValidating: false,
  validationErrors: [],

  validateAllDirtyForms: async () => {
    const { dirtyForms, formRegistry } = get();

    set({ isValidating: true, validationErrors: [] });

    const validationPromises: Promise<FormValidationSummary | null>[] = [];

    for (const formId of dirtyForms) {
      const entry = formRegistry.get(formId);
      if (entry) {
        validationPromises.push(
          entry.validate().then((result) => {
            if (!result.valid) {
              return {
                formId: entry.formId,
                formName: entry.displayName,
                errors: result.errors,
              };
            }
            return null;
          })
        );
      }
    }

    const results = await Promise.all(validationPromises);
    const errors = results.filter((r): r is FormValidationSummary => r !== null);

    set({ isValidating: false, validationErrors: errors });

    return errors.length === 0;
  },

  clearValidationErrors: () => {
    set({ validationErrors: [] });
  },
}));

/**
 * Selector to check if any forms are dirty.
 * Use this with useFormCoordinationStore for reactive updates.
 */
export const selectIsDirty = (state: FormCoordinationStoreState): boolean =>
  state.dirtyForms.size > 0;
