import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Grid, Stack, TextField, Avatar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createBrandSchema,
  updateBrandSchema,
  type BrandFormData,
  type UpdateBrandFormData,
} from '../schema/brand.schema';

interface BrandFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
  defaultValues?: { name?: string; imageUrl?: string }; // undefined = create mode
}

export default function BrandForm({ onSubmit, isLoading, defaultValues }: BrandFormProps) {
  const navigate = useNavigate();
  const isEditMode = !!defaultValues;

  const [preview, setPreview] = useState<string | null>(defaultValues?.imageUrl || null);
  const [imageChanged, setImageChanged] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);

  const schema = isEditMode ? updateBrandSchema : createBrandSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    resetField,
    watch,
  } = useForm<BrandFormData | UpdateBrandFormData>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: { name: defaultValues?.name || '' },
  });

  const watchName = watch('name');

  //  Detect name changes in edit mode
  useEffect(() => {
    if (isEditMode && defaultValues?.name !== undefined) {
      setNameChanged(watchName !== defaultValues.name);
    }
  }, [watchName, defaultValues, isEditMode]);

  //  Reset form state when switching brand
  useEffect(() => {
    if (isEditMode) {
      reset({ name: defaultValues.name || '' });
      setPreview(defaultValues.imageUrl || null);
      setImageChanged(false);
      setNameChanged(false);
    }
  }, [defaultValues, isEditMode, reset]);

  const handleBack = () => navigate('/admin/brands');

  const handleFormSubmit = (data: BrandFormData | UpdateBrandFormData) => {
    const formData = new FormData();

    //  Append name always in create mode, only if changed in edit
    if (!isEditMode || nameChanged) {
      formData.append('name', data.name as string);
    }

    //  Append image only if new file selected (or required in create)
    const file = (data.image && data.image[0]) || null;
    if (!isEditMode || imageChanged) {
      if (file) {
        formData.append('image', file);
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
        {isEditMode ? 'Edit Brand' : 'Add New Brand'}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/*  Name Field */}
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Brand Name"
            variant="outlined"
            placeholder="Brand Name"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message as string}
          />
        </Grid>

        {/*  Image Upload */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Brand Image
          </Typography>

          {preview ? (
            <Stack direction="row" spacing={2} alignItems="center" my={2}>
              <Avatar
                src={preview}
                alt="Brand Preview"
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

      {/*  Actions */}
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
