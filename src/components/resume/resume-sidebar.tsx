"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ResumeSidebar = () => {
  const menuItems = ["Title", "Summary", "Experience", "Skills", "Education"];
  const actionItems = [
    "Download",
    "Share",
    "Create Cover Letter",
    "Apply Job Link",
  ];

  const handleMenuClick = (item: string) => {
    console.log(`${item} clicked`);
  };

  const handleActionClick = (action: string) => {
    console.log(`${action} clicked`);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-xs h-full justify-center items-center">
      {/* Menu Section */}
      <Card className="p-4 space-y-2 rounded-4xl">
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
      </Card>

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
        Last Edited Sat 1 Feb 15.06
      </div>
    </div>
  );
};

export default ResumeSidebar;
