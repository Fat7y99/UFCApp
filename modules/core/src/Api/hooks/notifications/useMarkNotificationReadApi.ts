import { useQueryClient, useMutation } from '@tanstack/react-query';
import { default as Config } from 'react-native-config';
import { fakerNotifications, queryNotifications } from '@modules/core';
import type {
  MarkNotificationReadResponse,
  ServerError,
  ApiRequest,
} from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useMarkNotificationReadApi = (
  options?: Omit<
    UseMutationOptions<
      MarkNotificationReadResponse,
      ServerError,
      ApiRequest<any, number>
    >,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation<
    MarkNotificationReadResponse,
    ServerError,
    ApiRequest<any, number>
  >({
    mutationFn: request =>
      Config.USE_FAKE_API === 'true'
        ? fakerNotifications.markNotificationRead(request)
        : queryNotifications.markNotificationRead(request),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate both old and new notification query keys
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list-v2'] });
      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...restOptions,
  });
};

export default useMarkNotificationReadApi;
