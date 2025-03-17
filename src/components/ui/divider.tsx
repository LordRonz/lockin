import { cn } from '@/lib/utils';

type DividerProps = {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
};

export function Divider({
  className,
  orientation = 'horizontal',
}: DividerProps) {
  return (
    <div
      className={cn(
        'bg-gray-200',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className,
      )}
    />
  );
}
