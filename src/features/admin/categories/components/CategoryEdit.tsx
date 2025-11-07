import { useParams, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import PageContainer from './PageContainer';
import CategoryForm from './CategoryForm';
import { useCategoryByIdQuery } from '../hooks/useCategories';
import {
  usePatchCategoryNameMutation,
  usePatchCategoryImageMutation,
} from '../hooks/useCategories';

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: category, isLoading } = useCategoryByIdQuery(id!);

  const patchNameMutation = usePatchCategoryNameMutation();
  const patchImageMutation = usePatchCategoryImageMutation();

  const handleSubmit = async (formData: FormData) => {
    try {
      const name = formData.get('name') as string | null;
      const image = formData.get('image') as File | string | null;

      if (!id) return;

      // Patch only changed name
      if (name && name !== category?.name) {
        await patchNameMutation.mutateAsync({ id, name });
      }

      // Patch only changed image
      if (image && typeof image !== 'string') {
        await patchImageMutation.mutateAsync({ id, image: image as File });
      }

      enqueueSnackbar('Category updated successfully!', { variant: 'success' });
      navigate('/admin/categories');
    } catch (err) {
      enqueueSnackbar(
        err?.response?.data?.message || 'Failed to update category',
        { variant: 'error' },
      );
    }
  };

  return (
    <PageContainer
      title="Edit Category"
      breadcrumbs={[
        { title: 'Categories', path: '/admin/categories' },
        { title: 'Edit' },
      ]}
    >
      <CategoryForm
        onSubmit={handleSubmit}
        isLoading={
          isLoading || patchNameMutation.isPending || patchImageMutation.isPending
        }
        defaultValues={{
          name: category?.name,
          imageUrl: category?.imageUrl,
        }}
      />
    </PageContainer>
  );
}
