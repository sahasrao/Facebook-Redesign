import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../data/mockData';
import { Avatar, Card } from '../ui/Card';
import { MessengerModal } from '../messenger/MessengerModal';

export function FriendCard({ friend }: { friend: User }) {
  const [messengerOpen, setMessengerOpen] = useState(false);

  return (
    <>
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <Link to={`/friends/${friend.id}`} className="shrink-0">
            <Avatar src={friend.avatar} alt={friend.name} size="lg" hasStory={friend.hasStory} />
          </Link>

          <Link to={`/friends/${friend.id}`} className="min-w-0 flex-1">
            <p className="truncate font-medium text-fb-text">{friend.name}</p>
            {friend.mutualFriends !== undefined && (
              <p className="mt-0.5 text-sm text-fb-muted">
                {friend.mutualFriends} mutual friend{friend.mutualFriends !== 1 ? 's' : ''}
              </p>
            )}
          </Link>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label={`Message ${friend.name}`}
              onClick={() => setMessengerOpen(true)}
              className="rounded-full p-2.5 text-fb-muted hover:bg-fb-bg"
            >
              <MessengerIcon />
            </button>
            <Link
              to={`/friends/${friend.id}`}
              aria-label={`View ${friend.name}'s profile`}
              className="rounded-full p-2.5 text-fb-muted hover:bg-fb-bg"
            >
              <ProfileIcon />
            </Link>
          </div>
        </div>
      </Card>

      {messengerOpen && (
        <MessengerModal friend={friend} onClose={() => setMessengerOpen(false)} />
      )}
    </>
  );
}

function MessengerIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.36 2 2 6.13 2 11.25c0 2.61 1.26 4.95 3.22 6.5L4 22l4.56-2.25c1.22.34 2.51.52 3.87.52 5.64 0 10-4.13 10-9.25S17.64 2 12 2z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}
