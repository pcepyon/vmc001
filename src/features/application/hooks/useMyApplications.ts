import { useQuery } from '@tanstack/react-query';
import { apiClient, extractApiErrorMessage } from '@/lib/remote/api-client';
import type { MyApplicationsQuery, MyApplicationsResponse } from '../lib/dto';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';

export const useMyApplications = (query: MyApplicationsQuery) => {
  const { session } = useSupabaseAuth();

  return useQuery({
    queryKey: ['applications', 'my', session?.user?.id, query], // 사용자 ID를 queryKey에 추가
    queryFn: async () => {
      if (!session) {
        throw new Error('로그인이 필요합니다.');
      }

      // apiClient 인터셉터가 자동으로 토큰을 추가하므로 중복 제거
      const response = await apiClient.get<MyApplicationsResponse>('/api/applications/my', {
        params: query,
      });

      return response.data;
    },
    enabled: !!session,
    staleTime: 1000 * 60 * 5,
  });
};