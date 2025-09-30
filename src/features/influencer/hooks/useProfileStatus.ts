import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/remote/api-client';

export interface ProfileStatusResponse {
  exists: boolean;
}

export const useProfileStatus = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['influencer', 'profile', 'status'],
    queryFn: async () => {
      const response = await apiClient.get<ProfileStatusResponse>('/api/influencer/profile/status');
      return response.data;
    },
    enabled,
    staleTime: 60000,
  });
};