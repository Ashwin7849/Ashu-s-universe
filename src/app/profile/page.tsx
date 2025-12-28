import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { developerProfile } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Cake, GraduationCap } from "lucide-react";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export default function ProfilePage() {
  const profileImage = PlaceHolderImages.find(
    (img) => img.id === developerProfile.avatar
  );

  const profileDetails = [
    { icon: GraduationCap, label: "Education", value: developerProfile.education },
    { icon: MapPin, label: "Location", value: developerProfile.location },
    { icon: Cake, label: "Birthday", value: developerProfile.birthday },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-20">
          <Card className="overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-primary to-accent">
              <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2">
                {profileImage && (
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
                  <div>
                    <h3 className="text-lg font-semibold text-primary">About Me</h3>
                    <p className="mt-2 text-muted-foreground">{developerProfile.bio}</p>
                  </div>
                   <div>
                    <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground">
                      "{developerProfile.quote}"
                    </blockquote>
                  </div>
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
                </div>

                <div className="space-y-6">
                   <div>
                    <h3 className="text-lg font-semibold text-primary">Skills & Technologies</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {developerProfile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
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
