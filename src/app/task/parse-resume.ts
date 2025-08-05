'use server';

import { getUser } from '@/lib/auth/get-user';
import type { parseResumeTask } from '@/trigger/parse-resume';
import { tasks } from '@trigger.dev/sdk/v3';
import { redirect } from 'next/navigation';

export async function parseResumeAction(url: string) {
  try {
    const user = await getUser();
    if (!user) {
      redirect('/login');
    }
    const handle = await tasks.trigger<typeof parseResumeTask>('parse-resume', {
      url,
      userId: user.user.id,
    });

    return { handle };
  } catch (error) {
    console.error(error);
    return {
      error: 'something went wrong',
    };
  }
}
