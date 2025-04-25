'use client';

import React, { useTransition, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { createResumeAction } from '@/actions/resume';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { nanoid } from 'nanoid/non-secure';

export default function ResumeListPage({
  resumes,
  useLocalStorage,
}: {
  resumes: {
    id: string;
    title: string | null;
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    templateId: string | null;
  }[];
  useLocalStorage?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [localResumes, setLocalResumes] = useState<typeof resumes>([]);

  useEffect(() => {
    if (useLocalStorage) {
      const stored = localStorage.getItem('resumes');
      if (stored) {
        setLocalResumes(JSON.parse(stored));
      } else {
        setLocalResumes([]);
      }
    }
  }, [useLocalStorage]);

  const onCreateResume = () => {
    startTransition(async () => {
      if (useLocalStorage) {
        const id = nanoid();
        const now = new Date().toISOString();
        const newResume = {
          id,
          title: 'Untitled Resume',
          userId: '',
          createdAt: now,
          updatedAt: now,
          templateId: null,
        };
        // Get current resumes from localStorage
        const stored = localStorage.getItem('resumes');
        const resumesArr = stored ? JSON.parse(stored) : [];

        resumesArr.push(newResume);
        localStorage.setItem('resumes', JSON.stringify(resumesArr));
        setLocalResumes(resumesArr);
        router.push(`resume/${id}`);
      } else {
        const newResume = await createResumeAction();
        router.push(`resume/${newResume[0].id}`);
      }
    });
  };

  const displayResumes = useLocalStorage ? localResumes : resumes;

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-50 justify-start auto-rows-fr">
      {displayResumes.map((resume, index) => (
        <Card key={index} className="cursor-pointer hover:shadow-lg">
          <CardContent className="p-4 flex flex-col items-center">
            <Link
              href={`resume/${resume.id}`}
              className="w-full h-48 bg-white border rounded-lg p-4 flex items-center justify-center"
            >
              <p className="text-sm font-semibold text-gray-700 text-center">
                {resume.title}
              </p>
            </Link>
          </CardContent>
        </Card>
      ))}
      <Card className="cursor-pointer hover:shadow-lg bg-gradient-to-r from-orange-300 to-orange-500 flex items-center justify-center">
        <CardContent className="p-4 flex flex-col items-center">
          <button
            className="w-full h-48 flex flex-col items-center justify-center text-white"
            onClick={() => onCreateResume()}
            disabled={isPending}
          >
            <Plus size={32} />
            <p className="mt-2 font-semibold">Add New Resume</p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
