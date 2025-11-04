import type { Category, ApiRequest } from '@modules/core';
import { httpClient } from '@modules/core';

interface PagingRequest {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortType?: 'ASC' | 'DESC';
}

interface CategoryListBody {
  pagingRequest?: PagingRequest;
  searchKey?: string | null;
}

interface CategoryPaging {
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
}

export interface Service {
  id?: number;
  category?: Category;
  code?: string | null;
  nameAr?: string;
  nameEn?: string;
  descriptionAr?: string | null;
  descriptionEn?: string | null;
  requiredPayment?: boolean;
  baseFee?: number | null;
  taxRate?: number | null;
  slaDays?: number | null;
  active?: boolean;
  requiredDocs?: any;
  termsUrl?: string | null;
}

interface CategoryListResponse {
  list?: Service[];
  paging?: CategoryPaging;
}

const queryCategory = {
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  getCategories: (
    request: ApiRequest<CategoryListBody>,
  ): Promise<CategoryListResponse> =>
    httpClient
      .post<CategoryListResponse>('/api/category/list', request.body)
      .then(response => response.data),
};

export default queryCategory;
