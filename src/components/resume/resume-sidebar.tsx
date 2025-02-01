"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      <Card className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item}
            variant="ghost"
            className="w-full justify-start text-left text-sm"
            onClick={() => handleMenuClick(item)}
          >
            {item}
          </Button>
        ))}
      </Card>

      {/* Action Section */}
      <Card className="p-4 space-y-2">
        {actionItems.map((action) => (
          <Button
            key={action}
            variant="ghost"
            className="w-full justify-start text-left text-sm"
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
