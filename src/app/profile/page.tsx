'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Cake, GraduationCap } from "lucide-react";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import type { DeveloperProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const firestore = useFirestore();
  // Fetch from the developer_profiles collection. Since there's only one, we can just grab the first doc.
  const profileCollectionRef = useMemoFirebase(() => firestore ? collection(firestore, 'developer_profiles') : null, [firestore]);
  const { data: profiles, isLoading } = useCollection<DeveloperProfile>(profileCollectionRef);

  // Assuming there is only one developer profile for this site.
  const developerProfile = profiles?.[0];

  const profileImage = PlaceHolderImages.find(
    (img) => img.id === developerProfile?.avatar
  );

  const profileDetails = developerProfile ? [
    { icon: GraduationCap, label: "Education", value: developerProfile.education },
    { icon: MapPin, label: "Location", value: developerProfile.location },
    { icon: Cake, label: "Birthday", value: developerProfile.birthday },
  ].filter(detail => detail.value) : [];

  if (isLoading || !developerProfile) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container py-12 md:py-20">
            <Card className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="relative pt-20 text-center">
                 <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
                 </div>
              </div>
              <CardContent className="mt-6">
                 <Skeleton className="h-8 w-48 mx-auto mt-2" />
                 <Skeleton className="h-4 w-32 mx-auto mt-2" />
                <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="space-y-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                  <div className="space-y-6">
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-20">
          <Card className="overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-primary to-accent">
              <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2">
                {profileImage && developerProfile?.name && (
                  <Image
                    src={profileImage.imageUrl}
                    alt={developerProfile.name}
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-background object-cover"
                    data-ai-hint={profileImage.imageHint}
                  />
                )}
              </div>
            </div>
            
            <div className="pt-20 text-center">
              <h1 className="text-3xl font-bold">{developerProfile.name}</h1>
              <p className="text-muted-foreground">{developerProfile.username}</p>
            </div>

            <CardContent className="mt-6">
              <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {developerProfile.bio && (
                    <div>
                        <h3 className="text-lg font-semibold text-primary">About Me</h3>
                        <p className="mt-2 text-muted-foreground">{developerProfile.bio}</p>
                    </div>
                  )}
                   {developerProfile.quote && (
                    <div>
                        <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground">
                        "{developerProfile.quote}"
                        </blockquote>
                    </div>
                  )}
                  {profileDetails.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-primary">Details</h3>
                        <ul className="mt-2 space-y-2 text-muted-foreground">
                        {profileDetails.map((detail) => (
                            <li key={detail.label} className="flex items-center">
                            <detail.icon className="h-4 w-4 mr-2 text-primary" />
                            <span>{detail.value}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                   {developerProfile.skills && developerProfile.skills.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-primary">Skills & Technologies</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                        {developerProfile.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                        </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
