import { ReactNode } from 'react';

interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex gap-8 overflow-x-auto py-1 ${className}`}>
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`shrink-0 text-sm transition-colors ${
              active ? 'font-medium text-fb-text' : 'text-fb-muted hover:text-fb-text'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1 text-fb-muted">{tab.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-[var(--radius-fb-card)] bg-white px-8 py-14 text-center">
      <p className="text-base font-medium text-fb-text">{title}</p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-fb-muted">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
