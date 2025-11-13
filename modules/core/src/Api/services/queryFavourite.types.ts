import type { User, Service } from '@modules/core';

export interface FavouriteItem {
  id?: number;
  user?: User & {
    imageUrl?: string;
  };
  service?: Service;
  favourite?: boolean;
  lastUpdate?: string;
}

export interface FavouriteListRequestBody {
  pageNumber: string;
  pageSize: string;
}

export interface FavouriteListPaging {
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
}

export interface FavouriteListResponse {
  list?: FavouriteItem[];
  paging?: FavouriteListPaging;
}

export interface FavouriteResponse {
  success?: boolean;
  message?: string;
  // Add other fields as needed based on API response
}

