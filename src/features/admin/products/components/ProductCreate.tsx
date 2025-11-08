import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import PageContainer from './PageContainer';
import ProductForm from './ProductForm';
import { useCreateProductMutation } from '../hooks/useProducts';

export default function ProductCreate() {
  const navigate = useNavigate();

  const createMutation = useCreateProductMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (formData: FormData) => {
    for (const val of formData.values()) {
      console.log(val);
    }

    createMutation.mutateAsync(formData, {
      onSuccess: () => {
        navigate('/admin/products');
        enqueueSnackbar('Product created!', { variant: 'success' });
      },
      onError: (err) => {
        enqueueSnackbar(
          err?.response?.data?.errors?.[0]?.msg || err.message || 'Failed to create Product',
          { variant: 'error' },
        );
      },
    });
  };

  return (
    <PageContainer
      title="New Product"
      breadcrumbs={[{ title: 'Products', path: '/admin/products' }, { title: 'New' }]}
    >
      <ProductForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </PageContainer>
  );
}
