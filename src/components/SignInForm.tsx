import { Link } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignInForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      {/* Form area */}
      <div className='flex flex-1 items-start justify-center px-6 py-16 md:py-14'>
        <div className='w-full max-w-lg'>
          {/* Section label */}
          <div className='mb-12 flex items-center gap-4'>
            <span className='text-xs tracking-widest text-muted-foreground uppercase'>Log in</span>
            <span className='h-px flex-1 bg-border' />
          </div>

          {/* Heading */}
          <h1 className='mb-4 font-serif text-5xl leading-tight font-semibold text-balance text-foreground md:text-6xl'>
            Welcome Back
          </h1>
          <p className='mb-12 text-base leading-relaxed text-muted-foreground'>
            Log in to keep reading thoughtful posts and continue sharing your opinions.
          </p>

          <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
              <Label
                htmlFor='identifier'
                className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
              >
                Username or email
              </Label>
              <Input
                id='identifier'
                name='identifier'
                type='text'
                required
                autoComplete='given-name'
                placeholder='clara@hotmail.com'
                className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col gap-2'>
              <Label
                htmlFor='password'
                className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
              >
                Password
              </Label>
              <Input
                id='password'
                name='password'
                type='password'
                required
                autoComplete='new-password'
                placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
              />
            </div>

            {/* Submit */}
            <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <button
                type='submit'
                className='inline-flex items-center gap-2 bg-foreground px-8 py-4 text-xs tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-80'
              >
                Sign in &rarr;
              </button>
              <p className='text-xs text-muted-foreground'>
                Doesn't have an account?{' '}
                <Link
                  className='text-foreground underline underline-offset-4 transition-opacity hover:opacity-70'
                  to='/sign-up'
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
