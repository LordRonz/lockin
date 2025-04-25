'use client';

import { useAtom } from 'jotai';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  resumeAtom,
  summaryAtom,
  summaryModalOpenAtom,
  summarySchema,
} from '@/lib/store/resume';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { aiEnhanceResumeAction, saveSummaryAction } from '@/actions/resume';
import { ResumeSectionType } from '@/type/resume';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { AiEnhance } from '@/components/form/ai-enhance';
import { isLocalStorageAtom } from '@/lib/store/isLocalStorage';

export function SummaryModal() {
  const [isOpen, setOpen] = useAtom(summaryModalOpenAtom);

  const [summary, setSummary] = useAtom(summaryAtom);

  const [resume] = useAtom(resumeAtom);

  const [aiSummary, setAiSummary] = useState<string>();
  const [isLocalStorage] = useAtom(isLocalStorageAtom);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof summarySchema>>({
    resolver: zodResolver(summarySchema),
    defaultValues: summary,
  });

  useEffect(() => {
    form.reset(summary);
  }, [summary, form]);

  function onSubmit(values: z.infer<typeof summarySchema>) {
    if (!resume?.id) return;
    const resumeId = resume.id;
    setSummary(values);
    startTransition(async () => {
      if (isLocalStorage) {
        saveSummaryToLocalStorage({ ...values, resumeId: resumeId ?? '' });
      } else {
        await saveSummaryAction({ ...values, resumeId });
      }
      setOpen(false);
    });
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
    [form, isPending],
  );

  const onApply = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!aiSummary) return;
      form.setValue('text', aiSummary);
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
              <AiEnhance
                onApply={onApply}
                isPending={isPending}
                aiResult={aiSummary}
                enhance={enhanceSummary}
                buttonText="AI Enhance Summary"
              />
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


function saveSummaryToLocalStorage(summary: any) {
  const summaries = JSON.parse(localStorage.getItem('summary') || '[]');
  const idx = summaries.findIndex((s: any) => s.resumeId === summary.resumeId);
  if (idx !== -1) {
    summaries[idx] = { ...summaries[idx], ...summary };
  } else {
    summaries.push(summary);
  }
  localStorage.setItem('summary', JSON.stringify(summaries));
}
