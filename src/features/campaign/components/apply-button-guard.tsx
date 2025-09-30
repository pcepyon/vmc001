'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useApplicationCheck } from '@/features/application/hooks/useApplicationCheck';
import { useProfileStatus } from '@/features/influencer/hooks/useProfileStatus';
import type { CampaignDetail } from '../lib/dto';
import { Loader2 } from 'lucide-react';
import { match } from 'ts-pattern';

interface ApplyButtonGuardProps {
  campaignId: string;
  campaign: CampaignDetail;
}

export const ApplyButtonGuard = ({ campaignId, campaign }: ApplyButtonGuardProps) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useCurrentUser();

  const { data: applicationCheck, isLoading: checkLoading } = useApplicationCheck(
    campaignId,
    isAuthenticated,
  );

  const isInfluencer = user?.role === 'influencer';

  const { data: profileStatus, isLoading: profileLoading } = useProfileStatus(
    isAuthenticated && isInfluencer,
  );

  if (authLoading || (isAuthenticated && checkLoading) || (isInfluencer && profileLoading)) {
    return (
      <Button disabled className="w-full">
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        확인 중...
      </Button>
    );
  }

  return match({ isAuthenticated, user, applicationCheck, profileStatus, campaign })
    .with({ isAuthenticated: false }, () => (
      <Button onClick={() => router.push('/login')} className="w-full">
        로그인 후 지원하기
      </Button>
    ))
    .with({ user: { role: 'advertiser' } }, () => (
      <div className="text-center p-4 bg-muted rounded-md">
        <p className="text-sm text-muted-foreground">광고주는 체험단에 지원할 수 없습니다.</p>
      </div>
    ))
    .with({ applicationCheck: { applied: true } }, () => (
      <div className="space-y-2">
        <div className="text-center p-4 bg-muted rounded-md">
          <p className="text-sm font-medium">이미 지원한 체험단입니다.</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/my-applications')} className="w-full">
          내 지원 목록 보기
        </Button>
      </div>
    ))
    .with({ profileStatus: { exists: false } }, () => (
      <div className="space-y-2">
        <div className="text-center p-4 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground">프로필 등록 후 지원 가능합니다.</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/influencer/profile/create')} className="w-full">
          프로필 등록하기
        </Button>
      </div>
    ))
    .when(
      () => campaign.status !== 'recruiting',
      () => (
        <div className="text-center p-4 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground">모집이 종료되었습니다.</p>
        </div>
      ),
    )
    .when(
      () => new Date(campaign.recruitmentEndDate) < new Date(),
      () => (
        <div className="text-center p-4 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground">모집 기간이 종료되었습니다.</p>
        </div>
      ),
    )
    .otherwise(() => (
      <Button onClick={() => router.push(`/application/${campaignId}/apply`)} className="w-full">
        지원하기
      </Button>
    ));
};