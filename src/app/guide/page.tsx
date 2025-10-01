'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Search,
  UserPlus,
  FileText,
  CheckCircle,
  Star,
  MessageSquare,
  TrendingUp,
  Shield,
  Award,
  Clock,
  AlertCircle,
  ArrowRight,
  PlayCircle,
  Download,
  HelpCircle,
  ChevronRight,
  Lightbulb,
  Target,
  Users,
  BarChart3,
  Edit3,
  Send
} from 'lucide-react';

export default function GuidePage() {
  const [activeStep, setActiveStep] = useState(0);

  // 체험단원 가이드 스텝
  const userSteps = [
    {
      icon: UserPlus,
      title: '1. 회원가입',
      description: '간편한 소셜 로그인으로 빠르게 시작',
      details: [
        '이메일 또는 소셜 계정으로 가입',
        '프로필 정보 입력 (관심 카테고리, 지역 등)',
        'SNS 계정 연동 (선택사항)',
        '이메일 인증 완료'
      ]
    },
    {
      icon: Search,
      title: '2. 체험단 찾기',
      description: '관심있는 체험단을 검색하고 탐색',
      details: [
        '카테고리별, 지역별 필터 활용',
        '인기순, 마감임박순 정렬',
        '체험단 상세 정보 확인',
        '모집 조건 및 일정 확인'
      ]
    },
    {
      icon: FileText,
      title: '3. 지원하기',
      description: '원하는 체험단에 지원서 작성',
      details: [
        '지원 동기 작성',
        'SNS 활동 내역 첨부',
        '체험 계획 작성',
        '개인정보 활용 동의'
      ]
    },
    {
      icon: CheckCircle,
      title: '4. 선정 확인',
      description: '선정 결과 확인 및 체험 준비',
      details: [
        '선정 알림 받기 (이메일, 앱 푸시)',
        '체험 가이드라인 확인',
        '체험 일정 확정',
        '체험 제품/서비스 수령'
      ]
    },
    {
      icon: Edit3,
      title: '5. 체험 진행',
      description: '제품/서비스를 직접 체험',
      details: [
        '체험 가이드라인 준수',
        '사진/영상 촬영',
        '체험 노트 작성',
        '궁금한 점 문의'
      ]
    },
    {
      icon: Star,
      title: '6. 리뷰 작성',
      description: '솔직하고 상세한 리뷰 작성',
      details: [
        '지정된 플랫폼에 리뷰 작성',
        '사진/영상 첨부',
        '해시태그 포함',
        '리뷰 링크 제출'
      ]
    }
  ];

  // 광고주 가이드 스텝
  const advertiserSteps = [
    {
      icon: UserPlus,
      title: '1. 광고주 등록',
      description: '사업자 정보로 광고주 계정 생성',
      details: [
        '사업자등록번호 입력',
        '업체 정보 등록',
        '담당자 정보 입력',
        '서비스 약관 동의'
      ]
    },
    {
      icon: Target,
      title: '2. 캠페인 기획',
      description: '체험단 캠페인 목표와 전략 수립',
      details: [
        '캠페인 목표 설정',
        '타겟 고객 정의',
        '체험 제품/서비스 선정',
        '예산 및 일정 계획'
      ]
    },
    {
      icon: FileText,
      title: '3. 체험단 등록',
      description: '상세한 체험단 모집 공고 작성',
      details: [
        '체험단 제목 및 소개 작성',
        '모집 인원 및 기간 설정',
        '체험 미션 상세 작성',
        '제공 혜택 명시'
      ]
    },
    {
      icon: Users,
      title: '4. 지원자 검토',
      description: '지원자 프로필 검토 및 선정',
      details: [
        '지원서 검토',
        'SNS 활동 내역 확인',
        '적합한 체험단원 선정',
        '선정 결과 발표'
      ]
    },
    {
      icon: Send,
      title: '5. 체험 진행',
      description: '체험 제품 발송 및 진행 관리',
      details: [
        '체험 제품/서비스 제공',
        '체험 가이드 전달',
        '진행 상황 모니터링',
        '체험단원 소통'
      ]
    },
    {
      icon: BarChart3,
      title: '6. 성과 분석',
      description: '캠페인 성과 분석 및 리포트',
      details: [
        '리뷰 수집 및 분석',
        '도달률, 참여율 확인',
        'ROI 분석',
        '개선점 도출'
      ]
    }
  ];

  // 주의사항
  const guidelines = {
    user: [
      {
        icon: CheckCircle,
        title: '필수 준수사항',
        items: [
          '정해진 기간 내 리뷰 작성',
          '체험 가이드라인 준수',
          '솔직하고 상세한 후기 작성',
          '제공받은 제품/서비스만 리뷰'
        ]
      },
      {
        icon: AlertCircle,
        title: '금지사항',
        items: [
          '허위/과장 리뷰 작성',
          '타인 명의로 활동',
          '체험 제품 무단 판매',
          '부정적인 내용만 강조'
        ]
      },
      {
        icon: Shield,
        title: '보호 정책',
        items: [
          '개인정보 보호',
          '안전한 거래 보장',
          '분쟁 조정 지원',
          '체험단원 권익 보호'
        ]
      }
    ],
    advertiser: [
      {
        icon: CheckCircle,
        title: '성공 전략',
        items: [
          '명확한 체험 미션 제시',
          '충분한 체험 기간 제공',
          '적절한 보상 설정',
          '체험단원과 적극 소통'
        ]
      },
      {
        icon: AlertCircle,
        title: '주의사항',
        items: [
          '과도한 요구사항 금지',
          '차별적 선정 기준 금지',
          '허위/과장 광고 금지',
          '개인정보 오남용 금지'
        ]
      },
      {
        icon: Lightbulb,
        title: '추천 팁',
        items: [
          '시즌/트렌드 활용',
          '인플루언서 섭외',
          '크로스 프로모션',
          '지속적인 관계 구축'
        ]
      }
    ]
  };

  // 자주 묻는 질문
  const faqs = {
    user: [
      {
        q: '체험단 선정 기준은 무엇인가요?',
        a: 'SNS 활동성, 관심 카테고리 일치도, 지원 동기, 이전 활동 이력 등을 종합적으로 평가합니다.'
      },
      {
        q: '체험 제품은 반납해야 하나요?',
        a: '대부분 제공되지만, 고가 제품의 경우 반납 조건이 있을 수 있습니다. 모집 공고를 확인해주세요.'
      },
      {
        q: '리뷰는 어디에 작성하나요?',
        a: '캠페인마다 지정된 플랫폼(블로그, 인스타그램, 네이버 등)이 있으며, 상세 안내를 받게 됩니다.'
      }
    ],
    advertiser: [
      {
        q: '체험단 모집 비용은 어떻게 되나요?',
        a: '기본 등록은 무료이며, 선정된 인원수와 캠페인 규모에 따라 수수료가 책정됩니다.'
      },
      {
        q: '체험단원은 몇 명까지 모집 가능한가요?',
        a: '제한은 없지만, 일반적으로 10-100명 규모를 추천드립니다. 대규모 캠페인도 가능합니다.'
      },
      {
        q: '캠페인 수정이 가능한가요?',
        a: '모집 시작 전까지는 자유롭게 수정 가능하며, 진행 중에는 일부 항목만 수정 가능합니다.'
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              이용 가이드
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              체험단 플랫폼을 200% 활용하는 방법
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                소개 영상 보기
              </Button>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600"
              >
                <Download className="mr-2 h-5 w-5" />
                PDF 다운로드
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 탭 네비게이션 */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="user" className="text-lg">
              체험단원 가이드
            </TabsTrigger>
            <TabsTrigger value="advertiser" className="text-lg">
              광고주 가이드
            </TabsTrigger>
          </TabsList>

          {/* 체험단원 가이드 */}
          <TabsContent value="user" className="space-y-12">
            {/* 프로세스 스텝 */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">
                체험단 참여 프로세스
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        activeStep === index ? 'ring-2 ring-blue-600' : ''
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* 주의사항 */}
            <section className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">체험단원 주의사항</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {guidelines.user.map((guide, index) => {
                  const Icon = guide.icon;
                  return (
                    <div key={index}>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                        <h3 className="font-semibold">{guide.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {guide.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <div className="space-y-4">
                {faqs.user.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-2">{faq.q}</h3>
                          <p className="text-gray-600">{faq.a}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* 광고주 가이드 */}
          <TabsContent value="advertiser" className="space-y-12">
            {/* 프로세스 스텝 */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">
                체험단 운영 프로세스
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advertiserSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        activeStep === index ? 'ring-2 ring-blue-600' : ''
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Icon className="h-6 w-6 text-purple-600" />
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* 주의사항 */}
            <section className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">광고주 가이드라인</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {guidelines.advertiser.map((guide, index) => {
                  const Icon = guide.icon;
                  return (
                    <div key={index}>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-6 w-6 text-purple-600" />
                        <h3 className="font-semibold">{guide.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {guide.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <div className="space-y-4">
                {faqs.advertiser.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-2">{faq.q}</h3>
                          <p className="text-gray-600">{faq.a}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>

        {/* CTA 섹션 */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            준비되셨나요?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            지금 바로 체험단 플랫폼을 시작해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                회원가입
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600"
              >
                체험단 둘러보기
              </Button>
            </Link>
          </div>
        </section>

        {/* 추가 도움말 */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">1:1 문의</h3>
              <p className="text-gray-600 text-sm mb-4">
                궁금한 점이 있으신가요?
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  문의하기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">베스트 체험단</h3>
              <p className="text-gray-600 text-sm mb-4">
                우수 체험 사례를 확인하세요
              </p>
              <Link href="/best">
                <Button variant="outline" size="sm">
                  사례 보기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">통계 & 리포트</h3>
              <p className="text-gray-600 text-sm mb-4">
                체험단 트렌드를 확인하세요
              </p>
              <Link href="/stats">
                <Button variant="outline" size="sm">
                  리포트 보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}