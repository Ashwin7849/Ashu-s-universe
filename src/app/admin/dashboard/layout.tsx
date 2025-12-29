'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Header } from '@/components/shared/header';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    // If user loading is finished and there's no user, redirect to login
    if (!isUserLoading && !user) {
      router.replace('/admin');
      return;
    }
    
    // If we have a user, check for admin role
    if (user && firestore) {
      const checkAdminStatus = async () => {
        try {
          const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
          const adminDoc = await getDoc(adminRoleRef);
          setIsAdmin(adminDoc.exists());
        } catch (error) {
            console.error("Error checking admin status:", error);
            setIsAdmin(false); // Assume not admin on error
        }
      };
      checkAdminStatus();
    }
  }, [user, isUserLoading, firestore, router]);

  // Show a loading skeleton while checking auth and admin status
  if (isUserLoading || isAdmin === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
           <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
      </div>
    );
  }

  // If user is not an admin, show unauthorized message
  if (!isAdmin) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-center">
        <ShieldAlert className="h-16 w-16 text-destructive" />
        <h1 className="mt-4 text-3xl font-bold">Unauthorized</h1>
        <p className="mt-2 text-muted-foreground">
          You do not have permission to view this page.
        </p>
        <Button onClick={() => router.replace('/admin')} className="mt-6">
          Go to Login
        </Button>
      </div>
    );
  }
  
  // If user is an admin, render the dashboard
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
