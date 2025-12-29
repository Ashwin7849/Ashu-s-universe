'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { ProfileData } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function SettingsPage() {
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'website_settings', 'global') : null, [firestore]);
  const { data: settings, isLoading: isDocLoading } = useDoc<ProfileData>(settingsRef);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<ProfileData>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [skillsString, setSkillsString] = useState('');

  useEffect(() => {
    if (settings) {
      setFormData(settings);
      if (Array.isArray(settings.skills)) {
        setSkillsString(settings.skills.join(', '));
      }
    }
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsString(e.target.value);
  };


  const handleSave = async () => {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore not available.' });
      return;
    }
    setIsSaving(true);
    
    const dataToSave = {
      ...formData,
      skills: skillsString.split(',').map(s => s.trim()).filter(s => s),
    };

    try {
      const docRef = doc(firestore, 'website_settings', 'global');
      updateDocumentNonBlocking(docRef, dataToSave); 
      toast({ title: 'Success!', description: 'Your settings have been saved.' });
    } catch (error) {
      console.error("Error saving settings: ", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save settings.' });
    } finally {
      setIsSaving(false);
    }
  };

  const selectedAvatarPreview = PlaceHolderImages.find(p => p.id === formData.avatar)?.imageUrl;
  
  if (isDocLoading) {
      return (
          <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
          </div>
      )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your public profile information and social links.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Developer Profile</CardTitle>
          <CardDescription>This information will be displayed on your public profile page.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name || ''} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={formData.username || ''} onChange={handleInputChange} placeholder="@yourhandle" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <Select onValueChange={(value) => handleSelectChange('avatar', value)} value={formData.avatar}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an avatar" />
                </SelectTrigger>
                <SelectContent>
                  {PlaceHolderImages.filter(p => p.id.startsWith('profile')).map(image => (
                    <SelectItem key={image.id} value={image.id}>
                      {image.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedAvatarPreview && (
              <div className="flex justify-center">
                <Image 
                  src={selectedAvatarPreview}
                  alt="Avatar preview"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={formData.bio || ''} onChange={handleInputChange} placeholder="Tell us a little bit about yourself" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="quote">Favorite Quote</Label>
            <Input id="quote" value={formData.quote || ''} onChange={handleInputChange} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="skills">Skills & Technologies</Label>
            <Input id="skills" value={skillsString} onChange={handleSkillsChange} placeholder="Comma-separated, e.g., React, Next.js, Firebase"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input id="education" value={formData.education || ''} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={formData.location || ''} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday</Label>
              <Input id="birthday" value={formData.birthday || ''} onChange={handleInputChange} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Links to your social media channels for the footer and contact section.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappChannelLink">WhatsApp URL</Label>
              <Input id="whatsappChannelLink" type="url" value={formData.whatsappChannelLink || ''} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegramChannelLink">Telegram URL</Label>
              <Input id="telegramChannelLink" type="url" value={formData.telegramChannelLink || ''} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagramLink">Instagram URL</Label>
              <Input id="instagramLink" type="url" value={formData.instagramLink || ''} onChange={handleInputChange} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="youtubeLink">YouTube URL</Label>
              <Input id="youtubeLink" type="url" value={formData.youtubeLink || ''} onChange={handleInputChange} />
            </div>
          </div>
        </CardContent>
      </Card>


      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
    </div>
  );
}
