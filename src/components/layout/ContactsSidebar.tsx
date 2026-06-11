import { Link } from 'react-router-dom';
import { friends } from '../../data/mockData';
import { SidebarAds } from './SidebarAds';
import { Avatar, SectionTitle } from '../ui/Card';

export function ContactsSidebar() {
  return (
    <aside className="hidden w-52 shrink-0 xl:block">
      <div className="sticky top-24 space-y-8 py-2">
        <SidebarAds count={3} />

        <div>
          <SectionTitle>Contacts</SectionTitle>
          <ul className="mt-4 space-y-3">
            {friends.map((friend) => (
              <li key={friend.id}>
              <Link
                to={`/friends/${friend.id}`}
                className="flex items-center gap-3 text-sm text-fb-text hover:opacity-70"
              >
                <span className="shrink-0 leading-none">
                  <Avatar src={friend.avatar} alt={friend.name} size="sm" />
                </span>
                  <span className="truncate">{friend.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export function SponsoredSidebar() {
  return (
    <aside className="hidden w-52 shrink-0 lg:block">
      <div className="sticky top-24 py-2">
        <SidebarAds count={3} />
      </div>
    </aside>
  );
}
