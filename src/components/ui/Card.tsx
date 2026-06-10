import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Card({ children, className = '', id }: CardProps) {
  return (
    <div id={id} className={`rounded-[var(--radius-fb-card)] bg-white ${className}`}>
      {children}
    </div>
  );
}

interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  hasStory?: boolean;
  className?: string;
}

const avatarSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  xl: 'h-24 w-24',
  post: 'h-10 w-10',
  friend: 'h-14 w-14',
  profile: 'h-28 w-28 sm:h-32 sm:w-32',
};

export type AvatarSize = keyof typeof avatarSizes;

export function Avatar({ src, alt, size = 'md', hasStory, className = '' }: AvatarProps) {
  const ring = hasStory ? 'ring-2 ring-fb-blue' : '';

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${avatarSizes[size]} ${ring} ${className}`}
    />
  );
}

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2 className={`text-xs tracking-wide text-fb-muted ${className}`}>
      {children}
    </h2>
  );
}
