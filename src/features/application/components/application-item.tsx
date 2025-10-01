'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ApplicationStatusBadge } from './application-status-badge';
import type { ApplicationItem } from '../lib/dto';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';

interface ApplicationItemProps {
  application: ApplicationItem;
}

export const ApplicationItemCard = ({ application }: ApplicationItemProps) => {
  return (
    <Link href={`/campaign/${application.campaignId}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-2">
          <div className="flex-1">
            <CardTitle className="text-base sm:text-lg line-clamp-2">{application.campaignTitle}</CardTitle>
            <CardDescription className="mt-1 text-xs sm:text-sm">
              {application.campaignCategory} · {application.campaignLocation}
            </CardDescription>
          </div>
          <ApplicationStatusBadge status={application.status} />
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            <div className="line-clamp-2">
              <span className="font-medium">각오 한마디:</span> {application.message}
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <div>
                <span className="font-medium">방문 예정일:</span>{' '}
                {format(new Date(application.visitDate), 'MM/dd', { locale: ko })}
              </div>
              <div>
                <span className="font-medium">지원일:</span>{' '}
                {format(new Date(application.createdAt), 'MM/dd', { locale: ko })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};