import { Link } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSignUp } from '@/hooks/useSignUp';

export default function SignUpForm() {
  const {
    handleFirstNameChange,
    handleLastNameChange,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleBirthDateChange,
    role,
    handleRoleChange,
    handleSubmit,
  } = useSignUp();

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      {/* Form area */}
      <div className='flex flex-1 items-start justify-center px-6 py-16 md:py-14'>
        <div className='w-full max-w-lg'>
          {/* Section label */}
          <div className='mb-12 flex items-center gap-4'>
            <span className='text-xs tracking-widest text-muted-foreground uppercase'>
              Create an account
            </span>
            <span className='h-px flex-1 bg-border' />
          </div>

          {/* Heading */}
          <h1 className='mb-4 font-serif text-5xl leading-tight font-semibold text-balance text-foreground md:text-6xl'>
            Join Bloggering
          </h1>
          <p className='mb-12 text-base leading-relaxed text-muted-foreground'>
            Read thoughtful essays, or apply as a writer and share your own.
          </p>

          <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <Label
                  htmlFor='name'
                  className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                >
                  First name
                </Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  required
                  autoComplete='given-name'
                  placeholder='Clara'
                  onChange={handleFirstNameChange}
                  className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label
                  htmlFor='lastName'
                  className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                >
                  Last name
                </Label>
                <Input
                  id='lastName'
                  name='lastName'
                  type='text'
                  required
                  autoComplete='family-name'
                  placeholder='Holt'
                  onChange={handleLastNameChange}
                  className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <Label
                htmlFor='username'
                className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
              >
                Username
              </Label>
              <Input
                id='username'
                name='username'
                type='text'
                required
                autoComplete='username'
                placeholder='claraholt'
                onChange={handleUsernameChange}
                className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label
                htmlFor='email'
                className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
              >
                Email
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                required
                autoComplete='email'
                placeholder='clara@example.com'
                onChange={handleEmailChange}
                className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
              />
            </div>

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
                onChange={handlePasswordChange}
                className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label
                htmlFor='birthDate'
                className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
              >
                Birth date
              </Label>
              <Input
                id='birthDate'
                name='birthDate'
                type='date'
                required
                onChange={handleBirthDateChange}
                className='h-10 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 text-base shadow-none transition-colors focus-visible:border-foreground focus-visible:ring-0'
              />
            </div>

            <div className='flex flex-col gap-4 py-2'>
              <span className='text-xs tracking-widest text-muted-foreground uppercase'>Role</span>
              <div className='flex items-center gap-5'>
                <span
                  className={`text-base transition-colors ${role === 'user' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
                >
                  User
                </span>
                <Switch
                  id='role'
                  checked={role === 'writer'}
                  onCheckedChange={handleRoleChange}
                  aria-label='Toggle between User and Writer role'
                  className='scale-125'
                />
                <span
                  className={`text-base transition-colors ${role === 'writer' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
                >
                  Writer
                </span>
              </div>
              <p className='text-xs leading-relaxed text-muted-foreground'>
                {role === 'writer'
                  ? 'Writers can create, comment and publish posts.'
                  : 'Users can read and comment on all published posts.'}
              </p>
            </div>

            {/* Divider */}
            <span className='h-px bg-border' />

            {/* Submit */}
            <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <button
                type='submit'
                className='inline-flex items-center gap-2 bg-foreground px-8 py-4 text-xs tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-80'
              >
                Create account &rarr;
              </button>
              <p className='text-xs text-muted-foreground'>
                Already a member?{' '}
                <Link
                  className='text-foreground underline underline-offset-4 transition-opacity hover:opacity-70'
                  to='/sign-in'
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
