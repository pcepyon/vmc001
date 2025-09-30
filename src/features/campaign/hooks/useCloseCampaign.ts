import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, extractApiErrorMessage } from '@/lib/remote/api-client';
import type { CloseCampaignResponse } from '../lib/dto';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';
import { toast } from 'sonner';

export const useCloseCampaign = (campaignId: string) => {
  const { session } = useSupabaseAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const token = session?.access_token;

      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await apiClient.patch<CloseCampaignResponse>(
        `/api/campaigns/${campaignId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success('모집이 종료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', 'my'] });
    },
    onError: (error) => {
      const message = extractApiErrorMessage(error, '모집 종료에 실패했습니다.');
      toast.error(message);
    },
  });
};