'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ApplicantsTable } from './applicants-table';
import { useSelectApplicants } from '../hooks/useSelectApplicants';
import type { Applicant } from '../lib/dto';

interface SelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: string;
  applicants: Applicant[];
}

export const SelectionDialog = ({ open, onOpenChange, campaignId, applicants }: SelectionDialogProps) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { mutate: selectApplicants, isPending } = useSelectApplicants(campaignId);

  const handleConfirm = () => {
    if (selectedIds.size === 0) {
      return;
    }

    selectApplicants(
      { selectedApplicationIds: Array.from(selectedIds) },
      {
        onSuccess: () => {
          setSelectedIds(new Set());
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>체험단 선정</DialogTitle>
          <DialogDescription>
            선정할 지원자를 선택하세요. 선택된 {selectedIds.size}명이 선정되고, 나머지는 반려됩니다.
          </DialogDescription>
        </DialogHeader>

        <ApplicantsTable
          applicants={applicants}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            취소
          </Button>
          <Button onClick={handleConfirm} disabled={selectedIds.size === 0 || isPending}>
            {isPending ? '처리 중...' : `${selectedIds.size}명 선정`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};