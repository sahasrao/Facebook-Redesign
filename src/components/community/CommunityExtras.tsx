import { Link } from 'react-router-dom';
import { GroupEvent } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Avatar, Card, SectionTitle } from '../ui/Card';

export function EventCard({ event, groupName }: { event: GroupEvent; groupName?: string }) {
  const { interestedEventIds, toggleEventInterest, getEventAttendees } = useApp();
  const interested = interestedEventIds.has(event.id);
  const attendees = getEventAttendees(event);

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-fb-muted">
            {event.date} · {event.time}
          </p>
          <h3 className="mt-1 text-base font-medium text-fb-text">{event.title}</h3>
          {groupName && (
            <p className="mt-1 text-sm text-fb-muted">Hosted by {groupName}</p>
          )}
          <p className="mt-2 flex items-center gap-2 text-sm text-fb-muted">
            <LocationIcon />
            {event.location}
          </p>
          <p className="mt-1 text-sm text-fb-muted">
            {attendees} people interested
          </p>
        </div>
        <button
          type="button"
          onClick={() => toggleEventInterest(event.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            interested
              ? 'bg-fb-blue text-white'
              : 'bg-fb-input text-fb-text hover:bg-[#e8eaed]'
          }`}
        >
          {interested ? 'Interested ✓' : 'Interested'}
        </button>
      </div>
    </Card>
  );
}

export function MemberRow({
  member,
  role,
}: {
  member: { id: string; name: string; avatar: string };
  role?: string;
}) {
  return (
    <Link
      to={member.id === '1' ? '/profile' : `/friends/${member.id}`}
      className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-fb-bg"
    >
      <span className="shrink-0 leading-none">
        <Avatar src={member.avatar} alt={member.name} size="md" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-fb-text">{member.name}</p>
        {role && <p className="text-sm text-fb-muted">{role}</p>}
      </div>
    </Link>
  );
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            active === cat
              ? 'bg-fb-blue text-white'
              : 'bg-fb-input text-fb-muted hover:text-fb-text'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export function CommunityHero({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {
  return (
    <Card className="p-8">
      <h1 className="text-xl font-medium text-fb-text">Community</h1>
      <p className="mt-2 text-sm text-fb-muted">
        Groups, events, and people who share your interests.
      </p>
      <div className="relative mt-6 max-w-md">
        <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fb-muted" />
        <input
          type="search"
          placeholder="Search groups..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full rounded-full bg-fb-input pl-11 pr-4 text-sm outline-none focus:bg-[#e8eaed]"
        />
      </div>
    </Card>
  );
}

export function GroupRules({ rules }: { rules: string[] }) {
  return (
    <Card className="p-5">
      <SectionTitle className="mb-4">Group Rules</SectionTitle>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-fb-text">
        {rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ol>
    </Card>
  );
}

function LocationIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
