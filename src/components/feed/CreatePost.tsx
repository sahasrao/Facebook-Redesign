import { currentUser } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Avatar, Card } from '../ui/Card';

interface CreatePostProps {
  groupId?: string;
}

export function CreatePost({ groupId }: CreatePostProps) {
  const { openComposer } = useApp();

  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
        <button
          type="button"
          onClick={() => openComposer('text', groupId)}
          className="flex-1 rounded-full bg-fb-input px-5 py-3 text-left text-sm text-fb-muted transition-colors hover:bg-[#e8eaed]"
        >
          What&apos;s on your mind?
        </button>
      </div>

      <div className="mt-5 flex items-center justify-around gap-4">
        <PostAction
          icon={<PhotoIcon />}
          label="Photo"
          onClick={() => openComposer('photo', groupId)}
        />
        <PostAction
          icon={<LiveIcon />}
          label="Live"
          onClick={() => openComposer('live', groupId)}
        />
        <PostAction
          icon={<FlagIcon />}
          label="Update"
          onClick={() => openComposer('update', groupId)}
        />
      </div>
    </Card>
  );
}

function PostAction({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-fb-muted transition-colors hover:bg-fb-bg hover:text-fb-text"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function PhotoIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
    </svg>
  );
}
