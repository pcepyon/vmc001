'use client';

import { Badge } from '@/components/ui/badge';

type ApplicationStatus = 'applied' | 'selected' | 'rejected';

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  applied: { label: '신청완료', variant: 'default' },
  selected: { label: '선정', variant: 'secondary' },
  rejected: { label: '반려', variant: 'outline' },
};

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

export const ApplicationStatusBadge = ({ status }: ApplicationStatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};