import { useMutation } from '@tanstack/react-query';
import type {
  ApiRequest,
  ServerError,
  queryCategory,
  Service,
} from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

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
  list?: Service[];
  paging?: CategoryPaging;
}

const useGetCategoriesApi = (
  options?: Omit<
    UseMutationOptions<
      CategoryListResponse,
      ServerError,
      ApiRequest<CategoryListBody>
    >,
    'mutationFn'
  >,
) =>
  useMutation<CategoryListResponse, ServerError, ApiRequest<CategoryListBody>>({
    mutationFn: request => queryCategory.getCategories(request),
    ...(options ?? {}),
  });

export default useGetCategoriesApi;
