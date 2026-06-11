import { FormEvent, useState } from 'react';
import { User } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Card';

interface MessengerModalProps {
  friend: User;
  onClose: () => void;
}

export function MessengerModal({ friend, onClose }: MessengerModalProps) {
  const { getMessages, sendMessage } = useApp();
  const [draft, setDraft] = useState('');
  const messages = getMessages(friend.id);

  const handleSend = (e?: FormEvent) => {
    e?.preventDefault();
    if (!draft.trim()) return;
    sendMessage(friend.id, draft);
    setDraft('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end p-6 sm:items-center sm:justify-center">
      <button
        type="button"
        aria-label="Close messenger overlay"
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />

      <div className="relative flex h-[min(520px,80dvh)] w-full max-w-[380px] flex-col overflow-hidden rounded-[var(--radius-fb-card)] bg-white">
        <header className="flex h-14 shrink-0 items-center gap-3 px-5">
          <span className="shrink-0 leading-none">
            <Avatar src={friend.avatar} alt={friend.name} size="sm" />
          </span>
          <p className="flex-1 text-sm font-medium text-fb-text">{friend.name}</p>
          <button
            type="button"
            aria-label="Close messenger"
            onClick={onClose}
            className="rounded-full p-2 text-fb-muted hover:bg-fb-bg"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col bg-fb-bg">
          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.from === 'me' ? 'bg-fb-blue text-white' : 'bg-white text-fb-text'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Message..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send message"
                className="rounded-full p-1.5 text-fb-blue disabled:opacity-40"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}
