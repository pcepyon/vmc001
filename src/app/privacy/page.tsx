'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 페이지 타이틀 */}
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3">개인정보처리방침</h1>
        <p className="text-muted-foreground">
          시행일: 2024년 1월 1일
        </p>
      </div>

      <Card>
        <CardContent className="prose prose-sm max-w-none p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">제1조 (개인정보의 처리목적)</h2>
            <p className="text-muted-foreground leading-relaxed">
              (주)바이브 마피아단(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
              이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
              <li>회원 가입 및 관리: 회원자격 유지・관리, 서비스 부정이용 방지, 각종 고지・통지 등</li>
              <li>체험단 서비스 제공: 체험단 모집, 선정, 체험 활동 관리, 리뷰 관리 등</li>
              <li>광고주 서비스 제공: 캠페인 등록, 관리, 체험단원 매칭, 결과 리포트 제공 등</li>
              <li>마케팅 및 광고: 이벤트 및 광고성 정보 제공, 참여기회 제공 등</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제2조 (개인정보의 처리 및 보유기간)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 법령에 따른 개인정보 보유・이용기간 또는 정보주체로부터 개인정보 수집 시에
              동의받은 개인정보 보유・이용기간 내에서 개인정보를 처리・보유합니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
              <li>회원정보: 회원 탈퇴 시까지</li>
              <li>체험단 활동 기록: 서비스 제공 완료 후 3년</li>
              <li>전자상거래 관련 기록: 5년 (전자상거래법)</li>
              <li>접속 로그 기록: 3개월 (통신비밀보호법)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제3조 (개인정보의 제3자 제공)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 원칙적으로 정보주체의 개인정보를 제1조에서 명시한 목적 범위 내에서 처리하며,
              정보주체의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다.
              다만, 다음의 경우에는 개인정보를 제3자에게 제공할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
              <li>정보주체가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나 수사기관의 요구가 있는 경우</li>
              <li>체험단 선정 시 해당 광고주에게 필요 최소한의 정보 제공</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제4조 (개인정보처리의 위탁)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 원활한 서비스 제공을 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">위탁받는 자</th>
                    <th className="text-left py-2">위탁 업무 내용</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 pr-4">Amazon Web Services</td>
                    <td className="py-2">클라우드 서버 운영 및 관리</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Supabase</td>
                    <td className="py-2">데이터베이스 관리 및 인증 서비스</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">(주)토스페이먼츠</td>
                    <td className="py-2">결제 처리 및 정산</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제5조 (정보주체의 권리・의무 및 행사방법)</h2>
            <p className="text-muted-foreground leading-relaxed">
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제6조 (처리하는 개인정보 항목)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 다음의 개인정보 항목을 처리하고 있습니다.
            </p>
            <div className="mt-3 space-y-3">
              <div>
                <h3 className="font-medium mb-2">필수항목</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>이메일, 비밀번호, 이름, 휴대폰번호</li>
                  <li>체험단원: SNS 계정 정보, 주소</li>
                  <li>광고주: 사업자등록번호, 회사명, 대표자명</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">선택항목</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>프로필 사진, 관심 카테고리, 선호 지역</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">자동 수집 항목</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>IP 주소, 쿠키, 서비스 이용 기록, 방문 기록</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제7조 (개인정보의 파기)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
              <li>파기절차: 불필요한 개인정보는 개인정보 보호책임자의 승인을 받아 파기합니다.</li>
              <li>파기기한: 개인정보 보유기간이 경과하거나 처리목적이 달성된 경우 지체없이 파기합니다.</li>
              <li>파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제8조 (개인정보의 안전성 확보조치)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
              <li>개인정보 취급 직원의 최소화 및 교육</li>
              <li>개인정보의 암호화</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보에 대한 접근 제한</li>
              <li>접속기록의 보관 및 위변조 방지</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제9조 (개인정보 보호책임자)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
              정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="mt-3 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">개인정보 보호책임자</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>성명: 김철수</li>
                <li>직책: 개인정보보호팀장</li>
                <li>이메일: privacy@vibemafia.com</li>
                <li>연락처: 02-1234-5678</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제10조 (개인정보 처리방침 변경)</h2>
            <p className="text-muted-foreground leading-relaxed">
              이 개인정보 처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의
              추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          <section className="border-t pt-8">
            <p className="text-sm text-muted-foreground text-center">
              본 개인정보처리방침은 2024년 1월 1일부터 시행됩니다.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}