'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">체험단 플랫폼</h3>
            <p className="text-sm">
              광고주와 인플루언서를 연결하는
              <br />
              최고의 체험단 매칭 서비스
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">빠른 링크</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-white transition-colors">
                  이용 가이드
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>

          {/* 광고주 메뉴 */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">광고주</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  광고주 등록
                </Link>
              </li>
              <li>
                <Link href="/advertiser/guide" className="hover:text-white transition-colors">
                  광고주 가이드
                </Link>
              </li>
              <li>
                <Link href="/advertiser/campaigns" className="hover:text-white transition-colors">
                  체험단 관리
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">고객 지원</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@example.com" className="hover:text-white transition-colors">
                  support@example.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:02-1234-5678" className="hover:text-white transition-colors">
                  02-1234-5678
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  서울특별시 강남구
                  <br />
                  테헤란로 123
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {currentYear} 체험단 플랫폼. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="hover:text-white transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/business" className="hover:text-white transition-colors">
                사업자정보
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};