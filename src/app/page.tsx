'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CampaignList } from '@/features/campaign/components/campaign-list';
import { CampaignFilter } from '@/features/campaign/components/campaign-filter';
import { CampaignSort } from '@/features/campaign/components/campaign-sort';
import { HeroBanner } from '@/features/campaign/components/hero-banner';
import { useCampaignList } from '@/features/campaign/hooks/useCampaignList';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import type { CampaignListQuery } from '@/features/campaign/lib/dto';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

export default function Home() {
  const { user } = useCurrentUser();
  const searchParams = useSearchParams();

  // URL 파라미터에서 초기값 설정
  const [filters, setFilters] = useState<Pick<CampaignListQuery, 'category' | 'location'>>({
    category: searchParams.get('category') || undefined,
    location: searchParams.get('location') || undefined,
  });

  const [sort, setSort] = useState<'latest' | 'deadline_soon' | 'popular'>(
    (searchParams.get('sort') as 'latest' | 'deadline_soon' | 'popular') || 'latest'
  );

  const [page, setPage] = useState(1);
  const [isFromBanner, setIsFromBanner] = useState(false);

  // URL 파라미터 변경 감지 및 자동 스크롤
  useEffect(() => {
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const sortParam = searchParams.get('sort') as 'latest' | 'deadline_soon' | 'popular' | null;
    const scrollTo = searchParams.get('scrollTo');

    // URL 파라미터가 변경되면 상태 업데이트
    setFilters({
      category: category || undefined,
      location: location || undefined,
    });

    if (sortParam) {
      setSort(sortParam);
    }

    // 배너에서 온 경우 표시
    if (scrollTo === 'campaigns') {
      setIsFromBanner(true);
      // 3초 후 하이라이트 제거
      setTimeout(() => setIsFromBanner(false), 3000);

      // 캠페인 리스트로 스크롤
      setTimeout(() => {
        const element = document.getElementById('campaign-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [searchParams]);

  // 필터 변경 시 페이지를 1로 리셋
  const handleFilterChange = (newFilters: Pick<CampaignListQuery, 'category' | 'location'>) => {
    console.log('필터 변경:', newFilters);
    setFilters(newFilters);
    setPage(1);
    setIsFromBanner(false);
  };

  const query: Partial<CampaignListQuery> = {
    status: 'recruiting',
    ...filters,
    sort,
    page,
    limit: 12,
  };

  console.log('API 요청 쿼리:', query);

  const { data, isLoading, error, refetch } = useCampaignList(query);
  const totalPages = data ? Math.ceil(data.pagination.total / data.pagination.limit) : 1;

  // 필터 초기화 함수
  const resetFilters = () => {
    setFilters({});
    setSort('latest');
    setIsFromBanner(false);
    // URL 파라미터도 초기화
    window.history.replaceState({}, '', '/');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 히어로 배너 섹션 */}
      <HeroBanner />

      <div id="campaign-section" className="mx-auto max-w-7xl px-4 py-12">
        {/* 헤더 섹션 */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">모집 중인 체험단</h2>
          <p className="text-lg text-muted-foreground">
            다양한 브랜드의 체험단에 참여하고 특별한 혜택을 경험해보세요
          </p>
        </div>

        {/* 필터 & 정렬 바 */}
        <div className={`mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-sm ${
          isFromBanner ? 'ring-2 ring-primary ring-offset-2 transition-all duration-300' : ''
        }`}>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <CampaignFilter value={filters} onChange={handleFilterChange} />
            <CampaignSort value={sort} onChange={(val) => {
              setSort(val);
              setIsFromBanner(false);
            }} />
          </div>

          {/* 필터 초기화 버튼 */}
          {(filters.category || filters.location || sort !== 'latest') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              필터 초기화
            </Button>
          )}
        </div>

        {/* 체험단 카드 그리드 */}
        <CampaignList
          campaigns={data?.campaigns || []}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
        />

        {/* 페이지네이션 */}
        {data && data.pagination.total > data.pagination.limit && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <Button
                    key={i}
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                    className="min-w-[40px]"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* 광고주용 플로팅 액션 버튼 */}
      {((user?.userMetadata?.role || user?.appMetadata?.role) === 'advertiser') && (
        <Link href="/advertiser/campaigns">
          <Button
            size="lg"
            className="fixed bottom-6 right-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 h-14 w-14 md:w-auto md:px-6"
          >
            <Plus className="h-6 w-6 md:mr-2" />
            <span className="hidden md:inline">체험단 등록</span>
          </Button>
        </Link>
      )}
    </main>
  );
}