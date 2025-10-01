'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  TrendingUp,
  Shield,
  Zap,
  Target,
  BarChart3,
  HeadphonesIcon,
  CheckCircle,
  Star,
  ArrowRight,
  Award,
  Clock,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'user' | 'advertiser'>('user');

  const stats = [
    { label: '누적 체험단', value: '10,000+', icon: Award },
    { label: '활성 사용자', value: '50,000+', icon: Users },
    { label: '성공 매칭률', value: '95%', icon: TrendingUp },
    { label: '평균 만족도', value: '4.8/5', icon: Star },
  ];

  const userFeatures = [
    {
      icon: Sparkles,
      title: '다양한 체험 기회',
      description: '맛집, 뷰티, 패션, 라이프스타일 등 다양한 카테고리의 체험단 참여 기회'
    },
    {
      icon: Clock,
      title: '간편한 지원 프로세스',
      description: '몇 번의 클릭만으로 원하는 체험단에 쉽고 빠르게 지원'
    },
    {
      icon: Shield,
      title: '안전한 리뷰 시스템',
      description: '검증된 체험단만 선별하여 안전하고 신뢰할 수 있는 체험 제공'
    },
    {
      icon: Award,
      title: '리워드 프로그램',
      description: '체험 후기 작성 시 포인트 적립 및 다양한 혜택 제공'
    }
  ];

  const advertiserFeatures = [
    {
      icon: Target,
      title: '정확한 타겟팅',
      description: '관심사와 지역 기반으로 최적의 체험단원 매칭'
    },
    {
      icon: BarChart3,
      title: '실시간 성과 분석',
      description: '캠페인 진행 상황과 효과를 실시간으로 모니터링'
    },
    {
      icon: Zap,
      title: '비용 효율적',
      description: '합리적인 가격으로 최대의 마케팅 효과 달성'
    },
    {
      icon: HeadphonesIcon,
      title: '전담 지원',
      description: '캠페인 기획부터 실행까지 전문가의 1:1 맞춤 지원'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: '회원가입',
      description: '간편한 소셜 로그인으로 빠르게 시작하세요',
      userText: '체험단원으로 가입',
      advertiserText: '광고주로 가입'
    },
    {
      step: '2',
      title: '체험단 탐색/등록',
      description: '원하는 체험단을 찾거나 새로운 캠페인을 만드세요',
      userText: '체험단 둘러보기',
      advertiserText: '캠페인 만들기'
    },
    {
      step: '3',
      title: '매칭 & 진행',
      description: '최적의 매칭으로 체험단 활동을 시작하세요',
      userText: '선정 후 체험 시작',
      advertiserText: '지원자 검토 및 선정'
    },
    {
      step: '4',
      title: '리뷰 & 피드백',
      description: '체험 후기를 공유하고 피드백을 확인하세요',
      userText: '솔직한 후기 작성',
      advertiserText: '성과 분석 및 리포트'
    }
  ];

  const testimonials = [
    {
      name: '김민지',
      role: '체험단원',
      content: '다양한 브랜드의 제품을 체험해볼 수 있어서 좋아요. 지원 과정도 간편하고 선정 알림도 빨라서 만족합니다!',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=1'
    },
    {
      name: '이준호',
      role: '카페 사장님',
      content: '신규 오픈한 카페 홍보에 큰 도움이 되었습니다. 체험단원들의 솔직한 후기 덕분에 개선점도 찾을 수 있었어요.',
      rating: 5,
      avatar: 'https://picsum.photos/100/100?random=2'
    },
    {
      name: '박서연',
      role: '체험단원',
      content: '맛집 체험단 활동을 자주 하는데, 새로운 맛집을 발견하는 재미가 있어요. 포인트 적립도 꾸준히 되고 있습니다!',
      rating: 4,
      avatar: 'https://picsum.photos/100/100?random=3'
    }
  ];

  const faqs = [
    {
      question: '체험단 지원 자격이 어떻게 되나요?',
      answer: '만 14세 이상 누구나 지원 가능합니다. SNS 계정이 있으면 더욱 좋습니다.'
    },
    {
      question: '광고주 등록 비용이 있나요?',
      answer: '기본 등록은 무료이며, 캠페인 진행 시에만 합리적인 수수료가 발생합니다.'
    },
    {
      question: '체험 제품은 반납해야 하나요?',
      answer: '대부분의 체험 제품은 제공되며, 캠페인별로 조건이 다를 수 있습니다.'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            체험단 마케팅의 새로운 기준
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            브랜드와 고객을 연결하는 가장 효과적인 방법
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                무료로 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/guide">
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 hover:border-white transition-all"
                style={{ color: 'white' }}
              >
                이용 가이드 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 서비스 특징 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            누구나 쉽게 사용하는 체험단 플랫폼
          </h2>

          {/* 탭 전환 */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full shadow-md p-1 flex">
              <button
                onClick={() => setActiveTab('user')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                체험단원용
              </button>
              <button
                onClick={() => setActiveTab('advertiser')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'advertiser'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                광고주용
              </button>
            </div>
          </div>

          {/* 특징 카드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === 'user' ? userFeatures : advertiserFeatures).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Icon className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 프로세스 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            간단한 4단계로 시작하세요
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -translate-x-1/2" />
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                <p className="text-blue-600 text-sm font-medium">
                  {activeTab === 'user' ? step.userText : step.advertiserText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 고객 후기 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            사용자들의 생생한 후기
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 미리보기 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            자주 묻는 질문
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq">
              <Button variant="outline">
                더 많은 질문 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 시작해보세요!
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {activeTab === 'user'
              ? '수천 개의 체험단이 당신을 기다리고 있습니다'
              : '효과적인 체험단 마케팅으로 비즈니스를 성장시키세요'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <CheckCircle className="mr-2 h-5 w-5" />
                무료 회원가입
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 hover:border-white transition-all"
                style={{ color: 'white' }}
              >
                문의하기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}