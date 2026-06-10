import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { AboutPanel, ProfileHero } from '../components/profile/ProfileHero';
import { SectionTitle } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import {
  currentUserProfile,
  getGroupsForUser,
  getPostsByAuthor,
} from '../data/mockData';

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');
  const userPosts = getPostsByAuthor('1');
  const userGroups = getGroupsForUser('1');
  const photos = userPosts.flatMap((p) => p.images ?? []);

  return (
    <div className="mx-auto max-w-[1200px] pb-24 md:pb-10">
      <div className="px-6 pt-8 md:px-10">
        <ProfileHero profile={currentUserProfile} isSelf />
      </div>

      <div className="mx-auto mt-10 flex max-w-[960px] flex-col gap-10 px-6 md:flex-row md:gap-16 md:px-10">
        <AboutPanel profile={currentUserProfile} />

        <div className="min-w-0 flex-1 space-y-8">
          <CreatePost />

          <Tabs
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: 'posts', label: 'Posts', count: userPosts.length },
              { id: 'photos', label: 'Photos', count: photos.length },
            ]}
          />

          {activeTab === 'posts' && (
            <div className="space-y-6">
              <SectionTitle>Posts</SectionTitle>
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="aspect-square w-full rounded-lg object-cover"
                />
              ))}
            </div>
          )}

          {activeTab === 'posts' && userGroups.length > 0 && (
            <section className="pt-2">
              <SectionTitle className="mb-4">Your communities</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {userGroups.map((g) => (
                  <Link
                    key={g.id}
                    to={`/community/${g.id}`}
                    className="rounded-full bg-fb-input px-4 py-2 text-sm text-fb-muted hover:text-fb-text"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
