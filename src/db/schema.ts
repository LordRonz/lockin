import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  varchar,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const resumes = pgTable('resumes', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  title: varchar('title', { length: 100 }).default('Untitled Resume'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  templateId: text('template_id'),
  parseResult: jsonb('parse_result'),
});

export const contacts = pgTable('contacts', {
  id: uuid('id').defaultRandom().primaryKey(),
  resumeId: uuid('resume_id')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' })
    .unique(),
  fullName: text('full_name'),
  email: text('email').notNull(),
  phone: text('phone'),
  location: text('location'),
  website: text('website'),
});

export const sections = pgTable('sections', {
  id: uuid('id').defaultRandom().primaryKey(),
  resumeId: uuid('resume_id').notNull(),
  type: varchar('type', { length: 20 }).notNull(), // contact, experience, education, skills
  order: integer('order').notNull(),
  isVisible: boolean('is_visible').default(true),
});

export const sectionsRelation = relations(sections, ({ one }) => ({
  resume: one(resumes, {
    fields: [sections.resumeId],
    references: [resumes.id],
  }),
}));

export const experiences = pgTable('experiences', {
  id: uuid('id').defaultRandom().primaryKey(),
  resumeId: uuid('resume_id')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  companyName: text('company_name'),
  location: text('location'),
  position: text('position'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  current: boolean('current').default(false),
  description: text('description'),
});

export const experiencesRelation = relations(experiences, ({ one }) => ({
  resume: one(resumes, {
    fields: [experiences.resumeId],
    references: [resumes.id],
  }),
}));

export const educations = pgTable('educations', {
  id: uuid('id').defaultRandom().primaryKey(),
  resumeId: uuid('resume_id')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  school: text('school'),
  degree: text('degree'),
  fieldOfStudy: text('field_of_study'),
  location: text('location'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  description: text('description'),
});

export const educationsRelation = relations(educations, ({ one }) => ({
  resume: one(resumes, {
    fields: [educations.resumeId],
    references: [resumes.id],
  }),
}));

export const skills = pgTable('skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  resumeId: uuid('resume_id')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  level: text('level'),
});

export const skillsRelation = relations(skills, ({ one }) => ({
  resume: one(resumes, {
    fields: [skills.resumeId],
    references: [resumes.id],
  }),
}));

export const summary = pgTable('summary', {
  id: uuid('id').defaultRandom().primaryKey(),
  resumeId: uuid('resume_id')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' })
    .unique(),
  text: text('text').notNull(),
});

export const templates = pgTable('templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  thumbnail: text('thumbnail').notNull(),
  structure: text('structure').notNull(),
});

export const resumeVersions = pgTable('resume_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  resumeId: uuid('resume_id')
    .notNull()
    .references(() => resumes.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  content: text('content').notNull(),
});

export const resumeVersionsRelation = relations(resumeVersions, ({ one }) => ({
  resume: one(resumes, {
    fields: [resumeVersions.resumeId],
    references: [resumes.id],
  }),
}));

export const resumeRelations = relations(resumes, ({ many, one }) => ({
  sections: many(sections),
  experiences: many(experiences),
  educations: many(educations),
  skills: many(skills),
  versions: many(resumeVersions),
  contact: one(contacts, {
    fields: [resumes.id],
    references: [contacts.resumeId],
    relationName: 'resume_contact',
  }),
  summary: one(summary, {
    fields: [resumes.id],
    references: [summary.resumeId],
    relationName: 'resume_summary',
  }),
}));

export type ExperienceData = typeof experiences.$inferSelect;
export type EducationData = typeof educations.$inferSelect;
export type SkillsData = typeof skills.$inferSelect;
export type SummaryData = typeof summary.$inferSelect;
export type ContactData = typeof contacts.$inferSelect;
