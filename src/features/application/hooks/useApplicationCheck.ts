import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/remote/api-client';
import type { ApplicationCheckResponse } from '../lib/dto';

export const useApplicationCheck = (campaignId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['applications', 'check', campaignId],
    queryFn: async () => {
      const response = await apiClient.get<ApplicationCheckResponse>('/api/applications/check', {
        params: { campaignId },
      });
      return response.data;
    },
    enabled: enabled && !!campaignId,
    staleTime: 10000,
  });
};