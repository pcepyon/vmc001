'use client';

import { CampaignCard } from './campaign-card';
import type { CampaignSummary } from '../lib/dto';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CampaignListProps {
  campaigns: CampaignSummary[];
  isLoading: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export const CampaignList = ({ campaigns, isLoading, error, onRetry }: CampaignListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-muted-foreground">체험단 목록을 불러오는 중 오류가 발생했습니다.</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            다시 시도
          </Button>
        )}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">모집 중인 체험단이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};