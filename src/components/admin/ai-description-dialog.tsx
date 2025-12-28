'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateAppDescription } from '@/ai/flows/generate-app-description';
import { Textarea } from '../ui/textarea';

interface AiDescriptionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  appName: string;
  onGenerate: (description: string) => void;
}

export function AiDescriptionDialog({
  isOpen,
  setIsOpen,
  appName,
  onGenerate,
}: AiDescriptionDialogProps) {
  const [appCategory, setAppCategory] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!appCategory || !targetAudience || !keyFeatures) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields to generate a description.',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await generateAppDescription({
        appName,
        appCategory,
        targetAudience,
        keyFeatures,
      });
      onGenerate(result.description);
      setIsOpen(false);
      toast({
        title: 'Success!',
        description: 'App description generated and updated.',
      });
    } catch (error) {
      console.error('Failed to generate description:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate a description. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Description Assistant</DialogTitle>
          <DialogDescription>
            Provide some details about your app, and we'll generate an engaging description for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ai-appName" className="text-right">App Name</Label>
            <Input id="ai-appName" value={appName} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ai-appCategory" className="text-right">Category</Label>
            <Input id="ai-appCategory" value={appCategory} onChange={(e) => setAppCategory(e.target.value)} className="col-span-3" placeholder="e.g., Productivity"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ai-targetAudience" className="text-right">Audience</Label>
            <Input id="ai-targetAudience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="col-span-3" placeholder="e.g., Students, Professionals"/>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="ai-keyFeatures" className="text-right">Key Features</Label>
            <Textarea id="ai-keyFeatures" value={keyFeatures} onChange={(e) => setKeyFeatures(e.target.value)} className="col-span-3" placeholder="e.g., AI summaries, cloud sync, offline mode"/>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Description'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
