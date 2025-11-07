import { useParams, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import PageContainer from './PageContainer';
import BrandForm from './BrandForm';
import { useBrandByIdQuery } from '../hooks/useBrands';
import { usePatchBrandImageMutation, usePatchBrandNameMutation } from '../hooks/useBrands';

export default function BrandEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: brand, isLoading } = useBrandByIdQuery(id!);

  const patchNameMutation = usePatchBrandNameMutation();
  const patchImageMutation = usePatchBrandImageMutation();

  const handleSubmit = async (formData: FormData) => {
    if (!id || !brand) return;

    try {
      const name = formData.get('name') as string | null;
      const image = formData.get('image');

      //  Only patch name if changed and not empty
      if (name && name.trim() && name !== brand.name) {
        await patchNameMutation.mutateAsync({ id, name });
      }

      //  Only patch image if user selected a *new* file
      if (image instanceof File) {
        await patchImageMutation.mutateAsync({ id, image });
      }

      enqueueSnackbar('Brand updated successfully!', { variant: 'success' });
      navigate('/admin/brands');
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || 'Failed to update brand', {
        variant: 'error',
      });
    }
  };

  return (
    <PageContainer
      title="Edit Brand"
      breadcrumbs={[{ title: 'Brands', path: '/admin/brands' }, { title: 'Edit' }]}
    >
      <BrandForm
        onSubmit={handleSubmit}
        isLoading={isLoading || patchNameMutation.isPending || patchImageMutation.isPending}
        defaultValues={{
          name: brand?.name,
          imageUrl: brand?.imageUrl,
        }}
      />
    </PageContainer>
  );
}
