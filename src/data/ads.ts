export interface SidebarAd {
  id: string;
  sponsor: string;
  title: string;
  image: string;
  url: string;
}

export const sidebarAds: SidebarAd[] = [
  {
    id: 'ad-1',
    sponsor: 'cloudsleep.com',
    title: 'Memory foam mattress — 40% off this week only',
    image: 'https://picsum.photos/seed/mattress/400/400',
    url: 'https://example.com/mattress',
  },
  {
    id: 'ad-2',
    sponsor: 'barkbox.pet',
    title: 'Monthly dog toy box — first box free',
    image: 'https://picsum.photos/seed/dogbox/400/400',
    url: 'https://example.com/barkbox',
  },
  {
    id: 'ad-3',
    sponsor: 'duolingo.com',
    title: 'Learn Japanese in 5 minutes a day',
    image: 'https://picsum.photos/seed/language/400/400',
    url: 'https://example.com/duolingo',
  },
  {
    id: 'ad-4',
    sponsor: 'nordvpn.net',
    title: 'Browse privately — 2 years for the price of 1',
    image: 'https://picsum.photos/seed/vpn/400/400',
    url: 'https://example.com/vpn',
  },
  {
    id: 'ad-5',
    sponsor: 'hellofresh.meals',
    title: 'Dinner kits delivered — 16 free meals',
    image: 'https://picsum.photos/seed/meals/400/400',
    url: 'https://example.com/meals',
  },
  {
    id: 'ad-6',
    sponsor: 'coinbase.app',
    title: 'Buy crypto in under 60 seconds',
    image: 'https://picsum.photos/seed/crypto/400/400',
    url: 'https://example.com/crypto',
  },
  {
    id: 'ad-7',
    sponsor: 'calm.audio',
    title: 'Sleep stories narrated by celebrities',
    image: 'https://picsum.photos/seed/calm/400/400',
    url: 'https://example.com/calm',
  },
  {
    id: 'ad-8',
    sponsor: 'wayfair.home',
    title: 'Accent chairs under $99 — ships free',
    image: 'https://picsum.photos/seed/chair/400/400',
    url: 'https://example.com/wayfair',
  },
  {
    id: 'ad-9',
    sponsor: 'masterclass.live',
    title: 'Cook like a chef — watch anywhere',
    image: 'https://picsum.photos/seed/cooking/400/400',
    url: 'https://example.com/masterclass',
  },
  {
    id: 'ad-10',
    sponsor: 'audible.books',
    title: 'Your first audiobook is on us',
    image: 'https://picsum.photos/seed/books/400/400',
    url: 'https://example.com/audible',
  },
  {
    id: 'ad-11',
    sponsor: 'temu.shop',
    title: 'Phone cases from $0.99 — limited stock',
    image: 'https://picsum.photos/seed/phone/400/400',
    url: 'https://example.com/temu',
  },
  {
    id: 'ad-12',
    sponsor: 'peloton.fit',
    title: '30-day home workout trial — no bike needed',
    image: 'https://picsum.photos/seed/fitness/400/400',
    url: 'https://example.com/peloton',
  },
];

export function pickRandomAds(count: number): SidebarAd[] {
  const shuffled = [...sidebarAds].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
