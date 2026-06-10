// url=https://www.figma.com/design/IWVwo99HMhr4zogJGeBa9M/Facebook-Redesign?node-id=11-218
// source=src/components/feed/PostCard.tsx
// component=PostCard
import figma from 'figma';

const instance = figma.selectedInstance;

const authorName = instance.findText('Bob Altman');
const postText = instance.findText('New movie out!');

const author =
  authorName && authorName.type !== 'ERROR' ? authorName.textContent : 'Bob Altman';
const text =
  postText && postText.type !== 'ERROR' ? postText.textContent : 'New movie out!';

export default {
  example: figma.code`
    <PostCard
      post={{
        id: '1',
        author: {
          id: '2',
          name: "${author}",
          avatar: '/figma/avatar-bob-altman.png',
          hasStory: true,
        },
        text: "${text}",
        images: ['/figma/popeye1.png', '/figma/popeye2.png'],
        timestamp: '2h ago',
      }}
    />
  `,
  imports: ["import { PostCard } from '../components/feed/PostCard'"],
  id: 'post-card',
  metadata: { nestable: true },
};
