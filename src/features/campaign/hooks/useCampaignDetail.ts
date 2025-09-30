import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/remote/api-client';
import type { CampaignDetail } from '../lib/dto';

export const useCampaignDetail = (id: string) => {
  return useQuery({
    queryKey: ['campaigns', 'detail', id],
    queryFn: async () => {
      const response = await apiClient.get<CampaignDetail>(`/api/campaigns/${id}`);
      return response.data;
    },
    staleTime: 30000,
    enabled: !!id,
  });
};