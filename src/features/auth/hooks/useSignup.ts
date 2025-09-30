'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient, extractApiErrorMessage } from '@/lib/remote/api-client';
import type { SignupRequest, SignupResponse } from '../lib/dto';
import { useToast } from '@/hooks/use-toast';

export const useSignup = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: SignupRequest) => {
      const response = await apiClient.post<SignupResponse>(
        '/api/auth/signup',
        data,
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: '회원가입 성공',
        description: '프로필 정보를 등록해주세요',
      });

      // 역할에 따라 리디렉션
      router.push(data.redirectUrl);
    },
    onError: (error) => {
      const message = extractApiErrorMessage(error, '회원가입에 실패했습니다');

      toast({
        title: '회원가입 실패',
        description: message,
        variant: 'destructive',
      });
    },
  });
};