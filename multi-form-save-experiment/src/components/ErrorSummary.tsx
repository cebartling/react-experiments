import type { FormValidationError, FormSubmissionError } from '../types/errors';

interface ErrorSummaryProps {
  validationErrors: FormValidationError[];
  submissionErrors: FormSubmissionError[];
  onDismiss?: () => void;
}

export function ErrorSummary({ validationErrors, submissionErrors, onDismiss }: ErrorSummaryProps) {
  const hasValidation = validationErrors.length > 0;
  const hasSubmission = submissionErrors.length > 0;

  if (!hasValidation && !hasSubmission) {
    return null;
  }

  return (
    <div
      className="mb-6 rounded-md border border-red-200 bg-red-50 p-4"
      role="alert"
      aria-labelledby="error-summary-title"
      data-testid="error-summary"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 id="error-summary-title" className="text-sm font-medium text-red-800">
            Please fix the following errors before saving:
          </h3>

          {hasValidation && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-red-700">Validation Errors</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-red-700">
                {validationErrors.map((error) => (
                  <li key={error.formId}>
                    <span className="font-medium">{error.formName}:</span>
                    <ul className="ml-4 mt-1 list-inside list-disc">
                      {error.fieldErrors.map((fieldError, idx) => (
                        <li key={idx}>{fieldError.message}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasSubmission && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-red-700">Submission Errors</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-red-700">
                {submissionErrors.map((error) => (
                  <li key={error.formId}>
                    <span className="font-medium">{error.formName}:</span> {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {onDismiss && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              onClick={onDismiss}
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              aria-label="Dismiss errors"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
