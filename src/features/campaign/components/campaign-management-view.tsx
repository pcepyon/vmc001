'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CampaignStatusBadge } from './campaign-status-badge';
import { ApplicantsTable } from '@/features/application/components/applicants-table';
import { SelectionDialog } from '@/features/application/components/selection-dialog';
import { useCloseCampaign } from '../hooks/useCloseCampaign';
import type { CampaignDetail } from '../lib/dto';
import type { Applicant } from '@/features/application/lib/dto';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface CampaignManagementViewProps {
  campaign: CampaignDetail;
  applicants: Applicant[];
}

export const CampaignManagementView = ({ campaign, applicants }: CampaignManagementViewProps) => {
  const [selectionDialogOpen, setSelectionDialogOpen] = useState(false);
  const { mutate: closeCampaign, isPending: isClosing } = useCloseCampaign(campaign.id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{campaign.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{campaign.category}</span>
                <span>·</span>
                <span>{campaign.location}</span>
              </div>
            </div>
            <CampaignStatusBadge status={campaign.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
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
          </div>

          <div>
            <h3 className="font-medium mb-2">제공혜택</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{campaign.benefits}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">매장정보</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{campaign.storeInfo}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">미션</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{campaign.mission}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>신청 현황</CardTitle>
          <div className="flex gap-2">
            {campaign.status === 'recruiting' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" disabled={isClosing}>
                    {isClosing ? '처리 중...' : '모집종료'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>모집을 종료하시겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>
                      모집을 종료하면 더 이상 지원을 받을 수 없습니다.
                      {applicants.length === 0 && ' 현재 지원자가 없습니다.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={() => closeCampaign()}>
                      확인
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {campaign.status === 'closed' && (
              <Button onClick={() => setSelectionDialogOpen(true)} disabled={applicants.length === 0}>
                체험단 선정
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ApplicantsTable applicants={applicants} />
        </CardContent>
      </Card>

      <SelectionDialog
        open={selectionDialogOpen}
        onOpenChange={setSelectionDialogOpen}
        campaignId={campaign.id}
        applicants={applicants.filter((a) => a.status === 'applied')}
      />
    </div>
  );
};