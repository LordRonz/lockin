'use client';

import React, { useTransition } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useResumeContext } from '@/context/resume-context';
import ResumeCompletion from './resume-completion';
import { useAtom, useAtomValue } from 'jotai';
import { resumeAtom, useResumeWordCount } from '@/lib/store/resume';
import { formatCustomDate } from '@/lib/date';
import { Divider } from '../ui/divider';
import { isLocalStorageAtom } from '@/lib/store/isLocalStorage';
import { deleteResumeAction } from '@/actions/resume';
import { redirect } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // Added Accordion imports

const actionItems = ['Download', 'Share', 'Create Cover Letter'];

export const ResumeSidebar = () => {
  const { downloadPdf } = useResumeContext();

  const resume = useAtomValue(resumeAtom);
  const [isLocalStorage] = useAtom(isLocalStorageAtom);
  const [isPending, startTransition] = useTransition();
  const totalWordCount = useResumeWordCount();

  const handleActionClick = (action: string) => {
    if (action === 'Download') {
      downloadPdf();
    }
  };
  const handleRemoveClick = () => {
    if (!resume?.id) return;
    startTransition(async () => {
      if (isLocalStorage) {
        const stored = localStorage.getItem('resumes');
        let resumesArr = stored ? JSON.parse(stored) : [];
        resumesArr = resumesArr.filter(
          (r: { id: string }) => r.id !== resume.id,
        );
        localStorage.setItem('resumes', JSON.stringify(resumesArr));
      } else {
        await deleteResumeAction(resume.id ?? '');
      }
      redirect('/resume');
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-xs h-full justify-center items-center">
      <Card className="p-4 space-y-2 rounded-4xl w-full">
        <ResumeCompletion />

        <Divider />

        {/* Action Section */}
        {actionItems.map((action) => (
          <Button
            key={action}
            variant="ghost"
            className={cn(
              'w-full justify-start text-left text-md px-4 py-6 rounded-2xl font-medium hover:bg-white-orange hover:text-orange-a',
            )}
            onClick={() => handleActionClick(action)}
          >
            {action}
          </Button>
        ))}
        <Divider />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              key={'remove'}
              variant="ghost"
              className={cn(
                'w-full justify-start text-left text-md px-4 py-6 rounded-2xl font-medium hover:bg-white-orange hover:text-orange-a',
              )}
              disabled={isPending}
            >
              {'Remove'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                resume and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveClick}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>

      {/* New Accordion Section */}
      <Card className="p-4 rounded-4xl w-full">
        <Accordion
          defaultValue="item-1"
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline">
              {' '}
              {/* Adjusted padding and hover */}
              Info
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-xs font-geist-mono text-center text-gray-500 pt-2">
                {' '}
                {/* Added padding top */}
                <p>Created: </p>
                <p>{formatCustomDate(resume?.createdAt)}</p>
                <p>Last Edited: </p>
                <p>{formatCustomDate(resume?.updatedAt)}</p>
                <p>Words: {totalWordCount}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Footer Section - Removed original div */}
      {/* <div className="text-xs text-center text-gray-500">
        Last Edited {formatCustomDate(resume?.updatedAt)}
      </div> */}
    </div>
  );
};

export default ResumeSidebar;
