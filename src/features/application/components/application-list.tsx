'use client';

import { ApplicationItemCard } from './application-item';
import type { ApplicationItem } from '../lib/dto';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ApplicationListProps {
  applications: ApplicationItem[];
  isLoading: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export const ApplicationList = ({ applications, isLoading, error, onRetry }: ApplicationListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-destructive">목록을 불러오는데 실패했습니다.</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            다시 시도
          </Button>
        )}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-muted-foreground">아직 지원한 체험단이 없습니다.</p>
        <Button asChild>
          <Link href="/">체험단 둘러보기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {applications.map((application) => (
        <ApplicationItemCard key={application.id} application={application} />
      ))}
    </div>
  );
};