'use client';

import { useState } from 'react';
import { useMyApplications } from '@/features/application/hooks/useMyApplications';
import { ApplicationFilter } from '@/features/application/components/application-filter';
import { ApplicationList } from '@/features/application/components/application-list';
import { useSupabaseAuth } from '@/features/auth/hooks/useSupabaseAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type StatusFilter = 'all' | 'applied' | 'selected' | 'rejected';

export default function MyApplicationsPage() {
  const router = useRouter();
  const { session, isLoading: authLoading } = useSupabaseAuth();
  const [status, setStatus] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useMyApplications({
    status,
    page,
    limit: 20,
  });

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login');
    }
  }, [authLoading, session, router]);

  if (authLoading) {
    return (
      <div className="container mx-auto py-8">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">내 지원 목록</h1>

      <div className="space-y-6">
        <ApplicationFilter value={status} onChange={(value) => { setStatus(value); setPage(1); }} />

        <ApplicationList
          applications={data?.applications || []}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
        />
      </div>
    </div>
  );
}