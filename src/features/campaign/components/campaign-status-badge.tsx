'use client';

import { Badge } from '@/components/ui/badge';

type CampaignStatus = 'recruiting' | 'closed' | 'selection_complete';

const STATUS_CONFIG: Record<CampaignStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  recruiting: { label: '모집중', variant: 'default' },
  closed: { label: '모집종료', variant: 'secondary' },
  selection_complete: { label: '선정완료', variant: 'outline' },
};

interface CampaignStatusBadgeProps {
  status: CampaignStatus;
}

export const CampaignStatusBadge = ({ status }: CampaignStatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};