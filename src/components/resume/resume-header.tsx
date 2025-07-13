'use client';

import Link from 'next/link';
import Logo from '../icons/logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function ResumeHeader() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  const currentPath = pathname.split('/')[1];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/resume', label: 'Resume', key: 'resume' },
    { href: '/cv', label: 'Curriculum Vitae', key: 'cv' },
    { href: '/cover-letters', label: 'Cover Letters', key: 'cover-letters' },
    { href: '/applications', label: 'Applications', key: 'applications' },
  ];

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      <div className="h-20" />

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-4 transition-all duration-700 ease-out',
          isScrolled ? 'py-2' : 'py-6',
        )}
      >
        <nav
          className={cn(
            'relative flex items-center justify-center rounded-2xl px-2 py-2 transition-all duration-700 ease-out',
            'bg-white/20 backdrop-blur-2xl border border-white/20 shadow-2xl',
            'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/10 before:to-white/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100',
            isScrolled ? 'scale-95 shadow-lg' : 'scale-100 shadow-2xl',
          )}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-20 transition-all duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            }}
          />

          <Link
            href="/"
            className="group relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 hover:bg-white/30 hover:backdrop-blur-xl hover:shadow-lg"
            onMouseEnter={() => setActiveItem('logo')}
            onMouseLeave={() => setActiveItem(null)}
          >
            <div className="relative">
              <Logo width={32} height={32} />
              <div
                className={cn(
                  'absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 blur-lg transition-all duration-300',
                  activeItem === 'logo' && 'opacity-30 scale-110',
                )}
              />
            </div>
          </Link>

          <div className="flex items-center ml-2 space-x-1">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'relative group px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap',
                  'text-gray-700 hover:text-gray-900',
                  'hover:bg-white/40 hover:backdrop-blur-xl hover:shadow-lg hover:scale-105',
                  'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent',
                  currentPath === item.key &&
                    'bg-white/60 text-gray-900 shadow-lg backdrop-blur-xl font-semibold',
                )}
                onMouseEnter={() => setActiveItem(item.key)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {currentPath === item.key && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse" />
                )}

                <div
                  className={cn(
                    'absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 transition-all duration-300',
                    activeItem === item.key && 'opacity-100 scale-105',
                  )}
                />

                <span className="relative z-10">{item.label}</span>

                <div
                  className={cn(
                    'absolute top-1 right-1 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 transition-all duration-300',
                    activeItem === item.key && 'opacity-60 animate-ping',
                  )}
                />
              </Link>
            ))}
          </div>

          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-40 animate-pulse" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 animate-pulse delay-1000" />
        </nav>
      </header>
    </>
  );
}
