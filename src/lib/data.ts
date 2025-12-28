import type { App, DeveloperProfile, SocialLink } from "@/lib/types";
import {
  YoutubeIcon,
  InstagramIcon,
  TelegramIcon,
  WhatsappIcon,
} from "@/components/icons";

export const apps: App[] = [
  {
    id: "1",
    name: "CosmoNote",
    description: "Your next-gen note-taking app, powered by AI.",
    version: "2.1.0",
    size: "55 MB",
    icon: "app-icon-1",
    downloadUrl: "#",
    projectUrl: "#",
    tag: "UPDATED",
    downloads: 12500,
    isVisible: true,
  },
  {
    id: "2",
    name: "Galactic Grid",
    description: "A strategic puzzle game set in the depths of space.",
    version: "1.5.2",
    size: "120 MB",
    icon: "app-icon-2",
    downloadUrl: "#",
    tag: "HOT",
    downloads: 48300,
    isVisible: true,
  },
  {
    id: "3",
    name: "Stellar Share",
    description: "Connect and share moments across the universe.",
    version: "3.0.1",
    size: "80 MB",
    icon: "app-icon-3",
    downloadUrl: "#",
    projectUrl: "#",
    tag: "NEW",
    downloads: 5200,
    isVisible: true,
  },
  {
    id: "4",
    name: "Orion Optimizer",
    description: "Keep your device running at light speed.",
    version: "4.2.0",
    size: "25 MB",
    icon: "app-icon-4",
    downloadUrl: "#",
    downloads: 31000,
    isVisible: false,
  },
];

export const socialLinks: SocialLink[] = [
  { name: "WhatsApp", url: "#", icon: WhatsappIcon },
  { name: "Telegram", url: "#", icon: TelegramIcon },
  { name: "Instagram", url: "#", icon: InstagramIcon },
  { name: "YouTube", url: "#", icon: YoutubeIcon },
];

export const developerProfile: DeveloperProfile = {
  name: "Ashu",
  username: "@Ashu000",
  avatar: "profile-pic",
  bio: "Full-stack developer and UI/UX designer with a passion for creating beautiful, functional, and user-centered digital experiences. Welcome to my universe of apps.",
  quote: "Striving to build things that make a difference.",
  skills: [
    "Next.js",
    "React",
    "Firebase",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX Design",
    "Figma",
  ],
  education: "B.Tech in Computer Science",
  location: "Milky Way Galaxy",
  birthday: "October 26",
};
