'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UploadCloud } from 'lucide-react';
import { createResumeAction } from '@/actions/resume';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid/non-secure';
import Link from 'next/link';

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
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <h2 className="text-3xl font-bold text-gray-800">Your CVs</h2>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-orange-300 rounded-xl bg-orange-50 flex flex-col items-center justify-center py-12 gap-4 text-orange-500">
        <UploadCloud size={40} />
        <p className="text-sm font-semibold">Drag and drop your CV here</p>
        <div className="flex gap-4 mt-2">
          <Button variant="outline">Browse Files</Button>
          <Button onClick={onCreateResume} disabled={isPending}>
            Start from Scratch
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <Input placeholder="Search your CV here" className="max-w-sm" />
        <Button variant="ghost" size="icon">
          <Search />
        </Button>
      </div>

      {/* Starred CVs */}
      <div>
        <h3 className="text-lg font-semibold text-orange-500 mb-4">
          Starred CVs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayResumes.slice(0, 4).map((resume) => (
            <Card key={resume.id}>
              <CardContent className="p-4">
                <Link href={`resume/${resume.id}`}>
                  <p className="font-medium text-gray-800 truncate">
                    {resume.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date(resume.createdAt || '').toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last Edited:{' '}
                    {new Date(resume.updatedAt || '').toLocaleString()}
                  </p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="text-lg font-semibold text-orange-500 mb-2">History</h3>
        <div className="space-y-6">
          <HistoryGroup title="Today" items={displayResumes.slice(0, 2)} />
          <HistoryGroup
            title="Previous 30 Days"
            items={displayResumes.slice(2, 6)}
          />
          <HistoryGroup title="Earlier" items={displayResumes.slice(6)} />
        </div>
      </div>
    </div>
  );
}

function HistoryGroup({
  title,
  items,
}: {
  title: string;
  items: {
    id: string;
    title: string | null;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
  }[];
}) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      <div className="grid gap-2">
        {items.map((resume) => (
          <div
            key={resume.id}
            className="flex justify-between items-center p-3 rounded-md bg-white shadow-sm border text-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{resume.title}</p>
              <p className="text-xs text-gray-500">
                Opened: {new Date(resume.updatedAt || '').toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">
                Created: {new Date(resume.createdAt || '').toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
