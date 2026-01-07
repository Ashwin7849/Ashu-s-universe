'use client';

import { useMemo } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { WebsiteSettings } from '@/lib/types';
import { YoutubeIcon, InstagramIcon, TelegramIcon, WhatsappIcon } from "@/components/icons";

export function Footer() {
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'website_settings', 'global') : null, [firestore]);
  const { data: settings } = useDoc<WebsiteSettings>(settingsRef);

  const socialLinks = useMemo(() => [
    { name: "WhatsApp", url: settings?.whatsappChannelLink, icon: WhatsappIcon },
    { name: "Telegram", url: settings?.telegramChannelLink, icon: TelegramIcon },
    { name: "Instagram", url: settings?.instagramLink, icon: InstagramIcon },
    { name: "YouTube", url: settings?.youtubeLink, icon: YoutubeIcon },
  ].filter(link => link.url), [settings]);

  return (
    <footer className="w-full border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-2 px-8 md:items-start md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} Ashu's Universe. All rights reserved.
          </p>
          <p className="text-center text-xs text-muted-foreground md:text-left">
            App Credit: madxabhi
          </p>
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <Button key={link.name} variant="ghost" size="icon" asChild>
              <Link href={link.url!} target="_blank">
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
