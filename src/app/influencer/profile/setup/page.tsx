'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileSetupForm } from '@/features/influencer/components/profile-setup-form';

type ProfileSetupPageProps = {
  params: Promise<Record<string, never>>;
};

export default function ProfileSetupPage({ params }: ProfileSetupPageProps) {
  void params;

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            인플루언서 정보 등록
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileSetupForm />
        </CardContent>
      </Card>
    </div>
  );
}