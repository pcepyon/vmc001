export type Platform = 'naver' | 'youtube' | 'instagram' | 'threads';

export type PlatformInfo = {
  value: Platform;
  label: string;
  urlPattern: RegExp;
  placeholder: string;
};

export const SUPPORTED_PLATFORMS: PlatformInfo[] = [
  {
    value: 'naver',
    label: '네이버 블로그',
    urlPattern: /^https?:\/\/(blog\.naver\.com|m\.blog\.naver\.com)\/.+/,
    placeholder: 'https://blog.naver.com/your-blog',
  },
  {
    value: 'youtube',
    label: '유튜브',
    urlPattern: /^https?:\/\/(www\.)?youtube\.com\/@.+/,
    placeholder: 'https://youtube.com/@your-channel',
  },
  {
    value: 'instagram',
    label: '인스타그램',
    urlPattern: /^https?:\/\/(www\.)?instagram\.com\/.+/,
    placeholder: 'https://instagram.com/your-account',
  },
  {
    value: 'threads',
    label: '스레드',
    urlPattern: /^https?:\/\/(www\.)?threads\.net\/@.+/,
    placeholder: 'https://threads.net/@your-account',
  },
];