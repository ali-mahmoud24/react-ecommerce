import Spinner from '@/components/ui/Spinner';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import FormInput from '@/components/ui/FormInput';
import { Button } from '@mui/material';

export default function Profile() {
  const { form, onSubmit, isLoading, profile } = useProfile();
  const { register, handleSubmit, formState: { errors } } = form;
  const { logout, user } = useAuth();

  if (!profile && user) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="mt-2 text-blue-100">
            Manage your personal information and preferences
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
          {/* Personal Information */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormInput
                label="Full name"
                register={register('name')}
                error={errors.name}
                required
                placeholder="Your full name"
              />

              <FormInput
                label="Email address"
                type="email"
                register={register('email')}
                error={errors.email}
                required
                placeholder="your.email@example.com"
              />

              <FormInput
                label="Phone number"
                type="tel"
                register={register('phone')}
                error={errors.phone}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Address Information</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormInput
                label="Street Address"
                register={register('address.street')}
                error={errors.address?.street}
                placeholder="123 Main Street"
              />

              <FormInput
                label="City"
                register={register('address.city')}
                error={errors.address?.city}
                placeholder="New York"
              />

              <FormInput
                label="Country"
                register={register('address.country')}
                error={errors.address?.country}
                placeholder="United States"
              />

              <FormInput
                label="ZIP / Postal Code"
                register={register('address.zipCode')}
                error={errors.address?.zipCode}
                placeholder="10001"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
            <Button
              type="button"
              onClick={logout}
              className="w-full sm:w-auto"
            >
              Sign Out
            </Button>

            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto flex justify-center items-center"
              >
                {isLoading ? <Spinner size="sm" className="text-white" /> : 'Save Changes'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}