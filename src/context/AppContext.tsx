import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  currentUser,
  currentUserProfile,
  friendRequests as initialFriendRequests,
  friendSuggestions as initialFriendSuggestions,
  friends,
  groups,
  posts as initialPosts,
  type FriendRequest,
  type FriendSuggestion,
  type GroupEvent,
  type Post,
  type User,
} from '../data/mockData';

export interface ChatMessage {
  id: string;
  from: 'me' | 'them';
  text: string;
}

export interface AppNotification {
  id: string;
  text: string;
  time: string;
  read: boolean;
  href?: string;
}

type ComposerMode = 'text' | 'photo' | 'live' | 'update';

interface AppContextValue {
  posts: Post[];
  feedPosts: Post[];
  getPostsByAuthor: (authorId: string) => Post[];
  getPostsByGroup: (groupId: string) => Post[];
  isLiked: (postId: string) => boolean;
  toggleLike: (postId: string) => void;
  getLikeCount: (postId: string) => number;
  getCommentCount: (postId: string) => number;
  expandedCommentPostId: string | null;
  toggleComments: (postId: string) => void;
  getComments: (postId: string) => string[];
  addComment: (postId: string, text: string) => void;
  sharePost: (postId: string) => void;
  composerOpen: boolean;
  composerMode: ComposerMode;
  openComposer: (mode?: ComposerMode, groupId?: string) => void;
  closeComposer: () => void;
  composerGroupId?: string;
  submitPost: (text: string, groupId?: string) => void;
  friendRequests: FriendRequest[];
  friendSuggestions: FriendSuggestion[];
  confirmRequest: (requestId: string) => void;
  deleteRequest: (requestId: string) => void;
  addFriendFromSuggestion: (suggestionId: string) => void;
  joinedGroupIds: Set<string>;
  isGroupJoined: (groupId: string) => boolean;
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  interestedEventIds: Set<string>;
  toggleEventInterest: (eventId: string) => void;
  getEventAttendees: (event: GroupEvent) => number;
  messengerOpen: boolean;
  messengerFriend: User | null;
  openMessenger: (friend: User) => void;
  closeMessenger: () => void;
  getMessages: (friendId: string) => ChatMessage[];
  sendMessage: (friendId: string, text: string) => void;
  notificationsOpen: boolean;
  toggleNotifications: () => void;
  closeNotifications: () => void;
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: { type: 'friend' | 'group'; id: string; label: string; href: string }[];
  toast: string | null;
  showToast: (message: string) => void;
  createGroupOpen: boolean;
  openCreateGroup: () => void;
  closeCreateGroup: () => void;
  submitCreateGroup: (name: string) => void;
  editProfile: () => void;
  addCoverPhoto: () => void;
  addProfilePhoto: () => void;
  inviteToGroup: (groupName: string) => void;
  isFriend: (userId: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

const defaultMessages: Record<string, ChatMessage[]> = Object.fromEntries(
  friends.map((friend) => [
    friend.id,
    [{ id: 'seed', from: 'them' as const, text: 'Hey!' }],
  ]),
);

const initialNotifications: AppNotification[] = [
  { id: 'n1', text: 'Bob Altman liked your post', time: '2h', read: false, href: '/' },
  { id: 'n2', text: 'New event in Dinosaur Enthusiasts', time: '5h', read: false, href: '/community/5' },
  { id: 'n3', text: 'Priya Patel sent you a friend request', time: '1d', read: true, href: '/friends' },
];

function formatTimestamp() {
  return 'Just now';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(initialPosts.map((p) => [p.id, p.likes ?? 0])),
  );
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(initialPosts.map((p) => [p.id, p.comments ?? 0])),
  );
  const [postComments, setPostComments] = useState<Record<string, string[]>>({});
  const [expandedCommentPostId, setExpandedCommentPostId] = useState<string | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerMode, setComposerMode] = useState<ComposerMode>('text');
  const [composerGroupId, setComposerGroupId] = useState<string | undefined>();
  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);
  const [friendSuggestions, setFriendSuggestions] = useState(initialFriendSuggestions);
  const [joinedGroupIds, setJoinedGroupIds] = useState<Set<string>>(
    () => new Set(currentUserProfile.groupIds),
  );
  const [interestedEventIds, setInterestedEventIds] = useState<Set<string>>(new Set());
  const [eventAttendeeDeltas, setEventAttendeeDeltas] = useState<Record<string, number>>({});
  const [messengerOpen, setMessengerOpen] = useState(false);
  const [messengerFriend, setMessengerFriend] = useState<User | null>(null);
  const [conversations, setConversations] = useState(defaultMessages);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const feedPosts = useMemo(
    () => posts.filter((post) => !post.groupId && post.id !== '4'),
    [posts],
  );

  const getPostsByAuthor = useCallback(
    (authorId: string) => posts.filter((post) => post.author.id === authorId && !post.groupId),
    [posts],
  );

  const getPostsByGroup = useCallback(
    (groupId: string) => posts.filter((post) => post.groupId === groupId),
    [posts],
  );

  const isLiked = useCallback((postId: string) => likedPostIds.has(postId), [likedPostIds]);

  const toggleLike = useCallback((postId: string) => {
    setLikedPostIds((prev) => {
      const next = new Set(prev);
      const liked = next.has(postId);
      if (liked) next.delete(postId);
      else next.add(postId);
      setLikeCounts((counts) => ({
        ...counts,
        [postId]: Math.max(0, (counts[postId] ?? 0) + (liked ? -1 : 1)),
      }));
      return next;
    });
  }, []);

  const getLikeCount = useCallback((postId: string) => likeCounts[postId] ?? 0, [likeCounts]);
  const getCommentCount = useCallback(
    (postId: string) => commentCounts[postId] ?? 0,
    [commentCounts],
  );

  const toggleComments = useCallback((postId: string) => {
    setExpandedCommentPostId((current) => (current === postId ? null : postId));
  }, []);

  const getComments = useCallback(
    (postId: string) => postComments[postId] ?? [],
    [postComments],
  );

  const addComment = useCallback((postId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] ?? []), trimmed],
    }));
    setCommentCounts((prev) => ({
      ...prev,
      [postId]: (prev[postId] ?? 0) + 1,
    }));
  }, []);

  const sharePost = useCallback(
    (postId: string) => {
      const url = `${window.location.origin}/#post-${postId}`;
      void navigator.clipboard.writeText(url).then(() => {
        showToast('Link copied to clipboard');
      });
    },
    [showToast],
  );

  const openComposer = useCallback((mode: ComposerMode = 'text', groupId?: string) => {
    setComposerMode(mode);
    setComposerGroupId(groupId);
    setComposerOpen(true);
  }, []);

  const closeComposer = useCallback(() => {
    setComposerOpen(false);
    setComposerGroupId(undefined);
  }, []);

  const submitPost = useCallback(
    (text: string, groupId?: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const newPost: Post = {
        id: `post-${Date.now()}`,
        author: currentUser,
        text: trimmed,
        timestamp: formatTimestamp(),
        likes: 0,
        comments: 0,
        groupId,
      };
      setPosts((prev) => [newPost, ...prev]);
      setLikeCounts((prev) => ({ ...prev, [newPost.id]: 0 }));
      setCommentCounts((prev) => ({ ...prev, [newPost.id]: 0 }));
      closeComposer();
      showToast(groupId ? 'Posted to group' : 'Post published');
    },
    [closeComposer, showToast],
  );

  const confirmRequest = useCallback(
    (requestId: string) => {
      setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));
      showToast('Friend request confirmed');
    },
    [showToast],
  );

  const deleteRequest = useCallback(
    (requestId: string) => {
      setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));
      showToast('Request removed');
    },
    [showToast],
  );

  const addFriendFromSuggestion = useCallback(
    (suggestionId: string) => {
      setFriendSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
      showToast('Friend request sent');
    },
    [showToast],
  );

  const isGroupJoined = useCallback(
    (groupId: string) => joinedGroupIds.has(groupId),
    [joinedGroupIds],
  );

  const joinGroup = useCallback(
    (groupId: string) => {
      setJoinedGroupIds((prev) => new Set(prev).add(groupId));
      showToast('Joined group');
    },
    [showToast],
  );

  const leaveGroup = useCallback(
    (groupId: string) => {
      setJoinedGroupIds((prev) => {
        const next = new Set(prev);
        next.delete(groupId);
        return next;
      });
      showToast('Left group');
    },
    [showToast],
  );

  const toggleEventInterest = useCallback((eventId: string) => {
    setInterestedEventIds((prev) => {
      const next = new Set(prev);
      const interested = next.has(eventId);
      if (interested) next.delete(eventId);
      else next.add(eventId);
      setEventAttendeeDeltas((deltas) => ({
        ...deltas,
        [eventId]: (deltas[eventId] ?? 0) + (interested ? -1 : 1),
      }));
      return next;
    });
  }, []);

  const getEventAttendees = useCallback(
    (event: GroupEvent) => event.attendees + (eventAttendeeDeltas[event.id] ?? 0),
    [eventAttendeeDeltas],
  );

  const openMessenger = useCallback((friend: User) => {
    setMessengerFriend(friend);
    setMessengerOpen(true);
  }, []);

  const closeMessenger = useCallback(() => {
    setMessengerOpen(false);
    setMessengerFriend(null);
  }, []);

  const getMessages = useCallback(
    (friendId: string) => conversations[friendId] ?? [],
    [conversations],
  );

  const sendMessage = useCallback((friendId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setConversations((prev) => ({
      ...prev,
      [friendId]: [
        ...(prev[friendId] ?? []),
        { id: `msg-${Date.now()}`, from: 'me', text: trimmed },
      ],
    }));
  }, []);

  const toggleNotifications = useCallback(() => {
    setNotificationsOpen((open) => !open);
  }, []);

  const closeNotifications = useCallback(() => setNotificationsOpen(false), []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const unreadNotificationCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const friendResults = friends
      .filter((f) => f.name.toLowerCase().includes(q))
      .map((f) => ({
        type: 'friend' as const,
        id: f.id,
        label: f.name,
        href: `/friends/${f.id}`,
      }));
    const groupResults = groups
      .filter((g) => g.name.toLowerCase().includes(q))
      .map((g) => ({
        type: 'group' as const,
        id: g.id,
        label: g.name,
        href: `/community/${g.id}`,
      }));
    return [...friendResults, ...groupResults].slice(0, 6);
  }, [searchQuery]);

  const openCreateGroup = useCallback(() => setCreateGroupOpen(true), []);
  const closeCreateGroup = useCallback(() => setCreateGroupOpen(false), []);

  const submitCreateGroup = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      closeCreateGroup();
      showToast(`"${trimmed}" group created`);
    },
    [closeCreateGroup, showToast],
  );

  const editProfile = useCallback(() => showToast('Profile changes saved'), [showToast]);
  const addCoverPhoto = useCallback(() => showToast('Cover photo updated'), [showToast]);
  const addProfilePhoto = useCallback(() => showToast('Profile photo updated'), [showToast]);

  const inviteToGroup = useCallback(
    (groupName: string) => showToast(`Invite link copied for ${groupName}`),
    [showToast],
  );

  const isFriend = useCallback((userId: string) => friends.some((f) => f.id === userId), []);

  const value: AppContextValue = {
    posts,
    feedPosts,
    getPostsByAuthor,
    getPostsByGroup,
    isLiked,
    toggleLike,
    getLikeCount,
    getCommentCount,
    expandedCommentPostId,
    toggleComments,
    getComments,
    addComment,
    sharePost,
    composerOpen,
    composerMode,
    openComposer,
    closeComposer,
    composerGroupId,
    submitPost,
    friendRequests,
    friendSuggestions,
    confirmRequest,
    deleteRequest,
    addFriendFromSuggestion,
    joinedGroupIds,
    isGroupJoined,
    joinGroup,
    leaveGroup,
    interestedEventIds,
    toggleEventInterest,
    getEventAttendees,
    messengerOpen,
    messengerFriend,
    openMessenger,
    closeMessenger,
    getMessages,
    sendMessage,
    notificationsOpen,
    toggleNotifications,
    closeNotifications,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    searchQuery,
    setSearchQuery,
    searchResults,
    toast,
    showToast,
    createGroupOpen,
    openCreateGroup,
    closeCreateGroup,
    submitCreateGroup,
    editProfile,
    addCoverPhoto,
    addProfilePhoto,
    inviteToGroup,
    isFriend,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
