'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

type TermsAgreementProps = {
  value: boolean;
  onChange: (checked: boolean) => void;
  termsType: string;
  label: string;
  url?: string;
  required?: boolean;
};

export const TermsAgreement = ({
  value,
  onChange,
  termsType,
  label,
  url,
  required = false,
}: TermsAgreementProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`terms-${termsType}`}
        checked={value}
        onCheckedChange={onChange}
      />
      <Label
        htmlFor={`terms-${termsType}`}
        className="flex items-center gap-2 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {required && <span className="text-red-500">*</span>}
        <span>{label}</span>
        {url && (
          <Link
            href={url}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            보기
          </Link>
        )}
      </Label>
    </div>
  );
};