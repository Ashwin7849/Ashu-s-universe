
import Image from "next/image";
import Link from "next/link";
import type { App } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Globe, Send } from "lucide-react";

type AppCardProps = {
  app: App;
};

export function AppCard({ app }: AppCardProps) {
  const appImage = PlaceHolderImages.find((img) => img.id === app.icon);
  const iconSrc = app.iconUrl || appImage?.imageUrl;

  const isDataUrl = app.downloadLink?.startsWith('data:');
  const downloadFilename = isDataUrl ? `${app.name.replace(/\s+/g, '_')}_v${app.version}.apk` : undefined;
  
  const mainActionLink = app.downloadLink && app.downloadLink !== '#' ? app.downloadLink : app.websiteLink;
  const mainActionText = app.downloadLink && app.downloadLink !== '#' ? `Download (${(app.downloadCount || 0).toLocaleString()})` : "Visit Website";
  const MainActionIcon = app.downloadLink && app.downloadLink !== '#' ? Download : Globe;
  

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      {app.tag && (
        <Badge
          className="absolute top-3 right-3 z-10"
          variant={
            app.tag === "NEW"
              ? "default"
              : app.tag === "HOT"
              ? "destructive"
              : "secondary"
          }
        >
          {app.tag}
        </Badge>
      )}
      <CardHeader className="flex-row items-center gap-4 p-4">
        {iconSrc && (
          <Image
            src={iconSrc}
            alt={`${app.name} icon`}
            width={64}
            height={64}
            className="rounded-lg"
            data-ai-hint={appImage?.imageHint}
          />
        )}
        <div className="flex-1">
          <CardTitle className="text-lg">{app.name}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">v{app.version}</Badge>
            <Badge variant="outline">{app.size}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <CardDescription>{app.shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2 p-4 pt-0">
        {mainActionLink && (
            <Button asChild>
            <a href={mainActionLink} download={downloadFilename} target={isDataUrl ? '_self' : '_blank'}>
                <MainActionIcon className="mr-2 h-4 w-4" />
                {mainActionText}
            </a>
            </Button>
        )}
        
        {app.telegramLink && (
        <Button variant="secondary" asChild className="flex-1">
            <Link href={app.telegramLink} target="_blank">
            <Send className="mr-2 h-4 w-4" />
            Telegram
            </Link>
        </Button>
        )}
      </CardFooter>
    </Card>
  );
}
