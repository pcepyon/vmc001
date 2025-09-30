'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CampaignForm } from './campaign-form';

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCampaignDialog = ({ open, onOpenChange }: CreateCampaignDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>체험단 등록</DialogTitle>
          <DialogDescription>
            새로운 체험단을 등록하세요. 모든 항목을 정확히 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <CampaignForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};