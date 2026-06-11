import { Link } from 'react-router-dom';
import { UserProfile, groups } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Card';

interface ProfileHeroProps {
  profile: UserProfile;
  isSelf?: boolean;
  onMessage?: () => void;
}

export function ProfileHero({ profile, isSelf, onMessage }: ProfileHeroProps) {
  const { editProfile, addCoverPhoto, addProfilePhoto, isFriend, showToast } = useApp();

  return (
    <div className="overflow-hidden rounded-[var(--radius-fb-card)] bg-white">
      <div className="relative h-28 bg-fb-input sm:h-36">
        {isSelf && (
          <button
            type="button"
            onClick={addCoverPhoto}
            className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm text-fb-muted hover:text-fb-text sm:right-6 sm:top-6"
          >
            Add cover photo
          </button>
        )}
      </div>

      <div className="relative px-4 pb-6 sm:px-8 sm:pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-5">
            <div className="relative -mt-14 shrink-0 sm:-mt-[84px]">
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                size="profile"
                hasStory={profile.hasStory}
                border
              />
              {isSelf && (
                <button
                  type="button"
                  aria-label="Add profile photo"
                  onClick={addProfilePhoto}
                  className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-fb-blue text-white shadow-sm"
                >
                  <PlusIcon />
                </button>
              )}
            </div>

            <div className="text-center sm:pb-1 sm:text-left">
              <h1 className="text-xl font-medium sm:text-2xl">{profile.name}</h1>
              <p className="mt-1 text-sm text-fb-muted">
                {profile.friendCount.toLocaleString()} friends · {profile.location}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3 sm:justify-end">
            {isSelf ? (
              <button
                type="button"
                onClick={editProfile}
                className="rounded-full bg-fb-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-fb-blue-dark"
              >
                Edit profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => showToast(isFriend(profile.id) ? 'Friends' : 'Friend request sent')}
                  className="rounded-full bg-fb-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-fb-blue-dark"
                >
                  {isFriend(profile.id) ? 'Friends ✓' : 'Add friend'}
                </button>
                <button
                  type="button"
                  onClick={() => onMessage?.()}
                  className="rounded-full bg-fb-input px-5 py-2.5 text-sm font-medium text-fb-text hover:bg-[#e8eaed]"
                >
                  Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutPanel({ profile, showGroups = true }: { profile: UserProfile; showGroups?: boolean }) {
  return (
    <aside className="w-full shrink-0 lg:w-[200px] xl:w-[220px]">
      <div className="space-y-8 py-2 lg:sticky lg:top-24 lg:pr-10">
        <section>
          <h2 className="mb-4 text-xs text-fb-muted">About</h2>
          <ul className="space-y-4 text-sm leading-relaxed text-fb-muted">
            <li className="text-fb-text">{profile.bio}</li>
            {profile.work && <li>{profile.work}</li>}
            {profile.education && <li>{profile.education}</li>}
            <li>{profile.location}</li>
            {profile.birthday && <li>Birthday {profile.birthday}</li>}
            <li>{profile.joined}</li>
          </ul>
        </section>

        {profile.interests.length > 0 && (
          <section>
            <h3 className="mb-3 text-xs text-fb-muted">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-fb-input px-3 py-1 text-xs text-fb-muted"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}

        {showGroups && profile.groupIds.length > 0 && (
          <section>
            <h3 className="mb-3 text-xs text-fb-muted">Groups</h3>
            <GroupsList groupIds={profile.groupIds} />
          </section>
        )}
      </div>
    </aside>
  );
}

function GroupsList({ groupIds }: { groupIds: string[] }) {
  const userGroups = groups.filter((g) => groupIds.includes(g.id));

  return (
    <ul className="space-y-2">
      {userGroups.map((group) => (
        <li key={group.id}>
          <Link
            to={`/community/${group.id}`}
            className="flex items-center gap-2.5 rounded-lg py-1 text-sm text-fb-text hover:opacity-70"
          >
            <img src={group.image} alt="" className="h-7 w-7 shrink-0 rounded-md object-cover" />
            <span>{group.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}
