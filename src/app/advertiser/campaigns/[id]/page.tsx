'use client';

import { use, useEffect } from 'react';
import { useCampaignDetail } from '@/features/campaign/hooks/useCampaignDetail';
import { useCampaignApplicants } from '@/features/application/hooks/useCampaignApplicants';
import { CampaignManagementView } from '@/features/campaign/components/campaign-management-view';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignManagementPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { session, isLoading: authLoading } = useSupabaseAuth();

  const { data: campaign, isLoading: campaignLoading } = useCampaignDetail(resolvedParams.id);
  const { data: applicantsData, isLoading: applicantsLoading } = useCampaignApplicants(resolvedParams.id);

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login');
    }
  }, [authLoading, session, router]);

  if (authLoading || campaignLoading || applicantsLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!campaign) {
    return (
      <div className="container mx-auto py-8">
        <p>체험단을 찾을 수 없습니다.</p>
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