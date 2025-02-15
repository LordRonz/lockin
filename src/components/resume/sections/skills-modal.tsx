// src/components/skills-modal.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  skillsAtom,
  skillsModalOpenAtom,
  skillsSchema,
} from "@/lib/store/resume";
import { Badge } from "@/components/ui/badge";
import InputWithLabel from "@/components/ui/input-with-label";
import { XIcon } from "lucide-react";

export function SkillsModal() {
  const [isOpen, setOpen] = useAtom(skillsModalOpenAtom);
  const [skills, setSkills] = useAtom(skillsAtom);

  const form = useForm<{ skillsInput: string }>({
    resolver: zodResolver(
      z.object({
        skillsInput: z.string().optional(),
      }),
    ),
    defaultValues: {
      skillsInput: "",
    },
  });

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && form.getValues("skillsInput").trim() !== "") {
      const newSkill = form.getValues("skillsInput").trim();
      if (!skills.includes(newSkill)) {
        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        form.setValue("skillsInput", ""); // Clear input
      }
      e.preventDefault();
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const onSubmit = () => {
    try {
      // Validate against schema and save
      const validatedSkills = skillsSchema.parse(skills);
      setSkills(validatedSkills);
      setOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        form.setError("skillsInput", {
          type: "manual",
          message: error.errors.map((err) => err.message).join(", "),
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Edit Skills</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add or modify your skills.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="skillsInput"
              render={({ field }) => (
                <FormItem>
                  <FormMessage className="text-red-500" />
                  <InputWithLabel
                    label="Add New Skills"
                    placeholder="Type and press Enter"
                    value={field.value}
                    onChange={(e) =>
                      form.setValue("skillsInput", e.target.value)
                    }
                    onKeyDown={handleAddSkill}
                    className="focus:ring-blue-500"
                  />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <XIcon size={16} />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-400 hover:bg-orange-500 text-white"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
