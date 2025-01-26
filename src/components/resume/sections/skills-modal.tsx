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
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  skillsAtom,
  skillsModalOpenAtom,
  skillsSchema,
} from "@/lib/store/resume";

export function SkillsModal() {
  const [isOpen, setOpen] = useAtom(skillsModalOpenAtom);
  const [skills, setSkills] = useAtom(skillsAtom);

  const form = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    defaultValues: skills,
  });

  function onSubmit(values: z.infer<typeof skillsSchema>) {
    setSkills(values);
    setOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Edit Skills</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add or modify your skills (comma separated)
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="0" // Temporary field for input
              render={({}) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Skills</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Communication, Sales, CRM Software"
                      className="focus:ring-blue-500"
                      value={skills.join(", ")}
                      onChange={(e) => {
                        const newSkills = e.target.value
                          .split(",")
                          .map((skill) => skill.trim())
                          .filter((skill) => skill.length > 0);
                        form.setValue("0", newSkills.join(", "));
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

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
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Skills
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
