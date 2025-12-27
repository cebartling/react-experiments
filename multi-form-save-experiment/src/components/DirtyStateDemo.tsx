import { useTrackedForm } from '../hooks/useTrackedForm';
import { useGlobalDirtyState } from '../hooks/useGlobalDirtyState';

interface UserFormData {
  name: string;
  email: string;
}

interface AddressFormData {
  street: string;
  city: string;
}

function UserInfoForm() {
  const { register, reset } = useTrackedForm<UserFormData>({
    formId: 'userInfo',
    defaultValues: { name: '', email: '' },
  });

  return (
    <div className="form-section" data-testid="user-info-form">
      <h3>User Information</h3>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" {...register('name')} data-testid="name-input" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register('email')} data-testid="email-input" />
        </div>
        <button type="button" onClick={() => reset()} data-testid="user-reset-button">
          Reset User Form
        </button>
      </form>
    </div>
  );
}

function AddressForm() {
  const { register, reset } = useTrackedForm<AddressFormData>({
    formId: 'address',
    defaultValues: { street: '', city: '' },
  });

  return (
    <div className="form-section" data-testid="address-form">
      <h3>Address</h3>
      <form>
        <div>
          <label htmlFor="street">Street:</label>
          <input id="street" {...register('street')} data-testid="street-input" />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input id="city" {...register('city')} data-testid="city-input" />
        </div>
        <button type="button" onClick={() => reset()} data-testid="address-reset-button">
          Reset Address Form
        </button>
      </form>
    </div>
  );
}

export function DirtyStateDemo() {
  const { isDirty, dirtyFormIds, resetAllDirtyState } = useGlobalDirtyState();

  const handleSaveAll = () => {
    // Simulate saving - in real app this would call APIs
    console.log('Saving all forms...');
    resetAllDirtyState();
  };

  return (
    <div className="dirty-state-demo" data-testid="dirty-state-demo">
      <h2>Multi-Form Dirty State Demo</h2>

      <div className="status-bar" data-testid="status-bar">
        <span data-testid="dirty-status">
          Status: {isDirty ? 'Unsaved changes' : 'All saved'}
        </span>
        {isDirty && (
          <span data-testid="dirty-forms">
            {' '}
            (Forms with changes: {dirtyFormIds.join(', ')})
          </span>
        )}
      </div>

      <div className="forms-container">
        <UserInfoForm />
        <AddressForm />
      </div>

      <div className="actions">
        <button
          onClick={handleSaveAll}
          disabled={!isDirty}
          data-testid="save-all-button"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}
