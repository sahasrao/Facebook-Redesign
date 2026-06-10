import { Link } from 'react-router-dom';
import { Group } from '../../data/mockData';
import { Card } from '../ui/Card';

export function GroupCard({ group }: { group: Group }) {
  return (
    <Card id={group.id} className="overflow-hidden p-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        <img
          src={group.image}
          alt=""
          className="h-28 w-full rounded-lg object-cover sm:h-24 sm:w-24 sm:shrink-0"
        />
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div>
            <h3 className="font-medium text-fb-text">{group.name}</h3>
            <p className="mt-1 text-xs text-fb-muted">
              {group.members.toLocaleString()} members · {group.category}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fb-muted">{group.description}</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-full bg-fb-blue px-4 py-2 text-sm font-medium text-white hover:bg-fb-blue-dark"
            >
              Join
            </button>
            <Link
              to={`/community/${group.id}`}
              className="rounded-full bg-fb-input px-4 py-2 text-sm font-medium text-fb-text hover:bg-[#e8eaed]"
            >
              Visit
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function CommunityGroupRow({ group }: { group: Group }) {
  return (
    <Link
      to={`/community/${group.id}`}
      id={group.id}
      className="flex items-center gap-4 rounded-[var(--radius-fb-card)] bg-white p-4 hover:opacity-90"
    >
      <img src={group.image} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-fb-text">{group.name}</p>
        <p className="text-xs text-fb-muted">{group.members.toLocaleString()} members</p>
      </div>
    </Link>
  );
}
