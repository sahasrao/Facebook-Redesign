import { SidebarAds } from './SidebarAds';

interface MobileAdsProps {
  count?: number;
  className?: string;
}

/** Sponsored ads shown in the main column on viewports below lg (sidebars hidden). */
export function MobileAds({ count = 2, className = '' }: MobileAdsProps) {
  return (
    <div className={`mb-6 lg:hidden ${className}`}>
      <SidebarAds count={count} />
    </div>
  );
}
