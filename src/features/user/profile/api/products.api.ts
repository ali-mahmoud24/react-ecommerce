import http from '@/lib/axios';

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  sold: number;
  colors: string[];
  imageCover: string;
  imageCoverUrl?: string;
  images: string[];
  imageUrls?: string[];
  category: {
    id: string;
    name: string;
  };
  brand?: {
    id: string;
    name: string;
  };
  averageRating?: number;
  numOfRatings: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductRequest = {
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  colors: string[];
  category: string;
  brand?: string;
  imageCover?: File;
  images?: File[];
};

export type UpdateProductRequest = Partial<CreateProductRequest>;

export async function getProductsApi(): Promise<{ data: Product[] }> {
  const { data } = await http.get<{ data: Product[] }>('/products');
  return data;
}

export async function getProductApi(productId: string): Promise<{ data: Product }> {
  const { data } = await http.get<{ data: Product }>(`/products/${productId}`);
  return data;
}

export async function createProductApi(
  productData: CreateProductRequest,
): Promise<{ data: Product }> {
  const formData = new FormData();

  // Append all product data to formData
  Object.entries(productData).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'colors' && Array.isArray(value)) {
        value.forEach((color) => formData.append('colors', color));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  const { data } = await http.post<{ data: Product }>('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function updateProductApi(
  productId: string,
  productData: UpdateProductRequest,
): Promise<{ data: Product }> {
  const formData = new FormData();

  Object.entries(productData).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'colors' && Array.isArray(value)) {
        value.forEach((color) => formData.append('colors', color));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  const { data } = await http.put<{ data: Product }>(`/products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function deleteProductApi(productId: string): Promise<void> {
  await http.delete(`/products/${productId}`);
}
