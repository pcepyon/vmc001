'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 페이지 타이틀 */}
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <ScrollText className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3">이용약관</h1>
        <p className="text-muted-foreground">
          시행일: 2024년 1월 1일
        </p>
      </div>

      <Card>
        <CardContent className="prose prose-sm max-w-none p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">제1조 (목적)</h2>
            <p className="text-muted-foreground leading-relaxed">
              이 약관은 (주)바이브 마피아단(이하 "회사")이 제공하는 체험지티 서비스(이하 "서비스")의
              이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을
              규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제2조 (정의)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>"서비스"</strong>란 회사가 제공하는 체험단 모집 및 운영 플랫폼 서비스를 의미합니다.</li>
              <li><strong>"회원"</strong>이란 서비스에 가입하여 이용계약을 체결하고 서비스를 이용하는 자를 의미합니다.</li>
              <li><strong>"체험단원"</strong>이란 체험단 활동에 참여하는 회원을 의미합니다.</li>
              <li><strong>"광고주"</strong>란 체험단을 모집하고 운영하는 사업자 회원을 의미합니다.</li>
              <li><strong>"캠페인"</strong>이란 광고주가 등록한 체험단 모집 활동을 의미합니다.</li>
              <li><strong>"콘텐츠"</strong>란 회원이 서비스 내에 게시한 리뷰, 사진, 동영상 등을 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제3조 (약관의 게시와 개정)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</li>
              <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
              <li>약관을 개정할 경우 적용일자 및 개정사유를 명시하여 최소 7일 전에 공지합니다.</li>
              <li>회원이 개정약관에 동의하지 않는 경우 이용계약을 해지할 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제4조 (이용계약 체결)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>이용계약은 회원이 되고자 하는 자가 약관의 내용에 동의한 후 회원가입신청을 하고 회사가 이를 승낙함으로써 체결됩니다.</li>
              <li>회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>가입신청자가 이전에 약관 위반으로 회원자격을 상실한 경우</li>
                  <li>타인의 정보를 도용한 경우</li>
                  <li>허위 정보를 기재한 경우</li>
                  <li>기타 회사가 정한 이용신청 요건이 미비한 경우</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제5조 (회원의 의무)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              회원은 다음 행위를 하여서는 안 됩니다.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>신청 또는 변경 시 허위 내용을 등록하는 행위</li>
              <li>타인의 정보를 도용하는 행위</li>
              <li>회사 또는 제3자의 저작권 등 지적재산권을 침해하는 행위</li>
              <li>회사 또는 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 영리목적으로 이용하는 행위</li>
              <li>체험 제품/서비스를 받고 정당한 사유 없이 리뷰를 작성하지 않는 행위</li>
              <li>허위 또는 과장된 리뷰를 작성하는 행위</li>
              <li>기타 불법적이거나 부당한 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제6조 (체험단 활동)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>체험단원은 캠페인 가이드라인에 따라 성실히 활동해야 합니다.</li>
              <li>체험단원은 제공받은 제품/서비스에 대해 정직한 리뷰를 작성해야 합니다.</li>
              <li>체험단원은 캠페인 기간 내에 리뷰 작성 등 요구되는 미션을 완료해야 합니다.</li>
              <li>미션을 완료하지 않을 경우 향후 체험단 선정에서 불이익을 받을 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제7조 (광고주의 의무)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>광고주는 등록한 캠페인 정보와 실제 제공하는 제품/서비스가 일치해야 합니다.</li>
              <li>광고주는 선정된 체험단원에게 약속한 제품/서비스를 제공해야 합니다.</li>
              <li>광고주는 체험단원의 정직한 리뷰를 존중해야 하며, 리뷰 조작을 요구할 수 없습니다.</li>
              <li>광고주는 관련 법령을 준수하여 캠페인을 운영해야 합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제8조 (콘텐츠의 권리와 책임)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>회원이 작성한 콘텐츠의 저작권은 해당 회원에게 귀속됩니다.</li>
              <li>회사는 서비스 운영, 홍보, 개선을 위해 회원의 콘텐츠를 사용할 수 있습니다.</li>
              <li>회원은 자신이 작성한 콘텐츠가 타인의 권리를 침해하지 않음을 보증합니다.</li>
              <li>회원의 콘텐츠로 인한 법적 문제 발생 시 해당 회원이 책임을 집니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제9조 (서비스 제공의 변경 및 중지)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>회사는 상당한 이유가 있는 경우 서비스의 전부 또는 일부를 수정, 중단, 변경할 수 있습니다.</li>
              <li>서비스 변경 사항은 사전에 공지하며, 중요한 변경의 경우 30일 전에 공지합니다.</li>
              <li>천재지변, 시스템 장애 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제10조 (이용제한 등)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>회사는 회원이 이 약관을 위반하거나 서비스의 정상적인 운영을 방해한 경우 서비스 이용을 제한할 수 있습니다.</li>
              <li>이용제한의 구체적인 기준과 절차는 운영정책에서 정합니다.</li>
              <li>회원은 이용제한에 대해 이의신청을 할 수 있으며, 회사는 이를 검토하여 결과를 통보합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제11조 (계약해제, 해지 등)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>회원은 언제든지 마이페이지를 통해 이용계약 해지를 신청할 수 있습니다.</li>
              <li>회사는 회원이 다음 각 호의 사유에 해당하는 경우 이용계약을 해지할 수 있습니다.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>가입 시 허위 내용을 등록한 경우</li>
                  <li>다른 사람의 서비스 이용을 방해하거나 정보를 도용한 경우</li>
                  <li>서비스를 이용하여 법령 또는 이 약관이 금지하는 행위를 한 경우</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제12조 (손해배상)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>회사는 무료로 제공되는 서비스 이용과 관련하여 회원에게 발생한 손해에 대해 책임을 지지 않습니다.</li>
              <li>회원이 이 약관을 위반하여 회사에 손해를 끼친 경우, 해당 회원은 손해를 배상해야 합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제13조 (면책조항)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>회사는 천재지변 또는 이에 준하는 불가항력으로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
              <li>회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</li>
              <li>회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못한 것에 대하여 책임을 지지 않습니다.</li>
              <li>회사는 회원 간 또는 회원과 제3자 간에 서비스를 매개로 하여 발생한 분쟁에 대해 책임을 지지 않습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제14조 (분쟁해결)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>회사는 회원으로부터 제출되는 불만사항 및 의견을 우선적으로 처리합니다.</li>
              <li>회사와 회원 간 발생한 분쟁은 전자거래기본법에 의해 설치된 전자거래분쟁조정위원회의 조정에 따를 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">제15조 (재판권 및 준거법)</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>서비스 이용과 관련하여 회사와 회원 간 발생한 분쟁에 대한 소송은 서울중앙지방법원을 관할법원으로 합니다.</li>
              <li>회사와 회원 간 제기된 소송에는 대한민국 법을 적용합니다.</li>
            </ol>
          </section>

          <section className="border-t pt-8">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">부칙</h3>
                <p className="text-sm text-muted-foreground">
                  1. 본 약관은 2024년 1월 1일부터 시행됩니다.<br />
                  2. 종전의 약관은 본 약관으로 대체됩니다.
                </p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}