import { useCallback } from 'react';
import { useFormCoordinationStore } from '../stores/formCoordinationStore';
import { useErrorHandling } from '../hooks/useErrorHandling';
import { Container } from './layout/Container';
import { SaveButton } from './SaveButton';
import { ErrorSummary } from './ErrorSummary';
import { NotificationList } from './NotificationList';
import { UserInfoForm } from './forms/UserInfoForm';
import { AddressForm } from './forms/AddressForm';
import { PreferencesForm } from './forms/PreferencesForm';
import { FormErrorBoundary } from './FormErrorBoundary';

export function ParentContainer() {
  const saveAllChanges = useFormCoordinationStore((state) => state.saveAllChanges);
  const dirtyFormIds = useFormCoordinationStore((state) => Array.from(state.dirtyForms));

  const { validationErrors, submissionErrors, notifications, dismissNotification, clearAllErrors } =
    useErrorHandling();

  const handleSave = useCallback(async () => {
    await saveAllChanges();
  }, [saveAllChanges]);

  return (
    <Container className="py-8" data-testid="parent-container">
      <NotificationList notifications={notifications} onDismiss={dismissNotification} />

      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Multi-Form Editor</h1>
          {dirtyFormIds.length > 0 && (
            <p className="mt-1 text-sm text-gray-500" data-testid="dirty-form-count">
              Unsaved changes in {dirtyFormIds.length} form(s)
            </p>
          )}
        </div>
        <SaveButton onSave={handleSave} />
      </header>

      <ErrorSummary
        validationErrors={validationErrors}
        submissionErrors={submissionErrors}
        onDismiss={clearAllErrors}
      />

      <div className="space-y-6" data-testid="forms-container">
        <FormErrorBoundary>
          <UserInfoForm />
        </FormErrorBoundary>

        <FormErrorBoundary>
          <AddressForm />
        </FormErrorBoundary>

        <FormErrorBoundary>
          <PreferencesForm />
        </FormErrorBoundary>
      </div>
    </Container>
  );
}
