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
  /** White ring for profile photos overlapping a cover image */
  border?: boolean;
  className?: string;
}

const avatarSizes = {
  xs: 'h-7 w-7',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  xl: 'h-24 w-24',
  profile: 'h-[112px] w-[112px] sm:h-[168px] sm:w-[168px]',
};

export type AvatarSize = keyof typeof avatarSizes;

const storyRingSizes: Record<AvatarSize, string> = {
  xs: 'ring-[1.5px] ring-offset-1',
  sm: 'ring-2 ring-offset-2',
  md: 'ring-2 ring-offset-2',
  lg: 'ring-2 ring-offset-2',
  xl: 'ring-2 ring-offset-2',
  profile: 'ring-[3px] ring-offset-[3px]',
};

export function Avatar({
  src,
  alt,
  size = 'md',
  hasStory,
  border,
  className = '',
}: AvatarProps) {
  const storyRing = hasStory
    ? `ring-fb-blue ${storyRingSizes[size]} ring-offset-white`
    : '';
  const profileBorder = border ? 'shadow-sm ring-4 ring-white' : '';

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-full bg-fb-input ${avatarSizes[size]} ${storyRing} ${profileBorder} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover object-center"
      />
    </span>
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
