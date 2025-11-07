export interface CategoryRef {
  id: string;
  name: string;
  imageUrl?: string | null;
}

export interface BrandRef {
  id: string;
  name: string;
  imageUrl?: string | null;
}

export interface Product {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  quantity?: number;
  sold?: number;
  price?: number;
  priceAfterDiscount?: number | null;
  colors?: string[];
  imageCover?: string;
  images?: string[];
  category?: CategoryRef | null;
  subcategories?: string[];
  brand?: BrandRef | null;
  averageRating?: number;
  numOfRatings?: number;
  createdAt: string;
  updatedAt?: string;
  imageCoverUrl?: string | null;
  imageUrls?: string[] | null;
  _optimistic?: boolean;
}

export interface ProductResponse {
  data: Product;
}

export interface PaginatedProductsResponse {
  status?: string;
  results: number;
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    totalDocs: number;
    next: number | null;
    previous: number | null;
  };
  data: Product[];
}

export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string; // id
  brand?: string; // id
  colors?: string[];
  imageCover?: FileList | null;
  images?: FileList | null;
}

export interface UpdateProductDto {
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  category?: string;
  brand?: string;
  colors?: string[];
}
