// src/components/contact-modal.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
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
  contactDataAtom,
  contactModalOpenAtom,
  contactSchema,
} from '@/lib/store/contact';
import InputWithLabel from '@/components/ui/input-with-label';
import { useTransition } from 'react';
import {
  createResumeAction,
  getResumeListAction,
  saveContactAction,
} from '@/actions/resume';
import { resumeAtom } from '@/lib/store/resume';
import { isLocalStorageAtom } from '@/lib/store/isLocalStorage';
import { ContactData } from '@/db/schema';

export function ContactModal() {
  const [isOpen, setOpen] = useAtom(contactModalOpenAtom);
  const [contactData, setContactData] = useAtom(contactDataAtom);
  const [resumeData, setResumeData] = useAtom(resumeAtom);
  const [isLocalStorage] = useAtom(isLocalStorageAtom);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactData,
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    startTransition(async () => {
      let resumeId = resumeData?.id;
      if (!resumeData?.id) {
        await createResumeAction();
        const resumes = await getResumeListAction();
        setResumeData(resumes[0]);
        resumeId = resumes[0].id;
      }
      if (isLocalStorage) {
        saveContactToLocalStorage({
          ...values,
          resumeId: resumeId ?? '',
        } as ContactData);
      } else {
        await saveContactAction(
          { ...values, resumeId: resumeId ?? '' },
          contactData.id,
          resumeId,
        );
      }

      setContactData(values);
      setOpen(false);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Title</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        placeholder="John Doe"
                        label="🪪 Name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        placeholder="john@example.com"
                        label="＠ Email"
                        type="email"
                        className="focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        placeholder="Ohio"
                        label="🏡 Domicile"
                        type="text"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        placeholder="+1 6969696969"
                        label="☎️ Number"
                        type="text"
                        className="focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithLabel
                        placeholder="www.example.com"
                        label="🕸️ Website"
                        type="text"
                        className="focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
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

function saveContactToLocalStorage(contact: ContactData) {
  const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  const idx = contacts.findIndex(
    (c: ContactData) => c.resumeId === contact.resumeId,
  );
  if (idx !== -1) {
    contacts[idx] = { ...contacts[idx], ...contact };
  } else {
    contacts.push(contact);
  }
  localStorage.setItem('contacts', JSON.stringify(contacts));
}
