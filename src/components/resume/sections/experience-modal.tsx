"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useAtom } from "jotai";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  experiencesAtom,
  experienceModalOpenAtom,
  experienceSchema,
} from "@/lib/store/resume";
import InputWithLabel from "@/components/ui/input-with-label";
import { Plus, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCallback, useState, useTransition } from "react";
import { ResumeSectionType } from "@/type/resume";
import { aiEnhanceResumeAction } from "@/actions/resume";
import { RegenerateButton } from "@/components/button/regenerate-button";
import { AiEnhance } from "@/components/form/ai-enhance";

export function ExperienceModal() {
  const [isOpen, setOpen] = useAtom(experienceModalOpenAtom);
  const [experiences, setExperiences] = useAtom(experiencesAtom);

  const [experienceSummary, setExperienceSummary] = useState<{
    [key: string]: string;
  }>({});

  const [isPending, startTransition] = useTransition();

  const form = useForm<{ experiences: z.infer<typeof experienceSchema>[] }>({
    resolver: zodResolver(
      z.object({
        experiences: z.array(experienceSchema),
      }),
    ),
    defaultValues: {
      experiences: experiences.length
        ? experiences
        : [
            {
              company: "",
              position: "",
              location: "",
              dates: "",
              description: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  function onSubmit(values: {
    experiences: z.infer<typeof experienceSchema>[];
  }) {
    setExperiences(values.experiences);
    setOpen(false);
  }

  const enhanceExperienceDesc = useCallback(
    async (index: number) => {
      startTransition(async () => {
        const result = await aiEnhanceResumeAction(
          form.getValues().experiences[index].description,
          ResumeSectionType.Experience,
        );

        setExperienceSummary({ ...experienceSummary, [index]: result });
      });
    },
    [experienceSummary, form],
  );

  const onApply = useCallback(
    async (index: number) => {
      if (!experienceSummary[index]) return;
      form.setValue(
        `experiences.${index}.description`,
        experienceSummary[index],
      );
    },
    [experienceSummary, form],
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Experience</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id}>
                <div
                  className={cn(
                    "relative rounded-lg space-y-4",
                    fields.length > 1 && "pt-12",
                  )}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name={`experiences.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputWithLabel
                              label="🏢 Company"
                              placeholder="Company Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experiences.${index}.position`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputWithLabel
                              label="👨‍💼 Title"
                              placeholder="Job Title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name={`experiences.${index}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputWithLabel
                              label="📍 Location"
                              placeholder="City, Country"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experiences.${index}.dates`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputWithLabel
                              label="⏳ Period"
                              placeholder="MM/YYYY - MM/YYYY"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left - Textarea */}
                    <div className="flex-1 p-4 bg-gray-100 rounded-2xl">
                      <h2 className="text-base font-semibold mb-2">
                        🔑 Key Responsibilities and Achievements :
                      </h2>

                      <FormField
                        control={form.control}
                        name={`experiences.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Enter your summary..."
                                className="w-full min-h-[200px] p-3 resize-none dark:border-none border-none outline-none focus:border-none focus-visible:ring-0 shadow-none ring-0 active:border-none rounded-lg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Right - AI Enhance Button */}
                    <AiEnhance
                      aiResult={experienceSummary[index]}
                      enhance={(e) => {
                        e.preventDefault();
                        enhanceExperienceDesc(index);
                      }}
                      onApply={(e) => {
                        e.preventDefault();
                        onApply(index);
                      }}
                      isPending={isPending}
                      buttonText="AI Enhance Experience"
                    />
                  </div>

                  {/* Remove Button */}
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-red-400 font-semibold hover:text-red-500 border-1 border-gray-300 rounded-2xl"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Add New Experience Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-orange-a rounded-2xl mt-2"
                onClick={() =>
                  append({
                    company: "",
                    position: "",
                    location: "",
                    dates: "",
                    description: "",
                  })
                }
              >
                <Plus size={16} /> Add More Experiences
              </Button>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-a hover:bg-orange-500 text-white"
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
