import { Link, useLocation, useNavigate } from 'react-router-dom';
import { currentUser, friends } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { MessengerModal } from '../messenger/MessengerModal';

const navItems = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/friends', label: 'Friends', icon: FriendsIcon },
  { path: '/community', label: 'Community', icon: CommunityIcon },
  { path: '/profile', label: 'Profile', icon: null },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    openMessenger,
    messengerOpen,
    messengerFriend,
    closeMessenger,
    notificationsOpen,
    toggleNotifications,
    closeNotifications,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    searchQuery,
    setSearchQuery,
    searchResults,
  } = useApp();

  const handleMessengerOpen = () => openMessenger(friends[0]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-fb-blue">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 md:gap-5 md:px-6">
          <Link to="/" className="shrink-0" aria-label="Facebook home">
            <FacebookLogo />
          </Link>

          <div className="hidden min-w-0 flex-1 sm:block">
            <div className="relative mx-auto max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fb-muted" />
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-full bg-white/95 pl-10 pr-4 text-sm text-fb-text outline-none placeholder:text-fb-muted"
              />
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl bg-white shadow-lg">
                  {searchResults.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        navigate(result.href);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-fb-bg"
                    >
                      <span className="text-xs uppercase text-fb-muted">{result.type}</span>
                      <span className="font-medium text-fb-text">{result.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav className="ml-auto flex items-center gap-0.5 md:gap-1">
            {navItems.slice(0, 3).map(({ path, label, icon: Icon }) => {
              const active =
                location.pathname === path || location.pathname.startsWith(`${path}/`);
              return (
                <Link
                  key={path}
                  to={path}
                  aria-label={label}
                  className={`hidden rounded-lg p-2 transition-colors md:flex ${
                    active ? 'bg-white/15' : 'hover:bg-white/10'
                  }`}
                >
                  {Icon && <Icon className="h-5 w-5 text-white" />}
                </Link>
              );
            })}

            <button
              type="button"
              aria-label="Messenger"
              onClick={handleMessengerOpen}
              className="hidden rounded-lg p-2 hover:bg-white/10 md:flex"
            >
              <MessengerIcon className="h-5 w-5 text-white" />
            </button>

            <div className="relative hidden md:block">
              <button
                type="button"
                aria-label="Notifications"
                onClick={toggleNotifications}
                className="relative rounded-lg p-2 hover:bg-white/10"
              >
                <BellIcon className="h-5 w-5 text-white" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close notifications"
                    className="fixed inset-0 z-40"
                    onClick={closeNotifications}
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl bg-white shadow-xl">
                    <p className="border-b border-fb-input px-4 py-3 text-sm font-medium text-fb-text">
                      Notifications
                    </p>
                    <ul className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <li key={n.id}>
                          <button
                            type="button"
                            onClick={() => {
                              markNotificationRead(n.id);
                              closeNotifications();
                              if (n.href) navigate(n.href);
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-fb-bg ${
                              n.read ? 'bg-white' : 'bg-blue-50/50'
                            }`}
                          >
                            <p className="text-sm text-fb-text">{n.text}</p>
                            <p className="mt-1 text-xs text-fb-muted">{n.time} ago</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <Link
              to="/profile"
              aria-label="Your profile"
              className={`ml-1 rounded-full ${location.pathname === '/profile' ? 'ring-2 ring-white/80' : ''}`}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
          </nav>
        </div>
      </header>

      <MobileNav />

      {messengerOpen && messengerFriend && (
        <MessengerModal friend={messengerFriend} onClose={closeMessenger} />
      )}
    </>
  );
}

function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white md:hidden">
      <div className="flex items-center justify-around py-1.5">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active =
            location.pathname === path || location.pathname.startsWith(`${path}/`);
          const isProfile = path === '/profile';

          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                active ? 'text-fb-blue' : 'text-fb-muted'
              }`}
            >
              {isProfile ? (
                <img
                  src={currentUser.avatar}
                  alt=""
                  className={`h-6 w-6 rounded-full object-cover ${
                    active ? 'ring-2 ring-fb-blue' : ''
                  }`}
                />
              ) : (
                Icon && <Icon className="h-5 w-5" />
              )}
              <span className="text-[10px]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function FacebookLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={`h-8 w-8 ${className}`} fill="white" aria-hidden>
      <path d="M36 18c0-9.94-8.06-18-18-18S0 8.06 0 18c0 8.99 6.56 16.44 15.15 17.78V23.4H10.6V18h4.55v-3.95c0-4.5 2.68-6.99 6.78-6.99 1.96 0 4.01.35 4.01.35v4.41h-2.26c-2.23 0-2.92 1.38-2.92 2.8V18h4.97l-.79 5.4h-4.18v12.38C29.44 34.44 36 26.99 36 18z" />
    </svg>
  );
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function HomeIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function FriendsIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function CommunityIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

function MessengerIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.36 2 2 6.13 2 11.25c0 2.61 1.26 4.95 3.22 6.5L4 22l4.56-2.25c1.22.34 2.51.52 3.87.52 5.64 0 10-4.13 10-9.25S17.64 2 12 2z" />
    </svg>
  );
}

function BellIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
    </svg>
  );
}
