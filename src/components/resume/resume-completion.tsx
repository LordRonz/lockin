import { useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

const sections = ["Title", "Summary", "Experience", "Skills", "Education"];

export default function ResumeCompletion() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    Title: true,
    Summary: true,
    Experience: false,
    Skills: true,
    Education: false,
  });

  const toggleSection = (section: string) => {
    setSelected((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const allDone = useMemo(
    () => Object.values(selected).every(Boolean),
    [selected],
  );

  const progress =
    (Object.values(selected).filter(Boolean).length / sections.length) * 100;

  return (
    <Card className="p-4 space-y-2 rounded-4xl">
      <h2 className="text-lg font-semibold">Complete your resume!</h2>
      <p className="text-sm text-gray-500 italic mt-1">
        by completing your resume you can adapt it to any job link you want
      </p>
      <Progress value={progress} className="my-4" />
      <Input placeholder="Enter Job Link" className="mb-3" />
      <Button
        className={cn(
          "w-full bg-orange-400",
          allDone && "hover:bg-orange-500",
        )}
        disabled={!allDone}
      >
        Apply Job Link
      </Button>
      <div className="mt-4 border-t border-gray-300 pt-4">
        {sections.map((section) => (
          <div
            key={section}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg mb-2 cursor-pointer group",
              "hover:bg-orange-400",
            )}
            onClick={() => toggleSection(section)}
          >
            <span
              className={`font-medium group-hover:text-white text-orange-400`}
            >
              {section}
            </span>
            <div
              className={cn(
                "w-6 h-6 rounded-full border border-orange-400 flex items-center justify-center transition-colors duration-200",
                selected[section] && "bg-orange-400",
              )}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
