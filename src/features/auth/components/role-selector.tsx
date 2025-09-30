'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Role = 'influencer' | 'advertiser';

type RoleSelectorProps = {
  value: Role | null;
  onChange: (role: Role) => void;
};

const roles: Array<{ value: Role; label: string; description: string }> = [
  {
    value: 'influencer',
    label: '인플루언서',
    description: '체험단에 지원하고 리뷰를 작성합니다',
  },
  {
    value: 'advertiser',
    label: '광고주',
    description: '체험단을 모집하고 관리합니다',
  },
];

export const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {roles.map((role) => (
        <Card
          key={role.value}
          className={cn(
            'cursor-pointer p-6 transition-all hover:border-primary',
            value === role.value && 'border-primary bg-primary/5',
          )}
          onClick={() => onChange(role.value)}
        >
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{role.label}</h3>
            <p className="text-sm text-muted-foreground">{role.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};