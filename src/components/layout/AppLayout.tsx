import { ReactNode } from 'react';
import { GroupsSidebar } from './GroupsSidebar';
import { ContactsSidebar, SponsoredSidebar } from './ContactsSidebar';

interface AppLayoutProps {
  children: ReactNode;
  showLeftSidebar?: boolean;
  showRightSidebar?: 'contacts' | 'sponsored' | 'none';
}

export function AppLayout({
  children,
  showLeftSidebar = true,
  showRightSidebar = 'contacts',
}: AppLayoutProps) {
  return (
    <div className="mx-auto flex max-w-[1200px] gap-10 px-6 py-8 pb-24 md:gap-14 md:px-10 md:py-10 md:pb-10">
      {showLeftSidebar && <GroupsSidebar />}
      <main className="min-w-0 flex-1">{children}</main>
      {showRightSidebar === 'contacts' && <ContactsSidebar />}
      {showRightSidebar === 'sponsored' && <SponsoredSidebar />}
    </div>
  );
}
