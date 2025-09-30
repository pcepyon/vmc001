'use client';

import { useState } from 'react';
import { useMyCampaigns } from '@/features/campaign/hooks/useMyCampaigns';
import { MyCampaignList } from '@/features/campaign/components/my-campaign-list';
import { CreateCampaignDialog } from '@/features/campaign/components/create-campaign-dialog';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CampaignsManagementPage() {
  const router = useRouter();
  const { session, isLoading: authLoading } = useSupabaseAuth();
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useMyCampaigns({
    page,
    limit: 20,
  });

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login');
    }
  }, [authLoading, session, router]);

  if (authLoading) {
    return (
      <div className="container mx-auto py-8">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">체험단 관리</h1>
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

      <CreateCampaignDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}