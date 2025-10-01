'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient, extractApiErrorMessage } from '@/lib/remote/api-client';
import type {
  CreateAdvertiserProfileRequest,
  CreateAdvertiserProfileResponse,
} from '../lib/dto';
import { useToast } from '@/hooks/use-toast';

export const useCreateAdvertiserProfile = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateAdvertiserProfileRequest) => {
      // TODO: 실제 인증 토큰 사용 필요
      // 임시로 세션 스토리지에서 userId 가져오기
      const tempUserId =
        typeof window !== 'undefined'
          ? sessionStorage.getItem('tempUserId')
          : null;

      if (!tempUserId) {
        throw new Error('로그인이 필요합니다');
      }

      const response = await apiClient.post<CreateAdvertiserProfileResponse>(
        '/api/advertiser/profile',
        data,
        {
          headers: {
            'X-User-Id': tempUserId,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: '프로필 등록 성공',
        description: '광고주 프로필이 등록되었습니다',
      });

      router.push('/');
    },
    onError: (error) => {
      const message = extractApiErrorMessage(
        error,
        '프로필 등록에 실패했습니다',
      );

      toast({
        title: '프로필 등록 실패',
        description: message,
        variant: 'destructive',
      });
    },
  });
};