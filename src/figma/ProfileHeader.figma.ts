// url=https://www.figma.com/design/IWVwo99HMhr4zogJGeBa9M/Facebook-Redesign?node-id=14-237
// source=src/components/profile/ProfileHeader.tsx
// component=ProfileHeader
import figma from 'figma';

const instance = figma.selectedInstance;

const nameLayer = instance.findText('Sahasra Ottikunta');
const friendsLayer = instance.findText('5 Friends');

const name =
  nameLayer && nameLayer.type !== 'ERROR' ? nameLayer.textContent : 'Sahasra Ottikunta';
const friendsCount =
  friendsLayer && friendsLayer.type !== 'ERROR'
    ? friendsLayer.textContent
    : '5 Friends';

export default {
  example: figma.code`<ProfileHeader />`,
  imports: ["import { ProfileHeader } from '../components/profile/ProfileHeader'"],
  id: 'profile-header',
  metadata: {
    nestable: true,
    props: { name, friendsCount },
  },
};
