'use client';

export function getLocalResume(id: string) {
  const data = localStorage.getItem(`resume_${id}`);
  return data ? JSON.parse(data) : null;
}

export function saveLocalResume(id: string, resume: any) {
  localStorage.setItem(`resume_${id}`, JSON.stringify(resume));
}

export function getLocalResumeList() {
  // Optionally, keep a list of IDs in localStorage
  const data = localStorage.getItem('resume_ids');
  return data ? JSON.parse(data) : [];
}
