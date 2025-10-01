'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BannerSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  ctaText?: string;
}

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 예시 배너 데이터 (실제로는 API에서 가져오거나 CMS에서 관리)
  const slides: BannerSlide[] = [
    {
      id: '1',
      title: '🎉 인기 체험단 모집중',
      description: '이번 주 가장 인기있는 체험단을 만나보세요',
      imageUrl: 'https://picsum.photos/1200/400?random=1',
      link: '/campaign/featured',
      ctaText: '지금 지원하기'
    },
    {
      id: '2',
      title: '✨ 신규 브랜드 체험단',
      description: '새로운 브랜드의 특별한 체험 기회',
      imageUrl: 'https://picsum.photos/1200/400?random=2',
      link: '/campaign/new',
      ctaText: '자세히 보기'
    },
    {
      id: '3',
      title: '📢 공지사항',
      description: '서비스 업데이트 및 이벤트 소식',
      imageUrl: 'https://picsum.photos/1200/400?random=3',
      link: '/notice',
      ctaText: '확인하기'
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
                {slide.link && slide.ctaText && (
                  <Link href={slide.link}>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg"
                    >
                      {slide.ctaText}
                    </Button>
                  </Link>
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