// src/components/education-modal.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useAtom, useAtomValue } from 'jotai';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  educationModalOpenAtom,
  educationsAtom,
  educationSchema,
  resumeAtom,
} from '@/lib/store/resume';
import { Loader2, Plus } from 'lucide-react';
import InputWithLabel from '@/components/ui/input-with-label';
import { saveEducationAction } from '@/actions/resume';
import { useEffect, useTransition } from 'react';
import { mapEducationToDB } from '@/actions/resume/helper';

export function EducationModal() {
  const [isOpen, setOpen] = useAtom(educationModalOpenAtom);
  const [educations, setEducations] = useAtom(educationsAtom);
  const resume = useAtomValue(resumeAtom);
  const [isPending, startTransition] = useTransition();
  const form = useForm<{ educations: z.infer<typeof educationSchema>[] }>({
    resolver: zodResolver(
      z.object({
        educations: z.array(educationSchema),
      }),
    ),
    defaultValues: {
      educations: educations.length
        ? educations
        : [
            {
              level: '',
              institution: '',
              degree: '',
              field: '',
              location: '',
              dates: '',
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  useEffect(() => {
    form.reset({ educations });
  }, [educations, form]);

  function onSubmit(values: { educations: z.infer<typeof educationSchema>[] }) {
    if (!resume?.id) return;
    const resumeId = resume.id;
    setEducations(values.educations);
    startTransition(async () => {
      await saveEducationAction(
        values.educations.map((education) => ({
          ...mapEducationToDB(education),
          id: education.id,
          resumeId,
        })),
      );
      setOpen(false);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Education</DialogTitle>
        </DialogHeader>

        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <Loader2 className="animate-spin" />
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="relative rounded-lg space-y-4">
                  <FormField
                    control={form.control}
                    name={`educations.${index}.level`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputWithLabel
                            label="📖 Education"
                            placeholder="High School, Bachelor's, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name={`educations.${index}.institution`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputWithLabel
                              label="🎓 Institution"
                              placeholder="University Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`educations.${index}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputWithLabel
                              label="📜 Degree"
                              placeholder="Bachelor's Degree"
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
                      name={`educations.${index}.field`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputWithLabel
                              label="📚 Field of Study"
                              placeholder="Computer Science"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`educations.${index}.dates`}
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

            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2 border-orange-300 rounded-xl"
                onClick={() =>
                  append({
                    level: '',
                    institution: '',
                    degree: '',
                    field: '',
                    location: '',
                    dates: '',
                  })
                }
              >
                <Plus size={16} /> Add More Educations
              </Button>
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
                className="bg-orange-400 cursor-pointer hover:bg-orange-500 text-white"
                disabled={isPending}
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
