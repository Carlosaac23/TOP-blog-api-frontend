import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider';
import { toSafeText } from '@/helpers/safeText';

export default function PrivateProfile() {
  const { auth } = useAuth();

  const displayName = toSafeText(auth?.name, 'Anonymous Writer');
  const username = toSafeText(auth?.username, 'unknown_user');
  const email = toSafeText(auth?.email, 'No email available');
  const role = toSafeText(auth?.role, 'user');
  const memberSince = toSafeText(auth?.createdAt, 'Recently joined');
  const bio = toSafeText(
    auth?.bio,
    'You have not added a bio yet. Share what you write about and what readers can expect from you.'
  );

  return (
    <section aria-label='Profile page' className='border-b border-border'>
      <div className='mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:py-24'>
        <div className='flex items-center gap-4'>
          <span className='text-xs tracking-widest text-muted-foreground uppercase'>Profile</span>
          <span className='h-px flex-1 bg-border' />
        </div>

        <div className='grid gap-12 md:grid-cols-[2fr_1fr] md:gap-16'>
          <article className='flex flex-col gap-7'>
            <h1 className='font-serif text-5xl leading-tight font-semibold text-balance text-foreground md:text-6xl'>
              {displayName}
            </h1>

            <p className='max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground'>
              {bio}
            </p>

            <div className='flex flex-wrap items-center gap-x-6 gap-y-3 pt-3'>
              <span className='text-xs tracking-widest text-muted-foreground uppercase'>
                @{username}
              </span>
              <span className='h-px w-8 bg-border' />
              <span className='text-xs tracking-widest text-muted-foreground uppercase'>
                {role}
              </span>
            </div>
          </article>

          <aside className='border border-border p-6'>
            <p className='mb-5 text-xs tracking-widest text-muted-foreground uppercase'>
              Account details
            </p>

            <div className='space-y-5'>
              <div>
                <p className='text-xs tracking-widest text-muted-foreground uppercase'>Email</p>
                <p className='mt-1 text-sm text-foreground'>{email}</p>
              </div>

              <div>
                <p className='text-xs tracking-widest text-muted-foreground uppercase'>
                  Member since
                </p>
                <p className='mt-1 text-sm text-foreground'>
                  {new Date(memberSince).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className='flex gap-4'>
          {auth?.role === 'writer' ? (
            <>
              <Link
                to='/home'
                className='inline-flex items-center gap-2 border border-foreground px-6 py-4 text-xs tracking-widest text-foreground uppercase transition-colors hover:bg-foreground hover:text-primary-foreground'
              >
                Back to posts <span aria-hidden='true'>&rarr;</span>
              </Link>
              <Link
                to='/home/create-post'
                className='inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-4 text-xs tracking-widest text-background uppercase transition-colors hover:bg-background hover:text-foreground'
              >
                Create post <span aria-hidden='true'>&rarr;</span>
              </Link>
            </>
          ) : (
            <Link
              to='/home'
              className='inline-flex items-center gap-2 border border-foreground px-6 py-4 text-xs tracking-widest text-foreground uppercase transition-colors hover:bg-foreground hover:text-primary-foreground'
            >
              Back to posts <span aria-hidden='true'>&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
