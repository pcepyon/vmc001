'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CampaignStatusBadge } from './campaign-status-badge';
import type { MyCampaignItem } from '../lib/dto';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';

interface MyCampaignCardProps {
  campaign: MyCampaignItem;
}

export const MyCampaignCard = ({ campaign }: MyCampaignCardProps) => {
  return (
    <Link href={`/advertiser/campaigns/${campaign.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{campaign.title}</CardTitle>
            <CardDescription className="mt-1">
              {campaign.category} · {campaign.location}
            </CardDescription>
          </div>
          <CampaignStatusBadge status={campaign.status} />
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">모집기간:</span>{' '}
              {format(new Date(campaign.recruitmentStartDate), 'PPP', { locale: ko })} -{' '}
              {format(new Date(campaign.recruitmentEndDate), 'PPP', { locale: ko })}
            </div>
            <div>
              <span className="font-medium">모집인원:</span> {campaign.recruitmentCount}명
            </div>
            <div>
              <span className="font-medium">지원자:</span> {campaign.applicationCount}명
            </div>
            <div>
              <span className="font-medium">등록일:</span>{' '}
              {format(new Date(campaign.createdAt), 'PPP', { locale: ko })}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};