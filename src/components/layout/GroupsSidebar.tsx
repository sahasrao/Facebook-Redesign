import { Link } from 'react-router-dom';
import { groups } from '../../data/mockData';
import { SidebarAds } from './SidebarAds';
import { SectionTitle } from '../ui/Card';

export function GroupsSidebar() {
  return (
    <aside className="hidden w-52 shrink-0 lg:block">
      <div className="sticky top-24 space-y-8 py-2">
        <div>
          <SectionTitle>Groups</SectionTitle>
          <ul className="mt-4 space-y-3">
            {groups.map((group) => (
              <li key={group.id}>
                <Link
                  to={`/community/${group.id}`}
                  className="flex items-center gap-3 text-sm text-fb-text hover:opacity-70"
                >
                  <img
                    src={group.image}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded-md object-cover"
                  />
                  <span className="truncate">{group.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/community"
            className="mt-4 block text-xs text-fb-blue hover:opacity-70"
          >
            See all
          </Link>
        </div>

        <SidebarAds count={2} />
      </div>
    </aside>
  );
}
