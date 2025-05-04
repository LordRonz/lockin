'use client';

import React, { useTransition } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useResumeContext } from '@/context/resume-context';
import ResumeCompletion from './resume-completion';
import { useAtom, useAtomValue } from 'jotai';
import { resumeAtom } from '@/lib/store/resume';
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

const actionItems = ['Download', 'Share', 'Create Cover Letter'];

export const ResumeSidebar = () => {
  const { downloadPdf } = useResumeContext();

  const resume = useAtomValue(resumeAtom);
  const [isLocalStorage] = useAtom(isLocalStorageAtom);
  const [isPending, startTransition] = useTransition();

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

      {/* Footer Section */}
      <div className="text-xs text-center text-gray-500">
        Last Edited {formatCustomDate(resume?.updatedAt)}
      </div>
    </div>
  );
};

export default ResumeSidebar;
