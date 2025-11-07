import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import PageContainer from './PageContainer';
import BrandForm from './BrandForm';
import { useCreateBrandMutation } from '../hooks/useBrands';

export default function UserCreate() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const createMutation = useCreateBrandMutation();

  const handleSubmit = (formData: FormData) => {
    createMutation.mutateAsync(formData, {
      onSuccess: () => {
        navigate('/admin/brands');
        enqueueSnackbar('Brand created!', { variant: 'success' });
      },
      onError: (err) => {
        enqueueSnackbar(
          err?.response?.data?.errors?.[0]?.msg || err.message || 'Failed to create Brand',
          { variant: 'error' },
        );
      },
    });
  };

  return (
    <PageContainer
      title="New Brand"
      breadcrumbs={[{ title: 'Brands', path: '/admin/brands' }, { title: 'New' }]}
    >
      <BrandForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </PageContainer>
  );
}
