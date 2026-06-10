import { AppLayout } from '../components/layout/AppLayout';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { posts } from '../data/mockData';

export function HomePage() {
  const feedPosts = posts.filter((post) => post.id !== '4');

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
