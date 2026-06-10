import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { FriendsPage } from './pages/FriendsPage';
import { CommunityPage } from './pages/CommunityPage';
import { GroupDetailPage } from './pages/GroupDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { FriendProfilePage } from './pages/FriendProfilePage';

export default function App() {
  return (
    <div className="min-h-dvh bg-fb-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/friends/:friendId" element={<FriendProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/:groupId" element={<GroupDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
