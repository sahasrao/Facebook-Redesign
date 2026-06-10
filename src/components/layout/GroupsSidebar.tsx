import { Link } from 'react-router-dom';
import { groups } from '../../data/mockData';
import { SectionTitle } from '../ui/Card';

export function GroupsSidebar() {
  return (
    <aside className="hidden w-44 shrink-0 lg:block">
      <div className="sticky top-24 space-y-4 py-2">
        <SectionTitle>Groups</SectionTitle>
        <ul className="space-y-3">
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
          className="block text-xs text-fb-blue hover:opacity-70"
        >
          See all
        </Link>
      </div>
    </aside>
  );
}
