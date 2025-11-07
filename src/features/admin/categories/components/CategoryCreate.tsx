import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import PageContainer from './PageContainer';
import CategoryForm from './CategoryForm';
import { useCreateCategoryMutation } from '../hooks/useCategories';

export default function UserCreate() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const createMutation = useCreateCategoryMutation();

  const handleSubmit = (formData: FormData) => {
    createMutation.mutateAsync(formData, {
      onSuccess: () => {
        navigate('/admin/categories');
        enqueueSnackbar('Category created!', { variant: 'success' });
      },
      onError: (err) => {
        enqueueSnackbar(
          err?.response?.data?.errors?.[0]?.msg || err.message || 'Failed to create Cctegory',
          { variant: 'error' },
        );
      },
    });
  };


  return (
    <PageContainer
      title="New Category"
      breadcrumbs={[{ title: 'Categories', path: '/admin/categories' }, { title: 'New' }]}
    >
      <CategoryForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </PageContainer>
  );
}
