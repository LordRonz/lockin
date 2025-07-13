import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';
import queryString from 'query-string';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/resume';

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    const nextUrl = queryString.stringifyUrl({
      url: next,
      query: {
        toast: 'Your account has been verified',
      },
    });

    if (!error) {
      redirect(nextUrl);
    }
    redirect(`/error?message=${error.message}`);
  }

  redirect('/error');
}
