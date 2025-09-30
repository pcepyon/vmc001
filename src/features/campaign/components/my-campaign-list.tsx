'use client';

import { MyCampaignCard } from './my-campaign-card';
import type { MyCampaignItem } from '../lib/dto';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface MyCampaignListProps {
  campaigns: MyCampaignItem[];
  isLoading: boolean;
  error?: Error | null;
  onRetry?: () => void;
  onCreateNew: () => void;
}

export const MyCampaignList = ({ campaigns, isLoading, error, onRetry, onCreateNew }: MyCampaignListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-destructive">목록을 불러오는데 실패했습니다.</p>
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
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-muted-foreground">아직 등록한 체험단이 없습니다.</p>
        <Button onClick={onCreateNew}>
          체험단 등록하기
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {campaigns.map((campaign) => (
        <MyCampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};