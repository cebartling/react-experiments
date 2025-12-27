import { useFormCoordinationStore } from '../stores/formCoordinationStore';

interface SaveButtonProps {
  onSave: () => Promise<void>;
}

export function SaveButton({ onSave }: SaveButtonProps) {
  const isDirty = useFormCoordinationStore((state) => state.dirtyForms.size > 0);
  const isValidating = useFormCoordinationStore((state) => state.isValidating);
  const submissionStatus = useFormCoordinationStore((state) => state.submissionStatus);

  const isProcessing = isValidating || submissionStatus === 'submitting';
  const isDisabled = !isDirty || isProcessing;

  const getButtonText = () => {
    if (isValidating) return 'Validating...';
    if (submissionStatus === 'submitting') return 'Saving...';
    return 'Save All Changes';
  };

  return (
    <button
      type="button"
      onClick={onSave}
      disabled={isDisabled}
      className={`
        inline-flex items-center rounded-md px-4 py-2 text-sm font-medium
        shadow-sm transition-all focus:outline-none focus:ring-2
        focus:ring-blue-500 focus:ring-offset-2
        ${
          isDisabled
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }
      `}
      aria-busy={isProcessing}
      data-testid="save-button"
    >
      {isProcessing && (
        <svg
          className="-ml-1 mr-2 h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {getButtonText()}
    </button>
  );
}
