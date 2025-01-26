import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const resumes = pgTable("resumes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  title: varchar("title", { length: 100 }).default("Untitled Resume"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  templateId: text("template_id"),
});

export const resumeRelations = relations(resumes, ({ many }) => ({
  sections: many(sections),
  experiences: many(experiences),
  educations: many(educations),
  skills: many(skills),
}));

export const sections = pgTable("sections", {
  id: uuid("id").defaultRandom().primaryKey(),
  resumeId: uuid("resume_id").notNull(),
  type: varchar("type", { length: 20 }).notNull(), // contact, experience, education, skills
  order: integer("order").notNull(),
  isVisible: boolean("is_visible").default(true),
});

export const experiences = pgTable("experiences", {
  id: uuid("id").defaultRandom().primaryKey(),
  resumeId: uuid("resume_id").notNull(),
  companyName: text("company_name"),
  location: text("location"),
  position: text("position"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  current: boolean("current").default(false),
  description: text("description"),
});

export const educations = pgTable("educations", {
  id: uuid("id").defaultRandom().primaryKey(),
  resumeId: uuid("resume_id").notNull(),
  school: text("school"),
  degree: text("degree"),
  fieldOfStudy: text("field_of_study"),
  location: text("location"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  description: text("description"),
});

export const skills = pgTable("skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  resumeId: uuid("resume_id").notNull(),
  name: text("name").notNull(),
  level: text("level"),
});

export const templates = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  thumbnail: text("thumbnail").notNull(),
  structure: text("structure").notNull(), // JSON string of template structure
});
