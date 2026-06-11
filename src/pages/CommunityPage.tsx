import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { GroupCard, CommunityGroupRow } from '../components/community/GroupCard';
import {
  CategoryFilter,
  CommunityHero,
  EventCard,
} from '../components/community/CommunityExtras';
import { Card, SectionTitle } from '../components/ui/Card';
import { communityCategories, groupEvents, groups } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function CommunityPage() {
  const [category, setCategory] = useState('All');
  const [groupSearch, setGroupSearch] = useState('');
  const { joinedGroupIds, openCreateGroup } = useApp();

  const joinedGroups = useMemo(
    () => groups.filter((g) => joinedGroupIds.has(g.id)),
    [joinedGroupIds],
  );

  const discoverGroups = useMemo(() => {
    let filtered =
      category === 'All' ? groups : groups.filter((g) => g.category === category);
    const q = groupSearch.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q),
      );
    }
    return filtered;
  }, [category, groupSearch]);

  const upcomingEvents = groupEvents.slice(0, 3);

  return (
    <AppLayout showRightSidebar="contacts">
      <div className="space-y-10">
        <CommunityHero searchQuery={groupSearch} onSearchChange={setGroupSearch} />

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
            {joinedGroups.length > 0 ? (
              joinedGroups.map((group) => (
                <CommunityGroupRow key={group.id} group={group} />
              ))
            ) : (
              <Card className="p-6 text-center text-sm text-fb-muted">
                You haven&apos;t joined any groups yet.
              </Card>
            )}
          </div>
        </section>

        <section>
          <SectionTitle className="mb-4">
            {category === 'All' ? 'Discover Groups' : `${category} Groups`}
          </SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {discoverGroups.length > 0 ? (
              discoverGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))
            ) : (
              <Card className="col-span-full p-8 text-center text-sm text-fb-muted">
                No groups match your search.
              </Card>
            )}
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
            onClick={openCreateGroup}
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
