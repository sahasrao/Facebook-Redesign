import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { GroupCard, CommunityGroupRow } from '../components/community/GroupCard';
import {
  CategoryFilter,
  CommunityHero,
  EventCard,
} from '../components/community/CommunityExtras';
import { Card, SectionTitle } from '../components/ui/Card';
import {
  communityCategories,
  groupEvents,
  groups,
} from '../data/mockData';

export function CommunityPage() {
  const [category, setCategory] = useState('All');
  const joinedGroups = groups.filter((g) => ['1', '2', '5'].includes(g.id));
  const discoverGroups =
    category === 'All'
      ? groups
      : groups.filter((g) => g.category === category);
  const upcomingEvents = groupEvents.slice(0, 3);

  return (
    <AppLayout showRightSidebar="contacts">
      <div className="space-y-10">
        <CommunityHero />

        <section>
          <SectionTitle className="mb-3">Browse by topic</SectionTitle>
          <CategoryFilter
            categories={communityCategories}
            active={category}
            onChange={setCategory}
          />
        </section>

        <section>
          <SectionTitle className="mb-3">Upcoming events</SectionTitle>
          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const group = groups.find((g) => g.id === event.groupId);
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  groupName={group?.name}
                />
              );
            })}
          </div>
        </section>

        <section>
          <SectionTitle className="mb-4">Your Groups</SectionTitle>
          <div className="space-y-3">
            {joinedGroups.map((group) => (
              <CommunityGroupRow key={group.id} group={group} />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle className="mb-4">
            {category === 'All' ? 'Discover Groups' : `${category} Groups`}
          </SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {discoverGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>

        <Card className="p-6">
          <SectionTitle className="mb-2">Create a Community</SectionTitle>
          <p className="mb-4 text-sm text-fb-muted">
            Can&apos;t find your people? Start a group — whether it&apos;s yo-yo tricks,
            plant swaps, or debating the best dinosaur (it&apos;s Parasaurolophus, fight me).
          </p>
          <button
            type="button"
            className="rounded-lg bg-fb-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-fb-blue-dark"
          >
            Create New Group
          </button>
        </Card>

        <p className="text-sm text-fb-muted">
          Meet members in person or online — check{' '}
          <Link to="/friends" className="font-semibold text-fb-blue hover:underline">
            friend suggestions
          </Link>{' '}
          from your groups.
        </p>
      </div>
    </AppLayout>
  );
}
