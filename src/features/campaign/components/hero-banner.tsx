'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface BannerSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  action?: {
    type: 'filter' | 'sort' | 'combined';
    filters?: {
      category?: string;
      location?: string;
    };
    sort?: 'latest' | 'deadline_soon' | 'popular';
  };
  ctaText?: string;
}

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // 배너 데이터 - 필터/정렬 액션으로 변경
  const slides: BannerSlide[] = [
    {
      id: '1',
      title: '⏰ 오늘 마감! 서둘러 지원하세요',
      description: '24시간 내 마감되는 체험단을 놓치지 마세요',
      imageUrl: 'https://picsum.photos/1200/400?random=1',
      action: {
        type: 'sort',
        sort: 'deadline_soon'
      },
      ctaText: '마감임박 체험단 보기'
    },
    {
      id: '2',
      title: '🔥 실시간 인기 체험단',
      description: '지금 가장 많은 관심을 받고 있는 체험단',
      imageUrl: 'https://picsum.photos/1200/400?random=2',
      action: {
        type: 'sort',
        sort: 'popular'
      },
      ctaText: '인기 체험단 보기'
    },
    {
      id: '3',
      title: '☕ 카페 & 맛집 체험단 특집',
      description: '새로운 맛집과 카페를 체험해보세요',
      imageUrl: 'https://picsum.photos/1200/400?random=3',
      action: {
        type: 'combined',
        filters: { category: 'restaurant' },
        sort: 'latest'
      },
      ctaText: '맛집 체험단 보기'
    },
    {
      id: '4',
      title: '💄 뷰티 & 패션 체험단',
      description: '최신 뷰티 트렌드를 체험해보세요',
      imageUrl: 'https://picsum.photos/1200/400?random=4',
      action: {
        type: 'filter',
        filters: { category: 'beauty' }
      },
      ctaText: '뷰티 체험단 보기'
    },
    {
      id: '5',
      title: '📍 서울 지역 체험단',
      description: '서울 지역 체험단만 모아봤어요',
      imageUrl: 'https://picsum.photos/1200/400?random=5',
      action: {
        type: 'filter',
        filters: { location: '서울' }
      },
      ctaText: '서울 체험단 보기'
    }
  ];

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // 배너 클릭 핸들러 - URL 파라미터로 필터/정렬 적용
  const handleBannerClick = (slide: BannerSlide) => {
    if (!slide.action) return;

    const params = new URLSearchParams();

    // 필터 파라미터 설정
    if (slide.action.filters?.category) {
      params.set('category', slide.action.filters.category);
    }
    if (slide.action.filters?.location) {
      params.set('location', slide.action.filters.location);
    }

    // 정렬 파라미터 설정
    if (slide.action.sort) {
      params.set('sort', slide.action.sort);
    }

    // 캠페인 리스트로 스크롤하기 위한 파라미터
    params.set('scrollTo', 'campaigns');

    // URL 업데이트 및 페이지 이동
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-100">
      {/* 슬라이드 컨테이너 */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative"
          >
            {/* 배경 이미지 */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 컨텐츠 */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100">
                  {slide.description}
                </p>
                {slide.ctaText && (
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg cursor-pointer"
                    onClick={() => handleBannerClick(slide)}
                  >
                    {slide.ctaText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* 페이지네이션 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};