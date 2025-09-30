import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/remote/api-client';
import { useToast } from '@/hooks/use-toast';
import type { CreateApplicationRequest, CreateApplicationResponse } from '../lib/dto';

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateApplicationRequest) => {
      const response = await apiClient.post<CreateApplicationResponse>('/api/applications', data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: '지원 완료',
        description: '체험단 지원이 완료되었습니다.',
      });

      queryClient.invalidateQueries({ queryKey: ['applications'] });

      router.push('/my-applications');
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : '지원 중 오류가 발생했습니다.';

      toast({
        title: '지원 실패',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
};