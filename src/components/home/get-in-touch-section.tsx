'use client';

import { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { WebsiteSettings } from '@/lib/types';
import { YoutubeIcon, InstagramIcon, TelegramIcon, WhatsappIcon } from "@/components/icons";

export function GetInTouchSection() {
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
    <section className="py-12 md:py-20">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Get In Touch
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-xl">
          Follow my channels for updates, announcements, and more.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {socialLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              className="min-w-[150px] text-base py-6"
              asChild
            >
              <Link href={link.url!} target="_blank">
                <link.icon className="mr-2 h-5 w-5" />
                {link.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
