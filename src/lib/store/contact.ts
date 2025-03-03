// src/lib/store/contact.ts
import { atom } from 'jotai'
import { z } from 'zod'

export const contactSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
})

export type ContactData = z.infer<typeof contactSchema>

// Initial state
export const initialContactData: ContactData = {
  fullName: "Unidentified Giraffe",
  email: "example@example.com",
  phone: "+1 6969696969",
  location: "Ohio",
}

// Jotai atoms
export const contactDataAtom = atom<ContactData>(initialContactData)
export const contactModalOpenAtom = atom(false)
