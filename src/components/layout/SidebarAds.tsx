import { useState } from 'react';
import { SidebarAd as SidebarAdType, pickRandomAds } from '../../data/ads';
import { SectionTitle } from '../ui/Card';

interface SidebarAdsProps {
  count?: number;
  className?: string;
}

export function SidebarAds({ count = 3, className = '' }: SidebarAdsProps) {
  const [ads] = useState(() => pickRandomAds(count));

  if (ads.length === 0) return null;

  return (
    <section className={className}>
      <SectionTitle className="mb-3">Sponsored</SectionTitle>
      <ul className="space-y-4">
        {ads.map((ad) => (
          <li key={ad.id}>
            <SidebarAdCard ad={ad} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function SidebarAdCard({ ad }: { ad: SidebarAdType }) {
  return (
    <a
      href={ad.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block rounded-xl transition-opacity hover:opacity-80"
      aria-label={`Sponsored: ${ad.title}`}
    >
      <img
        src={ad.image}
        alt=""
        className="aspect-square w-full rounded-lg object-cover"
      />
      <p className="mt-2 line-clamp-2 text-sm leading-snug text-fb-text group-hover:underline">
        {ad.title}
      </p>
      <p className="mt-1 text-xs text-fb-muted">{ad.sponsor}</p>
    </a>
  );
}
