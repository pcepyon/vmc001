import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, extractApiErrorMessage } from '@/lib/remote/api-client';
import type { CreateCampaignRequest, CreateCampaignResponse } from '../lib/dto';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';
import { toast } from 'sonner';

export const useCreateCampaign = () => {
  const { session } = useSupabaseAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCampaignRequest) => {
      const token = session?.access_token;

      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await apiClient.post<CreateCampaignResponse>('/api/campaigns', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success('체험단이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['campaigns', 'my'] });
    },
    onError: (error) => {
      const message = extractApiErrorMessage(error, '체험단 등록에 실패했습니다.');
      toast.error(message);
    },
  });
};