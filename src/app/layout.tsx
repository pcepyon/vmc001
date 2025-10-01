import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { loadCurrentUser } from "@/features/auth/server/load-current-user";
import { CurrentUserProvider } from "@/features/auth/context/current-user-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "블로그 체험단 플랫폼",
  description: "광고주와 인플루언서를 연결하는 체험단 매칭 플랫폼",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await loadCurrentUser();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <Providers>
          <CurrentUserProvider initialState={currentUser}>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CurrentUserProvider>
        </Providers>
      </body>
    </html>
  );
}
