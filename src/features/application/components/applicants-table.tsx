'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ApplicationStatusBadge } from './application-status-badge';
import type { Applicant } from '../lib/dto';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

interface ApplicantsTableProps {
  applicants: Applicant[];
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
}

export const ApplicantsTable = ({ applicants, selectable = false, selectedIds = new Set(), onSelectionChange }: ApplicantsTableProps) => {
  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;

    if (checked) {
      const allIds = new Set(applicants.map((a) => a.applicationId));
      onSelectionChange(allIds);
    } else {
      onSelectionChange(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (!onSelectionChange) return;

    const newIds = new Set(selectedIds);
    if (checked) {
      newIds.add(id);
    } else {
      newIds.delete(id);
    }
    onSelectionChange(newIds);
  };

  const allSelected = selectable && applicants.length > 0 && selectedIds.size === applicants.length;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
            )}
            <TableHead>인플루언서</TableHead>
            <TableHead>채널</TableHead>
            <TableHead>각오 한마디</TableHead>
            <TableHead>방문 예정일</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={selectable ? 6 : 5} className="text-center text-muted-foreground">
                지원자가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            applicants.map((applicant) => (
              <TableRow key={applicant.applicationId}>
                {selectable && (
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(applicant.applicationId)}
                      onCheckedChange={(checked) => handleSelectOne(applicant.applicationId, !!checked)}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <div>
                    <div className="font-medium">{applicant.influencerName}</div>
                    <div className="text-sm text-muted-foreground">{applicant.influencerEmail}</div>
                    <div className="text-sm text-muted-foreground">{applicant.influencerPhone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {applicant.influencerChannels.map((channel, index) => (
                      <a
                        key={index}
                        href={channel.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Badge variant="outline" className="text-xs">
                          {channel.platform}
                        </Badge>
                      </a>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{applicant.message}</TableCell>
                <TableCell>
                  {format(new Date(applicant.visitDate), 'PPP', { locale: ko })}
                </TableCell>
                <TableCell>
                  <ApplicationStatusBadge status={applicant.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};