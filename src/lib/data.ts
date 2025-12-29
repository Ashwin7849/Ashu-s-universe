import type { App, DeveloperProfile, SocialLink } from "@/lib/types";
import {
  YoutubeIcon,
  InstagramIcon,
  TelegramIcon,
  WhatsappIcon,
} from "@/components/icons";

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
