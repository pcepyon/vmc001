import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/remote/api-client';
import type { CampaignListQuery, CampaignListResponse } from '../lib/dto';

export const useCampaignList = (query: Partial<CampaignListQuery> = {}) => {
  return useQuery({
    queryKey: ['campaigns', 'list', query],
    queryFn: async () => {
      const response = await apiClient.get<CampaignListResponse>('/api/campaigns', {
        params: query,
      });
      return response.data;
    },
    staleTime: 30000,
  });
};