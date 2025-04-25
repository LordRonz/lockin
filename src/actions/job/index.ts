'use server';

import { getLinkedInJobData } from '@/lib/scraper';

export const getLinkedInJobDataAction = async (url: string) => {
  const jobData = await getLinkedInJobData(url);
  return jobData;
};
