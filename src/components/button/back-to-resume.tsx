'use client';

import { Resume, resumeAtom } from '@/lib/store/resume';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import { ArrowLeft, Check, Loader2, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateResumeTitle } from '@/actions/resume';
import { isLocalStorageAtom } from '@/lib/store/isLocalStorage';

function saveResumeTitleToLocalStorage(resumeId: string, newTitle: string) {
  const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
  const idx = resumes.findIndex((r: Resume) => r.id === resumeId);
  if (idx !== -1) {
    resumes[idx].title = newTitle;
    localStorage.setItem('resumes', JSON.stringify(resumes));
  }
}

export default function BackToResume(props: { className?: string }) {
  const [resume, setResume] = useAtom(resumeAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(resume?.title || '');
  const [isLocalStorage] = useAtom(isLocalStorageAtom);

  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (resume?.id && editedTitle.trim() && !isPending) {
      startTransition(() => {
        const newTitle = editedTitle.trim();
        if (isLocalStorage) {
          saveResumeTitleToLocalStorage(resume.id ?? '', newTitle);
        } else {
          updateResumeTitle(resume.id ?? '', newTitle);
        }
        setResume({ ...resume, title: newTitle });
        setIsEditing(false);
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(resume?.title || '');
    }
  };

  return (
    <div className={cn('flex items-center gap-2', props.className)}>
      <Link
        href="/resume"
        className="inline-flex items-center gap-2 text-3xl font-semibold text-black hover:opacity-80 transition"
      >
        <ArrowLeft size={32} strokeWidth={2} />
      </Link>

      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-xl font-semibold h-10"
            autoFocus
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            className="p-1 h-8 w-8"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Check size={16} />
            )}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-3xl font-semibold">{resume?.title}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="p-1 h-8 w-8"
            disabled={isPending}
          >
            <Pencil size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
