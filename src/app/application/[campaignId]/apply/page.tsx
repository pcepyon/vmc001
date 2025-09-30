'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ApplyForm } from '@/features/application/components/apply-form';
import { useCampaignDetail } from '@/features/campaign/hooks/useCampaignDetail';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useApplicationCheck } from '@/features/application/hooks/useApplicationCheck';
import { useProfileStatus } from '@/features/influencer/hooks/useProfileStatus';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApplyPageProps {
  params: Promise<{ campaignId: string }>;
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const { campaignId } = use(params);
  const router = useRouter();

  const { user, isAuthenticated, isLoading: authLoading } = useCurrentUser();
  const { data: campaign, isLoading: campaignLoading, error: campaignError } = useCampaignDetail(campaignId);
  const { data: applicationCheck, isLoading: checkLoading } = useApplicationCheck(
    campaignId,
    isAuthenticated,
  );

  const isInfluencer = user?.role === 'influencer';
  const { data: profileStatus, isLoading: profileLoading } = useProfileStatus(
    isAuthenticated && isInfluencer,
  );

  useEffect(() => {
    if (authLoading || campaignLoading || checkLoading || (isInfluencer && profileLoading)) {
      return;
    }

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (user?.role === 'advertiser') {
      router.replace('/');
      return;
    }

    if (profileStatus && !profileStatus.exists) {
      router.replace('/influencer/profile/create');
      return;
    }

    if (applicationCheck?.applied) {
      router.replace('/my-applications');
      return;
    }

    if (campaign && campaign.status !== 'recruiting') {
      router.replace(`/campaign/${campaignId}`);
      return;
    }
  }, [
    isAuthenticated,
    user,
    profileStatus,
    applicationCheck,
    campaign,
    campaignId,
    router,
    authLoading,
    campaignLoading,
    checkLoading,
    profileLoading,
    isInfluencer,
  ]);

  if (authLoading || campaignLoading || checkLoading || (isInfluencer && profileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (campaignError || !campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">체험단을 찾을 수 없습니다.</p>
        <Button onClick={() => router.push('/')} variant="outline">
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>체험단 지원</CardTitle>
            <p className="text-sm text-muted-foreground">{campaign.title}</p>
          </CardHeader>
          <CardContent>
            <ApplyForm campaignId={campaignId} campaign={campaign} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}