export interface User {
  id: string;
  name: string;
  avatar: string;
  mutualFriends?: number;
  hasStory?: boolean;
}

export interface UserProfile extends User {
  coverGradient: string;
  bio: string;
  location: string;
  work?: string;
  education?: string;
  birthday?: string;
  joined: string;
  friendCount: number;
  groupIds: string[];
  interests: string[];
}

export interface Group {
  id: string;
  name: string;
  image: string;
  members: number;
  description: string;
  category: string;
  privacy: 'Public' | 'Private';
  created: string;
  rules: string[];
  adminIds: string[];
}

export interface GroupEvent {
  id: string;
  groupId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
}

export interface Post {
  id: string;
  author: User;
  text: string;
  images?: string[];
  timestamp: string;
  likes?: number;
  comments?: number;
  groupId?: string;
}

export interface FriendRequest {
  id: string;
  from: User;
  mutualFriends: number;
  message?: string;
}

export interface FriendSuggestion {
  id: string;
  user: User;
  reason: string;
  mutualFriends: number;
}

export const currentUser: User = {
  id: '1',
  name: 'Sahasra Ottikunta',
  avatar: '/figma/avatar-user.png',
};

export const friends: User[] = [
  {
    id: '2',
    name: 'Bob Altman',
    avatar: '/figma/avatar-bob-altman.png',
    mutualFriends: 1,
    hasStory: true,
  },
  {
    id: '3',
    name: 'Bob Ross',
    avatar: '/figma/avatar-bob-ross.png',
    mutualFriends: 1,
  },
  {
    id: '4',
    name: 'Bob Dylan',
    avatar: '/figma/avatar-bob-dylan.png',
    mutualFriends: 1,
  },
];

export const friendProfiles: Record<string, UserProfile> = {
  '2': {
    ...friends[0],
    coverGradient: 'from-indigo-600 via-purple-500 to-pink-500',
    bio: 'Film nerd. Will talk your ear off about 80s remakes and why the original always hits different.',
    location: 'Austin, Texas',
    work: 'Projectionist at Alamo Drafthouse',
    education: 'Studied Film at UT Austin',
    birthday: 'March 14',
    joined: 'Joined Facebook in 2019',
    friendCount: 412,
    groupIds: ['1', '4'],
    interests: ['Movies', 'Popcorn', 'Retro posters'],
    mutualFriends: 1,
    hasStory: true,
  },
  '3': {
    ...friends[1],
    coverGradient: 'from-emerald-500 via-teal-400 to-sky-400',
    bio: 'There are no mistakes, only happy little accidents. Painting every day keeps the stress away.',
    location: 'Muncie, Indiana',
    work: 'Art instructor & YouTube creator',
    education: 'Self-taught with a lot of practice',
    joined: 'Joined Facebook in 2017',
    friendCount: 890000,
    groupIds: ['2'],
    interests: ['Landscape painting', 'Squirrels', 'Soft brushes'],
    mutualFriends: 1,
  },
  '4': {
    ...friends[2],
    coverGradient: 'from-amber-700 via-orange-500 to-yellow-600',
    bio: 'Collecting vinyl, writing songs, and pretending my guitar skills match my record collection.',
    location: 'Minneapolis, Minnesota',
    work: 'Musician & songwriter',
    education: 'The school of life (and a lot of open mics)',
    birthday: 'May 24',
    joined: 'Joined Facebook in 2015',
    friendCount: 1204,
    groupIds: ['4', '5'],
    interests: ['Folk music', 'Harmonica', 'Road trips'],
    mutualFriends: 1,
  },
};

export const currentUserProfile: UserProfile = {
  ...currentUser,
  coverGradient: 'from-fb-blue via-blue-400 to-purple-400',
  bio: '👋 I like dinos',
  location: 'San Jose, California',
  work: 'High school student',
  education: 'Lincoln High School, Class of 2028',
  birthday: 'August 5',
  joined: 'Joined Facebook in 2021',
  friendCount: 5,
  groupIds: ['5', '2'],
  interests: ['Paleontology', 'Birds', 'Science museums'],
};

