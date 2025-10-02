"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "reviewer" | "advertiser" | "payment" | "report";
}

const faqData: FAQItem[] = [
  // 일반 질문
  {
    question: "체험스타그램은 어떤 서비스인가요?",
    answer: "체험스타그램은 광고주와 체험단원을 연결하는 체험단 마케팅 플랫폼입니다. 광고주는 제품이나 서비스를 홍보할 수 있고, 체험단원은 다양한 제품과 서비스를 무료로 체험하고 리뷰를 작성하여 포인트를 얻을 수 있습니다.",
    category: "general"
  },
  {
    question: "회원가입은 무료인가요?",
    answer: "네, 체험스타그램의 회원가입은 완전히 무료입니다. 체험단원으로 가입하시면 바로 캠페인에 지원하실 수 있고, 광고주로 가입하시면 간단한 인증 절차 후 캠페인을 등록하실 수 있습니다.",
    category: "general"
  },
  {
    question: "체험단원과 광고주 계정을 동시에 사용할 수 있나요?",
    answer: "아니요, 한 계정으로는 체험단원 또는 광고주 중 하나의 역할만 선택하실 수 있습니다. 두 가지 역할이 모두 필요하신 경우, 별도의 계정을 만들어 사용하셔야 합니다.",
    category: "general"
  },

  // 체험단원 관련
  {
    question: "체험단 선정은 어떻게 이루어지나요?",
    answer: "광고주가 설정한 기준과 지원자의 프로필, 활동 이력 등을 종합적으로 검토하여 선정됩니다. SNS 팔로워 수, 콘텐츠 품질, 활동성 등이 주요 평가 기준이 됩니다.",
    category: "reviewer"
  },
  {
    question: "체험 후 리뷰는 언제까지 작성해야 하나요?",
    answer: "일반적으로 제품 수령 후 7-14일 이내에 리뷰를 작성하셔야 합니다. 정확한 기한은 각 캠페인마다 다르므로, 캠페인 상세 페이지에서 확인해주세요.",
    category: "reviewer"
  },
  {
    question: "리뷰 작성 시 주의사항이 있나요?",
    answer: "솔직하고 상세한 리뷰를 작성해주세요. 사진은 최소 3장 이상 포함하시고, 제품의 장단점을 균형있게 작성해주시면 좋습니다. 허위 리뷰나 과장된 내용은 제재 대상이 될 수 있습니다.",
    category: "reviewer"
  },
  {
    question: "체험 제품을 반납해야 하나요?",
    answer: "대부분의 체험 제품은 반납하지 않으셔도 됩니다. 단, 고가 제품이나 특별한 경우 반납 조건이 있을 수 있으니 캠페인 상세 내용을 꼭 확인해주세요.",
    category: "reviewer"
  },
  {
    question: "포인트는 어떻게 사용하나요?",
    answer: "획득한 포인트는 현금으로 환급받거나, 제휴 쇼핑몰에서 사용하실 수 있습니다. 5,000 포인트 이상부터 환급 신청이 가능하며, 1포인트는 1원의 가치를 가집니다.",
    category: "reviewer"
  },

  // 광고주 관련
  {
    question: "캠페인 등록 비용은 얼마인가요?",
    answer: "베이직, 프로, 엔터프라이즈 3가지 요금제가 있습니다. 베이직은 캠페인당 29만원, 프로는 월 99만원(무제한 캠페인), 엔터프라이즈는 맞춤형 견적으로 제공됩니다.",
    category: "advertiser"
  },
  {
    question: "캠페인 진행 중 수정이 가능한가요?",
    answer: "모집 인원, 마감일 등 일부 항목은 수정 가능합니다. 단, 이미 선정된 체험단원이 있는 경우 제품 내용이나 조건 변경은 제한될 수 있습니다.",
    category: "advertiser"
  },
  {
    question: "체험단원 선정 기준을 설정할 수 있나요?",
    answer: "네, 연령대, 성별, 지역, SNS 팔로워 수 등 다양한 기준을 설정하실 수 있습니다. 타겟 고객층에 맞는 체험단원을 모집하는데 도움이 됩니다.",
    category: "advertiser"
  },
  {
    question: "리뷰 관리는 어떻게 하나요?",
    answer: "광고주 대시보드에서 모든 리뷰를 확인하고 관리하실 수 있습니다. 우수 리뷰에 추가 포인트를 지급하거나, 부적절한 리뷰에 대해 수정 요청을 할 수 있습니다.",
    category: "advertiser"
  },

  // 결제 관련
  {
    question: "결제 수단은 무엇이 있나요?",
    answer: "신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이) 등 다양한 결제 수단을 지원합니다.",
    category: "payment"
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer: "캠페인 시작 전까지는 100% 환불이 가능합니다. 캠페인이 시작된 후에는 진행 상황에 따라 부분 환불이 가능하며, 자세한 내용은 고객센터로 문의해주세요.",
    category: "payment"
  },
  {
    question: "세금계산서 발행이 가능한가요?",
    answer: "네, 사업자 회원의 경우 세금계산서 발행이 가능합니다. 결제 시 요청하시거나 마이페이지에서 신청하실 수 있습니다.",
    category: "payment"
  },

  // 신고/제재
  {
    question: "부정 행위를 발견했을 때 어떻게 신고하나요?",
    answer: "각 캠페인이나 리뷰 페이지의 신고 버튼을 통해 신고하실 수 있습니다. 허위 리뷰, 도용, 부적절한 내용 등을 발견하시면 즉시 신고해주세요.",
    category: "report"
  },
  {
    question: "리뷰를 작성하지 않으면 어떤 제재가 있나요?",
    answer: "선정 후 리뷰를 작성하지 않으면 패널티 포인트가 부과되며, 3회 이상 미작성 시 일정 기간 캠페인 참여가 제한될 수 있습니다.",
    category: "report"
  },
  {
    question: "계정이 정지되었어요. 어떻게 해야 하나요?",
    answer: "계정 정지 사유를 이메일로 안내드렸을 것입니다. 이의가 있으신 경우 고객센터로 문의하시면 재심사를 진행해드립니다.",
    category: "report"
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (question: string) => {
    setOpenItems(prev =>
      prev.includes(question)
        ? prev.filter(item => item !== question)
        : [...prev, question]
    );
  };

  const categories = {
    all: "전체",
    general: "일반",
    reviewer: "체험단원",
    advertiser: "광고주",
    payment: "결제",
    report: "신고/제재"
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">자주 묻는 질문</h1>
        <p className="text-muted-foreground">
          체험스타그램 이용에 대해 자주 문의하시는 내용을 모았습니다.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
          {Object.entries(categories).map(([key, label]) => (
            <TabsTrigger key={key} value={key}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(categories).map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {faqData
              .filter(item => category === "all" || item.category === category)
              .map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <Collapsible
                    open={openItems.includes(item.question)}
                    onOpenChange={() => toggleItem(item.question)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3 text-left">
                          <span className="text-primary font-semibold mt-1">Q</span>
                          <p className="font-medium">{item.question}</p>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform text-muted-foreground ${
                            openItems.includes(item.question) ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 border-t">
                        <div className="flex items-start gap-3 pt-4">
                          <span className="text-primary font-semibold">A</span>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8 p-6 bg-muted/50">
        <h3 className="font-semibold mb-2">원하시는 답변을 찾지 못하셨나요?</h3>
        <p className="text-muted-foreground mb-4">
          고객센터로 문의해주시면 친절하게 답변드리겠습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            이메일 문의: support@experiencestagram.com
          </Button>
          <Button variant="outline">
            전화 문의: 1588-1234
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          운영시간: 평일 09:00 - 18:00 (주말/공휴일 휴무)
        </p>
      </Card>
    </div>
  );
}