const stats = [
  { value: "50K+", label: "Downloads" },
  { value: "5K+", label: "Active Users" },
  { value: "20K+", label: "Positive Reviews" },
  { value: "99.9%", label: "Uptime" },
];

export function StatsSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl">
                {stat.value}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
