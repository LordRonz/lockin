'use client';

import { useAllAtomPopulated } from '@/lib/store/resume';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const ResumeJobInput = () => {
  const isAllFieldsFilled = useAllAtomPopulated();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <div className="flex bg-white-a py-3 px-3 rounded-4xl">
      <Input
        type="text"
        placeholder="Enter Job Link"
        className="rounded-3xl p-4 bg-gray-a placeholder:italic"
      />
      <Button
        type="submit"
        className="bg-orange-400 hover:bg-orange-500 text-white rounded-3xl ml-4 px-8"
        onClick={handleSubmit}
        disabled={!isAllFieldsFilled}
      >
        Apply Job Link
      </Button>
    </div>
  );
};
