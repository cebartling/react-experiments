/**
 * Represents a unique identifier for each child form
 */
export type FormId = string;

/**
 * Callback type for notifying parent of dirty state changes
 */
export type DirtyChangeCallback = (formId: FormId, isDirty: boolean) => void;

/**
 * Props interface for child forms that participate in dirty tracking
 */
export interface DirtyTrackingProps {
  formId: FormId;
  onDirtyChange: DirtyChangeCallback;
}

/**
 * State shape for the form coordination store.
 * Note: isDirty is computed via the selectIsDirty selector.
 */
export interface FormCoordinationState {
  dirtyForms: Set<FormId>;
  markFormDirty: (formId: FormId) => void;
  markFormClean: (formId: FormId) => void;
  resetAllDirtyState: () => void;
}
