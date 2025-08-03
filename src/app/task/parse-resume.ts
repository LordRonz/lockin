'use server';

import type { parseResumeTask } from '@/trigger/parse-resume';
import { tasks } from '@trigger.dev/sdk/v3';

export async function parseResumeAction(url: string) {
  try {
    const handle = await tasks.trigger<typeof parseResumeTask>('parse-resume', {
      url,
    });

    return { handle };
  } catch (error) {
    console.error(error);
    return {
      error: 'something went wrong',
    };
  }
}
