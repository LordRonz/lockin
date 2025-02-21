// src/components/education-modal.tsx
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  educationModalOpenAtom,
  educationsAtom,
  educationSchema,
} from "@/lib/store/resume";
import { Plus, Trash } from "lucide-react";
import InputWithLabel from "@/components/ui/input-with-label";
import { Separator } from "@/components/ui/separator";

export function EducationModal() {
  const [isOpen, setOpen] = useAtom(educationModalOpenAtom);
  const [educations, setEducations] = useAtom(educationsAtom);

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
              level: "",
              institution: "",
              degree: "",
              field: "",
              location: "",
              dates: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  function onSubmit(values: { educations: z.infer<typeof educationSchema>[] }) {
    setEducations(values.educations);
    setOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Education Details</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <>
                <div key={field.id} className="relative rounded-lg space-y-4">
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
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => remove(index)}
                    >
                      <Trash size={16} />
                    </Button>
                  )}
                </div>

                {index < fields.length - 1 && (
                  <Separator className="bg-orange-400 h-1 rounded-2xl" />
                )}
              </>
            ))}

            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2 border-orange-300 rounded-xl"
                onClick={() =>
                  append({
                    level: "",
                    institution: "",
                    degree: "",
                    field: "",
                    location: "",
                    dates: "",
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
