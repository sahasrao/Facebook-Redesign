import { Link } from 'react-router-dom';
import { FriendRequest, FriendSuggestion } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Avatar, Card } from '../ui/Card';

export function FriendRequestCard({ request }: { request: FriendRequest }) {
  const { confirmRequest, deleteRequest } = useApp();

  return (
    <Card className="p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Link to={`/friends/${request.from.id}`} className="flex min-w-0 flex-1 items-center gap-4">
          <span className="shrink-0 leading-none">
            <Avatar src={request.from.avatar} alt={request.from.name} size="md" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium text-fb-text">{request.from.name}</p>
            <p className="text-xs text-fb-muted">
              {request.mutualFriends} mutual friend{request.mutualFriends !== 1 ? 's' : ''}
            </p>
            {request.message && (
              <p className="mt-2 line-clamp-2 text-sm text-fb-muted">&ldquo;{request.message}&rdquo;</p>
            )}
          </div>
        </Link>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => confirmRequest(request.id)}
            className="rounded-full bg-fb-blue px-4 py-2 text-sm font-medium text-white hover:bg-fb-blue-dark"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => deleteRequest(request.id)}
            className="rounded-full bg-fb-input px-4 py-2 text-sm font-medium text-fb-text hover:bg-[#e8eaed]"
          >
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
}

export function FriendSuggestionCard({ suggestion }: { suggestion: FriendSuggestion }) {
  const { addFriendFromSuggestion } = useApp();

  return (
    <Card className="p-6 text-center">
      <Link to={`/friends/${suggestion.user.id}`} className="inline-flex flex-col items-center">
        <Avatar src={suggestion.user.avatar} alt={suggestion.user.name} size="lg" />
        <p className="mt-4 font-medium text-fb-text">{suggestion.user.name}</p>
      </Link>
      <p className="mt-2 text-xs text-fb-muted">{suggestion.reason}</p>
      <button
        type="button"
        onClick={() => addFriendFromSuggestion(suggestion.id)}
        className="mt-5 w-full rounded-full bg-fb-blue py-2 text-sm font-medium text-white hover:bg-fb-blue-dark"
      >
        Add friend
      </button>
    </Card>
  );
}

export function MutualFriendsBanner({ names }: { names: string[] }) {
  return (
    <p className="text-sm text-fb-muted">
      Friends in common: <span className="text-fb-text">{names.join(', ')}</span>
    </p>
  );
}
