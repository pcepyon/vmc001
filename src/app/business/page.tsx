'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, MapPin, Phone, FileText, Shield, Calendar, User } from 'lucide-react';

export default function BusinessPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 페이지 타이틀 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3">사업자 정보</h1>
        <p className="text-muted-foreground">
          체험지티 서비스를 운영하는 회사의 사업자 정보입니다.
        </p>
      </div>

      {/* 회사 기본 정보 카드 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            회사 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">상호명</p>
              <p className="font-medium">(주)바이브 마피아단</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">대표자</p>
              <p className="font-medium">알 카포네</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">설립일</p>
              <p className="font-medium">2020년 3월 1일</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">업종</p>
              <p className="font-medium">소프트웨어 개발 및 공급업</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사업자 등록 정보 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            사업자 등록 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">사업자등록번호</p>
              <p className="font-medium">123-45-67890</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">법인등록번호</p>
              <p className="font-medium">110111-1234567</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground mb-1">개업일자</p>
              <p className="font-medium">2020년 3월 1일</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground mb-1">사업장 주소</p>
              <p className="font-medium">서울특별시 강남구 테헤란로 123, 15층 (역삼동, 테헤란빌딩)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 연락처 정보 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            연락처 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">대표전화</p>
                <p className="font-medium">02-1234-5678</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">이메일</p>
                <p className="font-medium">contact@vibemafia.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">고객센터</p>
                <p className="font-medium">1588-1234</p>
                <p className="text-sm text-muted-foreground">평일 09:00 - 18:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">제휴문의</p>
                <p className="font-medium">partner@experiencegt.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 통신판매업 신고 정보 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            통신판매업 신고 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">통신판매업 신고번호</p>
              <p className="font-medium">2020-서울강남-1234</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">신고일자</p>
              <p className="font-medium">2020년 3월 15일</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground mb-1">호스팅 서비스 제공자</p>
              <p className="font-medium">Amazon Web Services (AWS)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 개인정보보호 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            개인정보보호
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">개인정보보호책임자</p>
            <p className="font-medium">김철수</p>
            <p className="text-sm text-muted-foreground mt-1">privacy@experiencegt.com</p>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              체험지티는 고객님의 개인정보를 소중히 보호하며, 관련 법령에 따라 안전하게 관리하고 있습니다.
              자세한 내용은 개인정보처리방침을 참고해 주시기 바랍니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 하단 안내 */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          위 정보는 전자상거래 등에서의 소비자보호에 관한 법률에 따라 공개하는 사업자 정보입니다.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          최종 업데이트: 2024년 1월 1일
        </p>
      </div>
    </div>
  );
}