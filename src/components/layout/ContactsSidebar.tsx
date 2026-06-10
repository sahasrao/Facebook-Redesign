import { Link } from 'react-router-dom';
import { friends } from '../../data/mockData';
import { Avatar, SectionTitle } from '../ui/Card';

export function ContactsSidebar() {
  return (
    <aside className="hidden w-44 shrink-0 xl:block">
      <div className="sticky top-24 space-y-4 py-2">
        <SectionTitle>Contacts</SectionTitle>
        <ul className="space-y-3">
          {friends.map((friend) => (
            <li key={friend.id}>
              <Link
                to={`/friends/${friend.id}`}
                className="flex items-center gap-3 text-sm text-fb-text hover:opacity-70"
              >
                <Avatar src={friend.avatar} alt={friend.name} size="sm" />
                <span className="truncate">{friend.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function SponsoredSidebar() {
  return null;
}
