import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

export function CreateGroupModal() {
  const { createGroupOpen, closeCreateGroup, submitCreateGroup } = useApp();
  const [name, setName] = useState('');

  useEffect(() => {
    if (createGroupOpen) setName('');
  }, [createGroupOpen]);

  if (!createGroupOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/30"
        onClick={closeCreateGroup}
      />
      <div className="relative w-full max-w-md rounded-[var(--radius-fb-card)] bg-white p-6 shadow-xl">
        <h2 className="text-lg font-medium text-fb-text">Create a group</h2>
        <p className="mt-2 text-sm text-fb-muted">
          Give your community a name to get started.
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group name"
          autoFocus
          className="mt-4 h-11 w-full rounded-xl bg-fb-input px-4 text-sm outline-none focus:bg-[#e8eaed]"
        />
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeCreateGroup}
            className="rounded-full bg-fb-input px-5 py-2 text-sm font-medium text-fb-text"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => submitCreateGroup(name)}
            disabled={!name.trim()}
            className="rounded-full bg-fb-blue px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
