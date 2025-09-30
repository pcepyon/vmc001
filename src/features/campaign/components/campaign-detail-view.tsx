'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ApplyButtonGuard } from './apply-button-guard';
import type { CampaignDetail } from '../lib/dto';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, MapPin, Users, Gift, Info, CheckSquare } from 'lucide-react';

interface CampaignDetailViewProps {
  campaign: CampaignDetail;
}

export const CampaignDetailView = ({ campaign }: CampaignDetailViewProps) => {
  const startDate = format(new Date(campaign.recruitmentStartDate), 'yyyy년 MM월 dd일', { locale: ko });
  const endDate = format(new Date(campaign.recruitmentEndDate), 'yyyy년 MM월 dd일', { locale: ko });

  return (
    <div className="space-y-6">
      <div>
        {campaign.images && campaign.images.length > 0 && (
          <div className="relative w-full h-96 overflow-hidden rounded-lg mb-4">
            <img
              src={campaign.images[0]}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{campaign.category}</Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {campaign.location}
          </Badge>
          {campaign.status === 'recruiting' && <Badge>모집중</Badge>}
          {campaign.status === 'closed' && <Badge variant="secondary">모집종료</Badge>}
          {campaign.status === 'selection_complete' && <Badge variant="outline">선정완료</Badge>}
        </div>

        <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{startDate} ~ {endDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>모집인원: {campaign.applicationCount}/{campaign.recruitmentCount}명</span>
          </div>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            제공 혜택
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{campaign.benefits}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5" />
            미션
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{campaign.mission}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            매장 정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{campaign.storeInfo}</p>
        </CardContent>
      </Card>

      <div className="sticky bottom-4 z-10">
        <ApplyButtonGuard campaignId={campaign.id} campaign={campaign} />
      </div>
    </div>
  );
};