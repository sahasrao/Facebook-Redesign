import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { FriendCard } from '../components/friends/FriendCard';
import {
  FriendRequestCard,
  FriendSuggestionCard,
} from '../components/friends/FriendExtras';
import { Tabs } from '../components/ui/Tabs';
import { friendRequests, friendSuggestions, friends } from '../data/mockData';

export function FriendsPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <AppLayout showRightSidebar="sponsored">
      <div className="space-y-8">
        <div>
          <h1 className="text-xl font-medium text-fb-text">Friends</h1>
          <p className="mt-0.5 text-sm text-fb-muted">Your connections</p>
        </div>

        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'all', label: 'All Friends', count: friends.length },
            { id: 'requests', label: 'Requests', count: friendRequests.length },
            { id: 'suggestions', label: 'Suggestions', count: friendSuggestions.length },
          ]}
        />

        {activeTab === 'all' && (
          <div className="space-y-5">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-4">
            {friendRequests.length > 0 ? (
              friendRequests.map((request) => (
                <FriendRequestCard key={request.id} request={request} />
              ))
            ) : (
              <p className="rounded-[19px] bg-white p-8 text-center text-sm text-fb-muted shadow-[var(--shadow-fb-card)]">
                No pending friend requests.
              </p>
            )}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {friendSuggestions.map((suggestion) => (
              <FriendSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        )}

        <p className="text-sm text-fb-muted">
          Looking for someone?{' '}
          <Link to="/community" className="font-semibold text-fb-blue hover:underline">
            Browse communities
          </Link>{' '}
          to meet people with shared interests.
        </p>
      </div>
    </AppLayout>
  );
}
