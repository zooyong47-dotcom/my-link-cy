export interface SocialLink {
  id: string;
  platform: 'instagram' | 'youtube' | 'github' | 'twitter' | 'tiktok' | 'threads' | 'email' | 'blog' | 'linkedin' | 'discord';
  url: string;
  enabled: boolean;
}

export interface CustomLink {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  clicks?: number;
  highlight?: boolean;
  subtitle?: string;
  icon?: string;
}

export interface ThemeConfig {
  presetId: string;
  name: string;
  backgroundClass: string;
  textColor: string;
  subTextColor: string;
  cardBg: string;
  cardBorder: string;
  buttonStyle: 'rounded' | 'pill' | 'sharp' | 'outline' | 'shadow' | 'glass';
  buttonBg: string;
  buttonText: string;
  buttonBorder?: string;
  buttonShadow?: string;
  accentColor: string;
}

export interface MyLinkProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  badge?: string;
  theme: ThemeConfig;
  socials: SocialLink[];
  links: CustomLink[];
  updatedAt?: string;
}
