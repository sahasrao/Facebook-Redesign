import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Group,
  currentUser,
  currentUserProfile,
  friendProfiles,
  friends,
  getEventsByGroup,
} from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { CreatePost } from '../feed/CreatePost';
import { PostCard } from '../feed/PostCard';
import { EventCard, GroupRules, MemberRow } from './CommunityExtras';
import { MobileAds } from '../layout/MobileAds';
import { Card, SectionTitle } from '../ui/Card';
import { Tabs } from '../ui/Tabs';

interface GroupDetailHeaderProps {
  group: Group;
  joined?: boolean;
}

export function GroupDetailHeader({ group, joined = true }: GroupDetailHeaderProps) {
  const { leaveGroup, joinGroup, inviteToGroup } = useApp();

  return (
    <div className="overflow-hidden rounded-[var(--radius-fb-card)] bg-white">
      <div className="relative h-28 bg-fb-input sm:h-32">
        <span className="absolute left-6 top-6 text-xs text-fb-muted">
          {group.privacy} · {group.category}
        </span>
      </div>

      <div className="relative px-6 pb-8 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <img
              src={group.image}
              alt=""
              className="-mt-12 h-20 w-20 rounded-lg object-cover sm:-mt-14 sm:h-24 sm:w-24"
            />
            <div>
              <h1 className="text-xl font-medium sm:text-2xl">{group.name}</h1>
              <p className="mt-1 text-sm text-fb-muted">
                {group.members.toLocaleString()} members · {group.created}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-fb-muted">
                {group.description}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {joined ? (
              <>
                <button
                  type="button"
                  onClick={() => leaveGroup(group.id)}
                  className="rounded-full bg-fb-input px-4 py-2 text-sm font-medium text-fb-text hover:bg-[#e8eaed]"
                >
                  Joined
                </button>
                <button
                  type="button"
                  onClick={() => inviteToGroup(group.name)}
                  className="rounded-full bg-fb-blue px-4 py-2 text-sm font-medium text-white hover:bg-fb-blue-dark"
                >
                  Invite
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => joinGroup(group.id)}
                className="rounded-full bg-fb-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-fb-blue-dark"
              >
                Join group
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface GroupContentProps {
  group: Group;
}

export function GroupContent({ group }: GroupContentProps) {
  const [activeTab, setActiveTab] = useState('discussion');
  const { getPostsByGroup } = useApp();
  const groupPosts = getPostsByGroup(group.id);
  const events = getEventsByGroup(group.id);
  const members = getGroupMembers(group);
  const photos = groupPosts.flatMap((p) => p.images ?? []);

  return (
    <div className="space-y-8">
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'discussion', label: 'Discussion', count: groupPosts.length },
          { id: 'events', label: 'Events', count: events.length },
          { id: 'members', label: 'Members' },
          { id: 'about', label: 'About' },
          { id: 'media', label: 'Media', count: photos.length },
        ]}
      />

      {activeTab === 'discussion' && (
        <div className="space-y-6">
          <CreatePost groupId={group.id} />
          <MobileAds count={2} />
          {groupPosts.length > 0 ? (
            groupPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <Card className="p-8 text-center text-sm text-fb-muted">
              No posts yet. Be the first to start a conversation!
            </Card>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-3">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} groupName={group.name} />
            ))
          ) : (
            <Card className="p-8 text-center text-sm text-fb-muted">
              No upcoming events. Check back soon!
            </Card>
          )}
        </div>
      )}

      {activeTab === 'members' && (
        <Card className="space-y-1 p-4">
          {members.map(({ member, role }) => (
            <MemberRow key={member.id} member={member} role={role} />
          ))}
        </Card>
      )}

      {activeTab === 'about' && (
        <div className="space-y-6">
          <Card className="p-5">
            <SectionTitle className="mb-3">About this group</SectionTitle>
            <p className="text-sm leading-relaxed text-fb-text">{group.description}</p>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-fb-muted">Privacy</dt>
                <dd>{group.privacy}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fb-muted">Category</dt>
                <dd>{group.category}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fb-muted">Members</dt>
                <dd>{group.members.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="font-semibold text-fb-muted">History</dt>
                <dd>{group.created}</dd>
              </div>
            </dl>
          </Card>
          <GroupRules rules={group.rules} />
        </div>
      )}

      {activeTab === 'media' && (
        <div>
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="aspect-square w-full rounded-xl object-cover"
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-sm text-fb-muted">
              No photos shared in this group yet.
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

function getGroupMembers(group: Group) {
  const allMembers = [currentUser, ...friends];
  const memberIds = new Set<string>(group.adminIds);

  allMembers.forEach((member) => {
    const profile =
      member.id === '1' ? currentUserProfile : friendProfiles[member.id];
    if (profile?.groupIds.includes(group.id)) {
      memberIds.add(member.id);
    }
  });

  return Array.from(memberIds)
    .map((id) => {
      const member = allMembers.find((m) => m.id === id);
      if (!member) return null;
      const role = group.adminIds.includes(id)
        ? id === '1'
          ? 'Admin · You'
          : 'Admin'
        : 'Member';
      return { member, role };
    })
    .filter(Boolean) as { member: (typeof allMembers)[0]; role: string }[];
}

export function GroupSidebarLink({ group }: { group: Group }) {
  return (
    <Link
      to={`/community/${group.id}`}
      className="flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-fb-bg"
    >
      <img
        src={group.image}
        alt=""
        className="h-10 w-10 shrink-0 rounded-[10px] object-cover"
      />
      <span className="truncate text-sm font-medium text-fb-text">{group.name}</span>
    </Link>
  );
}
