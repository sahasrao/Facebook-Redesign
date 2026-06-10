// url=https://www.figma.com/design/IWVwo99HMhr4zogJGeBa9M/Facebook-Redesign?node-id=38-708
// source=src/components/messenger/MessengerModal.tsx
// component=MessengerModal
import figma from 'figma';

const instance = figma.selectedInstance;

const nameLayer = instance.findText('Bob Altman');
const name = nameLayer && nameLayer.type !== 'ERROR' ? nameLayer.textContent : 'Bob Altman';

export default {
  example: figma.code`
    <MessengerModal
      friend={{
        id: '2',
        name: "${name}",
        avatar: '/figma/avatar-bob-altman.png',
      }}
      onClose={() => {}}
    />
  `,
  imports: ["import { MessengerModal } from '../components/messenger/MessengerModal'"],
  id: 'messenger-modal',
  metadata: { nestable: false },
};
