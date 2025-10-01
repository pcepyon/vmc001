import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/remote/api-client';
import type { MyCampaignsQuery, MyCampaignsResponse } from '../lib/dto';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';

export const useMyCampaigns = (query: MyCampaignsQuery) => {
  const { session } = useSupabaseAuth();

  return useQuery({
    queryKey: ['campaigns', 'my', query],
    queryFn: async () => {
      const token = session?.access_token;

      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      try {
        const response = await apiClient.get<MyCampaignsResponse>('/api/campaigns/my', {
          params: query,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error: any) {
        console.error('[useMyCampaigns] API Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });

        // 더 자세한 에러 정보 출력
        if (error.response?.data?.error) {
          console.error('[useMyCampaigns] Error details:', error.response.data.error);
        }

        throw error;
      }
    },
    enabled: !!session,
    staleTime: 1000 * 60 * 5,
  });
};