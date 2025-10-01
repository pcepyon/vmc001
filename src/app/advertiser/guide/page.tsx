'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Target,
  TrendingUp,
  Users,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Zap,
  Shield,
  Award,
  Clock,
  MessageSquare,
  HeadphonesIcon,
  BookOpen,
  PlayCircle,
  Download,
  Star,
  DollarSign,
  Calendar,
  FileText,
  Settings,
  PieChart
} from 'lucide-react';

export default function AdvertiserGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 광고주 이점
  const benefits = [
    {
      icon: Target,
      title: '정확한 타겟 마케팅',
      description: '관심사와 지역 기반으로 최적의 체험단원을 매칭하여 효과적인 마케팅 가능'
    },
    {
      icon: DollarSign,
      title: '비용 효율적',
      description: '전통적인 광고 대비 30-50% 비용 절감하면서도 높은 전환율 달성'
    },
    {
      icon: BarChart3,
      title: '실시간 성과 측정',
      description: '캠페인 진행 상황과 효과를 실시간으로 모니터링하고 분석 가능'
    },
    {
      icon: Shield,
      title: '신뢰도 향상',
      description: '실제 사용자의 솔직한 후기로 브랜드 신뢰도와 인지도 상승'
    },
    {
      icon: Users,
      title: '커뮤니티 형성',
      description: '브랜드 충성 고객층 확보 및 지속적인 관계 구축'
    },
    {
      icon: Zap,
      title: '빠른 확산',
      description: 'SNS를 통한 바이럴 효과로 빠른 브랜드 인지도 확산'
    }
  ];

  // 캠페인 성공 사례
  const successCases = [
    {
      category: '음식점',
      brand: '맛있는 파스타',
      result: '3개월 매출 150% 증가',
      participants: 50,
      reviews: 485,
      rating: 4.8,
      description: '신메뉴 출시와 함께 진행한 체험단 캠페인으로 지역 맛집으로 입소문'
    },
    {
      category: '뷰티',
      brand: '클린 코스메틱',
      result: '신제품 완판 달성',
      participants: 100,
      reviews: 920,
      rating: 4.9,
      description: '인플루언서 체험단을 통해 제품 인지도 상승 및 매출 증대'
    },
    {
      category: '카페',
      brand: '커피 라운지',
      result: '일 평균 고객 200% 증가',
      participants: 30,
      reviews: 280,
      rating: 4.7,
      description: '오픈 초기 체험단 운영으로 빠른 고객 유입 달성'
    }
  ];

  // 캠페인 운영 팁
  const campaignTips = [
    {
      phase: '기획 단계',
      tips: [
        {
          title: '명확한 목표 설정',
          content: '브랜드 인지도 향상, 신제품 홍보, 매출 증대 등 구체적인 목표를 설정하세요.'
        },
        {
          title: '타겟 고객 정의',
          content: '연령, 성별, 관심사, 지역 등을 고려하여 타겟 고객을 명확히 정의하세요.'
        },
        {
          title: '경쟁사 분석',
          content: '유사 업종의 성공 사례를 분석하여 차별화 포인트를 찾으세요.'
        }
      ]
    },
    {
      phase: '모집 단계',
      tips: [
        {
          title: '매력적인 제목 작성',
          content: '체험단원의 관심을 끌 수 있는 구체적이고 매력적인 제목을 작성하세요.'
        },
        {
          title: '상세한 미션 설명',
          content: '체험 내용, 리뷰 작성 방법, 기한 등을 명확하게 안내하세요.'
        },
        {
          title: '적절한 보상 설정',
          content: '체험 제품/서비스 외에 추가 혜택을 제공하여 참여율을 높이세요.'
        }
      ]
    },
    {
      phase: '운영 단계',
      tips: [
        {
          title: '빠른 커뮤니케이션',
          content: '체험단원의 문의에 신속하게 응답하여 신뢰를 구축하세요.'
        },
        {
          title: '가이드라인 제공',
          content: '체험 방법, 사진 촬영 팁 등 상세한 가이드를 제공하세요.'
        },
        {
          title: '중간 점검',
          content: '진행 상황을 주기적으로 확인하고 필요시 추가 안내를 제공하세요.'
        }
      ]
    },
    {
      phase: '분석 단계',
      tips: [
        {
          title: '정량적 분석',
          content: '리뷰 수, 도달률, 전환율 등 수치화된 데이터를 분석하세요.'
        },
        {
          title: '정성적 분석',
          content: '리뷰 내용을 분석하여 제품/서비스 개선점을 도출하세요.'
        },
        {
          title: '후속 조치',
          content: '우수 체험단원과 지속적인 관계를 유지하고 다음 캠페인에 활용하세요.'
        }
      ]
    }
  ];

  // FAQ
  const faqs = [
    {
      question: '체험단 캠페인 비용은 어떻게 책정되나요?',
      answer: '기본 플랫폼 이용료는 무료이며, 체험단원 선정 후 인원수와 캠페인 규모에 따라 수수료가 책정됩니다. 일반적으로 체험단원 1인당 5,000원~20,000원의 수수료가 발생하며, 대규모 캠페인의 경우 할인이 적용됩니다.'
    },
    {
      question: '체험단원 선정은 어떻게 하나요?',
      answer: '플랫폼에서 제공하는 필터링 도구를 활용하여 SNS 활동성, 팔로워 수, 관심 카테고리, 이전 활동 이력 등을 기준으로 선정할 수 있습니다. AI 추천 시스템도 활용 가능합니다.'
    },
    {
      question: '리뷰 품질은 어떻게 관리하나요?',
      answer: '체험 가이드라인을 명확히 제공하고, 리뷰 작성 예시를 공유하세요. 부실한 리뷰의 경우 수정 요청이 가능하며, 플랫폼에서도 품질 관리를 지원합니다.'
    },
    {
      question: '캠페인 기간은 얼마나 설정하는 것이 좋나요?',
      answer: '일반적으로 모집 1-2주, 체험 2-3주, 리뷰 작성 1주로 총 4-6주를 권장합니다. 제품 특성에 따라 조정 가능합니다.'
    },
    {
      question: '체험 제품 배송은 어떻게 하나요?',
      answer: '직접 배송하거나 플랫폼의 배송 대행 서비스를 이용할 수 있습니다. 대행 서비스 이용 시 추가 비용이 발생하지만 편리하게 관리할 수 있습니다.'
    },
    {
      question: '캠페인 중간에 수정이 가능한가요?',
      answer: '모집 시작 전까지는 모든 내용 수정이 가능합니다. 모집 중에는 일부 항목(설명, 이미지 등)만 수정 가능하며, 선정 후에는 수정이 제한됩니다.'
    }
  ];

  // 요금제 정보
  const pricingPlans = [
    {
      name: '베이직',
      price: '무료',
      features: [
        '월 1개 캠페인',
        '최대 10명 모집',
        '기본 분석 리포트',
        '이메일 지원'
      ],
      recommended: false
    },
    {
      name: '프로',
      price: '월 99,000원',
      features: [
        '월 5개 캠페인',
        '최대 50명 모집',
        '상세 분석 리포트',
        'AI 체험단원 추천',
        '전담 매니저 지원'
      ],
      recommended: true
    },
    {
      name: '엔터프라이즈',
      price: '맞춤 견적',
      features: [
        '무제한 캠페인',
        '무제한 모집',
        '맞춤형 리포트',
        'API 연동',
        '1:1 컨설팅',
        '배송 대행 서비스'
      ],
      recommended: false
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              광고주 가이드
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              효과적인 체험단 마케팅으로 비즈니스를 성장시키세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/advertiser/campaigns/new">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Zap className="mr-2 h-5 w-5" />
                  첫 캠페인 시작하기
                </Button>
              </Link>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                소개 영상 보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 광고주 이점 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            왜 체험단 마케팅인가?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-purple-600 mb-3" />
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 성공 사례 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            성공 사례
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {successCases.map((case_, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-purple-100 text-sm">{case_.category}</p>
                      <CardTitle className="text-xl">{case_.brand}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{case_.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-purple-600">{case_.result}</p>
                  </div>
                  <p className="text-gray-600 mb-4">{case_.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>참여 {case_.participants}명</span>
                    <span>리뷰 {case_.reviews}개</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 캠페인 운영 팁 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            단계별 운영 가이드
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {campaignTips.map((phase, phaseIndex) => (
              <AccordionItem key={phaseIndex} value={`phase-${phaseIndex}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">{phaseIndex + 1}</span>
                    </div>
                    {phase.phase}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    {phase.tips.map((tip, tipIndex) => (
                      <Card key={tipIndex} className="border-l-4 border-purple-600">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-purple-600" />
                            {tip.title}
                          </h4>
                          <p className="text-gray-600 text-sm">{tip.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 요금제 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            요금제
          </h2>
          <p className="text-center text-gray-600 mb-12">
            비즈니스 규모에 맞는 플랜을 선택하세요
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.recommended ? 'ring-2 ring-purple-600 shadow-xl' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                      추천
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-purple-600">
                    {plan.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.recommended
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'variant-outline'
                    }`}
                  >
                    선택하기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 시작하세요!
          </h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            첫 캠페인은 수수료 50% 할인! 전문 컨설턴트가 캠페인 설계부터 운영까지 도와드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Award className="mr-2 h-5 w-5" />
                무료로 시작하기
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600"
              >
                <HeadphonesIcon className="mr-2 h-5 w-5" />
                상담 요청하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 추가 리소스 섹션 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <BookOpen className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">운영 매뉴얼</h3>
                <p className="text-sm text-gray-600 mb-4">
                  상세한 운영 가이드 다운로드
                </p>
                <Button variant="outline" size="sm">
                  <Download className="mr-1 h-4 w-4" />
                  다운로드
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <PieChart className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">성과 리포트</h3>
                <p className="text-sm text-gray-600 mb-4">
                  업종별 평균 성과 확인
                </p>
                <Link href="/reports">
                  <Button variant="outline" size="sm">
                    보러 가기
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Calendar className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">웨비나</h3>
                <p className="text-sm text-gray-600 mb-4">
                  전문가 온라인 세미나
                </p>
                <Link href="/webinar">
                  <Button variant="outline" size="sm">
                    신청하기
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <HeadphonesIcon className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">1:1 컨설팅</h3>
                <p className="text-sm text-gray-600 mb-4">
                  맞춤형 마케팅 상담
                </p>
                <Link href="/consulting">
                  <Button variant="outline" size="sm">
                    예약하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}