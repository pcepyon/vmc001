'use client';

import { use, useEffect } from 'react';
import { useCampaignDetail } from '@/features/campaign/hooks/useCampaignDetail';
import { useCampaignApplicants } from '@/features/application/hooks/useCampaignApplicants';
import { CampaignManagementView } from '@/features/campaign/components/campaign-management-view';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';
import { useUserRole } from '@/features/auth/hooks/useUserRole';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignManagementPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { session, isLoading: authLoading } = useSupabaseAuth();
  const { data: userInfo, isLoading: roleLoading } = useUserRole();

  const { data: campaign, isLoading: campaignLoading } = useCampaignDetail(resolvedParams.id);
  const { data: applicantsData, isLoading: applicantsLoading } = useCampaignApplicants(resolvedParams.id);

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login');
    }
  }, [authLoading, session, router]);

  if (authLoading || roleLoading || campaignLoading || applicantsLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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

  if (!campaign) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="mb-4 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-800">
              체험단을 찾을 수 없습니다.
            </p>
          </CardContent>
        </Card>
        <Button
          onClick={() => router.push('/advertiser/campaigns')}
        >
          체험단 목록으로 이동
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <CampaignManagementView
        campaign={campaign}
        applicants={applicantsData?.applicants || []}
      />
    </div>
  );
}