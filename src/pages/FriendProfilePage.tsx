import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PostCard } from '../components/feed/PostCard';
import { MutualFriendsBanner } from '../components/friends/FriendExtras';
import { MessengerModal } from '../components/messenger/MessengerModal';
import { AboutPanel, ProfileHero } from '../components/profile/ProfileHero';
import { Tabs } from '../components/ui/Tabs';
import {
  getFriendProfile,
  getGroupsForUser,
  getMutualFriendNames,
  getPostsByAuthor,
} from '../data/mockData';

export function FriendProfilePage() {
  const { friendId } = useParams();
  const profile = friendId ? getFriendProfile(friendId) : undefined;
  const [activeTab, setActiveTab] = useState('posts');
  const [messengerOpen, setMessengerOpen] = useState(false);

  if (!profile) {
    return <Navigate to="/friends" replace />;
  }

  const userPosts = getPostsByAuthor(profile.id);
  const userGroups = getGroupsForUser(profile.id);
  const photos = userPosts.flatMap((p) => p.images ?? []);

  return (
    <div className="mx-auto max-w-[1200px] pb-24 md:pb-10">
      <div className="px-6 pt-8 md:px-10">
        <Link
          to="/friends"
          className="mb-4 inline-flex text-sm font-semibold text-fb-blue hover:underline"
        >
          ← Back to Friends
        </Link>
        <ProfileHero
          profile={profile}
          onMessage={() => setMessengerOpen(true)}
        />
      </div>

      <div className="mx-auto mt-10 flex max-w-[960px] flex-col gap-10 px-6 md:flex-row md:gap-16 md:px-10">
        <AboutPanel profile={profile} />

        <div className="min-w-0 flex-1 space-y-8">
          <MutualFriendsBanner names={getMutualFriendNames()} />

          <Tabs
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: 'posts', label: 'Posts', count: userPosts.length },
              { id: 'photos', label: 'Photos', count: photos.length },
              { id: 'groups', label: 'Groups', count: userGroups.length },
            ]}
          />

          {activeTab === 'posts' && (
            <div className="space-y-6">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <p className="rounded-[var(--radius-fb-card)] bg-white p-10 text-center text-sm text-fb-muted">
                  {profile.name} hasn&apos;t posted recently.
                </p>
              )}
            </div>
          )}

          {activeTab === 'photos' && (
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
                <p className="rounded-[var(--radius-fb-card)] bg-white p-10 text-center text-sm text-fb-muted">
                  No photos to show yet.
                </p>
              )}
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="space-y-3">
              {userGroups.map((group) => (
                <Link
                  key={group.id}
                  to={`/community/${group.id}`}
                  className="flex items-center gap-4 rounded-[var(--radius-fb-card)] bg-white p-5 hover:opacity-90"
                >
                  <img
                    src={group.image}
                    alt=""
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-medium text-fb-text">{group.name}</p>
                    <p className="text-sm text-fb-muted">
                      {group.members.toLocaleString()} members · {group.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {messengerOpen && (
        <MessengerModal friend={profile} onClose={() => setMessengerOpen(false)} />
      )}
    </div>
  );
}
