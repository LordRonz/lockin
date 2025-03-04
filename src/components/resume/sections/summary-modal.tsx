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
import { RegenerateButton } from "@/components/button/regenerate-button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
      if (isPending) return;
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

  const onApply = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!aiSummary) return;
      form.setValue("text", aiSummary);
    },
    [aiSummary, form],
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80vw] max-h-[90vh]">
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
                          className="w-full min-h-[40vh] p-3 resize-none dark:border-none border-none outline-none focus:border-none focus-visible:ring-0 shadow-none ring-0 active:border-none rounded-lg"
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
                {aiSummary ? (
                  <div className="flex-1 p-4 bg-white rounded-2xl outline-orange-400 outline-1">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">AI Enhanced</h2>
                      <div className="flex space-x-4">
                        <RegenerateButton
                          onClick={enhanceSummary}
                          disabled={isPending}
                        >
                          Regenerate
                        </RegenerateButton>
                        <Button variant="outline" onClick={onApply}>
                          Apply
                        </Button>
                      </div>
                    </div>

                    <div className="w-full max-h-[40vh] overflow-scroll p-3 resize-none dark:border-none border-none outline-none focus:border-none focus-visible:ring-0 shadow-none ring-0 active:border-none rounded-lg">
                      {aiSummary}
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "w-full h-full flex items-center justify-center rounded-2xl transition-colors duration-1000",
                      !isPending &&
                        "has-hover:bg-radial has-hover:from-10% has-hover:via-50% has-hover:from-orange-200 has-hover:to-white has-hover:via-orange-100",
                      !isPending &&
                        "bg-radial from-10% via-50% from-white to-white via-white",
                      isPending &&
                        "bg-radial from-10% via-50% from-orange-200 to-orange-400 via-orange-300",
                    )}
                  >
                    <Button
                      className={cn(
                        "transition-colors hover:bg-white bg-white text-black hover:text-orange-400 font-semibold",
                        isPending && "text-orange-400",
                      )}
                      onClick={enhanceSummary}
                    >
                      <Sparkles className={cn(isPending && "animate-pulse")} />
                      <motion.div
                        initial={false}
                        animate={{ width: isPending ? 80 : 180 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="overflow-hidden"
                      >
                        {!isPending ? "AI Enhance Summary" : "Loading..."}
                      </motion.div>
                    </Button>
                  </div>
                )}
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
