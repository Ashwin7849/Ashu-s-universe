
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { App, AppTag } from '@/lib/types';
import { Sparkles, Upload } from 'lucide-react';
import { AiDescriptionDialog } from './ai-description-dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface AppFormSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  app?: App;
  onSave: (app: App) => void;
}

const initialFormData: App = {
  id: '',
  name: '',
  shortDescription: '',
  longDescription: '',
  version: '',
  size: '',
  icon: 'app-icon-1',
  iconUrl: '',
  downloadLink: '#',
  telegramLink: '',
  websiteLink: '',
  tag: 'NEW',
  downloadCount: 0,
  isVisible: true,
};

export function AppFormSheet({ isOpen, setIsOpen, app, onSave }: AppFormSheetProps) {
  const [formData, setFormData] = useState<App>(app || initialFormData);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [selectedApkFileName, setSelectedApkFileName] = useState<string | null>(null);
  const [apkDataUrl, setApkDataUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    const currentData = app ? {
        ...initialFormData,
        ...app,
        shortDescription: app.shortDescription || '',
        longDescription: app.longDescription || '',
        telegramLink: app.telegramLink || '',
        websiteLink: app.websiteLink || '',
    } : { ...initialFormData, id: `temp_${Date.now()}` };
    setFormData(currentData);
    setSelectedApkFileName(null);
    // Reset APK data URL but respect existing downloadLink from the app data
    setApkDataUrl(app?.downloadLink || null);
    
  }, [app, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isVisible: checked }));
  };

  const handleApkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setSelectedApkFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setApkDataUrl(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, iconUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSaveClick = () => {
    const dataToSave: App = { 
      ...formData,
      downloadCount: Number(formData.downloadCount) || 0,
      downloadLink: apkDataUrl || formData.downloadLink || '#' // Prioritize newly uploaded APK
     };

    onSave(dataToSave);
    setIsOpen(false);
  };
  
  const handleAiGeneratedDescription = (description: string) => {
    setFormData(prev => ({ ...prev, shortDescription: description }));
  };
  
  const iconPreview = formData.iconUrl || PlaceHolderImages.find(p => p.id === formData.icon)?.imageUrl;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-lg w-[90vw]">
          <SheetHeader>
            <SheetTitle>{app ? 'Edit App' : 'Add New App'}</SheetTitle>
            <SheetDescription>
              {app ? 'Update the details of your app.' : 'Fill in the details for the new app.'}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 max-h-[80vh] overflow-y-auto px-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="text-right flex flex-col items-end gap-1">
                <Label htmlFor="shortDescription">Description</Label>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsAiDialogOpen(true)}>
                  <Sparkles className="h-4 w-4 text-primary" />
                </Button>
              </div>
              <Textarea id="shortDescription" value={formData.shortDescription} onChange={handleChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="version" className="text-right">Version</Label>
              <Input id="version" value={formData.version} onChange={handleChange} className="col-span-3" placeholder="e.g., 1.0.0" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">Size</Label>
              <Input id="size" value={formData.size} onChange={handleChange} className="col-span-3" placeholder="e.g., 50 MB" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="iconFile" className="text-right">
                    Icon
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                    {iconPreview && (
                        <Image
                        src={iconPreview}
                        alt="Icon preview"
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                        />
                    )}
                    <Button asChild variant="outline" size="sm">
                        <label htmlFor="iconFile" className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Logo
                            <Input id="iconFile" type="file" className="sr-only" accept="image/*" onChange={handleIconFileChange} />
                        </label>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apkFile" className="text-right">APK File</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Button asChild variant="outline">
                  <label htmlFor="apkFile" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? 'Uploading...' : 'Upload APK'}
                    <Input id="apkFile" type="file" className="sr-only" accept=".apk" onChange={handleApkFileChange} disabled={isUploading} />
                  </label>
                </Button>
                {selectedApkFileName && <span className="text-sm text-muted-foreground truncate max-w-xs">{selectedApkFileName}</span>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="websiteLink" className="text-right">Website URL</Label>
              <Input id="websiteLink" value={formData.websiteLink || ''} onChange={handleChange} className="col-span-3" placeholder="Optional" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telegramLink" className="text-right">Telegram URL</Label>
              <Input id="telegramLink" value={formData.telegramLink || ''} onChange={handleChange} className="col-span-3" placeholder="Optional" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag" className="text-right">Tag</Label>
              <Select onValueChange={(value) => handleSelectChange('tag', value)} defaultValue={formData.tag}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">NEW</SelectItem>
                  <SelectItem value="UPDATED">UPDATED</SelectItem>
                  <SelectItem value="HOT">HOT</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="downloadCount" className="text-right">Downloads</Label>
              <Input id="downloadCount" type="number" value={formData.downloadCount} onChange={(e) => setFormData(p=>({...p, downloadCount: Number(e.target.value) || 0}))} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isVisible" className="text-right">Visible</Label>
              <Switch id="isVisible" checked={formData.isVisible} onCheckedChange={handleSwitchChange} />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleSaveClick} disabled={isUploading}>Save changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <AiDescriptionDialog 
        isOpen={isAiDialogOpen}
        setIsOpen={setIsAiDialogOpen}
        appName={formData.name}
        onGenerate={handleAiGeneratedDescription}
      />
    </>
  );
}
