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
      if (!session?.access_token) {
        throw new Error('No access token');
      }

      console.log('[useUserRole] Fetching with token:', session.access_token.substring(0, 20) + '...');

      const response = await apiClient.get<{ ok: boolean; data: UserInfo }>('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('[useUserRole] Full Response:', response.data);

      // API 응답에서 실제 데이터 추출
      if (response.data.ok && response.data.data) {
        console.log('[useUserRole] Extracted user data:', response.data.data);
        return response.data.data;
      }

      throw new Error('Failed to get user info');
    },
    enabled: !!session?.access_token, // access_token이 있을 때만 실행
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
};