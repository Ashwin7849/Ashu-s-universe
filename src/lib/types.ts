import type { StaticImageData } from "next/image";

export type AppTag = "NEW" | "UPDATED" | "HOT";

export type App = {
  id: string;
  name: string;
  description: string;
  version: string;
  size: string;
  icon: string; // id from placeholder-images.json
  iconUrl?: string; // Data URL for custom uploaded icon
  downloadUrl: string;
  projectUrl?: string;
  tag?: AppTag;
  downloads: number;
  isVisible: boolean;
};

export type SocialLink = {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type DeveloperProfile = {
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

// This represents the data structure for a user's role document in Firestore.
// It's used for client-side type safety when checking admin status.
export type AdminRole = {
  isAdmin: boolean;
};
