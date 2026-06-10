// url=https://www.figma.com/design/IWVwo99HMhr4zogJGeBa9M/Facebook-Redesign?node-id=14-283
// source=src/components/friends/FriendCard.tsx
// component=FriendCard
import figma from 'figma';

const instance = figma.selectedInstance;

const nameLayer = instance.findText('Bob Altman');
const mutualLayer = instance.findText('1 mutual friend');

const name = nameLayer && nameLayer.type !== 'ERROR' ? nameLayer.textContent : 'Bob Altman';
const mutualText =
  mutualLayer && mutualLayer.type !== 'ERROR' ? mutualLayer.textContent : '1 mutual friend';
const mutualFriends = parseInt(mutualText, 10) || 1;

export default {
  example: figma.code`
    <FriendCard
      friend={{
        id: '2',
        name: "${name}",
        avatar: '/figma/avatar-bob-altman.png',
        mutualFriends: ${mutualFriends},
        hasStory: true,
      }}
    />
  `,
  imports: ["import { FriendCard } from '../components/friends/FriendCard'"],
  id: 'friend-card',
  metadata: { nestable: true },
};
