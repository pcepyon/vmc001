'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useLogout } from '@/features/auth/hooks/useLogout';
import {
  Home,
  User,
  LogIn,
  LogOut,
  UserPlus,
  Briefcase,
  FileText,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const Header = () => {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 & 홈 링크 */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary">체험단</span>
              <span className="text-gray-700">플랫폼</span>
            </Link>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  홈
                </Button>
              </Link>

              {user && (
                <>
                  <Link href="/my-applications">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <FileText className="w-4 h-4" />
                      내 지원목록
                    </Button>
                  </Link>

                  <Link href="/advertiser/campaigns">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Briefcase className="w-4 h-4" />
                      체험단 관리
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* 오른쪽 버튼들 */}
          <div className="flex items-center gap-2">
            {/* 데스크톱 버튼 */}
            <div className="hidden md:flex items-center gap-2">
              {isLoading ? (
                <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-md" />
              ) : user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <User className="w-4 h-4" />
                        <span>{(user.userMetadata?.name as string) || user.email}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <Link href="/my-applications">
                          내 지원목록
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/advertiser/campaigns">
                          체험단 관리
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 focus:text-red-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="gap-2">
                      <LogIn className="w-4 h-4" />
                      로그인
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="gap-2">
                      <UserPlus className="w-4 h-4" />
                      회원가입
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* 모바일 메뉴 버튼 */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-2">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="w-4 h-4" />
                  홈
                </Button>
              </Link>

              {user ? (
                <>
                  <Link href="/my-applications" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <FileText className="w-4 h-4" />
                      내 지원목록
                    </Button>
                  </Link>

                  <Link href="/advertiser/campaigns" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Briefcase className="w-4 h-4" />
                      체험단 관리
                    </Button>
                  </Link>

                  <div className="border-t my-2 pt-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-red-600"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      로그아웃
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <LogIn className="w-4 h-4" />
                      로그인
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <UserPlus className="w-4 h-4" />
                      회원가입
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};