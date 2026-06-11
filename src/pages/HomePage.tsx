import { AppLayout } from '../components/layout/AppLayout';
import { MobileAds } from '../components/layout/MobileAds';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { useApp } from '../context/AppContext';

export function HomePage() {
  const { feedPosts } = useApp();

  return (
    <AppLayout>
      <div className="mx-auto max-w-[560px] space-y-6">
        <CreatePost />
        <MobileAds count={2} />
        {feedPosts.map((post, index) => (
          <div key={post.id} className="space-y-6">
            <PostCard post={post} />
            {index === 1 && <MobileAds count={1} className="mb-0" />}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
