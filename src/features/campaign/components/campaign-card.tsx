'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CampaignSummary } from '../lib/dto';
import { format, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MapPin, Calendar, Users, Building2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CampaignCardProps {
  campaign: CampaignSummary;
}

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const endDate = new Date(campaign.recruitmentEndDate);
  const today = new Date();
  const daysLeft = differenceInDays(endDate, today);
  const formattedEndDate = format(endDate, 'MM월 dd일', { locale: ko });

  // D-Day 색상 및 상태 결정
  const getDDayInfo = () => {
    if (daysLeft < 0) {
      return { text: '마감', color: 'text-gray-500', bgColor: 'bg-gray-100' };
    } else if (daysLeft === 0) {
      return { text: 'D-Day', color: 'text-red-600', bgColor: 'bg-red-50' };
    } else if (daysLeft <= 3) {
      return { text: `D-${daysLeft}`, color: 'text-red-600', bgColor: 'bg-red-50' };
    } else if (daysLeft <= 7) {
      return { text: `D-${daysLeft}`, color: 'text-orange-600', bgColor: 'bg-orange-50' };
    } else {
      return { text: `D-${daysLeft}`, color: 'text-blue-600', bgColor: 'bg-blue-50' };
    }
  };

  const dDayInfo = getDDayInfo();

  // 예시 이미지 처리
  const imageUrl = campaign.thumbnail || `https://picsum.photos/400/300?random=${campaign.id}`;

  return (
    <Link href={`/campaign/${campaign.id}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
        <CardHeader className="p-0">
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-gray-100">
            <img
              src={imageUrl}
              alt={campaign.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://picsum.photos/400/300?random=${Math.random()}`;
              }}
            />
            {/* D-Day 배지 */}
            <div className={cn(
              "absolute top-3 right-3 px-3 py-1 rounded-full font-bold text-sm shadow-lg",
              dDayInfo.bgColor,
              dDayInfo.color
            )}>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {dDayInfo.text}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {campaign.category}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <MapPin className="w-3 h-3" />
              {campaign.location}
            </Badge>
          </div>

          <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {campaign.title}
          </CardTitle>

          {/* 광고주 정보 추가 */}
          {campaign.businessName && (
            <div className="flex items-center gap-1 mb-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4" />
              <span className="truncate">{campaign.businessName}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedEndDate} 마감</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="font-medium">
                {campaign.applicationCount}/{campaign.recruitmentCount}명
              </span>
            </div>
          </div>

          {/* 혜택 미리보기 (선택사항) */}
          {campaign.benefits && (
            <div className="mt-3 p-2 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-600 line-clamp-2">
                🎁 {campaign.benefits}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {campaign.status === 'recruiting' && daysLeft >= 0 && (
            <Badge className="w-full justify-center bg-primary hover:bg-primary/90">
              지원 가능
            </Badge>
          )}
          {campaign.status === 'closed' || daysLeft < 0 && (
            <Badge variant="secondary" className="w-full justify-center">
              모집종료
            </Badge>
          )}
          {campaign.status === 'selection_complete' && (
            <Badge variant="outline" className="w-full justify-center">
              선정완료
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};