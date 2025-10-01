'use client';

import { useState } from 'react';
import { useMyApplications } from '@/features/application/hooks/useMyApplications';
import { ApplicationFilter } from '@/features/application/components/application-filter';
import { ApplicationList } from '@/features/application/components/application-list';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';
import { useUserRole } from '@/features/auth/hooks/useUserRole';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type StatusFilter = 'all' | 'applied' | 'selected' | 'rejected';

export default function MyApplicationsPage() {
  const router = useRouter();
  const { session, isLoading: authLoading } = useSupabaseAuth();
  const { data: userInfo, isLoading: roleLoading } = useUserRole();
  const [status, setStatus] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useMyApplications({
    status,
    page,
    limit: 20,
  });

  // 디버깅: 권한 확인
  useEffect(() => {
    console.log('[내 지원목록] 권한 확인:', {
      session: !!session,
      userInfo,
      role: userInfo?.role,
    });
  }, [session, userInfo]);

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login');
    }
  }, [authLoading, session, router]);

  if (authLoading || roleLoading) {
    return (
      <div className="container mx-auto py-8">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // 광고주가 접근한 경우
  if (userInfo?.role === 'advertiser') {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Card className="mb-4 border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800">
              이 페이지는 인플루언서만 이용할 수 있습니다.
            </p>
          </CardContent>
        </Card>
        <Button
          onClick={() => router.push('/advertiser/campaigns')}
        >
          체험단 관리로 이동
        </Button>
      </div>
    );
  }

  const totalPages = data?.pagination ? Math.ceil(data.pagination.total / data.pagination.limit) : 1;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">내 지원 목록</h1>

      <div className="space-y-6">
        <ApplicationFilter value={status} onChange={(value) => { setStatus(value); setPage(1); }} />

        <ApplicationList
          applications={data?.applications || []}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
        />

        {/* 페이지네이션 */}
        {data && data.pagination.total > 20 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              이전
            </Button>
            <span className="flex items-center px-4 text-sm">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              다음
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}