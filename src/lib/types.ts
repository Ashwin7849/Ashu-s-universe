import type { StaticImageData } from "next/image";

export type AppTag = "NEW" | "UPDATED" | "HOT";

export type App = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  version: string;
  size: string;
  icon: string; // id from placeholder-images.json
  iconUrl?: string; // Data URL for custom uploaded icon
  downloadLink: string;
  telegramLink?: string;
  websiteLink?: string;
  tag?: AppTag;
  downloadCount: number;
  isVisible: boolean;
};

export type SocialLink = {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type DeveloperProfile = {
  id?: string; // UID from Firebase Auth
  name: string;
  username: string;
  avatar: string; // id from placeholder-images.json
  bio: string;
  quote: string;
  skills: string[];
  education: string;
  location: string;
  birthday: string;
};

export type AdminRole = {
  isAdmin: boolean;
};

export type WebsiteSettings = {
  id?: string; // Should be 'global'
  whatsappChannelLink?: string;
  telegramChannelLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
}

export type ProfileData = DeveloperProfile & WebsiteSettings;
