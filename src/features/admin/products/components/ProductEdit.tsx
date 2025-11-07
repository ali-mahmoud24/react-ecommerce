import { useParams, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import PageContainer from './PageContainer';
import ProductForm from './ProductForm';
import { useProductByIdQuery, useUpdateProductMutation } from '../hooks/useProducts';

export default function ProductEdit() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: product, isLoading } = useProductByIdQuery(id!);
  const updateMutation = useUpdateProductMutation();

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;
  console.log('submittt');

    try {
      console.log('Submitting formData:');
      for (const pair of formData.entries()) console.log(pair[0], pair[1]);

      // React Query mutation call
      await updateMutation.mutateAsync({ id, formData });

      enqueueSnackbar('Product updated successfully!', { variant: 'success' });
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
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
        isLoading={isLoading}
        defaultValues={{
          title: product.title,
          description: product.description,
          price: product.price,
          priceAfterDiscount: product.priceAfterDiscount,
          quantity: product.quantity,
          category: product.category?.id || '',
          brand: product.brand?.id || '',
          colors: product.colors || [],
          imageCover: product.imageCoverUrl,
          images: product.imageUrls || [],
        }}
      />
    </PageContainer>
  );
}
