import { AppLayout } from '../components/layout/AppLayout';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { useApp } from '../context/AppContext';

export function HomePage() {
  const { feedPosts } = useApp();

  return (
    <AppLayout>
      <div className="mx-auto max-w-[560px] space-y-6">
        <CreatePost />
        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </AppLayout>
  );
}