export const groups: Group[] = [
  {
    id: '1',
    name: 'YOYO Tricks',
    image: '/figma/group-yoyo.png',
    members: 102,
    description:
      'From walk the dog to DNA — share tutorials, trick names, and your favorite yo-yo setups. Beginners welcome!',
    category: 'Hobbies',
    privacy: 'Public',
    created: 'Created Jan 2022',
    rules: ['Be respectful to new learners', 'No spam links', 'Credit trick creators when you can'],
    adminIds: ['2'],
  },
  {
    id: '2',
    name: 'Plants Enthusiasts',
    image: '/figma/group-plants.png',
    members: 8932,
    description:
      'Monstera moms, succulent dads, and everyone in between. Post progress pics, ask for help, swap cuttings.',
    category: 'Home & Garden',
    privacy: 'Public',
    created: 'Created Mar 2018',
    rules: ['Plant ID posts need a photo', 'No selling without mod approval', 'Celebrate every new leaf'],
    adminIds: ['3'],
  },
  {
    id: '3',
    name: 'Aquarium Lovers',
    image: '/figma/group-aquarium.png',
    members: 5621,
    description:
      'Freshwater, saltwater, nano tanks, and the fish that live in them. Tank tours encouraged every Friday.',
    category: 'Pets',
    privacy: 'Public',
    created: 'Created Jun 2019',
    rules: ['Include tank size when asking for advice', 'Be kind about beginner setups'],
    adminIds: ['4'],
  },
  {
    id: '4',
    name: 'Trains',
    image: '/figma/group-trains.png',
    members: 3104,
    description:
      'Model railways, real locomotives, timetables, and history. Share your layout photos and favorite lines.',
    category: 'Hobbies',
    privacy: 'Public',
    created: 'Created Sep 2016',
    rules: ['Scale in the title helps everyone', 'No political debates in comments'],
    adminIds: ['2', '4'],
  },
  {
    id: '5',
    name: 'Dinosaurs',
    image: '/figma/group-dinos.png',
    members: 15200,
    description:
      'For everyone who never grew out of dinosaurs. Fossils, facts, museum trips, and terrible puns welcome.',
    category: 'Science',
    privacy: 'Public',
    created: 'Created Feb 2014',
    rules: ['Cite sources for dino facts', 'Spoilers OK for new discoveries', 'Puns encouraged'],
    adminIds: ['1'],
  },
];

export const groupEvents: GroupEvent[] = [
  {
    id: 'e1',
    groupId: '5',
    title: 'Fossil Friday — Virtual Museum Tour',
    date: 'Jun 12, 2026',
    time: '6:00 PM',
    location: 'Zoom + Natural History Museum stream',
    attendees: 84,
  },
  {
    id: 'e2',
    groupId: '2',
    title: 'Neighborhood Plant Swap',
    date: 'Jun 14, 2026',
    time: '10:00 AM',
    location: 'Community Garden, San Jose',
    attendees: 31,
  },
  {
    id: 'e3',
    groupId: '1',
    title: 'Beginner Yo-Yo Workshop',
    date: 'Jun 20, 2026',
    time: '2:00 PM',
    location: 'Austin Public Library',
    attendees: 18,
  },
  {
    id: 'e4',
    groupId: '4',
    title: 'Model Train Show & Tell',
    date: 'Jun 22, 2026',
    time: '11:00 AM',
    location: 'Minneapolis Makerspace',
    attendees: 56,
  },
];

