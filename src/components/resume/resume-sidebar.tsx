'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useResumeContext } from '@/context/resume-context';
import ResumeCompletion from './resume-completion';
import { useAtomValue } from 'jotai';
import { resumeAtom } from '@/lib/store/resume';
import { formatCustomDate } from '@/lib/date';
import { Divider } from '../ui/divider';

const actionItems = ['Download', 'Share', 'Create Cover Letter'];

export const ResumeSidebar = () => {
  const { downloadPdf } = useResumeContext();

  const resume = useAtomValue(resumeAtom);

  const handleActionClick = (action: string) => {
    if (action === 'Download') {
      downloadPdf();
    }
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
      </Card>

      {/* Footer Section */}
      <div className="text-xs text-center text-gray-500">
        Last Edited {formatCustomDate(resume?.updatedAt)}
      </div>
    </div>
  );
};

export default ResumeSidebar;
