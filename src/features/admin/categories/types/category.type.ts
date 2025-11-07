export interface PaginatedCategoriesResponse {
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
  data: Category[];
}

export interface CategoryResponse {
  data: Category;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  imageUrl?: string;
  _optimistic?: boolean;
}

export interface CreateCategoryDto {
  name: string;
  image: FileList | null;
}

export type CreateCategoryFormPayload = FormData;

export interface UpdateCategoryDto {
  id?: string;
  name?: string;
  image?: FileList | null;
}