export const posts: Post[] = [
  {
    id: '1',
    author: friends[0],
    text: 'New movie out! Finally watched the Popeye remake last night — the set design alone is worth it. Who else is going this weekend?',
    images: ['/figma/popeye1.png', '/figma/popeye2.png'],
    timestamp: '2h ago',
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    author: friends[1],
    text: 'Happy little clouds today. Tried a new mountain scene with just three colors — sometimes less really is more.',
    images: ['https://picsum.photos/seed/mountain/400/300'],
    timestamp: '5h ago',
    likes: 1203,
    comments: 142,
  },
  {
    id: '3',
    author: friends[2],
    text: 'Found this vinyl at a garage sale for $3. Sometimes the best songs are the ones hiding in someone else\'s attic.',
    images: ['https://picsum.photos/seed/vinyl/400/300'],
    timestamp: '8h ago',
    likes: 89,
    comments: 12,
  },
  {
    id: '4',
    author: currentUser,
    text: 'Animals! Spent the afternoon at the zoo — the camel was unimpressed but the bird was living its best life.',
    images: [
      'https://picsum.photos/seed/bird/400/300',
      'https://picsum.photos/seed/camel/400/300',
    ],
    timestamp: '1d ago',
    likes: 12,
    comments: 3,
  },
  {
    id: 'g1',
    author: friends[0],
    groupId: '1',
    text: 'Just landed the trapeze for the first time after two weeks of practice. My knuckles disagree but my heart is full.',
    timestamp: '3h ago',
    likes: 17,
    comments: 5,
  },
  {
    id: 'g2',
    author: friends[1],
    groupId: '2',
    text: 'My monstera finally unfurled a new leaf and I may have cried a little. Naming suggestions welcome.',
    images: ['https://picsum.photos/seed/monstera/400/300'],
    timestamp: '6h ago',
    likes: 234,
    comments: 67,
  },
  {
    id: 'g3',
    author: currentUser,
    groupId: '5',
    text: 'Museum trip this weekend! If you\'re near San Jose, the new sauropod exhibit is incredible. T-Rex tax included.',
    images: ['https://picsum.photos/seed/dinofossil/400/300'],
    timestamp: '1d ago',
    likes: 45,
    comments: 11,
  },
  {
    id: 'g4',
    author: friends[2],
    groupId: '4',
    text: 'Finished the mountain pass section of my HO scale layout. Tiny trees make everything feel real.',
    images: ['https://picsum.photos/seed/trainlayout/400/300'],
    timestamp: '2d ago',
    likes: 78,
    comments: 19,
  },
  {
    id: 'g5',
    author: friends[2],
    groupId: '3',
    text: 'New betta in the community tank is settling in. Named him Fleetwood Mac because he swims to his own rhythm.',
    timestamp: '3d ago',
    likes: 56,
    comments: 22,
  },
  {
    id: '5p',
    author: {
      id: '5',
      name: 'Maya Chen',
      avatar: 'https://i.pravatar.cc/150?u=mayachen',
    },
    text: 'Just got back from the dino exhibit — the new sauropod skeleton is unreal. Who wants to go next weekend?',
    images: ['https://picsum.photos/seed/dinomuseum/400/300'],
    timestamp: '4h ago',
    likes: 18,
    comments: 4,
  },
];

export const friendRequests: FriendRequest[] = [
  {
    id: 'fr1',
    from: {
      id: '5',
      name: 'Maya Chen',
      avatar: 'https://i.pravatar.cc/150?u=mayachen',
    },
    mutualFriends: 2,
    message: 'Hey! Saw you in the Dinosaurs group — want to connect?',
  },
  {
    id: 'fr2',
    from: {
      id: '6',
      name: 'Jake Morrison',
      avatar: 'https://i.pravatar.cc/150?u=jakem',
    },
    mutualFriends: 1,
    message: 'We were in robotics club together!',
  },
];

export const friendSuggestions: FriendSuggestion[] = [
  {
    id: 's1',
    user: {
      id: '7',
      name: 'Priya Patel',
      avatar: 'https://i.pravatar.cc/150?u=priyapatel',
    },
    reason: 'Also in Plants Enthusiasts',
    mutualFriends: 3,
  },
  {
    id: 's2',
    user: {
      id: '8',
      name: 'Sam Ortiz',
      avatar: 'https://i.pravatar.cc/150?u=samortiz',
    },
    reason: 'Lives in San Jose',
    mutualFriends: 1,
  },
  {
    id: 's3',
    user: {
      id: '9',
      name: 'Emma Walsh',
      avatar: 'https://i.pravatar.cc/150?u=emmawalsh',
    },
    reason: 'Follows similar pages',
    mutualFriends: 2,
  },
];

export const communityCategories = [
  'All',
  'Hobbies',
  'Science',
  'Pets',
  'Home & Garden',
  'Local',
];

export const profileInfo = {
  birthday: 'August 5, 2006',
  bio: '👋 I like dinos',
  friendCount: 5,
};

