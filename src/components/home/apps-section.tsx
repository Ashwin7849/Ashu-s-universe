'use client';

import { useState, useEffect } from "react";
import type { App } from "@/lib/types";
import { AppCard } from "@/components/home/app-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";

export function AppsSection() {
  const firestore = useFirestore();
  const appsQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'apps'), where('isVisible', '==', true)) : null,
    [firestore]
  );
  const { data: apps, isLoading } = useCollection<App>(appsQuery);

  return (
    <section id="apps" className="py-12 md:py-20 bg-card/20">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My Apps Collection
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-xl">
            A selection of my latest and greatest creations.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {apps?.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
