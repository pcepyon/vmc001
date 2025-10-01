'use client';

import { useState } from 'react';
import { useMyCampaigns } from '@/features/campaign/hooks/useMyCampaigns';
import { MyCampaignList } from '@/features/campaign/components/my-campaign-list';
import { CreateCampaignDialog } from '@/features/campaign/components/create-campaign-dialog';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';
import { useUserRole } from '@/features/auth/hooks/useUserRole';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CampaignsManagementPage() {
  const router = useRouter();
  const { session, isLoading: authLoading } = useSupabaseAuth();
  const { data: userInfo, isLoading: roleLoading } = useUserRole();
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useMyCampaigns({
    page,
    limit: 20,
  });

  // 디버깅: 권한 확인
  useEffect(() => {
    console.log('[체험단 관리] 권한 확인:', {
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

  // 인플루언서가 접근한 경우
  if (userInfo?.role === 'influencer') {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Card className="mb-4 border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800">
              이 페이지는 광고주만 이용할 수 있습니다.
            </p>
          </CardContent>
        </Card>
        <Button
          onClick={() => router.push('/my-applications')}
        >
          내 지원목록으로 이동
        </Button>
      </div>
    );
  }

  const totalPages = data?.pagination ? Math.ceil(data.pagination.total / data.pagination.limit) : 1;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">체험단 관리</h1>
        <Button onClick={() => setDialogOpen(true)}>
          체험단 등록
        </Button>
      </div>

      <MyCampaignList
        campaigns={data?.campaigns || []}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
        onCreateNew={() => setDialogOpen(true)}
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

      <CreateCampaignDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}