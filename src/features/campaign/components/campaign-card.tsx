'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CampaignSummary } from '../lib/dto';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MapPin, Calendar, Users } from 'lucide-react';

interface CampaignCardProps {
  campaign: CampaignSummary;
}

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const endDate = format(new Date(campaign.recruitmentEndDate), 'MM월 dd일', { locale: ko });

  return (
    <Link href={`/campaign/${campaign.id}`}>
      <Card className="h-full transition-all hover:shadow-lg cursor-pointer">
        <CardHeader className="p-0">
          {campaign.thumbnail && (
            <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
              <img
                src={campaign.thumbnail}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{campaign.category}</Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {campaign.location}
            </Badge>
          </div>
          <CardTitle className="text-lg mb-2 line-clamp-2">{campaign.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{endDate} 마감</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{campaign.applicationCount}/{campaign.recruitmentCount}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {campaign.status === 'recruiting' && (
            <Badge className="w-full justify-center">모집중</Badge>
          )}
          {campaign.status === 'closed' && (
            <Badge variant="secondary" className="w-full justify-center">모집종료</Badge>
          )}
          {campaign.status === 'selection_complete' && (
            <Badge variant="outline" className="w-full justify-center">선정완료</Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};