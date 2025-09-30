import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/remote/api-client';
import type { ApplicantsResponse } from '../lib/dto';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';

export const useCampaignApplicants = (campaignId: string) => {
  const { session } = useSupabaseAuth();

  return useQuery({
    queryKey: ['campaigns', campaignId, 'applicants'],
    queryFn: async () => {
      const token = session?.access_token;

      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await apiClient.get<ApplicantsResponse>(
        `/api/campaigns/${campaignId}/applicants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    enabled: !!session && !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
};