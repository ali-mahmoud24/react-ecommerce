import { useParams, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import PageContainer from './PageContainer';
import ProductForm from './ProductForm';
import { useProductByIdQuery, useUpdateProductMutation } from '../hooks/useProducts';

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { data: product, isLoading } = useProductByIdQuery(id!);
  const updateMutation = useUpdateProductMutation();

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;

    try {
      // React Query mutation call
      await updateMutation.mutateAsync({ id, formData });

      enqueueSnackbar('Product updated successfully!', { variant: 'success' });
      navigate('/admin/products');
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || 'Failed to update product', {
        variant: 'error',
      });
    }
  };

  if (isLoading || !product) return <div>Loading...</div>;

  return (
    <PageContainer
      title="Edit Product"
      breadcrumbs={[{ title: 'Products', path: '/admin/products' }, { title: 'Edit' }]}
    >
      <ProductForm
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending}
        defaultValues={{
          title: product.title,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          category: product.category?.id || '',
          brand: product.brand?.id || '',
          imageCover: product.imageCoverUrl,
          images: product.imageUrls || [],
        }}
      />
    </PageContainer>
  );
}
