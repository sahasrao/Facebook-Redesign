import { useState } from 'react';
import { SidebarAd as SidebarAdType, pickRandomAds } from '../../data/ads';

interface SidebarAdsProps {
  count?: number;
  className?: string;
}

export function SidebarAds({ count = 3, className = '' }: SidebarAdsProps) {
  const [ads] = useState(() => pickRandomAds(count));

  if (ads.length === 0) return null;

  return (
    <section className={className} aria-label="Sponsored">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-fb-muted">
          Sponsored
        </span>
        <span className="h-px flex-1 bg-[#e4e6eb]" />
      </div>

      <ul className="space-y-3">
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
      className="group relative flex gap-3 rounded-lg border border-dashed border-[#dce0e5] bg-[#f0f2f5] p-3 transition-colors active:scale-[0.99] hover:border-[#bcc0c4] hover:bg-[#ebedf0] sm:p-2.5"
      aria-label={`Sponsored ad: ${ad.title}`}
    >
      <span className="absolute right-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fb-muted">
        Ad
      </span>

      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-white sm:h-[72px] sm:w-[72px]">
        <img src={ad.image} alt="" className="h-full w-full object-cover opacity-90" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="min-w-0 flex-1 pt-0.5 pr-7">
        <p className="text-[10px] font-medium uppercase tracking-wide text-fb-muted">
          {ad.sponsor}
        </p>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-fb-text">
          {ad.title}
        </p>
        <p className="mt-2 text-xs font-semibold text-fb-blue group-hover:underline">
          Learn more
        </p>
      </div>
    </a>
  );
}
