export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-background"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -z-20 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
       <div
        className="absolute top-1/4 right-1/4 -z-20 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Welcome to</span>
          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ASHU&apos;s UNIVERSE
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Discover a collection of curated apps, tools, and projects.
          <br />
          Built with passion, designed for you.
        </p>
      </div>
    </section>
  );
}
