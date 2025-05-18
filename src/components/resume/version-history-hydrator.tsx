// components/ResumeHydrator.tsx
'use client';

import { resumeVersions } from '@/db/schema';
import ResumeHydrator, { ResumeData } from './resume-hydrator';
import { decompressContent } from '@/lib/utils/compression';
import { use } from 'react';

export type ResumeVersionData = typeof resumeVersions.$inferSelect;

export default function VersionHistoryHydrator({
  data,
}: {
  data: ResumeVersionData;
}) {
  const resume = use<ResumeData>(decompressContent(data.content));
  return <ResumeHydrator data={resume} useLocalStorage={false} />;
}

