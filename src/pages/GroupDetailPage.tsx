import { Link, Navigate, useParams } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { GroupContent, GroupDetailHeader } from '../components/community/GroupDetail';
import { getGroupById } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function GroupDetailPage() {
  const { groupId } = useParams();
  const group = groupId ? getGroupById(groupId) : undefined;
  const { isGroupJoined } = useApp();

  if (!group) {
    return <Navigate to="/community" replace />;
  }

  const joined = isGroupJoined(group.id);

  return (
    <AppLayout showLeftSidebar showRightSidebar="contacts">
      <div className="space-y-8">
        <Link
          to="/community"
          className="inline-flex text-sm font-semibold text-fb-blue hover:underline"
        >
          ← Back to Community
        </Link>
        <GroupDetailHeader group={group} joined={joined} />
        <GroupContent group={group} />
      </div>
    </AppLayout>
  );
}
