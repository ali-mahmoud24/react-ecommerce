import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../schema/product.schema';
import type { ProductFormData } from '../schema/product.schema';
import { useBrands } from '../hooks/useBrands';
import { useCategories } from '../hooks/useCategories';
import { useCreateProductMutation } from '../hooks/useProducts';

import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  Stack,
  IconButton,
  Typography,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductForm() {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      priceAfterDiscount: 0,
      quantity: 0,
      category: '',
      brand: '',
      colors: [],
      imageCover: undefined,
      images: [],
    },
  });

  const { mutate, isPending, isError, isSuccess } = useCreateProductMutation();
  const { data: brands = [], isLoading: brandsLoading } = useBrands();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const images = watch('images') || [];
  const imageCover = watch('imageCover');

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setValue('images', updated);
  };

  const handleRemoveCover = () => setValue('imageCover', undefined);

  const onSubmit = async (values: ProductFormData) => {
    const formData = new FormData();

    // Image Cover
    if (values.imageCover && values.imageCover instanceof File) {
      formData.append('imageCover', values.imageCover);
    }

    // Product Images (array)
    values.images?.forEach((file) => {
      if (file instanceof File) formData.append('images', file);
    });

    // Colors
    values.colors?.forEach((color) => formData.append('colors', color));
    console.log('imageCover:', values.imageCover, values.imageCover instanceof File);
    console.log(
      'images:',
      values.images,
      values.images.every((img) => img instanceof File),
    );

    // Other fields
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', String(values.price));
    formData.append('priceAfterDiscount', String(values.priceAfterDiscount));
    formData.append('quantity', String(values.quantity));
    formData.append('category', values.category);
    formData.append('brand', values.brand);

    mutate(formData);
  };

  const availableColors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
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
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select
              {...field}
              value={field.value || ''}
              input={<OutlinedInput label="Category" />}
              disabled={categoriesLoading}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {cat.imageUrl && (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        style={{ width: 24, height: 24, borderRadius: '50%' }}
                      />
                    )}
                    {cat.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography variant="caption" color="error">
                {errors.category.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Brand */}
      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.brand}>
            <InputLabel>Brand</InputLabel>
            <Select
              {...field}
              value={field.value || ''}
              input={<OutlinedInput label="Brand" />}
              disabled={brandsLoading}
            >
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {brand.imageUrl && (
                      <img
                        src={brand.imageUrl}
                        alt={brand.name}
                        style={{ width: 24, height: 24, borderRadius: '50%' }}
                      />
                    )}
                    {brand.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {errors.brand && (
              <Typography variant="caption" color="error">
                {errors.brand.message}
              </Typography>
            )}
          </FormControl>
        )}
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
                  {(selected as string[]).map((color) => (
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
            {errors.colors && (
              <Typography variant="caption" color="error">
                {errors.colors.message}
              </Typography>
            )}
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
            {field.value ? (
              <Box sx={{ position: 'relative', width: 150, mt: 1 }}>
                <img
                  src={URL.createObjectURL(field.value)}
                  alt="cover"
                  style={{ width: '100%', borderRadius: 8 }}
                />
                <IconButton
                  onClick={() => field.onChange(undefined)}
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
                    if (file) field.onChange(file);
                  }}
                />
              </Button>
            )}
            {errors.imageCover?.message && (
              <Typography variant="caption" color="error">
                {String(errors.imageCover.message)}
              </Typography>
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
              {field.value?.map((img, i) => (
                <Box key={i} sx={{ position: 'relative' }}>
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`product-${i}`}
                    style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
                  />
                  <IconButton
                    onClick={() => field.onChange(field.value.filter((_, idx) => idx !== i))}
                    sx={{ position: 'absolute', top: 4, right: 4, color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              {(!field.value || field.value.length < 5) && (
                <Button variant="outlined" component="label" sx={{ width: 120, height: 120 }}>
                  +
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      field.onChange([...field.value, ...files].slice(0, 5));
                    }}
                  />
                </Button>
              )}
            </Stack>
            {errors.images && (
              <Typography variant="caption" color="error">
                {errors.images.message}
              </Typography>
            )}
          </Box>
        )}
      />

      {/* Submit */}
      <Button type="submit" variant="contained" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Product'}
      </Button>

      {isSuccess && <Alert severity="success">Product added!</Alert>}
      {isError && <Alert severity="error">Failed to add product</Alert>}
    </Box>
  );
}
