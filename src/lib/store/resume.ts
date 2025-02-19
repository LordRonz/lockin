// src/lib/store/resume.ts
import { atom } from 'jotai'
import { z } from 'zod'

// Experience Schema
export const summarySchema = z.object({
  text: z.string().min(1, "Summary is required"),
})

// Experience Schema
export const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  dates: z.string().min(1, "Dates are required"),
  description: z.string().min(1, "Description is required"),
})

// Education Schema
export const educationSchema = z.object({
  level: z.string().min(1, "Level of education is required"),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  location: z.string().min(1, "Location is required"),
  dates: z.string().min(1, "Dates are required"),
})

// Skills Schema
export const skillsSchema = z.array(z.string().min(1, "Skill cannot be empty")).min(1, "At least one skill is required")

// Atom Types
export type Experience = z.infer<typeof experienceSchema>
export type Education = z.infer<typeof educationSchema>
export type Skills = z.infer<typeof skillsSchema>
export type Summary = z.infer<typeof summarySchema>

// Initial States
const initialExperiences: Experience[] = [{
  company: "Company A",
  position: "Sales Representative",
  location: "Location",
  dates: "Start - End date",
  description: "Key responsibilities and achievements"
}]

const initialEducations: Education[] = [{
  level: "Undergraduate",
  institution: "Graduated School",
  degree: "Field of study",
  field: "Field of study",
  location: "Location",
  dates: "Graduation Date"
}]

const initialSkills: Skills = ["Skill 1", "Skill 2", "Skill 3", "Skill 4"]

const initialSummary: Summary = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien."
}

// Jotai Atoms
export const experiencesAtom = atom<Experience[]>(initialExperiences)
export const educationsAtom = atom<Education[]>(initialEducations)
export const skillsAtom = atom<Skills>(initialSkills)
export const summaryAtom = atom<Summary>(initialSummary)

// Modal Control Atoms
export const experienceModalOpenAtom = atom(false)
export const educationModalOpenAtom = atom(false)
export const skillsModalOpenAtom = atom(false)
export const summaryModalOpenAtom = atom(false)