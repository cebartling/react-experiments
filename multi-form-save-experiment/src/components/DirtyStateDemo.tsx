import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useValidatedForm } from '../hooks/useValidatedForm';
import { useGlobalDirtyState } from '../hooks/useGlobalDirtyState';
import { useFormCoordinationStore } from '../stores/formCoordinationStore';
import type { FormValidationSummary } from '../types/form-coordination';

// Validation schemas
const userInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
});

const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
});

type UserFormData = z.infer<typeof userInfoSchema>;
type AddressFormData = z.infer<typeof addressSchema>;

function UserInfoForm() {
  const {
    register,
    reset,
    formState: { errors },
  } = useValidatedForm<UserFormData>({
    formId: 'userInfo',
    displayName: 'User Information',
    resolver: zodResolver(userInfoSchema),
    defaultValues: { name: '', email: '' },
  });

  return (
    <div className="form-section" data-testid="user-info-form">
      <h3>User Information</h3>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" {...register('name')} data-testid="name-input" />
          {errors.name && (
            <span className="error" data-testid="name-error">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register('email')} data-testid="email-input" />
          {errors.email && (
            <span className="error" data-testid="email-error">
              {errors.email.message}
            </span>
          )}
        </div>
        <button type="button" onClick={() => reset()} data-testid="user-reset-button">
          Reset User Form
        </button>
      </form>
    </div>
  );
}

function AddressForm() {
  const {
    register,
    reset,
    formState: { errors },
  } = useValidatedForm<AddressFormData>({
    formId: 'address',
    displayName: 'Address',
    resolver: zodResolver(addressSchema),
    defaultValues: { street: '', city: '' },
  });

  return (
    <div className="form-section" data-testid="address-form">
      <h3>Address</h3>
      <form>
        <div>
          <label htmlFor="street">Street:</label>
          <input id="street" {...register('street')} data-testid="street-input" />
          {errors.street && (
            <span className="error" data-testid="street-error">
              {errors.street.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input id="city" {...register('city')} data-testid="city-input" />
          {errors.city && (
            <span className="error" data-testid="city-error">
              {errors.city.message}
            </span>
          )}
        </div>
        <button type="button" onClick={() => reset()} data-testid="address-reset-button">
          Reset Address Form
        </button>
      </form>
    </div>
  );
}

function ErrorSummary({ errors }: { errors: FormValidationSummary[] }) {
  if (errors.length === 0) return null;

  return (
    <div className="error-summary" data-testid="error-summary">
      <h4>Validation Errors</h4>
      <ul>
        {errors.map((formError) => (
          <li key={formError.formId} data-testid={`error-summary-${formError.formId}`}>
            <strong>{formError.formName}:</strong>
            <ul>
              {formError.errors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DirtyStateDemo() {
  const { isDirty, dirtyFormIds } = useGlobalDirtyState();
  const isValidating = useFormCoordinationStore((state) => state.isValidating);
  const validationErrors = useFormCoordinationStore((state) => state.validationErrors);
  const submissionStatus = useFormCoordinationStore((state) => state.submissionStatus);
  const saveAllChanges = useFormCoordinationStore((state) => state.saveAllChanges);

  const handleSaveAll = async () => {
    await saveAllChanges();
  };

  // Determine the status message
  const getStatusMessage = () => {
    if (isValidating) return 'Validating...';
    if (submissionStatus === 'submitting') return 'Saving...';
    if (validationErrors.length > 0) return 'Validation failed';
    if (submissionStatus === 'success') return 'All saved';
    if (submissionStatus === 'error') return 'Save failed';
    if (isDirty) return 'Unsaved changes';
    return 'All saved';
  };

  const isProcessing = isValidating || submissionStatus === 'submitting';

  return (
    <div className="dirty-state-demo" data-testid="dirty-state-demo">
      <h2>Multi-Form Dirty State Demo</h2>

      <div className="status-bar" data-testid="status-bar">
        <span data-testid="dirty-status">Status: {getStatusMessage()}</span>
        {isDirty && (
          <span data-testid="dirty-forms"> (Forms with changes: {dirtyFormIds.join(', ')})</span>
        )}
      </div>

      <ErrorSummary errors={validationErrors} />

      <div className="forms-container">
        <UserInfoForm />
        <AddressForm />
      </div>

      <div className="actions">
        <button
          onClick={handleSaveAll}
          disabled={!isDirty || isProcessing}
          data-testid="save-all-button"
        >
          {isProcessing ? 'Processing...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
