import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/data";
import Link from "next/link";

export function GetInTouchSection() {
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
              <Link href={link.url} target="_blank">
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
