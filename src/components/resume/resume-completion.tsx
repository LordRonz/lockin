import { useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import {
  educationsAtom,
  experiencesAtom,
  isAllAtomPopulated,
  resumeAtom,
  skillsAtom,
  summaryAtom,
} from "@/lib/store/resume";
import { useAtomValue } from "jotai";

const sections = ["Title", "Summary", "Experience", "Skills", "Education"];

export default function ResumeCompletion() {
  const resume = useAtomValue(resumeAtom);
  const summary = useAtomValue(summaryAtom);
  const experiences = useAtomValue(experiencesAtom);
  const skills = useAtomValue(skillsAtom);
  const educations = useAtomValue(educationsAtom);

  const completedSections = useMemo(() => {
    return {
      Title: Boolean(resume?.title?.trim()),
      Summary: Boolean(summary.text.trim()),
      Experience: experiences.length > 0,
      Skills: skills.length > 0,
      Education: educations.length > 0,
    };
  }, [resume, summary, experiences, skills, educations]);

  const allDone = isAllAtomPopulated();

  const progress =
    (Object.values(completedSections).filter(Boolean).length /
      sections.length) *
    100;

  return (
    <Card className="p-4 space-y-2 rounded-4xl w-full">
      <div className="pt-4">
        {sections.map((section) => (
          <div
            key={section}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg mb-2 cursor-pointer group",
              "hover:bg-white-orange",
            )}
          >
            <span
              className={`font-medium group-hover:text-orange-a`}
            >
              {section}
            </span>

            <CheckIcon
              className={cn(
                "text-orange-a",
                !completedSections[section as keyof typeof completedSections] &&
                  "hidden",
              )}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
