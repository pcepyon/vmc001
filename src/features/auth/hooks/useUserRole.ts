'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/remote/api-client';
import { useSupabaseAuth } from './useSupabaseAuth';

interface UserInfo {
  id: string;
  email: string;
  role: 'influencer' | 'advertiser';
}

export const useUserRole = () => {
  const { session } = useSupabaseAuth();

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await apiClient.get<UserInfo>('/api/auth/me');
      return response.data;
    },
    enabled: !!session, // 세션이 있을 때만 실행
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
};