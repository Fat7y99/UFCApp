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

interface CategoryListResponse {
  list?: Category[];
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
