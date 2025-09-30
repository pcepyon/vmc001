'use client';

import { use } from 'react';
import { CampaignDetailView } from '@/features/campaign/components/campaign-detail-view';
import { useCampaignDetail } from '@/features/campaign/hooks/useCampaignDetail';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CampaignDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: campaign, isLoading, error } = useCampaignDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !campaign) {
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
      <div className="mx-auto max-w-4xl px-4 py-8">
        <CampaignDetailView campaign={campaign} />
      </div>
    </main>
  );
}