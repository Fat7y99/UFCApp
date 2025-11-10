import type { ApiRequest } from '@modules/core';
import { httpClient } from '@modules/core';

export interface GetMediaParams {
  path: string;
  thumb?: string;
  width?: number;
}

export type GetMediaResponse = string[];

const queryMedia = {
  /**
   * Get media URL from path
   * @param request - Request with query parameters: path (required), thumb (optional), width (optional)
   * @returns Promise with array of media URLs
   */
  getMedia: (
    request: ApiRequest<void, GetMediaParams>,
  ): Promise<GetMediaResponse> => {
    const params: Record<string, string | number> = {
      path: request.params?.path || '',
    };

    if (request.params?.thumb) {
      params.thumb = request.params.thumb;
    }

    if (request.params?.width !== undefined) {
      params.width = request.params.width;
    }

    return httpClient
      .get<GetMediaResponse>('/api/media', { params })
      .then(response => response.data);
  },
};

export default queryMedia;