export function getGroupById(id: string): Group | undefined {
  return groups.find((group) => group.id === id);
}

export function getFriendById(id: string): User | undefined {
  return friends.find((friend) => friend.id === id);
}

export function getFriendProfile(id: string): UserProfile | undefined {
  if (friendProfiles[id]) return friendProfiles[id];
  if (extendedProfiles[id]) return extendedProfiles[id];
  return undefined;
}

const extendedProfiles: Record<string, UserProfile> = {
  '5': {
    id: '5',
    name: 'Maya Chen',
    avatar: 'https://i.pravatar.cc/150?u=mayachen',
    coverGradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
    bio: 'Paleontology nerd since age 6. Will travel anywhere for a good fossil exhibit.',
    location: 'San Jose, California',
    work: 'Volunteer at the Natural History Museum',
    education: 'Lincoln High School',
    joined: 'Joined Facebook in 2024',
    friendCount: 89,
    groupIds: ['5'],
    interests: ['Fossils', 'Museums', 'T-Rex debates'],
    mutualFriends: 2,
  },
  '6': {
    id: '6',
    name: 'Jake Morrison',
    avatar: 'https://i.pravatar.cc/150?u=jakem',
    coverGradient: 'from-slate-600 via-gray-500 to-zinc-400',
    bio: 'Building robots by day, breaking them by night. Robotics club forever.',
    location: 'San Jose, California',
    work: 'Robotics team captain',
    education: 'Lincoln High School',
    joined: 'Joined Facebook in 2023',
    friendCount: 156,
    groupIds: ['4'],
    interests: ['Robotics', 'Coding', 'Trains'],
    mutualFriends: 1,
  },
  '7': {
    id: '7',
    name: 'Priya Patel',
    avatar: 'https://i.pravatar.cc/150?u=priyapatel',
    coverGradient: 'from-green-600 via-emerald-500 to-lime-400',
    bio: 'My apartment is basically a greenhouse. No regrets.',
    location: 'Palo Alto, California',
    work: 'Barista & plant mom',
    joined: 'Joined Facebook in 2020',
    friendCount: 342,
    groupIds: ['2'],
    interests: ['Monstera', 'Propagation', 'Coffee'],
    mutualFriends: 3,
  },
  '8': {
    id: '8',
    name: 'Sam Ortiz',
    avatar: 'https://i.pravatar.cc/150?u=samortiz',
    coverGradient: 'from-cyan-600 via-blue-500 to-indigo-400',
    bio: 'Local photographer. Always down for a hike or a taco run.',
    location: 'San Jose, California',
    joined: 'Joined Facebook in 2019',
    friendCount: 521,
    groupIds: ['3', '2'],
    interests: ['Photography', 'Hiking', 'Food'],
    mutualFriends: 1,
  },
  '9': {
    id: '9',
    name: 'Emma Walsh',
    avatar: 'https://i.pravatar.cc/150?u=emmawalsh',
    coverGradient: 'from-rose-500 via-pink-500 to-orange-400',
    bio: 'Bookworm, cat person, and occasional yo-yo enthusiast.',
    location: 'Santa Clara, California',
    work: 'Library assistant',
    joined: 'Joined Facebook in 2018',
    friendCount: 278,
    groupIds: ['1', '5'],
    interests: ['Reading', 'Cats', 'Yo-yo'],
    mutualFriends: 2,
  },
};

export function getPostsByAuthor(authorId: string): Post[] {
  return posts.filter((post) => post.author.id === authorId && !post.groupId);
}

export function getPostsByGroup(groupId: string): Post[] {
  return posts.filter((post) => post.groupId === groupId);
}

export function getEventsByGroup(groupId: string): GroupEvent[] {
  return groupEvents.filter((event) => event.groupId === groupId);
}

export function getGroupsForUser(userId: string): Group[] {
  const profile =
    userId === '1' ? currentUserProfile : friendProfiles[userId];
  if (!profile) return [];
  return groups.filter((g) => profile.groupIds.includes(g.id));
}

export function getMutualFriendNames(): string[] {
  return [currentUser.name];
}
