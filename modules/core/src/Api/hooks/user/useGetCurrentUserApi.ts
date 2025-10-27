import { useQuery } from '@tanstack/react-query';
import { default as Config } from 'react-native-config';
import { fakerUser, queryUser } from '@modules/core';
import type { User, ServerError } from '@modules/core';
import type { UseQueryOptions } from '@tanstack/react-query';

const useGetCurrentUserApi = (
  options?: Omit<UseQueryOptions<User, ServerError>, 'queryFn' | 'queryKey'>,
) =>
  useQuery<User, ServerError>({
    queryFn: () =>
      Config.USE_FAKE_API === 'true'
        ? fakerUser.getUserDetails() // Fallback to existing faker
        : queryUser.getCurrentUser(),
    queryKey: ['user', 'current'],
    ...(options ?? {}),
  });

export default useGetCurrentUserApi;
