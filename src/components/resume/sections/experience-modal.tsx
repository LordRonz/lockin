// src/components/experience-modal.tsx
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

export function ExperienceModal() {
  const [isOpen, setOpen] = useAtom(experienceModalOpenAtom);
  const [experiences, setExperiences] = useAtom(experiencesAtom);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: experiences[0] || {
      company: "",
      position: "",
      location: "",
      dates: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof experienceSchema>) {
    setExperiences([...experiences, values]);
    setOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900">
            Add Work Experience
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Describe your professional experience
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="🏢 Company"
                        placeholder="Company Name"
                        className="focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="👨‍💼 Title"
                        placeholder="Job Title"
                        className="focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="📍 Location"
                        placeholder="City, Country"
                        className="focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dates"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        label="⏳ Period"
                        placeholder="MM/YYYY - MM/YYYY"
                        className="focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your responsibilities and achievements"
                      className="focus:ring-blue-500 min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            /> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left - Textarea */}
              <div className="flex-1 p-4 bg-gray-100 rounded-2xl">
                <h2 className="text-base font-semibold mb-2">
                  🔑 Key Responsibilities and Achievements :
                </h2>

                <FormField
                  control={form.control}
                  name="description"
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
                  <Button className="bg-white text-orange-500 font-semibold">
                    AI Enhance Summary
                  </Button>
                </div>
              </div>
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
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Experience
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
