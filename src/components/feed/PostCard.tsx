import { Link } from 'react-router-dom';
import { Post } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Avatar, Card } from '../ui/Card';
import { useState } from 'react';

function authorProfilePath(authorId: string) {
  if (authorId === '1') return '/profile';
  return `/friends/${authorId}`;
}

export function PostCard({ post }: { post: Post }) {
  const {
    isLiked,
    toggleLike,
    getLikeCount,
    getCommentCount,
    expandedCommentPostId,
    toggleComments,
    getComments,
    addComment,
    sharePost,
  } = useApp();
  const [commentDraft, setCommentDraft] = useState('');
  const liked = isLiked(post.id);
  const commentsExpanded = expandedCommentPostId === post.id;
  const comments = getComments(post.id);
  const likeCount = getLikeCount(post.id);
  const commentCount = getCommentCount(post.id);

  const handleCommentSubmit = () => {
    addComment(post.id, commentDraft);
    setCommentDraft('');
  };

  return (
    <Card id={`post-${post.id}`} className="overflow-hidden p-5">
      <div className="flex items-center gap-3">
        <Link to={authorProfilePath(post.author.id)} className="shrink-0 leading-none">
          <Avatar
            src={post.author.avatar}
            alt={post.author.name}
            size="md"
            hasStory={post.author.hasStory}
          />
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            to={authorProfilePath(post.author.id)}
            className="text-sm font-medium text-fb-text hover:underline"
          >
            {post.author.name}
          </Link>
          <p className="text-xs text-fb-muted">{post.timestamp}</p>
        </div>
      </div>

      {post.text && (
        <p className="mt-4 text-sm leading-relaxed text-fb-text">{post.text}</p>
      )}

      {(likeCount > 0 || commentCount > 0) && (
        <p className="mt-3 text-xs text-fb-muted">
          {likeCount > 0 && `${likeCount} like${likeCount !== 1 ? 's' : ''}`}
          {likeCount > 0 && commentCount > 0 && ' · '}
          {commentCount > 0 && `${commentCount} comment${commentCount !== 1 ? 's' : ''}`}
        </p>
      )}

      {post.images && post.images.length > 0 && (
        <div
          className={`mt-4 grid gap-2 overflow-hidden rounded-lg ${
            post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {post.images.map((img, i) => (
            <img key={i} src={img} alt="" className="aspect-[4/3] w-full object-cover" />
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-2">
        <InteractionButton
          icon={<LikeIcon filled={liked} />}
          label={liked ? 'Liked' : 'Like'}
          active={liked}
          onClick={() => toggleLike(post.id)}
        />
        <InteractionButton
          icon={<CommentIcon />}
          label="Comment"
          active={commentsExpanded}
          onClick={() => toggleComments(post.id)}
        />
        <InteractionButton
          icon={<ShareIcon />}
          label="Share"
          onClick={() => sharePost(post.id)}
        />
      </div>

      {commentsExpanded && (
        <div className="mt-4 space-y-3 border-t border-fb-input pt-4">
          {comments.map((comment, i) => (
            <p key={i} className="rounded-xl bg-fb-bg px-3 py-2 text-sm text-fb-text">
              {comment}
            </p>
          ))}
          <div className="flex gap-2">
            <input
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
              placeholder="Write a comment..."
              className="min-w-0 flex-1 rounded-full bg-fb-input px-4 py-2 text-sm outline-none"
            />
            <button
              type="button"
              onClick={handleCommentSubmit}
              disabled={!commentDraft.trim()}
              className="rounded-full bg-fb-blue px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

function InteractionButton({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm transition-colors hover:bg-fb-bg ${
        active ? 'font-medium text-fb-blue' : 'text-fb-muted hover:text-fb-text'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function LikeIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? 'text-fb-blue' : ''}`}
      fill={filled ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}
