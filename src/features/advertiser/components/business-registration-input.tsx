'use client';

import { Input } from '@/components/ui/input';
import { formatBusinessNumber } from '@/lib/validation';

type BusinessRegistrationInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export const BusinessRegistrationInput = ({
  value,
  onChange,
  error,
}: BusinessRegistrationInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');

    if (raw.length <= 10) {
      onChange(raw);
    }
  };

  const displayValue = formatBusinessNumber(value);

  return (
    <div className="space-y-2">
      <Input
        value={displayValue}
        onChange={handleChange}
        placeholder="123-45-67890"
        maxLength={12}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};