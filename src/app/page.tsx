'use client';

import { useState } from 'react';
import { CampaignList } from '@/features/campaign/components/campaign-list';
import { CampaignFilter } from '@/features/campaign/components/campaign-filter';
import { CampaignSort } from '@/features/campaign/components/campaign-sort';
import { useCampaignList } from '@/features/campaign/hooks/useCampaignList';
import type { CampaignListQuery } from '@/features/campaign/lib/dto';

export default function Home() {
  const [filters, setFilters] = useState<Pick<CampaignListQuery, 'category' | 'location'>>({});
  const [sort, setSort] = useState<'latest' | 'deadline_soon' | 'popular'>('latest');
  const [page, setPage] = useState(1);

  const query: Partial<CampaignListQuery> = {
    status: 'recruiting',
    ...filters,
    sort,
    page,
    limit: 20,
  };

  const { data, isLoading, error, refetch } = useCampaignList(query);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">체험단 목록</h1>
          <p className="text-muted-foreground">
            다양한 체험단에 지원하고 혜택을 경험해 보세요
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <CampaignFilter value={filters} onChange={setFilters} />
          <CampaignSort value={sort} onChange={setSort} />
        </div>

        <CampaignList
          campaigns={data?.campaigns || []}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
        />

        {data && data.pagination.total > data.pagination.limit && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              이전
            </button>
            <span className="px-4 py-2">
              {page} / {Math.ceil(data.pagination.total / data.pagination.limit)}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.ceil(data.pagination.total / data.pagination.limit)}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </main>
  );
}