'use client';

import { resumeAtom } from '@/lib/store/resume';
import { cn } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackToResume(props: { className?: string }) {
  const resume = useAtomValue(resumeAtom);
  return (
    <Link
      href="/resume"
      className={cn(
        'inline-flex items-center gap-2 text-3xl font-semibold text-black hover:opacity-80 transition',
        props.className,
      )}
    >
      <ArrowLeft size={32} strokeWidth={2} />
      <span>{resume?.title}</span>
    </Link>
  );
}
