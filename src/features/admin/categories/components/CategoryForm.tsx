import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Grid, Stack, TextField, Avatar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createCategorySchema,
  updateCategorySchema,
  type CategoryFormData,
  type UpdateCategoryFormData,
} from '../schema/category.schema';

interface CategoryFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
  defaultValues?: { name?: string; imageUrl?: string }; // undefined = create mode
}

export default function CategoryForm({ onSubmit, isLoading, defaultValues }: CategoryFormProps) {
  const navigate = useNavigate();
  const isEditMode = !!defaultValues;

  const [preview, setPreview] = useState<string | null>(defaultValues?.imageUrl || null);
  const [imageChanged, setImageChanged] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);

  const schema = isEditMode ? updateCategorySchema : createCategorySchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    resetField,
    watch,
  } = useForm<CategoryFormData | UpdateCategoryFormData>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: { name: defaultValues?.name || '' },
  });

  const watchName = watch('name');

  // Detect name change (only in edit mode)
  useEffect(() => {
    if (isEditMode && defaultValues?.name !== undefined) {
      setNameChanged(watchName !== defaultValues.name);
    }
  }, [watchName, defaultValues, isEditMode]);

  // Reset when editing new category
  useEffect(() => {
    if (isEditMode) {
      reset({ name: defaultValues.name || '' });
      setPreview(defaultValues.imageUrl || null);
      setImageChanged(false);
      setNameChanged(false);
    }
  }, [defaultValues, isEditMode, reset]);

  const handleBack = () => navigate('/admin/categories');

  const handleFormSubmit = (data: CategoryFormData | UpdateCategoryFormData) => {
    const formData = new FormData();

    // ✅ Always append name in create, only when changed in edit
    if (!isEditMode || nameChanged) {
      formData.append('name', data.name as string);
    }

    // ✅ Always append image in create, only when changed in edit
    if (!isEditMode || imageChanged) {
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      } else {
        formData.append('image', '');
      }
    }

    onSubmit(formData);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    resetField('image');
    setImageChanged(true);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        p: 3,
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        {isEditMode ? 'Edit Category' : 'Add New Category'}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Name */}
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Category Name"
            variant="outlined"
            placeholder="Category Name"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message as string}
          />
        </Grid>

        {/* Image */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Category Image
          </Typography>

          {preview ? (
            <Stack direction="row" spacing={2} alignItems="center" my={2}>
              <Avatar
                src={preview}
                alt="Category Preview"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  boxShadow: 3,
                  border: '2px solid #e0e0e0',
                }}
              />
              <IconButton color="error" onClick={handleRemoveImage}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ) : (
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                {...register('image', {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                      setImageChanged(true);
                    }
                  },
                })}
              />
            </Button>
          )}

          {errors.image && (
            <Typography mx={2} color="error" variant="caption">
              {errors.image.message as string}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting || isLoading}
          sx={{ minWidth: 120 }}
        >
          {isSubmitting || isLoading
            ? isEditMode
              ? 'Updating...'
              : 'Creating...'
            : isEditMode
            ? 'Update'
            : 'Create'}
        </Button>
      </Stack>
    </Box>
  );
}
