import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, extractApiErrorMessage } from '@/lib/remote/api-client';
import type { SelectApplicantsRequest, SelectApplicantsResponse } from '../lib/dto';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';
import { toast } from 'sonner';

export const useSelectApplicants = (campaignId: string) => {
  const { session } = useSupabaseAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SelectApplicantsRequest) => {
      const token = session?.access_token;

      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await apiClient.post<SelectApplicantsResponse>(
        `/api/campaigns/${campaignId}/select`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`${data.selectedCount}명 선정, ${data.rejectedCount}명 반려되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', campaignId, 'applicants'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns', 'my'] });
    },
    onError: (error) => {
      const message = extractApiErrorMessage(error, '지원자 선정에 실패했습니다.');
      toast.error(message);
    },
  });
};