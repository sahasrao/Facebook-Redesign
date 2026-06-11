import { useEffect, useState } from 'react';
import { Avatar } from './Card';
import { currentUser } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const modeLabels = {
  text: "What's on your mind?",
  photo: 'Share a photo',
  live: 'Go live',
  update: 'Share a life update',
};

export function PostComposerModal() {
  const { composerOpen, composerMode, composerGroupId, closeComposer, submitPost } = useApp();
  const [text, setText] = useState('');

  useEffect(() => {
    if (composerOpen) setText('');
  }, [composerOpen, composerMode]);

  if (!composerOpen) return null;

  const handleSubmit = () => {
    submitPost(text, composerGroupId);
    setText('');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close composer"
        className="absolute inset-0 bg-black/30"
        onClick={closeComposer}
      />
      <div className="relative w-full max-w-lg rounded-[var(--radius-fb-card)] bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="shrink-0 leading-none">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
          </span>
          <p className="text-sm font-medium text-fb-text">{currentUser.name}</p>
        </div>
        <h2 className="mb-3 text-lg font-medium text-fb-text">{modeLabels[composerMode]}</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          autoFocus
          placeholder="Write something..."
          className="w-full resize-none rounded-xl bg-fb-input p-4 text-sm outline-none focus:bg-[#e8eaed]"
        />
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeComposer}
            className="rounded-full bg-fb-input px-5 py-2 text-sm font-medium text-fb-text hover:bg-[#e8eaed]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="rounded-full bg-fb-blue px-5 py-2 text-sm font-medium text-white hover:bg-fb-blue-dark disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
