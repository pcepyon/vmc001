'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import type { ChannelInput } from '../lib/dto';
import { SUPPORTED_PLATFORMS } from '../constants/platforms';

type ChannelFormItemProps = {
  index: number;
  value: ChannelInput;
  onChange: (value: ChannelInput) => void;
  onRemove: () => void;
};

export const ChannelFormItem = ({
  index,
  value,
  onChange,
  onRemove,
}: ChannelFormItemProps) => {
  const platformInfo = SUPPORTED_PLATFORMS.find(
    (p) => p.value === value.platform,
  );

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">채널 {index + 1}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">플랫폼</label>
        <Select
          value={value.platform}
          onValueChange={(val) =>
            onChange({ ...value, platform: val as ChannelInput['platform'] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="플랫폼 선택" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_PLATFORMS.map((platform) => (
              <SelectItem key={platform.value} value={platform.value}>
                {platform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">채널명</label>
        <Input
          value={value.channelName}
          onChange={(e) =>
            onChange({ ...value, channelName: e.target.value })
          }
          placeholder="채널명을 입력하세요"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">채널 URL</label>
        <Input
          value={value.channelUrl}
          onChange={(e) => onChange({ ...value, channelUrl: e.target.value })}
          placeholder={platformInfo?.placeholder ?? 'URL을 입력하세요'}
        />
      </div>
    </div>
  );
};