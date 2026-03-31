import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Sign In', href: '/sign-in' },
  { label: 'Log Out', href: '/sign-in' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, logOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logOut();
    setMenuOpen(false);
    navigate('/sign-in');
  }

  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:py-8'>
        {/* Nav left */}
        <nav className='hidden items-center gap-12 md:flex' aria-label='Primary'>
          <Link
            to='/home'
            className='text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
          >
            Home
          </Link>
        </nav>

        <Link
          to={auth?.id ? '/home' : '/'}
          className='font-serif text-3xl font-semibold tracking-tight text-balance text-foreground md:text-4xl'
        >
          Bloggering
        </Link>

        {/* Nav right */}
        <nav className='hidden items-center gap-12 md:flex' aria-label='Secondary'>
          {auth?.id ? (
            <>
              <Link
                to='/home/profile'
                className='text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
              >
                Profile
              </Link>
              <Button
                type='button'
                variant='ghost'
                onClick={handleLogout}
                className='text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
              >
                Log Out
              </Button>
            </>
          ) : (
            <Link
              to='/sign-in'
              className='text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className='flex flex-col gap-1.5 p-1 text-foreground md:hidden'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label='Toggle menu'
        >
          <span
            className={`block h-px w-6 bg-foreground transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      <div className='hidden border-t border-border md:block'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-3'>
          <span className='text-xs tracking-widest text-muted-foreground uppercase'>
            {new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}
          </span>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className='border-t border-border bg-background md:hidden' aria-label='Mobile'>
          <ul className='flex flex-col divide-y divide-border'>
            {auth?.id
              ? navLinks.slice(2).map(link => (
                  <li key={link.label}>
                    <Button
                      type='button'
                      variant='ghost'
                      onClick={handleLogout}
                      className='block px-6 py-4 text-sm tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
                    >
                      {' '}
                      {link.label}{' '}
                    </Button>
                  </li>
                ))
              : navLinks.slice(0, 2).map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className='block px-6 py-4 text-sm tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
