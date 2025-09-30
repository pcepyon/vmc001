import { useQuery } from '@tanstack/react-query';
import { apiClient, extractApiErrorMessage } from '@/lib/remote/api-client';
import type { MyApplicationsQuery, MyApplicationsResponse } from '../lib/dto';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';

export const useMyApplications = (query: MyApplicationsQuery) => {
  const { session } = useSupabaseAuth();

  return useQuery({
    queryKey: ['applications', 'my', query],
    queryFn: async () => {
      const token = session?.access_token;

      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await apiClient.get<MyApplicationsResponse>('/api/applications/my', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!session,
    staleTime: 1000 * 60 * 5,
  });
};