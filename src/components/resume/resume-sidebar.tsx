"use client";

import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useResumeContext } from "@/context/resume-context";
import ResumeCompletion from "./resume-completion";
import { useAtomValue } from "jotai";
import { resumeAtom } from "@/lib/store/resume";

const actionItems = [
  'Download',
  'Share',
  'Create Cover Letter',
  'Apply Job Link',
];

export const ResumeSidebar = () => {
  const { downloadPdf } = useResumeContext();

  const resume = useAtomValue(resumeAtom);

  const handleActionClick = (action: string) => {
    console.log(`${action} clicked`);
    if (action === "Download") {
      downloadPdf();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-xs h-full justify-center items-center">
      {/* Menu Section */}
      {/* <Card className="p-4 space-y-2 rounded-4xl">
        {menuItems.map((item, index) => (
          <Button
            key={item}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left text-sm font-semibold hover:bg-orange-400 hover:text-white",
              index === menuItems.length - 1 && "rounded-b-3xl",
              index === 0 && "rounded-t-3xl",
            )}
            onClick={() => handleMenuClick(item)}
          >
            {item}
          </Button>
        ))}
      </Card> */}
      
      <ResumeCompletion />

      {/* Action Section */}
      <Card className="p-4 space-y-2 rounded-4xl">
        {actionItems.map((action, index) => (
          <Button
            key={action}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left text-sm font-semibold hover:bg-orange-400 hover:text-white",
              index === actionItems.length - 1 && "rounded-b-3xl",
              index === 0 && "rounded-t-3xl",
            )}
            onClick={() => handleActionClick(action)}
          >
            {action}
          </Button>
        ))}
      </Card>

      {/* Footer Section */}
      <div className="text-xs text-center text-gray-500">
        Last Edited {resume?.updatedAt?.toString()}
      </div>
    </div>
  );
};

export default ResumeSidebar;
