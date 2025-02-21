"use client";

import { useAtom } from "jotai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  summaryAtom,
  summaryModalOpenAtom,
  summarySchema,
} from "@/lib/store/resume";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { aiEnhanceResumeAction } from "@/actions/resume";
import { ResumeSectionType } from "@/type/resume";
import { useCallback, useState, useTransition } from "react";

export function SummaryModal() {
  const [isOpen, setOpen] = useAtom(summaryModalOpenAtom);

  const [summary, setSummary] = useAtom(summaryAtom);

  const [aiSummary, setAiSummary] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof summarySchema>>({
    resolver: zodResolver(summarySchema),
    defaultValues: summary,
  });

  function onSubmit(values: z.infer<typeof summarySchema>) {
    setSummary(values);
    setOpen(false);
  }

  const enhanceSummary = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      startTransition(async () => {
        const result = await aiEnhanceResumeAction(
          form.getValues().text,
          ResumeSectionType.Summary,
        );

        setAiSummary(result);
      });
    },
    [form],
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Summary</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left - Textarea */}
              <div className="flex-1 p-4 bg-gray-100 rounded-2xl">
                <h2 className="text-base font-semibold mb-2">
                  Current Version
                </h2>

                <FormField
                  control={form.control}
                  name="text"
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
              <div className="flex-1 flex justify-center items-center">
                <div className="w-full md:w-[300px] h-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-300 to-orange-100">
                  <Button
                    className="bg-white text-orange-500 font-semibold"
                    onClick={enhanceSummary}
                    disabled={isPending}
                  >
                    AI Enhance Summary
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
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
