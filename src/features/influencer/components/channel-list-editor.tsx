'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { ChannelInput } from '../lib/dto';
import { ChannelFormItem } from './channel-form-item';

type ChannelListEditorProps = {
  value: ChannelInput[];
  onChange: (channels: ChannelInput[]) => void;
};

const emptyChannel: ChannelInput = {
  platform: 'naver',
  channelName: '',
  channelUrl: '',
};

export const ChannelListEditor = ({
  value,
  onChange,
}: ChannelListEditorProps) => {
  const handleAdd = () => {
    onChange([...value, { ...emptyChannel }]);
  };

  const handleRemove = (index: number) => {
    if (value.length <= 1) {
      return;
    }

    const newChannels = value.filter((_, i) => i !== index);
    onChange(newChannels);
  };

  const handleChange = (index: number, channel: ChannelInput) => {
    const newChannels = [...value];
    newChannels[index] = channel;
    onChange(newChannels);
  };

  return (
    <div className="space-y-4">
      {value.map((channel, index) => (
        <ChannelFormItem
          key={index}
          index={index}
          value={channel}
          onChange={(ch) => handleChange(index, ch)}
          onRemove={() => handleRemove(index)}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        채널 추가
      </Button>

      {value.length <= 0 && (
        <p className="text-sm text-destructive">
          최소 1개 이상의 채널이 필요합니다
        </p>
      )}
    </div>
  );
};