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
    sponsor: 'naturalhistorymuseum.org',
    title: 'See the new fossil exhibit — tickets from $12',
    image: '/figma/group-dinos.png',
    url: 'https://example.com/dinos',
  },
  {
    id: 'ad-2',
    sponsor: 'leafandstem.co',
    title: 'Monstera Monday sale — 30% off rare plants',
    image: '/figma/group-plants.png',
    url: 'https://example.com/plants',
  },
  {
    id: 'ad-3',
    sponsor: 'bayarea.aquarium',
    title: 'Member nights at the aquarium this weekend',
    image: '/figma/group-aquarium.png',
    url: 'https://example.com/aquarium',
  },
  {
    id: 'ad-4',
    sponsor: 'spinmaster.yo',
    title: 'Learn 5 tricks in 5 days — free yo-yo kit',
    image: '/figma/group-yoyo.png',
    url: 'https://example.com/yoyo',
  },
  {
    id: 'ad-5',
    sponsor: 'modelrailways.com',
    title: 'HO scale starter sets — free shipping',
    image: '/figma/group-trains.png',
    url: 'https://example.com/trains',
  },
];

export const leftSidebarAds = sidebarAds.slice(0, 2);
export const rightSidebarAds = sidebarAds.slice(0, 3);
