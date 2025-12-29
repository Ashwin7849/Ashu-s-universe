
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AppFormSheet } from '@/components/admin/app-form-sheet';
import type { App as AppType } from '@/lib/types';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Skeleton } from '../ui/skeleton';

export function AppsTable() {
  const firestore = useFirestore();
  const appsCollection = useMemoFirebase(() => firestore ? collection(firestore, 'apps') : null, [firestore]);
  const { data: apps, isLoading } = useCollection<AppType>(appsCollection);
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppType | undefined>(undefined);
  const { toast } = useToast();

  const handleAddNew = () => {
    setEditingApp(undefined);
    setIsSheetOpen(true);
  };

  const handleEdit = (app: AppType) => {
    setEditingApp(app);
    setIsSheetOpen(true);
  };
  
  const handleDelete = (appId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'apps', appId);
    deleteDocumentNonBlocking(docRef);
    toast({ title: "Success", description: "App deleted successfully." });
  };
  
  const handleToggleVisibility = (app: AppType) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'apps', app.id);
    updateDocumentNonBlocking(docRef, { isVisible: !app.isVisible });
    toast({ title: "Success", description: "App visibility updated." });
  };

  const handleSave = async (appData: AppType) => {
    if (!firestore) return;

    if (editingApp || appData.id.startsWith("temp_")) {
      // Update existing app or a new app that has a temporary ID
      const { id, ...dataToUpdate } = appData;
      if (editingApp) {
        const docRef = doc(firestore, 'apps', id);
        updateDocumentNonBlocking(docRef, dataToUpdate);
        toast({ title: "Success", description: "App updated successfully." });
      } else {
         const appsCollectionRef = collection(firestore, 'apps');
         try {
            const newDocRef = await addDocumentNonBlocking(appsCollectionRef, dataToUpdate);
            if (newDocRef) {
                updateDocumentNonBlocking(newDocRef, { id: newDocRef.id });
            }
            toast({ title: "Success", description: "App added successfully." });
         } catch (e) {
            toast({ variant: "destructive", title: "Error", description: "Failed to add app." });
         }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Apps</CardTitle>
            <CardDescription>Manage your apps and view their performance.</CardDescription>
          </div>
          <Button size="sm" className="gap-1" onClick={handleAddNew}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add App</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Icon</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Downloads</TableHead>
              <TableHead className="hidden md:table-cell">Version</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="hidden sm:table-cell">
                     <Skeleton className="h-16 w-16 rounded-md" />
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              apps?.map(app => {
                const appImage = PlaceHolderImages.find((img) => img.id === app.icon);
                const iconSrc = app.iconUrl || appImage?.imageUrl;

                return (
                  <TableRow key={app.id}>
                    <TableCell className="hidden sm:table-cell">
                      {iconSrc &&
                        <Image
                          alt={`${app.name} icon`}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={iconSrc}
                          width="64"
                          data-ai-hint={appImage?.imageHint}
                        />
                      }
                    </TableCell>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>
                      <Badge variant={app.isVisible ? "outline" : "secondary"}>
                        {app.isVisible ? 'Visible' : 'Hidden'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{(app.downloadCount || 0).toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">v{app.version}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(app)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleVisibility(app)}>
                            {app.isVisible ? 'Hide' : 'Show'}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(app.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
      <AppFormSheet 
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        app={editingApp}
        onSave={handleSave}
      />
    </Card>
  );
}
