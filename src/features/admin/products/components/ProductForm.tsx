import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductFormData } from '../schema/product.schema';
import { useBrands } from '../hooks/useBrands';
import { useCategories } from '../hooks/useCategories';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ProductFormData & { images?: (File | string)[]; imageCover?: string }>;
}

export default function ProductForm({ onSubmit, isLoading, defaultValues }: ProductFormProps) {
  const isEditMode = !!defaultValues;

  const [coverPreview, setCoverPreview] = useState<string | null>(
    defaultValues?.imageCover || null,
  );
  const [imagesPreview, setImagesPreview] = useState<(File | string)[]>(
    defaultValues?.images || [],
  );

  const { data: brands = [], isLoading: brandsLoading } = useBrands();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      price: defaultValues?.price || 0,
      priceAfterDiscount: defaultValues?.priceAfterDiscount || 0,
      quantity: defaultValues?.quantity || 0,
      category: defaultValues?.category || '',
      brand: defaultValues?.brand || '',
      colors: defaultValues?.colors || [],
      imageCover: undefined,
      images: [],
    },
  });

  const watchImages = watch('images') || [];

  const availableColors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'];

  const handleFormSubmit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', String(data.price));
    formData.append('priceAfterDiscount', String(data.priceAfterDiscount || 0));
    formData.append('quantity', String(data.quantity));
    formData.append('category', data.category);
    formData.append('brand', data.brand);
    data.colors.forEach((color) => formData.append('colors', color));

    // Append imageCover
    if (data.imageCover instanceof File) formData.append('imageCover', data.imageCover);

    // Append images
    watchImages.forEach((img) => {
      if (img instanceof File) formData.append('images', img);
    });

    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ p: 3 }}>
      {/* Title */}
      <TextField
        label="Title"
        {...register('title')}
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      {/* Description */}
      <TextField
        label="Description"
        {...register('description')}
        fullWidth
        multiline
        rows={3}
        margin="normal"
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      {/* Price & Quantity */}
      <Stack direction="row" spacing={2}>
        <TextField
          label="Price"
          type="number"
          {...register('price', { valueAsNumber: true })}
          error={!!errors.price}
          helperText={errors.price?.message}
          fullWidth
        />
        <TextField
          label="Price After Discount"
          type="number"
          {...register('priceAfterDiscount', { valueAsNumber: true })}
          error={!!errors.priceAfterDiscount}
          helperText={errors.priceAfterDiscount?.message}
          fullWidth
        />
        <TextField
          label="Quantity"
          type="number"
          {...register('quantity', { valueAsNumber: true })}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
          fullWidth
        />
      </Stack>

      {/* Category */}
      <Controller
        name="category"
        control={control}
        render={({ field }) => {
          const value = categories.some((c) => c.id === field.value) ? field.value : '';
          return (
            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                {...field}
                value={value}
                input={<OutlinedInput label="Category" />}
                disabled={categoriesLoading}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      />

      {/* Brand */}
      <Controller
        name="brand"
        control={control}
        render={({ field }) => {
          const value = brands.some((b) => b.id === field.value) ? field.value : '';
          return (
            <FormControl fullWidth margin="normal" error={!!errors.brand}>
              <InputLabel>Brand</InputLabel>
              <Select
                {...field}
                value={value}
                input={<OutlinedInput label="Brand" />}
                disabled={brandsLoading}
              >
                {brands.map((b) => (
                  <MenuItem key={b.id} value={b.id}>
                    {b.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      />

      {/* Colors */}
      <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.colors}>
            <InputLabel>Colors</InputLabel>
            <Select
              multiple
              value={field.value}
              onChange={field.onChange}
              input={<OutlinedInput label="Colors" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((color) => (
                    <Chip key={color} label={color} />
                  ))}
                </Box>
              )}
            >
              {availableColors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      {/* Image Cover */}
      <Controller
        name="imageCover"
        control={control}
        render={({ field }) => (
          <Box mt={2}>
            <Typography fontWeight={600}>Image Cover</Typography>
            {coverPreview ? (
              <Box sx={{ position: 'relative', width: 150, mt: 1 }}>
                <img src={coverPreview} alt="cover" style={{ width: '100%', borderRadius: 8 }} />
                <IconButton
                  onClick={() => {
                    setCoverPreview(null);
                    field.onChange(undefined);
                  }}
                  sx={{ position: 'absolute', top: 4, right: 4, color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                Upload Cover
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    if (file) setCoverPreview(URL.createObjectURL(file));
                  }}
                />
              </Button>
            )}
          </Box>
        )}
      />

      {/* Images */}
      <Controller
        name="images"
        control={control}
        render={({ field }) => (
          <Box mt={3}>
            <Typography fontWeight={600}>Product Images (max 5)</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" mt={1}>
              {imagesPreview.map((img, i) => (
                <Box key={i} sx={{ position: 'relative' }}>
                  <img
                    src={typeof img === 'string' ? img : URL.createObjectURL(img as File)}
                    alt={`product-${i}`}
                    style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
                  />
                  <IconButton
                    onClick={() => {
                      const updated = imagesPreview.filter((_, idx) => idx !== i);
                      setImagesPreview(updated);
                      field.onChange(updated.filter((f) => f instanceof File));
                    }}
                    sx={{ position: 'absolute', top: 4, right: 4, color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              {imagesPreview.length < 5 && (
                <Button variant="outlined" component="label" sx={{ width: 120, height: 120 }}>
                  +
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const newFiles = [
                        ...watchImages.filter((f) => f instanceof File),
                        ...files,
                      ].slice(0, 5);
                      setImagesPreview(newFiles);
                      field.onChange(newFiles);
                    }}
                  />
                </Button>
              )}
            </Stack>
          </Box>
        )}
      />

      {/* Submit */}
      <Button type="submit" variant="contained" disabled={isSubmitting || isLoading} sx={{ mt: 3 }}>
        {isSubmitting || isLoading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
      </Button>
    </Box>
  );
}
