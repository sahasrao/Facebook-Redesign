import { useApp } from '../../context/AppContext';

export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div
      role="status"
      className="fixed bottom-24 left-1/2 z-[200] -translate-x-1/2 rounded-full bg-fb-text px-5 py-2.5 text-sm font-medium text-white shadow-lg md:bottom-8"
    >
      {toast}
    </div>
  );
}
