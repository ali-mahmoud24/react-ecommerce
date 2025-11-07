export interface PaginatedBrandsResponse {
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
  data: Brand[];
}

export interface BrandResponse {
  data: Brand;
}

export interface Brand {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  imageUrl?: string;
  _optimistic?: boolean;
}

export interface CreateBrandDto {
  name: string;
  image: FileList | null;
}

export type CreateBrandFormPayload = FormData;

export interface UpdateBrandDto {
  id?: string;
  name?: string;
  image?: FileList | null;
}
